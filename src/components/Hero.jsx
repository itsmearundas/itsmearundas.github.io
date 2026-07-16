import { useEffect, useRef } from 'react';
import { projects } from '../data/projects';

const dataChars = '01АЯMLAIフPYRSデータ01FNNRFXYZabXOR10'.split('');

export default function Hero() {
  const sceneRef = useRef(null);
  const cardRef  = useRef(null);
  const holoRef  = useRef(null);
  const dsRef    = useRef(null);

  // Data stream chars
  useEffect(() => {
    const ds = dsRef.current;
    if (!ds) return;
    for (let i = 0; i < 28; i++) {
      const el = document.createElement('div');
      el.className = 'ds-char';
      el.textContent = dataChars[Math.floor(Math.random() * dataChars.length)];
      el.style.animationDelay    = `${(i * 0.15) % 3}s`;
      el.style.animationDuration = `${2.5 + Math.random() * 2}s`;
      ds.appendChild(el);
    }
    return () => { if (ds) ds.innerHTML = ''; };
  }, []);

  // 3D tilt on photo
  useEffect(() => {
    const scene = sceneRef.current;
    const card  = cardRef.current;
    const holo  = holoRef.current;
    if (!scene || !card) return;
    const onMove = (e) => {
      const r = scene.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width  - 0.5;
      const y = (e.clientY - r.top)  / r.height - 0.5;
      card.style.transform = `rotateX(${y * 18}deg) rotateY(${-x * 18}deg) scale(1.02)`;
      if (holo) {
        holo.style.background = `radial-gradient(circle at ${(x+.5)*100}% ${(y+.5)*100}%, rgba(255,255,255,.18) 0%, rgba(255,107,53,.12) 20%, rgba(6,255,165,.1) 40%, transparent 65%)`;
      }
    };
    const onLeave = () => {
      card.style.transform = 'rotateX(0deg) rotateY(0deg) scale(1)';
      if (holo) holo.style.background = '';
    };
    scene.addEventListener('mousemove', onMove);
    scene.addEventListener('mouseleave', onLeave);
    return () => {
      scene.removeEventListener('mousemove', onMove);
      scene.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  return (
    <section id="hero">
      {/* ── Left content ── */}
      <div className="hero-left">
        <div className="hero-eyebrow reveal" style={{ transitionDelay: '0ms' }}>
          <div className="pulse" />
          Available for &amp; Opportunities
        </div>

        <h1 className="hero-title reveal" style={{ transitionDelay: '120ms' }}>
          Arun<br />
          <span className="grad">Das.</span>
        </h1>

        <p className="hero-desc reveal" style={{ transitionDelay: '260ms' }}>
          MCA'26 graduate from MACE, KTU — passionate about AI-driven solutions and full-stack web development.
          I build intelligent systems that solve real problems.
        </p>

        <div className="hero-btns reveal" style={{ transitionDelay: '380ms' }}>
          <a href="#projects" className="btn-fill"
            onClick={e => { e.preventDefault(); document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' }); }}>
            View Projects <i className="fas fa-arrow-right" />
          </a>
          <a href="#contact" className="btn-line"
            onClick={e => { e.preventDefault(); document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' }); }}>
            Get In Touch
          </a>
        </div>

        <div className="hero-facts">
          <div className="hero-fact reveal-left" style={{ transitionDelay: '480ms' }}><i className="fas fa-map-marker-alt" /> Kattappana, Idukki, Kerala</div>
          <div className="hero-fact reveal-left" style={{ transitionDelay: '540ms' }}><i className="fas fa-code" /> Python · React · Flask</div>
          <div className="hero-fact reveal-left" style={{ transitionDelay: '600ms' }}><i className="fas fa-brain" /> YOLOv8 · EfficientNet · Random Forest</div>
          <div className="hero-fact reveal-left" style={{ transitionDelay: '660ms' }}><i className="fas fa-bolt" /> 85.41% Accuracy · 43 FPS</div>
        </div>

        <div className="hero-stats">
          <div className="stat-pill reveal" style={{ transitionDelay: '740ms' }}><span className="n">{projects.length}</span><span className="l">Projects</span></div>
          <div className="stat-pill reveal" style={{ transitionDelay: '800ms' }}><span className="n">30K</span><span className="l">Records Trained</span></div>
          <div className="stat-pill reveal" style={{ transitionDelay: '860ms' }}><span className="n">85%</span><span className="l">Best Accuracy</span></div>
          <div className="stat-pill reveal" style={{ transitionDelay: '920ms' }}><span className="n">5+</span><span className="l">Tech Stacks</span></div>
        </div>
      </div>

      {/* ── Photo Scene ── */}
      <div className="photo-scene reveal-right" id="photoScene" ref={sceneRef} style={{ transitionDelay: '200ms' }}>
        <div className="photo-card" ref={cardRef}>
          <div className="photo-edge-glow" />
          <div className="photo-clipped" id="photoClip">
            <img src="/assets/img/me.jpg" alt="Arun Das"
              onError={e => { e.target.style.display = 'none'; }} />
            <div className="photo-scan" />
          </div>
          <div className="photo-holo" ref={holoRef} />
        </div>

        {/* Orbit chips — all tucked inside scene bounds */}
        <div className="orbit-wrap">
          <div className="orbit-chip oc-1"><i className="fab fa-python" /> Python</div>
          <div className="orbit-chip oc-2"><i className="fas fa-brain" /> YOLOv8</div>
          <div className="orbit-chip oc-3"><i className="fab fa-react" /> React.js</div>
          <div className="orbit-chip oc-4"><i className="fas fa-flask" /> Flask</div>
        </div>

        <div className="data-stream" ref={dsRef} />

        {/* Name tag — moved inside scene (above bottom edge) */}
        <div className="name-tag">
          <div className="nt-name">Arun Das</div>
          <div className="nt-title">MCA'26 Graduate · AI &amp; Full-Stack</div>
          <div className="nt-status"><div className="nt-dot" /> Available Now</div>
        </div>
      </div>
    </section>
  );
}