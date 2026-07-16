import { projects } from '../data/projects';

const stats = [
  { value: String(projects.length), label: 'Projects Built', icon: 'fas fa-cube',        color: '#ff6b35' },
  { value: '30K',  label: 'Records Trained',   icon: 'fas fa-database',     color: '#06b6d4' },
  { value: '85%',  label: 'Best Accuracy',     icon: 'fas fa-bullseye',     color: '#a855f7' },
  { value: '5+',   label: 'Tech Stacks',       icon: 'fas fa-layer-group', color: '#06ffa5' },
];

const focuses = [
  { label: 'Machine Learning', icon: 'fas fa-brain',         color: '#a855f7' },
  { label: 'Deep Learning',    icon: 'fas fa-network-wired', color: '#ff6b35' },
  { label: 'Full-Stack Dev',   icon: 'fas fa-code',          color: '#06b6d4' },
  { label: 'REST APIs',        icon: 'fas fa-plug',          color: '#f59e0b' },
  { label: 'Data Analysis',    icon: 'fas fa-chart-bar',     color: '#06ffa5' },
  { label: 'Cloud (AWS)',      icon: 'fas fa-cloud',         color: '#0ea5e9' },
  { label: 'AI Engineering',   icon: 'fas fa-robot',         color: '#ec4899' },
];

const education = [
  { year: '2024 — 2026', degree: 'MCA', inst: 'MACE, Kothamangalam', uni: 'APJ Abdul Kalam Technological University', grade: '7.99 CGPA', color: '#ff6b35', status: 'Completed' },
  { year: '2021 — 2024', degree: 'BCA', inst: 'MES College, Nedumkandam', uni: 'Mahatma Gandhi University', grade: '6.36 CGPA', color: '#06b6d4', status: 'Completed' },
  { year: '2019 — 2021', degree: 'HSC', inst: 'St George HSS, Kattappana', uni: 'DHSE Kerala', grade: '', color: '#a855f7', status: 'Completed' },
  // { year: '2018 — 2019', degree: 'SSLC', inst: 'GHSS Kallar', uni: 'KBPE Kerala', grade: '', color: '#06ffa5', status: 'Completed' },
];

// Simple grid, staggered fade-up reveal on scroll — no scroll-driven
// movement, no sticky pin.
export default function About() {
  return (
    <section className="section" id="about">
      <div className="sec-label">About Me</div>
      <div className="sec-title">Who I <span>Am</span></div>

      <div className="bento-grid">
        <CardShell cols={7} delayMs={0}>
            <PhilosophyCard />
        </CardShell>

        <CardShell cols={5} delayMs={90}>
            <StatsCard />
        </CardShell>

        <CardShell cols={7} delayMs={180}>
            <StoryCard />
        </CardShell>

        <CardShell cols={5} delayMs={270}>
            <EducationCard />
        </CardShell>
      </div>
    </section>
  );
}

function CardShell({
    delayMs,
    cols = 6,
    children,
}) {
  return (
    <div
      className="scrolly-card reveal bento-card"
      style={{
      '--span': cols,
      padding:"30px 28px",
      position:"relative",
      transitionDelay:`${delayMs}ms`,
  }}
    >
      {children}
    </div>
  );
}

