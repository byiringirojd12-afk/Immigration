import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const visaTypes = await prisma.visaType.findMany({
      where: { isActive: true },
      orderBy: { name: 'asc' },
    });
    return NextResponse.json(visaTypes);
  } catch (error) {
    console.error("Failed to fetch visa types:", error);
    return NextResponse.json({ error: "Failed to fetch visa types" }, { status: 500 });
  }
}
