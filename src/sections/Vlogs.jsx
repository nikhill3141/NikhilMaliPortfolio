// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { ExternalLink, PlayCircle } from 'lucide-react';

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

function SectionHeading({ subHeading, heading }) {
  return (
    <div>
      <p className="text-sm text-secondary">{subHeading}</p>
      <h2 className="text-2xl font-bold">{heading}</h2>
    </div>
  );
}

export default function YouTube({ sectionRef }) {
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
    <section ref={sectionRef} data-section="youtube" className="sleek-section">
      <SectionHeading subHeading="Latest" heading="YouTube Videos" />

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
        {videos.map((video, index) => (
          <motion.article
            key={video.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="sleek-card group overflow-hidden"
          >
            <div className="relative aspect-video overflow-hidden border-b border-[var(--border)] bg-[var(--surface)]">
              <iframe
                className="h-full w-full"
                src={video.embed}
                title="YouTube vlog"
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center bg-black/10 opacity-0 transition-opacity group-hover:opacity-100">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/25 text-white backdrop-blur-sm">
                  <PlayCircle size={24} />
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 p-5">
              <div>
                <h3 className="font-bold">Recent video update</h3>
                <p className="text-sm text-secondary">A practical note from the channel.</p>
              </div>
              <a
                href={video.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-secondary transition hover:text-[var(--foreground)]"
                aria-label="Watch on YouTube"
                title="Watch on YouTube"
              >
                <ExternalLink size={18} />
              </a>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
