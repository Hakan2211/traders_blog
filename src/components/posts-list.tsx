'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { User } from 'lucide-react';

interface Post {
  slug: string;
  entry: {
    title: string;
    publishedDate: string | null;
    excerpt: string;
  };
}

export function PostsList({ posts }: { posts: Post[] }) {
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

  return (
    <div className="max-w-3xl mx-auto px-6 py-24">
      {/* Introduction Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="flex flex-col md:flex-row items-center gap-8 mb-24"
      >
        <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-neutral-800 border border-white/10 flex items-center justify-center shrink-0 overflow-hidden relative">
          {/* Placeholder for user image - replace with actual Image component */}
          <User className="w-12 h-12 text-neutral-500" />
        </div>
        <div className="text-center md:text-left">
          <h1 className="text-3xl font-bold text-white mb-3">The Trader</h1>
          <p className="text-neutral-400 leading-relaxed max-w-lg">
            Documenting the journey through volatile markets. Focusing on price
            action, psychology, and finding edge in the noise.
          </p>
        </div>
      </motion.div>

      {/* Posts List */}
      <div className="space-y-16">
        {years.length > 0 ? (
          years.map((year, yearIndex) => (
            <motion.section
              key={year}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 + yearIndex * 0.1 }}
            >
              <h2 className="text-xl font-mono text-neutral-500 mb-8 pl-4 border-l border-white/10">
                {year}
              </h2>
              <div className="space-y-8">
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
                      className="group block p-4 -mx-4 rounded-xl hover:bg-neutral-900/50 transition-colors"
                    >
                      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 sm:gap-8">
                        <h3 className="text-lg font-medium text-neutral-200 group-hover:text-blue-400 transition-colors">
                          {post.entry.title}
                        </h3>
                        <span className="text-sm font-mono text-neutral-600 whitespace-nowrap shrink-0">
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
                        <p className="mt-2 text-sm text-neutral-500 line-clamp-2 group-hover:text-neutral-400 transition-colors">
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
