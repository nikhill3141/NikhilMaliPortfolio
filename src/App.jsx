import Navbar from './components/Navbar';
import Hero from './sections/Hero';
import About from './sections/About';
import Projects from './sections/Projects';
import YouTube from './sections/Vlogs';
import Blog from './sections/Blog';
import Contact from './sections/Contact';
import Analytics from './components/Analytics';
import './App.css';


function App() {
  return (
    <>
      <Analytics />
      <Navbar />
      <main className="mx-auto w-full max-w-3xl px-4 pb-20 pt-8 sm:px-6">
        <Hero />
        <About />
        <Projects />
        <YouTube />
        <Blog />
        <Contact />
      </main>
    </>
  );
}

export default App;
