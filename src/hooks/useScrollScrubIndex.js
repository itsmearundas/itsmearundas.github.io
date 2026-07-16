import { useEffect, useRef, useState } from 'react';

/**
 * Maps scroll position to a frame index for scroll-scrubbed playback —
 * scrolling down moves forward through the frames, scrolling up moves
 * backward. Direction isn't tracked explicitly; it just falls out of
 * whether scroll progress is increasing or decreasing, which is more
 * robust than a manual "last direction" flag.
 *
 * Smoothness: instead of snapping straight to the scroll-computed frame
 * (which looks jumpy on fast trackpad/wheel scrolling), the displayed index
 * eases toward the target frame every animation frame (lerp). Raise
 * `smoothing` for a snappier feel, lower it for a dreamier, more delayed one.
 *
 * @param {number}  frameCount total number of frames in the sequence
 * @param {object}  options
 * @param {boolean} options.active     pause/resume without unmounting
 * @param {number}  options.smoothing  0–1 lerp factor per animation frame
 * @param {number}  options.startOffset pixel offset (e.g. hero height) where
 *                                       scroll-scrubbing should begin
 */
export default function useScrollScrubIndex(
  frameCount,
  { active = true, smoothing = 0.12, startOffset = 0 } = {}
) {
  const [displayIndex, setDisplayIndex] = useState(0);
  const targetRef = useRef(0);
  const currentRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    if (!active || frameCount <= 1) return undefined;

    const computeTarget = () => {
      const doc = document.documentElement;
      const scrollableRange = Math.max(doc.scrollHeight - window.innerHeight - startOffset, 1);
      const progress = Math.min(Math.max((window.scrollY - startOffset) / scrollableRange, 0), 1);
      targetRef.current = progress * (frameCount - 1);
    };

    computeTarget();
    window.addEventListener('scroll', computeTarget, { passive: true });
    window.addEventListener('resize', computeTarget);

    const tick = () => {
      currentRef.current += (targetRef.current - currentRef.current) * smoothing;
      const rounded = Math.round(currentRef.current);
      setDisplayIndex((prev) => (prev !== rounded ? rounded : prev));
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('scroll', computeTarget);
      window.removeEventListener('resize', computeTarget);
      cancelAnimationFrame(rafRef.current);
    };
  }, [frameCount, active, smoothing, startOffset]);

  return displayIndex;
}
