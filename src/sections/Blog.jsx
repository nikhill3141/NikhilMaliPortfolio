// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
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
            const postNodes = json?.data?.publication?.posts?.edges?.map((edge) => ({
              ...edge.node,
              sourceHost: publication.host,
              sourceLabel: publication.label,
            })) || [];
            return postNodes;
          })
        );

        const merged = responses
          .flat()
          .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
        setPosts(merged);
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
    <section id="blogs" className="min-h-[65vh] py-24">
      <h2 className="text-3xl font-semibold text-center text-black dark:text-slate-100 mb-4">
        Latest <span className="text-black dark:text-slate-300">Blogs</span>
      </h2>
      <p className="mx-auto mb-14 max-w-2xl text-center text-black dark:text-slate-400">
        A concise list of recent articles from your publications, updated automatically with latest insights.
      </p>

      <div className="mb-10 flex flex-wrap items-center justify-center gap-3">
        <button
          onClick={() => setActiveSource('all')}
          className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
            activeSource === 'all'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20'
          }`}
        >
          All Posts
        </button>
        {PUBLICATIONS.map((publication) => (
          <button
            key={publication.host}
            onClick={() => setActiveSource(publication.host)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
              activeSource === publication.host
                ? 'bg-blue-600 text-white'
                : 'bg-gray-200 text-black hover:bg-gray-300 dark:bg-white/10 dark:text-gray-200 dark:hover:bg-white/20'
            }`}
          >
            {publication.label}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-1 md:grid-cols-2">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="h-[220px] animate-pulse rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-6"
            >
              <div className="h-5 w-3/4 rounded bg-slate-300 dark:bg-white/10" />
              <div className="mt-4 h-3 w-full rounded bg-slate-200 dark:bg-white/10" />
              <div className="mt-2 h-3 w-5/6 rounded bg-slate-200 dark:bg-white/10" />
              <div className="mt-8 h-9 w-1/2 rounded bg-blue-300 dark:bg-blue-500/20" />
            </div>
          ))}
        </div>
      ) : visiblePosts.length === 0 ? (
        <div className="mx-auto max-w-2xl rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-8 text-center">
          <p className="text-black dark:text-gray-300">
            Could not load Hashnode posts from your publications right now.
          </p>
          <div className="mt-4 flex justify-center gap-3">
            {PUBLICATIONS.map((publication) => (
              <a
                key={publication.host}
                href={`https://${publication.host}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
              >
                Open {publication.label}
              </a>
            ))}
          </div>
        </div>
      ) : (
        <div className="mx-auto grid max-w-5xl gap-10 sm:grid-cols-1 md:grid-cols-2">
          {visiblePosts.map((post, index) => (
            <motion.article
              key={post.url}
              whileHover={{ scale: 1.02 }}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.3 }}
              className="flex flex-col justify-between rounded-3xl border border-slate-300 dark:border-white/10 bg-white dark:bg-white/5 p-6 text-center shadow-xl backdrop-blur-sm transition-shadow duration-300 hover:shadow-2xl"
            >
              <div>
                <h3 className="mb-2 text-2xl font-semibold text-black dark:text-gray-100">{post.title}</h3>
                <p className="mb-4 text-sm text-black dark:text-gray-300">{post.brief || ''}</p>
                <span className="mb-3 inline-block rounded-full bg-blue-200 dark:bg-blue-500/20 px-3 py-1 text-xs font-semibold text-black dark:text-blue-200">
                  {post.sourceLabel}
                </span>
                <p className="mb-5 text-xs text-black dark:text-gray-400">
                  {new Date(post.publishedAt).toLocaleDateString()}
                </p>
              </div>
              <a
                href={post.url}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-auto inline-block rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-500"
              >
                Read on Hashnode →
              </a>
            </motion.article>
          ))}
        </div>
      )}
      <div className="mt-8 text-center">
        <div className="flex flex-wrap items-center justify-center gap-5">
          {PUBLICATIONS.map((publication) => (
            <a
              key={publication.host}
              href={`https://${publication.host}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-300"
            >
              Visit {publication.label} →
            </a>
          ))}
        </div>
      </div>
    </section>

  );
}
