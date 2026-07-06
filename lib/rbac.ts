// Role-Based Access Control (RBAC) System

export type Role = 'APPLICANT' | 'OFFICER' | 'ADMIN';
export type Resource = 
  | 'users' | 'applicants' | 'officers' | 'admins'
  | 'applications' | 'documents' | 'payments' | 'appointments'
  | 'notifications' | 'countries' | 'visa_types' | 'required_documents'
  | 'audit_logs' | 'reports' | 'system_settings' | 'backup';

export type Action = 'create' | 'read' | 'update' | 'delete' | 'manage' | 'approve' | 'reject' | 'verify';

interface Permission {
  resource: Resource;
  actions: Action[];
}

const rolePermissions: Record<Role, Permission[]> = {
  APPLICANT: [
    { resource: 'applications', actions: ['create', 'read', 'update'] },
    { resource: 'documents', actions: ['create', 'read', 'delete'] },
    { resource: 'payments', actions: ['create', 'read'] },
    { resource: 'appointments', actions: ['read'] },
    { resource: 'notifications', actions: ['read', 'update'] },
    { resource: 'countries', actions: ['read'] },
    { resource: 'visa_types', actions: ['read'] },
    { resource: 'required_documents', actions: ['read'] },
    { resource: 'applicants', actions: ['read', 'update'] },
  ],
  OFFICER: [
    { resource: 'applications', actions: ['read', 'update', 'approve', 'reject'] },
    { resource: 'documents', actions: ['read', 'verify', 'reject'] },
    { resource: 'payments', actions: ['read'] },
    { resource: 'appointments', actions: ['create', 'read', 'update', 'delete'] },
    { resource: 'notifications', actions: ['create', 'read', 'update'] },
    { resource: 'countries', actions: ['read'] },
    { resource: 'visa_types', actions: ['read'] },
    { resource: 'required_documents', actions: ['read'] },
    { resource: 'applicants', actions: ['read'] },
    { resource: 'reports', actions: ['create', 'read'] },
  ],
  ADMIN: [
    { resource: 'users', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'applicants', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'officers', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'admins', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'applications', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'documents', actions: ['create', 'read', 'update', 'delete', 'manage', 'verify'] },
    { resource: 'payments', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'appointments', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'notifications', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'countries', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'visa_types', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'required_documents', actions: ['create', 'read', 'update', 'delete', 'manage'] },
    { resource: 'audit_logs', actions: ['read'] },
    { resource: 'reports', actions: ['create', 'read', 'delete'] },
    { resource: 'system_settings', actions: ['read', 'update', 'manage'] },
    { resource: 'backup', actions: ['create', 'read', 'manage'] },
  ],
};

export function checkPermission(role: string, resource: Resource, action: Action): boolean {
  const permissions = rolePermissions[role as Role];
  if (!permissions) return false;
  
  const resourcePermission = permissions.find(p => p.resource === resource);
  if (!resourcePermission) return false;
  
  return resourcePermission.actions.includes(action) || resourcePermission.actions.includes('manage');
}

export function getPermissionsForRole(role: string): Permission[] {
  return rolePermissions[role as Role] || [];
}

export function getAllowedActions(role: string, resource: Resource): Action[] {
  const permissions = rolePermissions[role as Role];
  if (!permissions) return [];
  
  const resourcePermission = permissions.find(p => p.resource === resource);
  return resourcePermission?.actions || [];
}

// Sidebar navigation items per role
export interface NavItem {
  label: string;
  href: string;
  icon: string;
  badge?: number;
}

export function getNavItems(role: string): NavItem[] {
  switch (role) {
    case 'APPLICANT':
      return [
        { label: 'Dashboard', href: '/applicant/dashboard', icon: '📊' },
        { label: 'My Profile', href: '/applicant/profile', icon: '👤' },
        { label: 'New Application', href: '/applicant/applications/new', icon: '📝' },
        { label: 'My Applications', href: '/applicant/applications', icon: '📋' },
        { label: 'Appointments', href: '/applicant/appointments', icon: '📅' },
        { label: 'Notifications', href: '/applicant/notifications', icon: '🔔' },
        { label: 'Documents', href: '/applicant/documents', icon: '📄' },
      ];
    case 'OFFICER':
      return [
        { label: 'Dashboard', href: '/officer/dashboard', icon: '📊' },
        { label: 'Applications', href: '/officer/applications', icon: '📋' },
        { label: 'Appointments', href: '/officer/appointments', icon: '📅' },
        { label: 'Reports', href: '/officer/reports', icon: '📈' },
      ];
    case 'ADMIN':
      return [
        { label: 'Dashboard', href: '/admin/dashboard', icon: '📊' },
        { label: 'Users', href: '/admin/users', icon: '👥' },
        { label: 'Applications', href: '/admin/applications', icon: '📋' },
        { label: 'Visa Types', href: '/admin/visa-types', icon: '🏷️' },
        { label: 'Countries', href: '/admin/countries', icon: '🌍' },
        { label: 'Documents', href: '/admin/required-documents', icon: '📄' },
        { label: 'Appointments', href: '/admin/appointments', icon: '📅' },
        { label: 'Payments', href: '/admin/payments', icon: '💳' },
        { label: 'Notifications', href: '/admin/notifications', icon: '🔔' },
        { label: 'Reports', href: '/admin/reports', icon: '📈' },
        { label: 'Audit Logs', href: '/admin/audit-logs', icon: '📝' },
        { label: 'Settings', href: '/admin/settings', icon: '⚙️' },
        { label: 'Backup', href: '/admin/backup', icon: '💾' },
        { label: 'Roles', href: '/admin/roles', icon: '🔐' },
      ];
    default:
      return [];
  }
}
