import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaInstagram} from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen w-full flex items-center justify-center px-4 sm:px-6 lg:px-20 bg-gradient-to-br from-[#0f172a] via-[#020617] to-[#1e293b] text-white font-sans pt-20 md:pt-0"
    >
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl w-full">
        {/* Right Column - Profile Card First on Mobile */}
        <motion.div
          className="z-10 flex justify-center flex-1 w-full order-1 md:order-2 mt-10 md:mt-0"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="relative w-[240px] sm:w-[280px] md:w-[320px] lg:w-[360px] bg-gradient-to-br from-blue-700 to-purple-700 rounded-3xl shadow-2xl p-4 overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-black/20 backdrop-blur-sm z-0 rounded-3xl" />
            <img
              src="/Nikcartoonimg.png"
              alt="Profile"
              className="relative z-10 w-full h-[70%] object-contain rounded-3xl shadow-md"
            />
            <div className="relative z-10 mt-4 text-center">
              <h3 className="text-xl sm:text-2xl font-semibold text-white">Nikhil Mali</h3>
              <p className="text-sm sm:text-base text-gray-300">Software Engineer | Full Stack | UI/UX</p>
              <div className="mt-3 text-xs text-gray-400 px-2">
                <p>📍 Nashik, India</p>
                <p>🎓 Computer Engineering</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Left Column - Text Section */}
        <motion.div
          className="flex flex-col items-center md:items-start text-center md:text-left z-10 flex-1 order-2 md:order-1"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-4 tracking-tight break-words">
            Hi, I'm <span className="text-blue-500">Nikhil Mali</span>
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 font-medium mb-6 max-w-md">
            Full Stack Developer, Designer, and Creative Technologist
          </p>

          <div className="bg-white/5 backdrop-blur-sm p-4 sm:p-6 rounded-xl border border-white/10 shadow-lg mb-6 max-w-lg">
            <p className="text-sm sm:text-base md:text-lg text-gray-400">
              I specialize in building scalable web apps using{" "}
              <span className="text-blue-400 font-semibold">Django, Python, and REST APIs</span>. Skilled in{" "}
              <span className="text-green-400 font-semibold">React</span> and familiar with{" "}
              <span className="text-yellow-400 font-semibold">Node.js</span>, I like creating smooth user experiences with clean, modern UI.
              Exploring the AI Agents and Automation
            </p>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6 w-full sm:w-auto justify-center sm:justify-start">
            <Link
              to="/projects"
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-full shadow-lg font-medium transition text-center"
            >
              View Projects
            </Link>
            <a
              href="/NikhilMaliResume.pdf"
              download
              className="px-6 py-3 border border-blue-500 hover:bg-blue-500 hover:text-white rounded-full font-medium transition text-center"
            >
              Download Resume
            </a>
          </div>

          {/* Social Icons */}
          <div className="flex justify-center sm:justify-start space-x-6 text-2xl text-blue-400">
            <a href="https://github.com/nikhill3141" target="_blank" rel="noopener noreferrer">
              <FaGithub className="hover:text-white transition" />
            </a>
            <a href="https://www.linkedin.com/in/nikhil-mali-aa878a236/" target="_blank" rel="noopener noreferrer">
              <FaLinkedin className="hover:text-white transition" />
            </a>
            <a href="https://www.instagram.com/nikhilmali3141/" target="_blank" rel="noopener noreferrer">
              <FaInstagram className="hover:text-white transition" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
