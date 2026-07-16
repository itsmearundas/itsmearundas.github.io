import { useEffect, useRef } from 'react';
import Hero from '../components/Hero';
import About from '../components/About';
import Skills from '../components/Skills';
import Projects from '../components/Projects';
import Academics from '../components/Academics';
import Certifications from '../components/Certifications';
import SocialMedia from '../components/SocialMedia';
import Contact from '../components/Contact';

export default function Home() {
  const pageRef = useRef(null);

  // Global scroll reveal
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll('.reveal, .reveal-left, .reveal-right').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={pageRef}>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Academics />
      <Certifications />
      <SocialMedia />
      <Contact />
    </div>
  );
}