function PhilosophyCard() {
  return (
    <>
      <div style={{
        position: 'absolute', width: 240, height: 240, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(255,107,53,.12), transparent 70%)',
        top: -80, right: -60, pointerEvents: 'none',
      }} />
      <SectionLabel color="var(--orange)" icon="fas fa-quote-left">My Philosophy</SectionLabel>
      <div style={{
        fontFamily: 'var(--display)',
        fontSize: 'clamp(1.3rem, 2.2vw, 1.9rem)',
        fontWeight: 900, letterSpacing: '-.03em',
        color: 'var(--white)', lineHeight: 1.25, margin: '18px 0 20px',
      }}>
        I turn data into{' '}
        <span style={{ background: 'var(--grad)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>decisions</span>
        {' '}and ideas into{' '}
        <span style={{ background: 'var(--grad2)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>deployable systems.</span>
      </div>
      <p style={{ fontSize: '.85rem', color: 'var(--muted)', lineHeight: 1.9, fontWeight: 300 }}>
        MCA graduate from MACE, KTU — building at the intersection of machine learning and full-stack web development.
        From YOLOv8 pipelines to credit risk platforms to AI-powered self-awareness tools, I ship things that actually work.
      </p>
    </>
  );
}

function StatsCard() {
  return (
    <>
      <SectionLabel color="#06ffa5" icon="fas fa-chart-line">By The Numbers</SectionLabel>
      <div className="about-stats-grid">
        {stats.map(s => (
          <div key={s.label} style={{
            display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
            padding: '10px 10px', borderRadius: 16,
            background: s.color + '0a', border: `1px solid ${s.color}22`,
            transition: 'border-color .25s, transform .25s',
          }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = s.color + '50'; e.currentTarget.style.transform = 'translateY(-4px)'; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = s.color + '22'; e.currentTarget.style.transform = 'translateY(0)'; }}
          >
            {/* <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: s.color + '18', border: `1px solid ${s.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '.82rem', color: s.color, marginBottom: 14,
            }}>
              <i className={s.icon} />
            </div> */}
            <div style={{
              fontFamily: 'var(--display)', fontSize: '1.7rem',
              fontWeight: 900, letterSpacing: '-.03em', color: s.color, lineHeight: 1,
            }}>{s.value}</div>
            <div style={{ fontSize: '.65rem', color: 'var(--muted)', marginTop: 4, letterSpacing: '.04em' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </>
  );
}

function StoryCard() {
  return (
    <>
      <SectionLabel color="#06b6d4" icon="fas fa-user">Story</SectionLabel>
      <p style={{ fontSize: '.83rem', color: 'var(--muted)', lineHeight: 1.9, margin: '16px 0 22px' }}>
        I've built a two-stage deep learning pipeline combining YOLOv8 with EfficientNet-B0 for real-time object detection,
        an end-to-end credit risk prediction platform on 30,000 financial records, and InnerForge — an AI self-awareness tool
        powered by the Claude API.
        <br /><br />
        Outside projects I stay sharp with cloud workshops, competitive coding on LeetCode, and following the latest in AI research.
        Actively looking for internship or entry-level roles in software development, ML engineering, or data analysis.
      </p>

      <SectionLabel color="var(--orange)" icon="fas fa-crosshairs">Focus Areas</SectionLabel>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 14 }}>
        {focuses.map(f => (
          <div key={f.label} style={{
            display: 'inline-flex', alignItems: 'center', gap: 6,
            fontSize: '.7rem', fontWeight: 500,
            padding: '6px 14px', borderRadius: '100px',
            background: f.color + '10', border: `1px solid ${f.color}25`,
            color: f.color, transition: 'all .2s',
          }}
            onMouseEnter={e => { e.currentTarget.style.background = f.color + '22'; e.currentTarget.style.transform = 'scale(1.05)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = f.color + '10'; e.currentTarget.style.transform = 'scale(1)'; }}
          >
            <i className={f.icon} style={{ fontSize: '.62rem' }} /> {f.label}
          </div>
        ))}
      </div>
    </>
  );
}

function EducationCard() {
  return (
    <>
      <SectionLabel color="#a855f7" icon="fas fa-graduation-cap">Education</SectionLabel>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 18 }}>
        {education.map(e => (
          <div key={e.degree} style={{
            display: 'flex', gap: 12, alignItems: 'flex-start',
            padding: '15px 17px', borderRadius: 14,
            background: e.color + '08', border: `1px solid ${e.color}20`,
            transition: 'border-color .2s, transform .2s',
          }}
            onMouseEnter={el => { el.currentTarget.style.borderColor = e.color + '45'; el.currentTarget.style.transform = 'translateX(4px)'; }}
            onMouseLeave={el => { el.currentTarget.style.borderColor = e.color + '20'; el.currentTarget.style.transform = 'translateX(0)'; }}
          >
            <div style={{
              width: 38, height: 38, borderRadius: 10, flexShrink: 0,
              background: e.color + '18', border: `1px solid ${e.color}30`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontFamily: 'var(--display)', fontSize: '.55rem', fontWeight: 900,
              color: e.color, textAlign: 'center', lineHeight: 1.1,
            }}>{e.degree}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '.76rem', fontWeight: 700, color: 'var(--white)', marginBottom: 2 }}>{e.inst}</div>
              <div style={{ fontSize: '.64rem', color: 'var(--muted)', marginBottom: 6 }}>{e.uni}</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                <span style={{ fontSize: '.58rem', color: 'var(--muted)' }}>{e.year}</span>
                {e.grade && (
                  <span style={{
                    fontSize: '.58rem', fontWeight: 700, padding: '2px 8px',
                    borderRadius: '100px', background: e.color + '18', color: e.color,
                  }}>{e.grade}</span>
                )}
                <span style={{
                  fontSize: '.55rem', fontWeight: 700, padding: '2px 8px', borderRadius: '100px',
                  background: 'rgba(255,255,255,.06)', color: 'var(--muted)',
                }}>{e.status}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

function SectionLabel({ color, icon, children }) {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 8,
      fontSize: '.6rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color,
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: 6,
        background: color + '18', border: `1px solid ${color}30`,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '.58rem',
      }}>
        <i className={icon} />
      </div>
      {children}
    </div>
  );
}