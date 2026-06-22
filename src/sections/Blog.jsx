// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

const PUBLICATIONS = [
  { host: 'nm-blogs.hashnode.dev', label: 'NM Blogs' },
  { host: 'nm-javascript.hashnode.dev', label: 'NM JavaScript' },
];

const BLOG_QUERY = `
  query Publication($host: String!) {
    publication(host: $host) {
      posts(first: 6) {
        edges {
          node {
            title
            brief
            url
            publishedAt
          }
        }
      }
    }
  }
`;

function SectionHeading({ subHeading, heading }) {
  return (
    <div>
      <p className="text-sm text-secondary">{subHeading}</p>
      <h2 className="text-2xl font-bold">{heading}</h2>
    </div>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState('all');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const responses = await Promise.all(
          PUBLICATIONS.map(async (publication) => {
            const response = await fetch('https://gql.hashnode.com/', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                query: BLOG_QUERY,
                variables: { host: publication.host },
              }),
            });
            const json = await response.json();
            return (
              json?.data?.publication?.posts?.edges?.map((edge) => ({
                ...edge.node,
                sourceHost: publication.host,
                sourceLabel: publication.label,
              })) || []
            );
          })
        );

        setPosts(
          responses
            .flat()
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        );
      } catch {
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const visiblePosts =
    activeSource === 'all'
      ? posts
      : posts.filter((post) => post.sourceHost === activeSource);

  return (
    <section id="blogs" className="sleek-section">
      <SectionHeading subHeading="Featured" heading="Blogs" />

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSource('all')}
          className={`sleek-button ${activeSource === 'all' ? 'bg-[var(--surface-strong)]' : ''}`}
          type="button"
        >
          All Posts
        </button>
        {PUBLICATIONS.map((publication) => (
          <button
            key={publication.host}
            onClick={() => setActiveSource(publication.host)}
            className={`sleek-button ${
              activeSource === publication.host ? 'bg-[var(--surface-strong)]' : ''
            }`}
            type="button"
          >
            {publication.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div key={idx} className="sleek-card h-52 animate-pulse p-5">
              <div className="h-5 w-3/4 rounded bg-[var(--surface-strong)]" />
              <div className="mt-5 h-3 w-full rounded bg-[var(--surface)]" />
              <div className="mt-2 h-3 w-5/6 rounded bg-[var(--surface)]" />
              <div className="mt-8 h-8 w-32 rounded bg-[var(--surface-strong)]" />
            </div>
          ))}
        </div>
      ) : visiblePosts.length === 0 ? (
        <div className="sleek-card mt-8 p-6">
          <p className="text-secondary">Could not load Hashnode posts from your publications right now.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {PUBLICATIONS.map((publication) => (
              <a
                key={publication.host}
                href={`https://${publication.host}`}
                target="_blank"
                rel="noopener noreferrer"
                className="sleek-button"
              >
                Open {publication.label}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {visiblePosts.map((post, index) => (
            <motion.article
              key={post.url}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: index * 0.06 }}
              viewport={{ once: true, amount: 0.3 }}
              className="sleek-card group flex h-full flex-col p-5 transition-colors hover:border-[var(--foreground)]"
            >
              <a href={post.url} target="_blank" rel="noopener noreferrer">
                <h3 className="line-clamp-2 text-xl font-bold leading-tight group-hover:underline group-hover:underline-offset-4">
                  {post.title}
                </h3>
              </a>
              <p className="mt-4 line-clamp-3 text-secondary">{post.brief || ''}</p>

              <div className="mt-5 flex flex-wrap gap-2">
                <span className="sleek-chip px-2 py-1 text-xs font-bold">{post.sourceLabel}</span>
              </div>

              <div className="mt-auto flex items-center justify-between gap-3 pt-6 text-sm text-secondary">
                <time className="flex items-center gap-2" dateTime={post.publishedAt}>
                  <CalendarDays size={15} />
                  {new Date(post.publishedAt).toLocaleDateString()}
                </time>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 transition hover:text-[var(--foreground)]"
                >
                  Read <ExternalLink size={14} />
                </a>
              </div>
            </motion.article>
          ))}
        </div>
      )}
    </section>
  );
}
