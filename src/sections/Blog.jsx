import { motion } from 'framer-motion';

const widgets = [
  {
    title: 'AI Agents Blog',
    description: 'This blog offers fresh, accessible insights into the world of AI agents—covering topics like autonomous support agents, business metrics automation, and real‑world use cases. Posts include recent entries such as “6 Game‑Changing AI Agents That Quiet the Chaos of Support Work” and “Agent.ai Agents Just Got Make.com Superpowers,” all published in July 2025',
    link: 'https://blog.agent.ai/?utm_source=chatgpt.com',
  },
  {
    title: 'Django Web Development Blog',
    description: 'The official Django project site maintains an up‑to‑date blog, including community posts and core releases. Recent entries (as of July 25, 2025) include announcements about DjangoCon US 2025 talks and newly released security updates. It’s a fantastic source for tutorials, official updates, and community‑curated content',
    link: 'https://www.djangoproject.com/community/blogs/?utm_source=chatgpt.com',
  },
];

export default function Blog() {
  return (
    <section id="blog" className="min-h-screen bg-white dark:bg-[#0c0c0c] py-24 px-6">
      <h2 className="text-4xl font-bold text-center text-black dark:text-white mb-14">
        Blog & <span className="text-blue-500">Mini Projects</span>
      </h2>

      <div className="grid md:grid-cols-2 sm:grid-cols-1 gap-10 max-w-5xl mx-auto">
        {widgets.map((widget, index) => (
          <motion.div
            key={widget.title}
            whileHover={{ scale: 1.03 }}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            viewport={{ once: false, amount: 0.3 }}
            className="rounded-2xl bg-gray-100 dark:bg-zinc-900 shadow-xl hover:shadow-2xl transition-shadow duration-300 p-6 flex flex-col justify-between"
          >
            <div>
              <h3 className="text-2xl font-semibold text-zinc-800 dark:text-white mb-2">
                {widget.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {widget.description}
              </p>
            </div>
            <a
              href={widget.link}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block mt-auto text-sm font-medium px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-lg hover:bg-blue-500 hover:text-white transition-colors"
            >
              Read All→
            </a>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
