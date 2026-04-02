import Navbar from './components/Navbar';
import CustomCursor from './components/CustomCursor';
import Hero from './sections/Hero';
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
      <CustomCursor />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl px-5 pb-12 pt-24 sm:px-8 md:px-12 lg:px-16">
        <Hero />
        <Projects />
        <YouTube />
        <Blog />
        <Contact />
      </main>
    </>
  );
}

export default App;
