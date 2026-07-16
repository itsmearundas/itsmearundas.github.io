import { useNavigate } from 'react-router-dom';
import { projects } from '../data/projects';

// Simple grid, simple staggered fade-up reveal on scroll — no sticky pin,
// no scroll-scrubbed movement.
export default function Projects() {
  const nav = useNavigate();

  return (
    <section className="section" id="projects">
      <div className="sec-label">Featured Projects</div>
      <div className="sec-title">Things I've <span>Built</span></div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <ProjCard key={p.id} p={p} delayMs={Math.min(i * 110, 550)} onClick={() => nav(`/project/${p.id}`)} />
        ))}
      </div>
    </section>
  );
}

function ProjCard({ p, delayMs, onClick }) {
  return (
    <div
      className="scrolly-card reveal"
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      style={{ cursor: 'pointer', position: 'relative', transitionDelay: `${delayMs}ms` }}
    >
      <div className={`proj-glow ${p.gradClass}`} />
      <span className={`proj-badge ${p.type === 'academic' ? 'academic' : 'personal'}`}>
        {p.type === 'academic' ? 'Academic' : 'Personal'}
      </span>

      <div className="proj-head">
        <div className={`proj-num ${p.gradClass}`}>{p.category}</div>
        <div className="proj-title">{p.title}</div>
        <p className="proj-tagline">{p.tagline}</p>
      </div>

      <div className="proj-body">
        <p className="proj-desc">{p.description}</p>

        <div className={`proj-tech ${p.gradClass}`}>
          {p.techStack.slice(0, 6).map(t => <span key={t}>{t}</span>)}
          {p.techStack.length > 6 && <span>+{p.techStack.length - 6}</span>}
        </div>

        <div className="proj-links">
          {p.github && (
            <a href={p.github} target="_blank" rel="noreferrer" className="proj-link outline" onClick={e => e.stopPropagation()}>
              <i className="fab fa-github" /> GitHub
            </a>
          )}
          {p.live && (
            <a href={p.live} target="_blank" rel="noreferrer" className={`proj-link fill ${p.gradClass}`} onClick={e => e.stopPropagation()}>
              <i className="fas fa-external-link-alt" /> Live
            </a>
          )}
          <span className="proj-cta">View Details <i className="fas fa-arrow-right" /></span>
        </div>
      </div>
    </div>
  );
}