import { useEffect, useRef } from 'react';

export default function CustomCursor() {
  const dotRef  = useRef(null);
  const ringRef = useRef(null);
  const mouse   = useRef({ x: -200, y: -200 });
  const ring    = useRef({ x: -200, y: -200 });
  const isHover = useRef(false);
  const raf     = useRef(null);

  useEffect(() => {
    // Track mouse instantly — no state, no re-renders
    const onMove = (e) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };

    // Hover state for interactive elements
    const onEnter = () => { isHover.current = true; };
    const onLeave = () => { isHover.current = false; };

    const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select, label');
    interactives.forEach(el => {
      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mouseleave', onLeave);
    });

    // Use MutationObserver to catch dynamically added elements
    const observer = new MutationObserver(() => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
        el.addEventListener('mouseenter', onEnter);
        el.addEventListener('mouseleave', onLeave);
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener('mousemove', onMove, { passive: true });

    // RAF loop — no CSS transitions on cursor elements at all
    const loop = () => {
      const dot  = dotRef.current;
      const rng  = ringRef.current;
      const mx   = mouse.current.x;
      const my   = mouse.current.y;

      // Dot: instant (lag-free)
      if (dot) {
        dot.style.transform = `translate(${mx}px, ${my}px)`;
      }

      // Ring: smooth lerp — factor 0.15 gives trail without CSS transition lag
      ring.current.x += (mx - ring.current.x) * 0.15;
      ring.current.y += (my - ring.current.y) * 0.15;

      if (rng) {
        rng.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px)`;
        // Scale on hover via direct style — faster than class toggle
        if (isHover.current) {
          dot.style.width  = '20px';
          dot.style.height = '20px';
          dot.style.top    = '-10px';
          dot.style.left   = '-10px';
          rng.style.width  = '54px';
          rng.style.height = '54px';
          rng.style.top    = '-27px';
          rng.style.left   = '-27px';
          rng.style.borderColor = 'rgba(255,107,53,.7)';
        } else {
          dot.style.width  = '12px';
          dot.style.height = '12px';
          dot.style.top    = '-6px';
          dot.style.left   = '-6px';
          rng.style.width  = '36px';
          rng.style.height = '36px';
          rng.style.top    = '-18px';
          rng.style.left   = '-18px';
          rng.style.borderColor = 'rgba(255,107,53,.4)';
        }
      }

      raf.current = requestAnimationFrame(loop);
    };

    raf.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener('mousemove', onMove);
      interactives.forEach(el => {
        el.removeEventListener('mouseenter', onEnter);
        el.removeEventListener('mouseleave', onLeave);
      });
      observer.disconnect();
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}
