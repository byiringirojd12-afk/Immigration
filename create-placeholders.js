const fs = require('fs');
const path = require('path');

const routes = [
  'app/applicant/profile/page.tsx',
  'app/applicant/applications/new/page.tsx',
  'app/applicant/applications/page.tsx',
  'app/applicant/applications/[id]/page.tsx',
  'app/applicant/appointments/page.tsx',
  'app/applicant/notifications/page.tsx',
  'app/applicant/documents/page.tsx',
  
  'app/officer/applications/page.tsx',
  'app/officer/applications/[id]/page.tsx',
  'app/officer/appointments/page.tsx',
  'app/officer/reports/page.tsx',
  
  'app/admin/users/page.tsx',
  'app/admin/users/[id]/page.tsx',
  'app/admin/applications/page.tsx',
  'app/admin/visa-types/page.tsx',
  'app/admin/countries/page.tsx',
  'app/admin/required-documents/page.tsx',
  'app/admin/appointments/page.tsx',
  'app/admin/payments/page.tsx',
  'app/admin/notifications/page.tsx',
  'app/admin/reports/page.tsx',
  'app/admin/audit-logs/page.tsx',
  'app/admin/settings/page.tsx',
  'app/admin/backup/page.tsx',
  'app/admin/roles/page.tsx',
];

const standardTemplate = `
import React from 'react';

export default function Page() {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>System Module</h1>
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Under Development</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          This section is currently being integrated and will be available shortly.
        </p>
      </div>
    </div>
  );
}
`;

const dynamicTemplate = `
import React from 'react';

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>Detailed View</h1>
      <div className="card">
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>Record: {params.id}</h2>
        <p style={{ color: 'var(--text-secondary)' }}>
          This detail page is currently under development.
        </p>
      </div>
    </div>
  );
}
`;

routes.forEach(route => {
  const fullPath = path.join(__dirname, route);
  const dir = path.dirname(fullPath);
  
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  
  const template = route.includes('[id]') ? dynamicTemplate : standardTemplate;
  fs.writeFileSync(fullPath, template.trim());
});

console.log('All placeholder pages created successfully.');
