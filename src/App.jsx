import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import YouTube from './sections/Vlogs';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Analytics from './components/Analytics';
import './App.css';

const sections = [
  { key: 'home', label: 'Home' },
  { key: 'about', label: 'About' },
  { key: 'projects', label: 'Projects' },
  { key: 'youtube', label: 'Videos' },
  { key: 'blogs', label: 'Blogs' },
  { key: 'contact', label: 'Contact' },
];

function App() {
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const projectsRef = useRef(null);
  const youtubeRef = useRef(null);
  const blogsRef = useRef(null);
  const contactRef = useRef(null);
  const [activeSection, setActiveSection] = useState('home');

  const sectionRefs = useMemo(
    () => ({
      home: homeRef,
      about: aboutRef,
      projects: projectsRef,
      youtube: youtubeRef,
      blogs: blogsRef,
      contact: contactRef,
    }),
    []
  );

  const handleNavigate = useCallback(
    (sectionKey) => {
      const target = sectionRefs[sectionKey]?.current;
      if (!target) return;

      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setActiveSection(sectionKey);
    },
    [sectionRefs]
  );

  useEffect(() => {
    const observedSections = sections
      .map((section) => sectionRefs[section.key]?.current)
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target?.dataset?.section) {
          setActiveSection(visible.target.dataset.section);
        }
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: '-20% 0px -45% 0px' }
    );

    observedSections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [sectionRefs]);

  return (
    <>
      <Analytics />
      <Navbar
        activeSection={activeSection}
        items={sections}
        onNavigate={handleNavigate}
      />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-8 sm:px-6">
        <Hero sectionRef={homeRef} onNavigate={handleNavigate} />
        <About sectionRef={aboutRef} />
        <Projects sectionRef={projectsRef} />
        <YouTube sectionRef={youtubeRef} />
        <Blog sectionRef={blogsRef} />
        <Contact sectionRef={contactRef} />
      </main>
    </>
  );
}

export default App;
