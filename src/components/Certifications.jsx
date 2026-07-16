import { useState } from 'react';

const CERT_PASSKEY = '3#sad';

const certs = [
  {
    id: 'cloud-workshop',
    org: 'IIIT Kottayam × Educ Kshetra',
    name: 'Cloud Computing Workshop (5 Days)',
    date: 'August 2025',
    icon: 'fas fa-cloud',
    tags: ['AWS EC2', 'S3', 'IAM', 'Docker', 'CI/CD', 'VM Management'],
    desc: 'Intensive 5-day hands-on workshop covering AWS EC2, S3, IAM, Docker containerisation, CI/CD pipelines, and VM management.',
    cert: '/assets/certificates/cloud-workshop.pdf',
    protected: true,
  },
];

export default function Certifications() {
  const [modal, setModal] = useState(null);
  const [pdfFailed, setPdfFailed] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  // Passkey prompt state: which cert triggered it, and what action to run
  // once the correct passkey is entered ('view' or 'download').
  const [passkeyPrompt, setPasskeyPrompt] = useState(null);
  const [passkeyInput, setPasskeyInput] = useState('');
  const [passkeyError, setPasskeyError] = useState(false);

  const openModal = (c) => {
    setPdfFailed(false);
    setModal(c);
  };

  const closeModal = () => {
    setModal(null);
    setPdfFailed(false);
  };

  const requestAccess = (c, action) => {
    if (!c.protected || unlocked) {
      if (action === 'view') openModal(c);
      // 'download' falls through to the real <a href> link, nothing to do here
      return true;
    }
    setPasskeyInput('');
    setPasskeyError(false);
    setPasskeyPrompt({ cert: c, action });
    return false;
  };

  const submitPasskey = () => {
    if (passkeyInput === CERT_PASSKEY) {
      setUnlocked(true);
      const { cert, action } = passkeyPrompt;
      setPasskeyPrompt(null);
      if (action === 'view') openModal(cert);
      else if (action === 'download') {
        // Trigger the download programmatically now that we're unlocked
        const a = document.createElement('a');
        a.href = cert.cert;
        a.download = '';
        a.target = '_blank';
        a.rel = 'noreferrer';
        a.click();
      }
    } else {
      setPasskeyError(true);
    }
  };

  const closePasskeyPrompt = () => {
    setPasskeyPrompt(null);
    setPasskeyError(false);
  };

  return (
    <section className="section" id="certs">
      <div className="sec-label">Certifications</div>
      <div className="sec-title">Credentials &amp; <span>Achievements</span></div>

      <div className="certs-grid">
        {certs.map((c, i) => (
          <div
            key={c.id}
            className="cert-card reveal"
            style={{ transitionDelay: `${Math.min(i * 120, 480)}ms` }}
          >
            <div className="cert-glow" />
            {c.protected && !unlocked && (
              <div className="cert-lock-badge" title="Passkey protected">
                <i className="fas fa-lock" />
              </div>
            )}
            <div className="cert-icon"><i className={c.icon} /></div>
            <div className="cert-org">{c.org}</div>
            <div className="cert-name">{c.name}</div>
            <div className="cert-date">
              <i className="fas fa-calendar" style={{ marginRight: 6 }} />{c.date}
            </div>
            <p style={{ fontSize: '.78rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 14 }}>
              {c.desc}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 14 }}>
              {c.tags.map(t => (
                <span key={t} style={{
                  fontSize: '.62rem', padding: '4px 10px', borderRadius: '100px',
                  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.08)',
                  color: 'var(--muted)',
                }}>{t}</span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button className="cert-view-btn" onClick={() => requestAccess(c, 'view')}>
                <i className={c.protected && !unlocked ? 'fas fa-lock' : 'fas fa-eye'} /> View Certificate
              </button>
              <button
                className="cert-view-btn"
                onClick={(e) => {
                  if (!requestAccess(c, 'download')) return;
                  // already unlocked (or not protected) — proceed with real download
                  const a = document.createElement('a');
                  a.href = c.cert;
                  a.download = '';
                  a.target = '_blank';
                  a.rel = 'noreferrer';
                  a.click();
                }}
              >
                <i className={c.protected && !unlocked ? 'fas fa-lock' : 'fas fa-download'} /> Download
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* ── Passkey prompt ── */}
      {passkeyPrompt && (
        <div className="modal-overlay" onClick={closePasskeyPrompt} style={{ zIndex: 1000 }}>
          <div
            className="modal-box"
            onClick={e => e.stopPropagation()}
            style={{ maxWidth: 380, padding: '32px 28px' }}
          >
            <div style={{ textAlign: 'center', marginBottom: 20 }}>
              <div style={{
                width: 52, height: 52, borderRadius: '50%', margin: '0 auto 16px',
                background: 'rgba(255,107,53,.1)', border: '1px solid rgba(255,107,53,.2)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <i className="fas fa-lock" style={{ fontSize: '1.2rem', color: 'var(--orange)' }} />
              </div>
              <div style={{ fontFamily: 'var(--display)', fontSize: '1rem', fontWeight: 700, color: 'var(--white)', marginBottom: 6 }}>
                This document is protected
              </div>
              <div style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.6 }}>
                Enter the passkey to {passkeyPrompt.action === 'download' ? 'download' : 'view'} this certificate.
              </div>
            </div>

            <input
              type="password"
              value={passkeyInput}
              onChange={e => { setPasskeyInput(e.target.value); setPasskeyError(false); }}
              onKeyDown={e => e.key === 'Enter' && submitPasskey()}
              placeholder="Passkey"
              autoFocus
              style={{
                width: '100%', padding: '12px 16px', borderRadius: 12,
                background: 'rgba(255,255,255,.05)',
                border: `1px solid ${passkeyError ? 'rgba(231,76,60,.5)' : 'rgba(255,255,255,.1)'}`,
                color: 'var(--white)', fontSize: '.85rem', marginBottom: passkeyError ? 8 : 20,
                outline: 'none', boxSizing: 'border-box',
              }}
            />
            {passkeyError && (
              <div style={{ color: '#e74c3c', fontSize: '.72rem', marginBottom: 16 }}>
                Incorrect passkey — try again.
              </div>
            )}

            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={closePasskeyPrompt}
                style={{
                  flex: 1, padding: '11px 0', borderRadius: 100,
                  background: 'rgba(255,255,255,.04)', border: '1px solid rgba(255,255,255,.1)',
                  color: 'var(--muted)', fontSize: '.75rem', fontWeight: 700, cursor: 'pointer',
                }}
              >
                Cancel
              </button>
              <button
                onClick={submitPasskey}
                style={{
                  flex: 1, padding: '11px 0', borderRadius: 100,
                  background: 'var(--grad)', border: 'none',
                  color: '#000', fontSize: '.75rem', fontWeight: 700, cursor: 'pointer',
                }}
              >
                Unlock
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Modal ── */}
      {modal && (
        <div
          className="modal-overlay"
          onClick={closeModal}
          style={{ zIndex: 999 }}
        >
          <div
            className="modal-box"
            onClick={e => e.stopPropagation()}
            style={{ maxHeight: '90vh', display: 'flex', flexDirection: 'column' }}
          >
            {/* Header */}
            <div className="modal-head">
              <div className="modal-title">
                <i className="fas fa-certificate" style={{ color: 'var(--orange)' }} />
                {modal.name}
              </div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <a
                  href={modal.cert}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex', alignItems: 'center', gap: 6,
                    padding: '6px 14px', borderRadius: '100px',
                    background: 'rgba(255,107,53,.1)', border: '1px solid rgba(255,107,53,.2)',
                    color: 'var(--orange)', fontSize: '.62rem', fontWeight: 700,
                    textDecoration: 'none', transition: 'background .2s',
                  }}
                >
                  <i className="fas fa-external-link-alt" /> Open in New Tab
                </a>
                <button className="modal-close" onClick={closeModal}>
                  <i className="fas fa-times" />
                </button>
              </div>
            </div>

            {/* Body — iframe with sandbox, only loads if PDF exists */}
            <div style={{ flex: 1, position: 'relative', minHeight: 520, background: '#1a1a2e' }}>
              {!pdfFailed ? (
                <iframe
                  key={modal.cert}
                  src={`${modal.cert}#toolbar=0&navpanes=0&scrollbar=1&view=FitH`}
                  title={modal.name}
                  style={{ width: '100%', height: '100%', minHeight: 520, border: 'none', display: 'block' }}
                  onError={() => setPdfFailed(true)}
                  onLoad={e => {
                    // Detect if iframe loaded the React app instead of a PDF
                    // (happens when PDF file doesn't exist — server returns index.html)
                    try {
                      const ct = e.target.contentDocument?.contentType || '';
                      if (ct && !ct.includes('pdf')) setPdfFailed(true);
                    } catch (_) {
                      // cross-origin — can't check, assume ok
                    }
                  }}
                />
              ) : (
                // Clean fallback — never loads the React app
                <div style={{
                  display: 'flex', flexDirection: 'column', alignItems: 'center',
                  justifyContent: 'center', height: '100%', minHeight: 400, gap: 16, padding: 32,
                }}>
                  <div style={{
                    width: 64, height: 64, borderRadius: '50%',
                    background: 'rgba(231,76,60,.1)', border: '1px solid rgba(231,76,60,.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    <i className="fas fa-file-pdf" style={{ fontSize: '1.6rem', color: 'rgba(231,76,60,.6)' }} />
                  </div>
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontFamily: 'var(--display)', fontSize: '.85rem', fontWeight: 700, color: 'var(--white)', marginBottom: 8 }}>
                      Certificate not uploaded yet
                    </div>
                    <div style={{ fontSize: '.75rem', color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16 }}>
                      Place the PDF at:<br />
                      <code style={{
                        fontSize: '.68rem', background: 'rgba(255,255,255,.06)',
                        padding: '3px 10px', borderRadius: 6, color: 'var(--orange)',
                        display: 'inline-block', marginTop: 6,
                      }}>
                        public{modal.cert}
                      </code>
                    </div>
                    <a
                      href={modal.cert}
                      target="_blank"
                      rel="noreferrer"
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 8,
                        padding: '10px 20px', borderRadius: '100px',
                        background: 'rgba(255,107,53,.1)', border: '1px solid rgba(255,107,53,.2)',
                        color: 'var(--orange)', fontSize: '.7rem', fontWeight: 700,
                        textDecoration: 'none',
                      }}
                    >
                      <i className="fas fa-external-link-alt" /> Try opening directly
                    </a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}