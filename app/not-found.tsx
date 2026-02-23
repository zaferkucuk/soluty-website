import Link from 'next/link';

export default function NotFound() {
  return (
    <html lang="de">
      <body
        style={{
          fontFamily: "'DM Sans', system-ui, sans-serif",
          backgroundColor: '#FCFCFC',
          color: '#32302F',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '100vh',
          margin: 0,
          padding: '24px',
        }}
      >
        <div style={{ textAlign: 'center', maxWidth: '480px' }}>
          <h1
            style={{
              fontFamily: "'Crimson Pro', Georgia, serif",
              fontSize: '48px',
              fontWeight: 400,
              marginBottom: '16px',
            }}
          >
            404
          </h1>
          <p
            style={{
              fontSize: '18px',
              color: '#5C5A58',
              lineHeight: 1.6,
              marginBottom: '32px',
            }}
          >
            Diese Seite wurde nicht gefunden.
          </p>
          <Link
            href="/de"
            style={{
              display: 'inline-block',
              padding: '12px 32px',
              backgroundColor: '#32302F',
              color: '#FFFFFF',
              borderRadius: '8px',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: 500,
            }}
          >
            Zur Startseite
          </Link>
        </div>
      </body>
    </html>
  );
}
