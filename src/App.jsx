import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import YouTube from './sections/Vlogs';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import './App.css';

const sections = [
  { key: 'home', label: 'Home', path: '/' },
  { key: 'projects', label: 'Projects', path: '/projects' },
  { key: 'youtube', label: 'Videos', path: '/videos' },
  { key: 'blogs', label: 'Blogs', path: '/blogs' },
  { key: 'contact', label: 'Contact', path: '/contact' },
];

function HomePage() {
  return (
    <>
      <Hero />
      <About />
    </>
  );
}

function App() {
  return (
    <>
      <Navbar items={sections} />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-8 sm:px-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/videos" element={<YouTube />} />
          <Route path="/blogs" element={<Blog />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>
    </>
  );
}

export default App;