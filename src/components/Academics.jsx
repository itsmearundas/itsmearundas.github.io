import { useState } from 'react';
import { academics } from '../data/academics';

function InlinePDF({ path, label }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="cert-pdf-wrap">
      <div className="cert-pdf-header">
        <div className="cert-pdf-title">
          <i className="fas fa-file-pdf" style={{ color: '#e74c3c' }} />
          {label}
        </div>

        <div className="cert-pdf-actions">
          <button
            className="cert-pdf-btn"
            onClick={() => setOpen(o => !o)}
          >
            <i className={`fas fa-${open ? 'eye-slash' : 'eye'}`} />
            {open ? 'Hide' : 'View Certificate'}
          </button>
        </div>
      </div>

      {open && (
        <object
          data={path}
          type="application/pdf"
          className="cert-pdf-frame"
        >
          <div
            style={{
              padding: 32,
              textAlign: 'center',
              background: 'rgba(255,255,255,.02)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 12,
            }}
          >
            <i
              className="fas fa-file-pdf"
              style={{
                fontSize: '2.5rem',
                color: 'rgba(231,76,60,.4)'
              }}
            />

            <p
              style={{
                fontSize: '.82rem',
                color: 'var(--muted)',
                lineHeight: 1.7
              }}
            >
              Certificate PDF not found.
              <br />
              Place{' '}
              <code
                style={{
                  fontSize: '.7rem',
                  background: 'rgba(255,255,255,.06)',
                  padding: '2px 8px',
                  borderRadius: 4
                }}
              >
                {path}
              </code>{' '}
              in the public folder.
            </p>

            <a
              href={path}
              target="_blank"
              rel="noreferrer"
              className="cert-pdf-btn"
            >
              <i className="fas fa-external-link-alt" /> Open in new tab
            </a>
          </div>
        </object>
      )}
    </div>
  );
}

const colorMap = {
  orange: {
    border: 'rgba(255,107,53,.15)',
    dot: 'var(--grad)',
    badge: {
      bg: 'rgba(255,107,53,.1)',
      border: 'rgba(255,107,53,.2)',
      color: 'var(--orange)'
    }
  },

  indigo: {
    border: 'rgba(99,102,241,.15)',
    dot: 'linear-gradient(135deg,#6366f1,#a855f7)',
    badge: {
      bg: 'rgba(99,102,241,.1)',
      border: 'rgba(99,102,241,.2)',
      color: '#818cf8'
    }
  },

  mint: {
    border: 'rgba(6,255,165,.12)',
    dot: 'var(--grad2)',
    badge: {
      bg: 'rgba(6,255,165,.08)',
      border: 'rgba(6,255,165,.2)',
      color: 'var(--mint)'
    }
  },

  amber: {
    border: 'rgba(245,158,11,.15)',
    dot: 'linear-gradient(135deg,#f59e0b,#f97316)',
    badge: {
      bg: 'rgba(245,158,11,.1)',
      border: 'rgba(245,158,11,.2)',
      color: 'var(--amber)'
    }
  },
};

export default function Academics() {
  return (
    <section className="section" id="academics">
      <div className="sec-label">Education</div>

      <div className="sec-title">
        Academic <span className="grad2">Journey</span>
      </div>

      <div className="academics-timeline">
        {academics.map((a, i) => {
          const col = colorMap[a.color] || colorMap.orange;

          return (
            <div key={a.id} className="acad-item reveal" style={{ transitionDelay: `${Math.min(i * 120, 480)}ms` }}>
              <div className="acad-year-col">
                <div className="acad-year-range">
                  {a.yearRange}
                </div>

                <div className="acad-duration">
                  {a.duration}
                </div>
              </div>

              <div
                className="acad-dot"
                style={{ background: col.dot }}
              />

              <div
                className="acad-card"
                style={{ borderColor: col.border }}
              >
                <div className="acad-degree">
                  {a.degree}
                </div>

                <div className="acad-inst">
                  {a.institution}
                </div>

                <div className="acad-uni">
                  {a.university}
                </div>

                <div className="acad-meta">
                  {a.grade && (
                    <div
                      className="acad-badge"
                      style={col.badge}
                    >
                      <i className="fas fa-star" /> {a.grade}
                    </div>
                  )}

                  <div
                    className="acad-badge"
                    style={{
                      background:
                        a.status === 'Pursuing'
                          ? 'rgba(6,255,165,.08)'
                          : 'rgba(255,255,255,.05)',

                      border: `1px solid ${
                        a.status === 'Pursuing'
                          ? 'rgba(6,255,165,.2)'
                          : 'rgba(255,255,255,.1)'
                      }`,

                      color:
                        a.status === 'Pursuing'
                          ? 'var(--mint)'
                          : 'var(--muted)',
                    }}
                  >
                    <i
                      className={`fas fa-${
                        a.status === 'Pursuing'
                          ? 'spinner fa-spin'
                          : 'check'
                      }`}
                    />

                    {a.status}
                  </div>
                </div>

                {/* Location */}
                <div className="acad-location">
                  <i className="fas fa-map-marker-alt" />

                  <div>
                    <div style={{ marginBottom: 4 }}>
                      {a.location.address}
                    </div>

                    <div style={{ lineHeight: 1.7 }}>
                      {a.location.description}
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        gap: 12,
                        marginTop: 8,
                        flexWrap: 'wrap'
                      }}
                    >
                      <a
                        href={a.location.mapUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 4,
                          fontSize: '.68rem',
                          color: 'var(--cyan)',
                          textDecoration: 'none'
                        }}
                      >
                        <i className="fas fa-map" />
                        View on Map
                      </a>

                      {a.location.website && (
                        <a
                          href={a.location.website}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: 4,
                            fontSize: '.68rem',
                            color: 'var(--mint)',
                            textDecoration: 'none'
                          }}
                        >
                          <i className="fas fa-globe" />
                          Official Website
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                {a.highlights && a.highlights.length > 0 && (
                  <div style={{ marginBottom: 20 }}>
                    <div
                      style={{
                        fontSize: '.65rem',
                        fontWeight: 700,
                        color: 'var(--muted)',
                        letterSpacing: '.08em',
                        textTransform: 'uppercase',
                        marginBottom: 10
                      }}
                    >
                      Highlights
                    </div>

                    {a.highlights.map(h => (
                      <div
                        key={h}
                        style={{
                          display: 'flex',
                          gap: 8,
                          fontSize: '.78rem',
                          color: 'var(--muted)',
                          marginBottom: 6,
                          lineHeight: 1.5
                        }}
                      >
                        <span
                          style={{
                            color: 'var(--orange)',
                            flexShrink: 0
                          }}
                        >
                          →
                        </span>

                        {h}
                      </div>
                    ))}
                  </div>
                )}

                {/* Hide certificates for SSLC & HSC */}
                {a.degree !== 'Secondary School Leaving Certificate (SSLC / Class X)' &&
                 a.degree !== 'Higher Secondary Education (HSC / Class XII)' && (
                  <InlinePDF
                    path={a.certificatePath}
                    label={a.certificateLabel}
                  />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}