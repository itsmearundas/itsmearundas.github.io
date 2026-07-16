import { useRef } from 'react';
import { socialProfiles } from '../data/social';

// Simple grid, simple staggered fade-up reveal on scroll — no sticky pin,
// no scroll-scrubbed movement. 3D cursor tilt on hover kept (that's a
// hover interaction, not a scroll transition).
export default function SocialMedia() {
  return (
    <section className="section" id="social">
      <div className="sec-label">Online Presence</div>
      <div className="sec-title">Find Me <span className="grad3">Online</span></div>

      <div className="social-grid-auto">
        {socialProfiles.map((s, i) => (
          <SocialCard key={s.id} s={s} delayMs={Math.min(i * 110, 550)} />
        ))}
      </div>
    </section>
  );
}

function SocialCard({ s, delayMs }) {
  const tiltRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = tiltRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    const rotateY = (px - 0.5) * 18;
    const rotateX = (0.5 - py) * 18;
    el.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`;
    el.style.setProperty('--glare-x', `${px * 100}%`);
    el.style.setProperty('--glare-y', `${py * 100}%`);
    el.style.setProperty('--glare-o', '1');
  };

  const handleMouseLeave = () => {
    const el = tiltRef.current;
    if (!el) return;
    el.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
    el.style.setProperty('--glare-o', '0');
  };

  return (
    <a
      href={s.url}
      target={s.id === 'email' ? '_self' : '_blank'}
      rel="noreferrer"
      className="scrolly-card reveal"
      style={{ transitionDelay: `${delayMs}ms`, padding: 0 }}
    >
      <div
        ref={tiltRef}
        className="tilt-card"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        <div className="tilt-card-glare" />
        <ScreenshotArea s={s} />

        <div style={{ padding: '24px 24px', flex: 1 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 16 }}>
            <div style={{
              width: 46, height: 46,
              borderRadius: 13,
              background: s.iconBg,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem',
              flexShrink: 0,
            }}>
              <i className={s.icon} style={{ color: s.iconColor }} />
            </div>
            <div>
              <div style={{
                fontFamily: 'var(--display)',
                fontSize: '1rem',
                fontWeight: 700, color: 'var(--white)', lineHeight: 1.2,
              }}>{s.platform}</div>
              <div style={{
                fontSize: '.76rem',
                color: 'var(--orange)', fontFamily: 'var(--mono)', marginTop: 2,
              }}>{s.handle}</div>
            </div>
          </div>

          <p style={{
            fontSize: '.84rem', color: 'var(--muted)',
            lineHeight: 1.7, marginBottom: 16,
            display: '-webkit-box', WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical', overflow: 'hidden',
          }}>{s.description}</p>

          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: '.72rem', fontWeight: 700,
            color: 'var(--orange)', fontFamily: 'var(--display)', letterSpacing: '.04em',
          }}>
            {s.id === 'email' ? 'Email Me' : s.id === 'whatsapp' ? 'Chat' : 'Visit'}
            <i className="fas fa-arrow-right" style={{ fontSize: '.6rem' }} />
          </div>
        </div>
      </div>
    </a>
  );
}

/* All 6 cards try to load an image first.
   If the image is missing it falls back to the gradient placeholder. */
function ScreenshotArea({ s }) {
  return (
    <div style={{
      width: '100%', height: 130, overflow: 'hidden',
      borderBottom: '1px solid rgba(255,255,255,.06)',
      background: s.iconBg, position: 'relative',
    }}>
      <img
        src={s.screenshot}
        alt={s.platform}
        style={{
          width: '100%', height: '100%',
          objectFit: 'cover', objectPosition: 'top',
          display: 'block', position: 'relative', zIndex: 1,
        }}
        onError={e => { e.target.style.display = 'none'; }}
      />
      <div style={{
        position: 'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,.3) 100%)',
        pointerEvents: 'none',
      }} />
    </div>
  );
}