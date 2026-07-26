import { useEffect, useRef, useState } from 'react';
import ImageSequenceLayer from './ImageSequenceLayer';
import useImageSequence from '../hooks/useImageSequence';

// ─────────────────────────────────────────────────────────────────────────
// Full-screen image slideshow intro — no text. Plays through the images in
// src/assets/intro-sequence/ one by one, then fades into the hero. Locks
// page scroll while it plays so the hero/page content can't shift into
// view underneath it before it's actually done.
//
// If the folder is empty, this renders nothing and the site goes straight
// to the hero.
// ─────────────────────────────────────────────────────────────────────────
const introModules = import.meta.glob(
  '../assets/intro-sequence/*.{jpg,jpeg,png,webp,avif,gif}',
  { eager: true, import: 'default' }
);
const introImages = Object.keys(introModules).sort().map((k) => introModules[k]);

const INTRO_INTERVAL_MS = 1000 / 50; // ~3 images per second
const FADE_OUT_MS = 1100;           // small fade + blur dissolve duration

export default function IntroSplash({ onComplete }) {
  const [phase, setPhase] = useState(introImages.length === 0 ? 'done' : 'playing');
  const introIndex = useImageSequence(introImages, INTRO_INTERVAL_MS, phase === 'playing');

  // Keep a stable ref to the latest onComplete. BUG FIX: the effects below
  // used to depend on `onComplete` directly, but App passes a brand-new
  // inline function on every re-render (it re-renders on every route
  // change via useLocation). That made the scroll-lock effect re-fire on
  // every navigation — even long after the intro had finished — locking
  // `body { overflow: hidden }` back on with no matching cleanup, since by
  // then `phase` was already 'done' and never transitions again. Routing
  // the callback through a ref lets the effects below run mount-only.
  const onCompleteRef = useRef(onComplete);
  useEffect(() => { onCompleteRef.current = onComplete; }, [onComplete]);

  useEffect(() => {
    if (introImages.length === 0) {
      onCompleteRef.current?.();
      return undefined;
    }
    document.body.style.overflow = 'hidden';
    // Always restore scroll on unmount, even if the intro never finished
    // naturally — belt-and-suspenders so scroll can never get stuck.
    return () => { document.body.style.overflow = ''; };
  }, []); // mount-only — do not add onComplete here, see note above

  // Monitors playback. Moves to 'fading' and signals the ripple hook once it reaches the last frame.
  useEffect(() => {
    if (phase !== 'playing' || introImages.length === 0) return;

    if (introIndex === introImages.length - 1) {
      setPhase('fading');
      onCompleteRef.current?.();
    }
  }, [introIndex, phase]);

  useEffect(() => {
    if (phase !== 'fading') return undefined;
    const doneTimer = setTimeout(() => {
      setPhase('done');
      document.body.style.overflow = '';
    }, FADE_OUT_MS);
    return () => clearTimeout(doneTimer);
  }, [phase]);

  if (phase === 'done') return null;

  return (
    <div className={`intro-splash-slideshow ${phase === 'fading' ? 'is-fading' : ''}`}>
      <ImageSequenceLayer images={introImages} currentIndex={introIndex} />
      <div className="intro-splash-slideshow-overlay" />
    </div>
  );
}