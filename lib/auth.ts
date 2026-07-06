import { cookies } from 'next/headers';
import { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import prisma from './prisma';

const JWT_SECRET = process.env.JWT_SECRET || 'immigration-system-secret-key-change-in-production-2024';
const JWT_EXPIRES_IN = '24h';

export interface JWTPayload {
  userId: string;
  email: string;
  role: string;
  iat?: number;
  exp?: number;
}

export interface SessionUser {
  userId: string;
  email: string;
  role: string;
}

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 12);
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateToken(payload: Omit<JWTPayload, 'iat' | 'exp'>): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyToken(token: string): JWTPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET) as JWTPayload;
  } catch {
    return null;
  }
}

export async function getAuthSession(request?: NextRequest): Promise<SessionUser | null> {
  try {
    let token: string | undefined;

    if (request) {
      // From request header or cookie
      const authHeader = request.headers.get('authorization');
      if (authHeader?.startsWith('Bearer ')) {
        token = authHeader.substring(7);
      }
      if (!token) {
        token = request.cookies.get('auth-token')?.value;
      }
    } else {
      // From server component
      const cookieStore = await cookies();
      token = cookieStore.get('auth-token')?.value;
    }

    if (!token) return null;

    const payload = verifyToken(token);
    if (!payload) return null;

    // Verify user still exists and is active
    const user = await prisma.user.findUnique({
      where: { id: payload.userId },
      select: { id: true, email: true, role: true, isActive: true }
    });

    if (!user || !user.isActive) return null;

    return {
      userId: user.id,
      email: user.email,
      role: user.role
    };
  } catch {
    return null;
  }
}

export async function requireAuth(request: NextRequest): Promise<SessionUser> {
  const session = await getAuthSession(request);
  if (!session) {
    throw new Error('UNAUTHORIZED');
  }
  return session;
}

export async function requireRole(request: NextRequest, ...roles: string[]): Promise<SessionUser> {
  const session = await requireAuth(request);
  if (!roles.includes(session.role)) {
    throw new Error('FORBIDDEN');
  }
  return session;
}

export function getClientIP(request: NextRequest): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    request.headers.get('x-real-ip') ||
    '127.0.0.1';
}

export function getDeviceInfo(request: NextRequest): string {
  return request.headers.get('user-agent') || 'Unknown';
}
