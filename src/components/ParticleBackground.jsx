import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────
// Lightweight floating-particle background — small dots drifting slowly
// across the screen, wrapping around edges. Sits behind all content (very
// low z-index, pointer-events:none) so it adds atmosphere without ever
// getting in the way of anything clickable.
// ─────────────────────────────────────────────────────────────────────────
const PARTICLE_COUNT = 60;
const MAX_SPEED = 0.15;
const MAX_RADIUS = 3.2; // slightly bigger

// Shooting stars: fast diagonal streaks with a fading trail, spawned
// frequently — separate system from the slow floating dots.
const SHOOTING_STAR_MIN_GAP_MS = 500;
const SHOOTING_STAR_MAX_GAP_MS = 1800;
const SHOOTING_STAR_SPEED_MIN = 9;
const SHOOTING_STAR_SPEED_MAX = 15;
const SHOOTING_STAR_TRAIL_LENGTH = 140;
const SHOOTING_STAR_BURST_CHANCE = 0.3; // chance of spawning 2 at once instead of 1

function spawnShootingStar(width, height) {
  // Start somewhere along the top or right edge, travel down-left.
  const fromTop = Math.random() < 0.6;
  const x = fromTop ? Math.random() * width : width + 20;
  const y = fromTop ? -20 : Math.random() * height * 0.5;
  const angle = Math.PI * (0.65 + Math.random() * 0.15); // down-left diagonal
  const speed = SHOOTING_STAR_SPEED_MIN + Math.random() * (SHOOTING_STAR_SPEED_MAX - SHOOTING_STAR_SPEED_MIN);
  return {
    x, y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
  };
}

const PARALLAX_EASE = 0.08; // how quickly the field visually catches up to the target offset
const SCROLL_PARALLAX_FACTOR = 0.5; // fraction of each scrolled pixel the field travels — no decay, this is continuous

export default function ParticleBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // Scroll-driven parallax: the particle field's offset tracks the page's
    // absolute scroll position continuously (inverted — scrolling down
    // pushes the field up, scrolling up pushes it down). No decay/spring —
    // it keeps traveling for as long as you scroll, like a real background
    // layer moving with the page rather than a one-off nudge.
    let targetParallaxY = -window.scrollY * SCROLL_PARALLAX_FACTOR;
    let parallaxY = targetParallaxY;
    const onScroll = () => {
      targetParallaxY = -window.scrollY * SCROLL_PARALLAX_FACTOR;
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Track whether the hero section is in view, so floating dots can be
    // hidden there (hero shows only images + shooting stars) while shooting
    // stars keep spawning everywhere regardless of section.
    let heroInView = true;
    const heroEl = document.getElementById('hero');
    let heroObserver;
    if (heroEl) {
      heroObserver = new IntersectionObserver(
        ([entry]) => { heroInView = entry.isIntersecting; },
        { threshold: 0.15 }
      );
      heroObserver.observe(heroEl);
    } else {
      heroInView = false;
    }

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const colors = ['255,107,53', '6,255,165', '6,182,212', '168,85,247'];
    const particles = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      vx: (Math.random() - 0.5) * MAX_SPEED,
      vy: (Math.random() - 0.5) * MAX_SPEED,
      r: Math.random() * MAX_RADIUS + 0.9,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: Math.random() * 0.4 + 0.45,
    }));

    let shootingStars = [];
    let nextStarAt = performance.now() + SHOOTING_STAR_MIN_GAP_MS;

    let rafId;
    const tick = (now) => {
      ctx.clearRect(0, 0, width, height);

      // Ease the parallax offset toward its target — the target itself is
      // driven directly by scroll position, so this just smooths jitter
      // rather than pulling the field back to center
      parallaxY += (targetParallaxY - parallaxY) * PARALLAX_EASE;

      // Floating dots — hidden in the hero section (hero shows only images
      // + shooting stars); positions still update underneath so nothing
      // jumps when the dots reappear past the hero.
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        if (heroInView) continue;

        const drawX = p.x;
        const drawY = ((p.y + parallaxY) % height + height) % height;
        ctx.beginPath();
        ctx.arc(drawX, drawY, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${p.color},${p.alpha})`;
        ctx.shadowColor = `rgba(${p.color},${p.alpha})`;
        ctx.shadowBlur = p.r * 3;
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // Spawn new shooting star(s) frequently, occasionally in a burst of 2
      if (now >= nextStarAt) {
        shootingStars.push(spawnShootingStar(width, height));
        if (Math.random() < SHOOTING_STAR_BURST_CHANCE) {
          shootingStars.push(spawnShootingStar(width, height));
        }
        nextStarAt = now + SHOOTING_STAR_MIN_GAP_MS + Math.random() * (SHOOTING_STAR_MAX_GAP_MS - SHOOTING_STAR_MIN_GAP_MS);
      }

      // Shooting stars: bright head + fading tail along its direction
      shootingStars.forEach(s => {
        s.x += s.vx;
        s.y += s.vy;
        s.life -= 0.012;

        const drawX = s.x;
        const drawY = s.y + parallaxY;
        const tailX = drawX - s.vx * (SHOOTING_STAR_TRAIL_LENGTH / Math.hypot(s.vx, s.vy));
        const tailY = drawY - s.vy * (SHOOTING_STAR_TRAIL_LENGTH / Math.hypot(s.vx, s.vy));

        const grad = ctx.createLinearGradient(drawX, drawY, tailX, tailY);
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * s.life})`);
        grad.addColorStop(0.4, `rgba(255,255,255,${0.35 * s.life})`);
        grad.addColorStop(1, 'rgba(255,255,255,0)');

        ctx.beginPath();
        ctx.moveTo(drawX, drawY);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = grad;
        ctx.lineWidth = 2;
        ctx.lineCap = 'round';
        ctx.stroke();

        // Bright core at the head
        ctx.beginPath();
        ctx.arc(drawX, drawY, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${s.life})`;
        ctx.shadowColor = 'rgba(255,255,255,.9)';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Drop dead/off-screen stars
      shootingStars = shootingStars.filter(s =>
        s.life > 0 && s.x > -SHOOTING_STAR_TRAIL_LENGTH && s.y < height + SHOOTING_STAR_TRAIL_LENGTH
      );

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', onScroll);
      if (heroObserver) heroObserver.disconnect();
    };
  }, []);

  return <canvas ref={canvasRef} className="particle-bg-canvas" style={{ zIndex: 1 }} />;
}