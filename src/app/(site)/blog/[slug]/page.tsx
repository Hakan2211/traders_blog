import { reader } from '@/lib/reader';
import { notFound } from 'next/navigation';
import { DocumentRenderer } from '@keystatic/core/renderer';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();
  return slugs.map((slug) => ({ slug }));
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await reader.collections.posts.read(slug);

  if (!post) return notFound();

  const content = await post.content();

  return (
    <article className="max-w-3xl mx-auto pt-32 px-6">
      {/* Back Navigation */}
      <Link
        href="/"
        className="group inline-flex items-center text-sm text-neutral-500 hover:text-white mb-12 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Signals
      </Link>

      {/* Header */}
      <header className="mb-16 border-b border-white/10 pb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 tracking-tight leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-neutral-400 font-mono text-sm">
          {post.publishedDate && (
            <time className="px-3 py-1 bg-neutral-900 border border-white/10 rounded-full">
              {post.publishedDate}
            </time>
          )}
          <span>By Trader</span>
        </div>
      </header>

      {/* Content */}
      <div
        className="prose prose-invert prose-lg max-w-none 
        prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight
        prose-p:text-neutral-300 prose-p:leading-relaxed
        prose-a:text-blue-400 prose-a:no-underline hover:prose-a:text-blue-300
        prose-blockquote:border-l-blue-500 prose-blockquote:bg-neutral-900/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:not-italic
        prose-code:text-blue-300 prose-code:bg-neutral-900 prose-code:px-1 prose-code:py-0.5 prose-code:rounded
      "
      >
        <DocumentRenderer document={content} />
      </div>
    </article>
  );
}
