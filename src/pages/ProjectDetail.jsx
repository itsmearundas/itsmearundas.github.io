import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import { projects } from '../data/projects';

export default function ProjectDetail() {
  const { id } = useParams();
  const nav = useNavigate();
  const project = projects.find(p => p.id === id);
  const videoRef = useRef(null);
  const [vidErr, setVidErr] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  if (!project) {
    return (
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 16 }}>
        <h2 style={{ fontFamily: 'var(--display)', color: 'var(--white)' }}>Project not found</h2>
        <button className="btn-line" onClick={() => nav('/')}>← Back</button>
      </div>
    );
  }

  const p = project;
  const colors = {
    orange: { primary: '#ff6b35', grad: 'var(--grad)' },
    cyan:   { primary: '#06b6d4', grad: 'var(--grad2)' },
    purple: { primary: '#a855f7', grad: 'var(--grad3)' },
  };
  const col = colors[p.color] || colors.orange;

  return (
    <div className="proj-detail-page">

      {/* ── Back button — styled ── */}
      <button
        onClick={() => nav(-1)}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          marginBottom: 48,
          padding: '12px 24px',
          borderRadius: '100px',
          background: 'rgba(255,255,255,.05)',
          border: '1px solid rgba(255,255,255,.1)',
          color: 'var(--white)',
          fontFamily: 'var(--display)',
          fontSize: '.68rem',
          fontWeight: 700,
          letterSpacing: '.06em',
          cursor: 'pointer',
          transition: 'all .2s',
          backdropFilter: 'blur(12px)',
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = 'rgba(255,107,53,.12)';
          e.currentTarget.style.borderColor = 'rgba(255,107,53,.35)';
          e.currentTarget.style.color = 'var(--orange)';
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = 'rgba(255,255,255,.05)';
          e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)';
          e.currentTarget.style.color = 'var(--white)';
        }}
      >
        <span style={{
          width: 28, height: 28, borderRadius: '50%',
          background: 'linear-gradient(135deg,#ff6b35,#f59e0b)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '.7rem', color: '#000', flexShrink: 0,
        }}>
          <i className="fas fa-arrow-left" />
        </span>
        Back to Projects
      </button>

      {/* ── Title block ── */}
      <div style={{ marginBottom: 20 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          fontSize: '.62rem', fontWeight: 700, letterSpacing: '.14em',
          textTransform: 'uppercase', color: col.primary,
          marginBottom: 14,
        }}>
          <span style={{ width: 20, height: 2, background: col.grad, borderRadius: 2, display: 'inline-block' }} />
          {p.category}
        </div>
        <h1 className="proj-detail-title">{p.title}</h1>
        <p style={{ fontSize: '.9rem', color: 'var(--muted)', lineHeight: 1.75, maxWidth: 680, marginTop: 8 }}>{p.tagline}</p>
      </div>

      <div className="proj-detail-layout">
        {/* ── LEFT: Video + links ── */}
        <div className="proj-detail-left">
          <div className="video-wrap">
            {!vidErr ? (
              <video
                ref={videoRef}
                src={p.video}
                controls
                playsInline
                onError={() => setVidErr(true)}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div className="video-placeholder">
                <i className="fas fa-play-circle" />
                {p.video ? (
                  <p>Demo video coming soon.<br />Place <code style={{ fontSize: '.65rem', background: 'rgba(255,255,255,.08)', padding: '2px 6px', borderRadius: 4 }}>{p.video}</code> in the public folder.</p>
                ) : (
                  <p>Demo video coming soon.</p>
                )}
              </div>
            )}
          </div>

          {vidErr && p.screenshot && (
            <img
              src={p.screenshot}
              alt={p.title}
              onError={e => e.target.style.display = 'none'}
              style={{ width: '100%', borderRadius: 16, marginBottom: 20, border: '1px solid rgba(255,255,255,.08)' }}
            />
          )}

          {/* ── Action buttons ── */}
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 24 }}>
            {p.github ? (
              <a href={p.github} target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 22px', borderRadius: '100px',
                  background: 'rgba(255,255,255,.06)', border: '1px solid rgba(255,255,255,.12)',
                  color: 'var(--white)', fontFamily: 'var(--display)', fontSize: '.65rem',
                  fontWeight: 700, letterSpacing: '.04em', textDecoration: 'none',
                  transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,.1)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.22)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,.06)'; e.currentTarget.style.borderColor = 'rgba(255,255,255,.12)'; }}
              >
                <i className="fab fa-github" style={{ fontSize: '.9rem' }} /> GitHub Repository
              </a>
            ) : (
              <div style={{
                display: 'inline-flex', alignItems: 'center', gap: 8,
                padding: '12px 22px', borderRadius: '100px',
                background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)',
                color: 'var(--muted)', fontFamily: 'var(--display)', fontSize: '.65rem',
                fontWeight: 700, letterSpacing: '.04em',
              }}>
                <i className="fab fa-github" /> Private / Coming Soon
              </div>
            )}

            {p.live ? (
              <a href={p.live} target="_blank" rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '12px 22px', borderRadius: '100px',
                  background: col.grad, border: 'none',
                  color: '#000', fontFamily: 'var(--display)', fontSize: '.65rem',
                  fontWeight: 700, letterSpacing: '.04em', textDecoration: 'none',
                  transition: 'opacity .2s, transform .2s', boxShadow: `0 8px 24px rgba(255,107,53,.25)`,
                }}
                onMouseEnter={e => { e.currentTarget.style.opacity = '.9'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                onMouseLeave={e => { e.currentTarget.style.opacity = '1'; e.currentTarget.style.transform = 'none'; }}
              >
                <i className="fas fa-external-link-alt" /> Live Demo
              </a>
            ) : null}
          </div>

          {/* Results grid */}
          <div className="proj-results-grid">
            {p.results.map(r => (
              <div key={r.label} className="proj-result-card">
                <div className="proj-result-val" style={{ background: col.grad, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>{r.value}</div>
                <div className="proj-result-label">{r.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Details ── */}
        <div className="proj-detail-right">
          <div className="proj-meta">
            <div className="proj-meta-item"><i className="fas fa-calendar" style={{ color: col.primary }} /> {p.period}</div>
            <div className="proj-meta-item">
              <i className="fas fa-tag" style={{ color: col.primary }} />
              <span style={{
                padding: '3px 10px', borderRadius: '100px', fontSize: '.62rem', fontWeight: 700,
                background: p.type === 'academic' ? 'rgba(255,107,53,.1)' : 'rgba(168,85,247,.1)',
                border: `1px solid ${p.type === 'academic' ? 'rgba(255,107,53,.2)' : 'rgba(168,85,247,.2)'}`,
                color: p.type === 'academic' ? 'var(--orange)' : 'var(--purple)',
              }}>
                {p.type === 'academic' ? 'Academic Project' : 'Personal Project'}
              </span>
            </div>
          </div>

          <div className="gcard" style={{ padding: 28, marginBottom: 20 }}>
            <div className="proj-section-title" style={{ marginTop: 0, color: col.primary }}>Overview</div>
            <p style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.85 }}>{p.description}</p>
          </div>

          <div className="gcard" style={{ padding: 28, marginBottom: 20 }}>
            <div className="proj-section-title" style={{ marginTop: 0, color: col.primary }}>Key Features</div>
            <div className="proj-features">
              {p.features.map(f => (
                <div key={f} className="proj-feature">{f}</div>
              ))}
            </div>
          </div>

          <div className="gcard" style={{ padding: 28, marginBottom: 20 }}>
            <div className="proj-section-title" style={{ marginTop: 0, color: col.primary }}>Tech Stack</div>
            <div className="tech-grid">
              {p.techStack.map(t => (
                <span key={t} className="tech-chip">{t}</span>
              ))}
            </div>
          </div>

          {p.type === 'academic' && (
            <div className="gcard" style={{ padding: 28 }}>
              <div className="proj-section-title" style={{ marginTop: 0, color: col.primary }}>Project Report</div>
              <p style={{ fontSize: '.8rem', color: 'var(--muted)', marginBottom: 14, lineHeight: 1.7 }}>
                Full academic project report including literature review, system analysis, methodology, results and conclusions.
              </p>
              <a
                href={`/assets/reports/${p.id}-report.pdf`}
                target="_blank"
                rel="noreferrer"
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 8,
                  padding: '10px 20px', borderRadius: '100px',
                  background: 'rgba(231,76,60,.08)', border: '1px solid rgba(231,76,60,.2)',
                  color: '#e74c3c', fontFamily: 'var(--display)', fontSize: '.63rem',
                  fontWeight: 700, letterSpacing: '.04em', textDecoration: 'none',
                  transition: 'all .2s',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(231,76,60,.15)'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'rgba(231,76,60,.08)'; }}
              >
                <i className="fas fa-file-pdf" /> View Full Report (PDF)
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

