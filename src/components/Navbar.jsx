import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

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

        <a href="/assets/Arun_Das_Resume.pdf" className="nav-cta" download target="_blank" rel="noreferrer">
          <i className="fas fa-download"></i> Resume
        </a>

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
        <a href="/assets/Arun_Das_Resume.pdf" download style={{ color: 'var(--orange)' }}>
          <i className="fas fa-download" style={{ marginRight: 8 }}></i>Download Resume
        </a>
      </div>
    </>
  );
}
