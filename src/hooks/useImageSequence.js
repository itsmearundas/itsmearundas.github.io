import { useEffect, useState } from 'react';

/**
 * Cycles through a list of image frames at a fixed interval — a simple
 * flipbook/video player. Frames are swapped directly (no crossfade) because
 * these are real sequential video frames; blending them would blur motion
 * instead of clarifying it.
 *
 * @param {string[]} images     ordered array of frame URLs
 * @param {number}   intervalMs time each frame stays on screen (ms).
 *                              e.g. 1000/24 ≈ 42ms for 24fps playback.
 * @param {boolean}  active     pause/resume playback without unmounting
 */
export default function useImageSequence(images, intervalMs = 83, active = true) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!active || images.length <= 1) return undefined;
    const id = setInterval(() => {
      setCurrentIndex((curr) => (curr + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(id);
  }, [images, intervalMs, active]);

  return currentIndex;
}
