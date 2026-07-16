import { useEffect, useState } from 'react';
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

  useEffect(() => {
    if (introImages.length === 0) {
      if (onComplete) onComplete();
      return undefined;
    }
    document.body.style.overflow = 'hidden';
    return undefined;
  }, [onComplete]);

  // Monitors playback. Moves to 'fading' and signals the ripple hook once it reaches the last frame.
  useEffect(() => {
    if (phase !== 'playing' || introImages.length === 0) return;

    if (introIndex === introImages.length - 1) {
      setPhase('fading');
      if (onComplete) onComplete();
    }
  }, [introIndex, phase, onComplete]);

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