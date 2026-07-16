import { useEffect, useRef } from 'react';

// With small sequences, preloading everything on mount is fine. But once a
// folder has hundreds of frames, firing off hundreds of concurrent image
// requests at once floods the browser and is exactly what makes playback
// feel stuck/stuttery instead of smooth. Instead, only a moving WINDOW of
// frames around the current one is kept warm — enough ahead to stay smooth
// during normal playback/scroll speed, plus a little behind for when
// scroll-scrubbing reverses direction.
const PRELOAD_AHEAD = 15;
const PRELOAD_BEHIND = 4;

/**
 * Renders one frame of an image sequence. Keeps a sliding window of nearby
 * frames preloaded (see above) instead of loading the whole sequence at
 * once, then just displays whichever index it's given — the caller decides
 * how the index advances (timer-based for the hero, scroll-based for the
 * page).
 */
export default function ImageSequenceLayer({ images, currentIndex }) {
  const loadedRef = useRef(new Set());

  useEffect(() => {
    if (!images.length) return;
    const center = Math.round(currentIndex);
    const start = Math.max(0, center - PRELOAD_BEHIND);
    const end = Math.min(images.length - 1, center + PRELOAD_AHEAD);

    for (let i = start; i <= end; i++) {
      if (!loadedRef.current.has(i)) {
        loadedRef.current.add(i);
        const img = new Image();
        img.src = images[i];
      }
    }
  }, [images, currentIndex]);

  if (!images.length) return null;

  return (
    <div className="img-seq-layer">
      <img src={images[currentIndex]} alt="" className="img-seq-frame" />
    </div>
  );
}
