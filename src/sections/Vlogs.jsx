// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';

const DEFAULT_VLOGS = ['https://youtu.be/xFALwbga1Lo?si=cyOSajaz7kY1uRDD'];

function toEmbedUrl(url) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname.includes('youtu.be')) {
      const id = parsed.pathname.replace('/', '');
      return `https://www.youtube.com/embed/${id}`;
    }
    if (parsed.hostname.includes('youtube.com')) {
      const id = parsed.searchParams.get('v');
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
  } catch {
    return '';
  }
  return '';
}

export default function YouTube() {
  const envLinks = (import.meta.env.VITE_YOUTUBE_VLOGS || '')
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);

  const vlogLinks = envLinks.length > 0 ? envLinks : DEFAULT_VLOGS;
  const videos = vlogLinks
    .map((url, idx) => {
      const embed = toEmbedUrl(url);
      if (!embed) return null;
      return { id: `${idx}-${embed}`, url, embed };
    })
    .filter(Boolean);

  return (
    <section id="youtube" className="min-h-[60vh] py-24">
      <h2 className="mb-4 text-center text-3xl font-semibold text-black dark:text-slate-100">
        Latest <span className="text-black dark:text-slate-300">YouTube</span> videos
      </h2>
      <p className="mx-auto mb-14 max-w-2xl text-center text-black dark:text-slate-400">
        A practical feed of recent video updates, with links handled from environment configuration.
      </p>

      <div className="mx-auto grid max-w-6xl gap-8 sm:grid-cols-1 md:grid-cols-2">
        {videos.map((video, index) => (
          <motion.article
            key={video.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.45, delay: index * 0.08 }}
            className="rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-5 shadow-xl backdrop-blur-sm"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-300 dark:border-white/10">
              <iframe
                className="aspect-video w-full"
                src={video.embed}
                title="YouTube vlog"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
            <a
              href={video.url}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-block text-sm font-semibold text-blue-600 hover:underline dark:text-blue-300"
            >
              Watch on YouTube →
            </a>
          </motion.article>
        ))}
      </div>
    </section>
  );
}

