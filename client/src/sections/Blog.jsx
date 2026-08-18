// eslint-disable-next-line no-unused-vars
import { motion } from 'framer-motion';
import { CalendarDays, ExternalLink } from 'lucide-react';
import { useEffect, useState } from 'react';

const PUBLICATIONS = [
  { host: '/nm-blogs.hashnode.dev', label: 'NM Blogs' },
  { host: '/nm-javascript.hashnode.dev', label: 'NM JavaScript' },
  { host: '/nm-backend.hashnode.dev', label: 'NM Backend' },
];

// Hashnode's API paginates posts (max 20 per page), so we page through with
// a cursor until there's nothing left. MAX_PAGES is just a safety net so a
// misbehaving API response can never turn into an infinite loop.
const PAGE_SIZE = 20;
const MAX_PAGES = 15; // up to ~300 posts per publication

const BLOG_QUERY = `
  query Publication($host: String!, $after: String) {
    publication(host: $host) {
      posts(first: ${PAGE_SIZE}, after: $after) {
        edges {
          node {
            title
            brief
            url
            publishedAt
          }
        }
        pageInfo {
          hasNextPage
          endCursor
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

async function fetchAllPostsForPublication(publication) {
  const posts = [];
  let after = null;
  let hasNextPage = true;
  let pageCount = 0;

  while (hasNextPage && pageCount < MAX_PAGES) {
    const response = await fetch('https://gql.hashnode.com/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: BLOG_QUERY,
        variables: { host: publication.host, after },
      }),
    });

    const json = await response.json();

    if (json.errors?.length) {
      throw new Error(json.errors[0]?.message || `Hashnode request failed for ${publication.host}`);
    }

    const page = json?.data?.publication?.posts;
    const edges = page?.edges || [];

    posts.push(
      ...edges.map((edge) => ({
        ...edge.node,
        sourceHost: publication.host,
        sourceLabel: publication.label,
      }))
    );

    hasNextPage = Boolean(page?.pageInfo?.hasNextPage);
    after = page?.pageInfo?.endCursor || null;
    pageCount += 1;
  }

  return posts;
}

export default function Blog({ sectionRef }) {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeSource, setActiveSource] = useState('all');

  useEffect(() => {
    let cancelled = false;

    const fetchPosts = async () => {
      try {
        const responses = await Promise.all(
          PUBLICATIONS.map((publication) => fetchAllPostsForPublication(publication))
        );

        if (cancelled) return;

        setPosts(
          responses
            .flat()
            .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
        );
      } catch (error) {
        if (!cancelled) {
          // Surfacing this in the console makes it much easier to tell a
          // real API/host problem apart from "there just aren't any posts".
          console.error('Failed to load Hashnode posts:', error);
          setPosts([]);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchPosts();

    return () => {
      cancelled = true;
    };
  }, []);

  const visiblePosts =
    activeSource === 'all'
      ? posts
      : posts.filter((post) => post.sourceHost === activeSource);

  const countFor = (host) =>
    host === 'all' ? posts.length : posts.filter((post) => post.sourceHost === host).length;

  return (
    <section ref={sectionRef} data-section="blogs" className="sleek-section">
      <SectionHeading subHeading="Featured" heading="Blogs" />

      <div className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveSource('all')}
          className={`sleek-button ${activeSource === 'all' ? 'bg-[var(--surface-strong)]' : ''}`}
          type="button"
        >
          All Posts{!loading && ` (${countFor('all')})`}
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
            {!loading && ` (${countFor(publication.host)})`}
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
      ) : posts.length === 0 ? (
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
      ) : visiblePosts.length === 0 ? (
        <div className="sleek-card mt-8 p-6">
          <p className="text-secondary">No posts in this filter yet.</p>
        </div>
      ) : (
        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
          {visiblePosts.map((post, index) => (
            <motion.article
              key={post.url}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.42, delay: (index % 6) * 0.06 }}
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