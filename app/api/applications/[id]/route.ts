import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

interface RouteContext {
  params: { id: string };
}

export async function GET(_request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "APPLICANT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applicant = await prisma.applicant.findUnique({ where: { userId: session.user.id } });

  if (!applicant) {
    return NextResponse.json({ error: "Applicant profile not found" }, { status: 404 });
  }

  const application = await prisma.visaApplication.findFirst({
    where: { id: params.id, applicantId: applicant.id },
    include: { visaType: true, destinationCountry: true, documents: true, payments: true, appointments: true },
  });

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  return NextResponse.json(application);
}

export async function PATCH(request: Request, { params }: RouteContext) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "APPLICANT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  if (!body || body.action !== "submit") {
    return NextResponse.json({ error: "Invalid action" }, { status: 400 });
  }

  const applicant = await prisma.applicant.findUnique({ where: { userId: session.user.id } });

  if (!applicant) {
    return NextResponse.json({ error: "Applicant profile not found" }, { status: 404 });
  }

  const application = await prisma.visaApplication.findFirst({
    where: { id: params.id, applicantId: applicant.id },
  });

  if (!application) {
    return NextResponse.json({ error: "Application not found" }, { status: 404 });
  }

  if (!application.purpose || !application.travelDate) {
    return NextResponse.json({ error: "Complete the purpose and travel details before submitting" }, { status: 400 });
  }

  const updated = await prisma.visaApplication.update({
    where: { id: params.id },
    data: {
      status: "SUBMITTED",
      submittedAt: new Date(),
    },
    include: { visaType: true, destinationCountry: true, documents: true, payments: true, appointments: true },
  });

  return NextResponse.json(updated);
}
