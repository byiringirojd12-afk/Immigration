import prisma from './prisma';

interface AuditLogEntry {
  userId?: string;
  role?: string;
  action: string;
  entity: string;
  entityId?: string;
  oldValue?: string | object | null;
  newValue?: string | object | null;
  ipAddress?: string;
  device?: string;
}

export async function createAuditLog(entry: AuditLogEntry): Promise<void> {
  try {
    await prisma.auditLog.create({
      data: {
        userId: entry.userId || null,
        role: entry.role || null,
        action: entry.action,
        entity: entry.entity,
        entityId: entry.entityId || null,
        oldValue: entry.oldValue ? (typeof entry.oldValue === 'string' ? entry.oldValue : JSON.stringify(entry.oldValue)) : null,
        newValue: entry.newValue ? (typeof entry.newValue === 'string' ? entry.newValue : JSON.stringify(entry.newValue)) : null,
        ipAddress: entry.ipAddress || null,
        device: entry.device || null,
      }
    });
  } catch (error) {
    console.error('Failed to create audit log:', error);
  }
}

// Audit action constants
export const AuditActions = {
  // Auth
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  PASSWORD_RESET: 'PASSWORD_RESET',
  PASSWORD_CHANGE: 'PASSWORD_CHANGE',

  // Profile
  PROFILE_UPDATE: 'PROFILE_UPDATE',
  PROFILE_PHOTO_UPDATE: 'PROFILE_PHOTO_UPDATE',

  // Documents
  DOCUMENT_UPLOAD: 'DOCUMENT_UPLOAD',
  DOCUMENT_DELETE: 'DOCUMENT_DELETE',
  DOCUMENT_VERIFY: 'DOCUMENT_VERIFY',
  DOCUMENT_REJECT: 'DOCUMENT_REJECT',
  DOCUMENT_REQUEST: 'DOCUMENT_REQUEST',

  // Payment
  PAYMENT_CREATE: 'PAYMENT_CREATE',
  PAYMENT_COMPLETE: 'PAYMENT_COMPLETE',
  PAYMENT_FAIL: 'PAYMENT_FAIL',
  PAYMENT_REFUND: 'PAYMENT_REFUND',

  // Visa Application
  APPLICATION_CREATE: 'APPLICATION_CREATE',
  APPLICATION_UPDATE: 'APPLICATION_UPDATE',
  APPLICATION_SUBMIT: 'APPLICATION_SUBMIT',
  APPLICATION_REVIEW: 'APPLICATION_REVIEW',
  APPLICATION_APPROVE: 'APPLICATION_APPROVE',
  APPLICATION_REJECT: 'APPLICATION_REJECT',
  APPLICATION_STATUS_CHANGE: 'APPLICATION_STATUS_CHANGE',

  // Appointment
  APPOINTMENT_CREATE: 'APPOINTMENT_CREATE',
  APPOINTMENT_UPDATE: 'APPOINTMENT_UPDATE',
  APPOINTMENT_CANCEL: 'APPOINTMENT_CANCEL',
  APPOINTMENT_COMPLETE: 'APPOINTMENT_COMPLETE',
  APPOINTMENT_RESCHEDULE: 'APPOINTMENT_RESCHEDULE',

  // Admin
  USER_CREATE: 'USER_CREATE',
  USER_UPDATE: 'USER_UPDATE',
  USER_DELETE: 'USER_DELETE',
  USER_ACTIVATE: 'USER_ACTIVATE',
  USER_DEACTIVATE: 'USER_DEACTIVATE',
  ROLE_CHANGE: 'ROLE_CHANGE',

  // System
  SETTINGS_UPDATE: 'SETTINGS_UPDATE',
  DATABASE_BACKUP: 'DATABASE_BACKUP',
  DATABASE_RESTORE: 'DATABASE_RESTORE',
  VISA_TYPE_CREATE: 'VISA_TYPE_CREATE',
  VISA_TYPE_UPDATE: 'VISA_TYPE_UPDATE',
  VISA_TYPE_DELETE: 'VISA_TYPE_DELETE',
  COUNTRY_CREATE: 'COUNTRY_CREATE',
  COUNTRY_UPDATE: 'COUNTRY_UPDATE',
  COUNTRY_DELETE: 'COUNTRY_DELETE',
  NOTIFICATION_SEND: 'NOTIFICATION_SEND',
  REPORT_GENERATE: 'REPORT_GENERATE',
} as const;

export type AuditAction = typeof AuditActions[keyof typeof AuditActions];
