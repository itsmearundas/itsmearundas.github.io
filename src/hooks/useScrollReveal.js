import { useEffect, useRef } from 'react';

export default function useScrollReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in');
          obs.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    // Observe all .reveal, .reveal-left, .reveal-right children
    const targets = el.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    if (el.classList.contains('reveal') || el.classList.contains('reveal-left') || el.classList.contains('reveal-right')) {
      obs.observe(el);
    }
    targets.forEach(t => obs.observe(t));

    return () => obs.disconnect();
  }, []);

  return ref;
}
