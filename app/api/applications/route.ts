import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import prisma from "@/lib/prisma";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "APPLICANT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const applicant = await prisma.applicant.findUnique({
    where: { userId: session.user.id },
  });

  if (!applicant) {
    return NextResponse.json([], { status: 200 });
  }

  const applications = await prisma.visaApplication.findMany({
    where: { applicantId: applicant.id },
    include: { visaType: true, destinationCountry: true },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(applications);
}

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id || session.user.role !== "APPLICANT") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json().catch(() => null);

  if (!body) {
    return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
  }

  const { visaTypeId, destinationCountryId, countryOfResidenceId, travelDate, returnDate, purpose, additionalNotes } = body;

  if (!visaTypeId || !destinationCountryId || !purpose) {
    return NextResponse.json({ error: "Visa type, destination country, and purpose are required" }, { status: 400 });
  }

  const applicant = await prisma.applicant.findUnique({
    where: { userId: session.user.id },
  });

  if (!applicant) {
    return NextResponse.json({ error: "Applicant profile not found" }, { status: 404 });
  }

  const [visaType, country] = await Promise.all([
    prisma.visaType.findUnique({ where: { id: visaTypeId } }),
    prisma.country.findUnique({ where: { id: destinationCountryId } }),
  ]);

  if (!visaType || !country) {
    return NextResponse.json({ error: "Selected visa type or country is invalid" }, { status: 400 });
  }

  if (countryOfResidenceId) {
    await prisma.applicant.update({
      where: { id: applicant.id },
      data: { countryId: countryOfResidenceId },
    });
  }

  const application = await prisma.visaApplication.create({
    data: {
      applicantId: applicant.id,
      visaTypeId,
      destinationCountryId,
      status: "DRAFT",
      travelDate: travelDate || null,
      returnDate: returnDate || null,
      purpose: String(purpose).trim(),
      additionalNotes: additionalNotes ? String(additionalNotes).trim() : null,
    },
    include: {
      visaType: true,
      destinationCountry: true,
    },
  });

  return NextResponse.json(application, { status: 201 });
}
