import { useEffect, useRef, useState } from 'react';
import ImageSequenceLayer from './ImageSequenceLayer';
import useImageSequence from '../hooks/useImageSequence';

// ─────────────────────────────────────────────────────────────────────────
// Two folders now:
//   1. intro — src/assets/intro-sequence/ — used only by the separate
//      IntroSplash component, full-screen for the first few seconds
//      before dissolving into the hero below.
//   2. sequence — src/assets/sequence/ — ONE shared set of images used for
//      BOTH the hero and the rest of the page. Both phases play the exact
//      same continuous, timer-driven loop (see SEQUENCE_INTERVAL_MS below)
//      — no more scroll-scrubbing and no more separate hero-only images.
//      Scrolling only changes which section's content is on screen, not
//      which frame is showing.
//
// Vite auto-imports every image dropped into the folder — just add or
// remove files there, no code changes needed. Files play in alphabetical
// order, so prefix filenames (01-x.jpg, 02-y.jpg ...) to control the order.
// ─────────────────────────────────────────────────────────────────────────
const sequenceModules = import.meta.glob(
  '../assets/sequence/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true, import: 'default' }
);

const sequenceImages = Object.keys(sequenceModules).sort().map((k) => sequenceModules[k]);

// ── Playback: one continuous timer-driven loop, shared by hero + page ──
const SEQUENCE_INTERVAL_MS = 1000 / 10; // steady pace

// How long the hero ↔ page dissolve takes (scroll-triggered, unrelated to
// the intro handoff below). Applied as an inline transition so the
// crossfade is guaranteed regardless of external stylesheet timing.
const BLEND_DURATION_MS = 1200;
const BLEND_EASING = 'ease-in-out';

// ── Intro → hero handoff: water-ripple wave instead of a plain dissolve ──
// The hero layer sits behind IntroSplash from the very first frame, so
// IntroSplash's own fade-out is what visually "reveals" the hero — we
// don't control that timing here. What we *can* do from this file is run
// a one-time water-ripple distortion across the hero image during that
// same handoff window, so the reveal reads as a wave washing over the
// image rather than a flat dissolve.
//
// UPDATE: Hardcoded INTRO_DURATION_MS timer removed in favor of explicit 
// completion signals sent via the new `introFinished` prop.
const RIPPLE_DURATION_MS = 1400;
const RIPPLE_MAX_DISPLACEMENT = 45; // px-ish distortion strength at the ripple's peak

export default function BackgroundSequence({ introFinished }) {
  const [heroInView, setHeroInView] = useState(true);
  const displacementRef = useRef(null);

  useEffect(() => {
    const heroEl = document.getElementById('hero');
    if (!heroEl) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setHeroInView(entry.isIntersecting),
      { threshold: 0.15 }
    );
    observer.observe(heroEl);

    return () => observer.disconnect();
  }, []);

  // Fire the ripple once, timed precisely to the intro's actual completion.
  useEffect(() => {
    if (!introFinished) return undefined;

    let rafId;
    const start = performance.now();
    
    const animate = (now) => {
      const t = Math.min((now - start) / RIPPLE_DURATION_MS, 1);
      // Single wave pulse: rises then settles back to flat (sin curve
      // over 0→π gives a smooth up-and-back-down motion, ending at 0).
      const scale = Math.sin(t * Math.PI) * RIPPLE_MAX_DISPLACEMENT;
      if (displacementRef.current) {
        displacementRef.current.setAttribute('scale', scale.toFixed(2));
      }
      if (t < 1) rafId = requestAnimationFrame(animate);
    };
    rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(rafId);
    };
  }, [introFinished]);

  // One shared, continuously-playing index — always active, not tied to
  // scroll or cursor position, exactly like the old hero-only playback.
  const sequenceIndex = useImageSequence(sequenceImages, SEQUENCE_INTERVAL_MS, true);

  return (
    <div className="bg-sequence-root" style={{ zIndex: 0 }}>
      {/* Hidden SVG filter powering the intro→hero water-ripple */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <filter id="intro-hero-ripple">
          <feTurbulence type="fractalNoise" baseFrequency="0.012 0.04" numOctaves="2" seed="7" result="noise" />
          <feDisplacementMap
            ref={displacementRef}
            in="SourceGraphic"
            in2="noise"
            scale="0"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </svg>

      <div
        className={`bg-sequence-layer bg-sequence-layer--hero ${heroInView ? 'is-visible' : ''}`}
        style={{
          filter: 'contrast(1.12) url(#intro-hero-ripple)',
          opacity: heroInView ? 1 : 0,
          transition: `opacity ${BLEND_DURATION_MS}ms ${BLEND_EASING}`,
        }}
      >
        <ImageSequenceLayer images={sequenceImages} currentIndex={sequenceIndex} />
      </div>
      <div
        className={`bg-sequence-layer ${!heroInView ? 'is-visible' : ''}`}
        style={{
          opacity: !heroInView ? 1 : 0,
          transition: `opacity ${BLEND_DURATION_MS}ms ${BLEND_EASING}`,
        }}
      >
        <ImageSequenceLayer images={sequenceImages} currentIndex={sequenceIndex} />
      </div>
      <div className="bg-sequence-overlay" />
    </div>
  );
}