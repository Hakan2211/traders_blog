'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface Post {
  slug: string;
  entry: {
    title: string;
    publishedDate: string | null;
    excerpt: string;
  };
}

interface Settings {
  headline: string | null;
  bio: string | null;
  avatar: string | null;
}

export function PostsList({
  posts,
  settings,
}: {
  posts: Post[];
  settings: Settings | null;
}) {
  // Group posts by year
  const postsByYear = posts.reduce((acc, post) => {
    const date = post.entry.publishedDate
      ? new Date(post.entry.publishedDate)
      : new Date();
    const year = date.getFullYear();
    if (!acc[year]) {
      acc[year] = [];
    }
    acc[year].push(post);
    return acc;
  }, {} as Record<number, Post[]>);

  // Sort years descending
  const years = Object.keys(postsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Fallback data
  const headline = settings?.headline || 'Welcome to my blog';
  const bio =
    settings?.bio ||
    'Introduce yourself here.\n\nHey my name is [Your Name]. My interests are [Your Interests].\n\nAdd a short bio here.';
  const avatar = settings?.avatar || '/hero_image.jpg';

  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center gap-8 mb-24"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-neutral-900 border-2 border-white/20 shadow-[0_0_30px_rgba(255,255,255,0.05)] flex items-center justify-center shrink-0 overflow-hidden relative ring-1 ring-white/10">
          <Image
            src={avatar}
            alt="Profile"
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            {headline}
          </h1>
          <div className="text-neutral-300 leading-relaxed max-w-lg text-lg whitespace-pre-wrap">
            {bio}
          </div>
        </div>
      </motion.div>

      {/* Posts List */}
      <div className="space-y-20">
        {years.length > 0 ? (
          years.map((year, yearIndex) => (
            <motion.section
              key={year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + yearIndex * 0.1 }}
            >
              <h2 className="text-2xl font-bold text-white/90 mb-10 flex items-center gap-4">
                {year}
                <div className="h-px bg-white/10 grow" />
              </h2>
              <div className="space-y-6">
                {postsByYear[year]
                  .sort((a, b) => {
                    const dateA = a.entry.publishedDate
                      ? new Date(a.entry.publishedDate).getTime()
                      : 0;
                    const dateB = b.entry.publishedDate
                      ? new Date(b.entry.publishedDate).getTime()
                      : 0;
                    return dateB - dateA; // Sort descending within year
                  })
                  .map((post) => (
                    <Link
                      key={post.slug}
                      href={`/blog/${post.slug}`}
                      className="group block p-6 -mx-6 rounded-2xl hover:bg-white/3 border border-transparent hover:border-white/10 transition-all duration-300 hover:shadow-lg hover:shadow-black/20"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8">
                        <h3 className="text-xl font-semibold text-neutral-100 group-hover:text-[#dfbd69] transition-colors tracking-tight">
                          {post.entry.title}
                        </h3>
                        <span className="text-sm font-mono text-neutral-500 group-hover:text-neutral-400 whitespace-nowrap shrink-0 transition-colors">
                          {post.entry.publishedDate
                            ? new Date(
                                post.entry.publishedDate
                              ).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric',
                              })
                            : 'Draft'}
                        </span>
                      </div>
                      {post.entry.excerpt && (
                        <p className="mt-3 text-base text-neutral-400 line-clamp-2 group-hover:text-neutral-300 transition-colors leading-relaxed">
                          {post.entry.excerpt}
                        </p>
                      )}
                    </Link>
                  ))}
              </div>
            </motion.section>
          ))
        ) : (
          <EmptyState />
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 text-neutral-500">
      <p>No posts found.</p>
      <Link
        href="/keystatic"
        className="mt-4 inline-block text-white underline decoration-neutral-700 underline-offset-4"
      >
        Start Writing
      </Link>
    </div>
  );
}
