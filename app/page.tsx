import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen" style={{ display: 'flex', flexDirection: 'column' }}>
      <header className="navbar" style={{ padding: '1rem 5%', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' }}>IMS Portal</div>
        <nav style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/login" className="btn btn-outline">Login</Link>
          <Link href="/register" className="btn btn-primary">Apply Now</Link>
        </nav>
      </header>

      <main style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem 1rem', textAlign: 'center' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1.5rem', fontWeight: 800 }}>
          Global Immigration Management
        </h1>
        <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', marginBottom: '2.5rem', lineHeight: 1.6 }}>
          A secure, efficient, and reliable platform for processing visa applications, 
          scheduling interviews, and managing immigration workflows globally.
        </p>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <Link href="/register" className="btn btn-primary" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
            Start Visa Application
          </Link>
          <Link href="/login" className="btn btn-outline" style={{ padding: '0.75rem 2rem', fontSize: '1.1rem' }}>
            Track Application
          </Link>
        </div>

        <div className="grid grid-cols-3" style={{ marginTop: '5rem', gap: '2rem', maxWidth: '1000px', textAlign: 'left', display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))' }}>
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Streamlined Process</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Apply for your visa online, upload required documents, and pay securely in one place.</p>
          </div>
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Secure & Confidential</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Your personal data is protected with enterprise-grade security and encryption.</p>
          </div>
          <div className="card">
            <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Real-time Tracking</h3>
            <p style={{ color: 'var(--text-secondary)' }}>Get instant updates on your application status via notifications and email.</p>
          </div>
        </div>
      </main>

      <footer style={{ padding: '2rem', textAlign: 'center', borderTop: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
        <p>&copy; {new Date().getFullYear()} Immigration Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
