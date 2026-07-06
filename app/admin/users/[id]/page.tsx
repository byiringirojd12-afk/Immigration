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