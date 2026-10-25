import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import ResumeModal from './ResumeModal';

const links = [
  { href: '#about',    label: 'About'    },
  { href: '#skills',   label: 'Skills'   },
  { href: '#projects', label: 'Projects' },
  { href: '#academics',label: 'Academics'},
  { href: '#certs',    label: 'Certs'    },
  { href: '#social',   label: 'Social'   },
  { href: '#contact',  label: 'Contact'  },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [resumeOpen, setResumeOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (!isHome) {
      // Navigate home first, then scroll
      window.location.href = '/' + href;
      return;
    }
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <nav style={scrolled ? { background: 'rgba(4,5,15,.9)' } : {}}>
        <Link to="/" className="nav-logo">Arun<span>Das</span></Link>

        <div className="nav-links">
          {isHome && links.map(l => (
            <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); handleNavClick(l.href); }}>
              {l.label}
            </a>
          ))}
          {!isHome && (
            <Link to="/" style={{ fontSize: '.75rem', fontWeight: 500, color: 'var(--muted)', textDecoration: 'none' }}>
              ← Back to Portfolio
            </Link>
          )}
        </div>

        <button type="button" className="nav-cta" onClick={() => setResumeOpen(true)} style={{ border: 'none', cursor: 'pointer' }}>
          <i className="fas fa-download"></i> Resume
        </button>

        <button className="nav-ham" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span style={menuOpen ? { transform: 'rotate(45deg) translate(5px,5px)' } : {}} />
          <span style={menuOpen ? { opacity: 0 } : {}} />
          <span style={menuOpen ? { transform: 'rotate(-45deg) translate(5px,-5px)' } : {}} />
        </button>
      </nav>

      <div className={`mobile-menu ${menuOpen ? 'open' : ''}`}>
        {isHome && links.map(l => (
          <a key={l.href} href={l.href} onClick={e => { e.preventDefault(); handleNavClick(l.href); }}>
            {l.label}
          </a>
        ))}
        {!isHome && (
          <Link to="/" onClick={() => setMenuOpen(false)}>← Back to Portfolio</Link>
        )}
        <a href="#resume" onClick={e => { e.preventDefault(); setMenuOpen(false); setResumeOpen(true); }} style={{ color: 'var(--orange)' }}>
          <i className="fas fa-download" style={{ marginRight: 8 }}></i>Download Resume
        </a>
      </div>
      <ResumeModal open={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
