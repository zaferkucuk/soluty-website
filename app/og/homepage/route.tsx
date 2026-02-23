import { ImageResponse } from 'next/og';

export const runtime = 'edge';

const COLORS = {
  bg: '#FCFCFC',
  text: '#32302F',
  textSecondary: '#5C5A58',
  brand: '#4DB6A0',
};

const MODULE_COLORS = [
  '#4DB6A0', '#32302F', '#5C5A58', '#4DB6A0',
  '#5C5A58', '#4DB6A0', '#32302F', '#5C5A58',
  '#4DB6A0', '#5C5A58', '#4DB6A0', '#32302F',
  '#32302F', '#4DB6A0', '#5C5A58', '#4DB6A0',
];

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          backgroundColor: COLORS.bg,
          padding: '60px',
          fontFamily: 'system-ui, sans-serif',
          position: 'relative',
        }}
      >
        {/* Main content area */}
        <div
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left side — text */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              maxWidth: '620px',
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                marginBottom: '40px',
              }}
            >
              <span
                style={{
                  fontSize: '32px',
                  fontWeight: 700,
                  color: COLORS.text,
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                Soluty
              </span>
              <span
                style={{
                  fontSize: '20px',
                  fontWeight: 400,
                  color: COLORS.textSecondary,
                  marginLeft: '8px',
                  fontFamily: 'system-ui, sans-serif',
                }}
              >
                GmbH
              </span>
            </div>

            {/* Headline */}
            <h1
              style={{
                fontSize: '52px',
                fontWeight: 400,
                color: COLORS.text,
                lineHeight: 1.15,
                margin: '0 0 20px 0',
                fontFamily: 'Georgia, serif',
              }}
            >
              Individuelle
              <br />
              ERP-Lösungen
            </h1>

            {/* Subline */}
            <p
              style={{
                fontSize: '20px',
                color: COLORS.textSecondary,
                margin: 0,
                fontFamily: 'system-ui, sans-serif',
              }}
            >
              Entwickelt in Deutschland · DSGVO-konform
            </p>
          </div>

          {/* Right side — decorative 4×4 grid */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '320px',
              height: '320px',
              gap: '12px',
            }}
          >
            {MODULE_COLORS.map((color, i) => (
              <div
                key={i}
                style={{
                  width: '68px',
                  height: '68px',
                  borderRadius: '12px',
                  backgroundColor: color,
                  opacity: 0.85,
                }}
              />
            ))}
          </div>
        </div>

        {/* Bottom accent line */}
        <div
          style={{
            width: '100%',
            height: '4px',
            backgroundColor: COLORS.brand,
            borderRadius: '2px',
            marginTop: '20px',
          }}
        />
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
