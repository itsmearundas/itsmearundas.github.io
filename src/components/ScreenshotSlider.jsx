import { useState, useRef, useEffect, useCallback } from 'react';

export default function ScreenshotSlider({ images = [], title = '' }) {
  const [index, setIndex] = useState(0);
  const [failed, setFailed] = useState({});
  const touchX = useRef(null);

  const valid = images.filter(src => !failed[src]);
  const count = valid.length;

  useEffect(() => { setIndex(0); setFailed({}); }, [images.join('|')]);
  useEffect(() => { if (index >= count && count > 0) setIndex(count - 1); }, [count, index]);

  const go = useCallback(d => {
    if (count < 2) return;
    setIndex(i => (i + d + count) % count);
  }, [count]);

  const onKeyDown = e => {
    if (e.key === 'ArrowLeft') go(-1);
    if (e.key === 'ArrowRight') go(1);
  };
  const onTouchStart = e => { touchX.current = e.touches[0].clientX; };
  const onTouchEnd = e => {
    if (touchX.current == null) return;
    const dx = e.changedTouches[0].clientX - touchX.current;
    if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
    touchX.current = null;
  };

  if (count === 0) {
    return (
      <div className="screenshot-wrap">
        <div className="screenshot-placeholder">
          <i className="fas fa-image" />
          <p>Screenshots coming soon.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="screenshot-wrap slider" tabIndex={0} onKeyDown={onKeyDown} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <div className="slider-track" style={{ transform: `translateX(-${index * 100}%)` }}>
        {valid.map((src, i) => (
          <img
            key={src}
            src={src}
            alt={`${title} — screenshot ${i + 1} of ${count}`}
            draggable={false}
            onError={() => setFailed(f => ({ ...f, [src]: true }))}
          />
        ))}
      </div>

      {count > 1 && (
        <>
          <button className="slider-btn prev" onClick={() => go(-1)} aria-label="Previous screenshot"><i className="fas fa-chevron-left" /></button>
          <button className="slider-btn next" onClick={() => go(1)} aria-label="Next screenshot"><i className="fas fa-chevron-right" /></button>
          <div className="slider-count">{index + 1} / {count}</div>
          <div className="slider-dots">
            {valid.map((_, i) => (
              <button key={i} className={i === index ? 'active' : ''} onClick={() => setIndex(i)} aria-label={`Go to screenshot ${i + 1}`} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
