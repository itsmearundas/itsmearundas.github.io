import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import BackgroundSequence from './components/BackgroundSequence';
import ParticleBackground from './components/ParticleBackground';
import IntroSplash from './components/IntroSplash';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import ProjectDetail from './pages/ProjectDetail';

export default function App() {
  const location = useLocation();
  const [introDone, setIntroDone] = useState(false);

  // Re-run scroll reveal on route change.
  // Hero elements are deliberately skipped here — see the effect below.
  // Reason: the intro splash sits on top (z-index 300) for ~2.8s on first
  // load, but IntersectionObserver only checks geometric position in the
  // viewport, not what's stacked on top. Without this exclusion, the
  // hero's fade/slide/scale-in would trigger and finish while still fully
  // hidden behind the opaque splash — so by the time the splash faded
  // away, the hero was already sitting in its final state and the
  // animation was never actually seen.
  useEffect(() => {
    window.scrollTo(0, 0);
    setTimeout(() => {
      const obs = new IntersectionObserver(
        entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
        { threshold: 0.08 }
      );
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => {
        if (el.closest('#hero')) return;
        obs.observe(el);
      });
    }, 100);
  }, [location.pathname]);

  // Reveal the hero once the intro splash actually starts dissolving
  // (IntroSplash's onComplete fires right as it begins its own fade-out),
  // so the hero's entrance animation plays out as the splash clears —
  // instead of having already finished, invisibly, underneath it.
  useEffect(() => {
    if (!introDone) return;
    const t = setTimeout(() => {
      document.querySelectorAll('#hero .reveal, #hero .reveal-left, #hero .reveal-right')
        .forEach(el => el.classList.add('in'));
    }, 30);
    return () => clearTimeout(t);
  }, [introDone, location.pathname]);

  return (
    <>
      {/* Animated background */}
      <BackgroundSequence />

      {/* Floating particles, subtle, behind all content */}
      <ParticleBackground />

      {/* Full-screen intro splash — covers everything, including hero content, until it fades */}
      <IntroSplash onComplete={() => setIntroDone(true)} />

      {/* Nav */}
      <Navbar />

      {/* Scroll to top */}
      <ScrollToTop />

      {/* Routes */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </>
  );
}