import { motion } from 'framer-motion';

export default function About() {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-6 py-20 bg-white dark:bg-black text-gray-800 dark:text-white">
      <motion.h2
        className="text-4xl font-extrabold mb-12 text-center"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        About Me
      </motion.h2>

      <div className="flex flex-col lg:flex-row items-center justify-center gap-12 w-full max-w-6xl">
        {/* Image Card */}
        <motion.div
          className="w-64 h-64 rounded-2xl overflow-hidden shadow-xl bg-gray-200 dark:bg-gray-800 flex items-center justify-center"
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false, amount: 0.3 }}
        >
          <img
            src="https://media.giphy.com/media/qgQUggAC3Pfv687qPC/giphy.gif"
            alt="Personality"
            className="object-cover w-full h-full"
          />
        </motion.div>

        {/* Info Card */}
        <motion.div
          className="bg-gray-100 dark:bg-gray-900 p-8 rounded-2xl shadow-md max-w-xl w-full"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <h3 className="text-2xl font-bold mb-4">Hi, I'm Nikhil Mali 👋</h3>
          <p className="text-base leading-relaxed mb-4">
            A passionate <strong>Full Stack Developer</strong> with a strong foundation in <strong>Django, Django REST Framework</strong>,
            and frontend technologies like <strong>React</strong> and <strong>Tailwind CSS</strong>. I also love building modern UIs with
            libraries like <strong>Framer Motion</strong> and experimenting with <strong>AI agents & automation workflows</strong>.
          </p>
          <p className="text-base leading-relaxed mb-4">
            I’ve worked on a wide range of <strong>real-world projects</strong> like photo studio management systems, salon booking
            apps, and intelligent automation tools — delivering solutions that blend design, scalability, and performance.
          </p>
          <p className="text-base text-gray-600 dark:text-gray-400">
            Outside of coding, I explore new tech trends, sketch ideas, and create content around development and productivity.
          </p>
        </motion.div>
      </div>

      {/* Tech Stack Card */}
      <motion.div
        className="mt-16 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 w-full max-w-6xl"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        {[
          'Django',
          'Django REST',
          'React.js',
          'Tailwind CSS',
          'Node.js',
          'JavaScript',
          'PostgreSQL',
          'Git & GitHub',
          'Framer Motion',
          'AI Agents',
        ].map((tech) => (
          <div
            key={tech}
            className="bg-white dark:bg-gray-800 text-center py-3 px-4 rounded-lg shadow-sm font-medium text-sm text-gray-700 dark:text-gray-300"
          >
            {tech}
          </div>
        ))}
      </motion.div>
    </section>
  );
}
