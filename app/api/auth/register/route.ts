import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { hashPassword } from "@/lib/auth";
import { createAuditLog, AuditActions } from "@/lib/audit";

export async function POST(request: Request) {
  try {
    if (!process.env.DATABASE_URL) {
      return NextResponse.json({ message: "Database is not configured. Please check your local database setup." }, { status: 500 });
    }

    let body: any = {};

    try {
      body = await request.json();
    } catch {
      return NextResponse.json({ message: "Invalid JSON payload" }, { status: 400 });
    }

    const { email, password, firstName, lastName } = body;
    const normalizedEmail = String(email || "").trim().toLowerCase();
    const normalizedFirstName = String(firstName || "").trim();
    const normalizedLastName = String(lastName || "").trim();

    if (!normalizedEmail || !password || !normalizedFirstName || !normalizedLastName) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    if (password.length < 8) {
      return NextResponse.json({ message: "Password must be at least 8 characters" }, { status: 400 });
    }

    // Check if user exists
    const existingUser = await prisma.user.findUnique({
      where: { email: normalizedEmail },
    }).catch(() => null);

    if (existingUser) {
      return NextResponse.json({ message: "Email is already registered" }, { status: 409 });
    }

    // Hash password and create user + applicant profile
    const passwordHash = await hashPassword(password);

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        passwordHash,
        role: "APPLICANT",
        applicant: {
          create: {
            firstName: normalizedFirstName,
            lastName: normalizedLastName,
          },
        },
      },
    }).catch((err) => {
      console.error("Failed to create user:", err);
      throw new Error("We couldn't create your account right now. Please try again shortly.");
    });

    // Create audit log
    await createAuditLog({
      userId: user.id,
      role: user.role,
      action: AuditActions.REGISTER,
      entity: "USER",
      entityId: user.id,
    });

    return NextResponse.json({ message: "Registration successful" }, { status: 201 });
  } catch (error) {
    console.error("Registration error:", error);
    const message = error instanceof Error ? error.message : "An error occurred during registration";
    return NextResponse.json({ message }, { status: 500 });
  }
}
