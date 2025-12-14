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
    <article className="max-w-3xl mx-auto pt-32 px-6 pb-24">
      {/* Back Navigation */}
      <Link
        href="/"
        className="group inline-flex items-center text-sm font-medium text-neutral-400 hover:text-[#dfbd69] mb-12 transition-colors"
      >
        <ChevronLeft className="w-4 h-4 mr-1 group-hover:-translate-x-1 transition-transform" />
        Back to Posts
      </Link>

      {/* Header */}
      <header className="mb-16 border-b border-white/10 pb-12">
        <h1 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight drop-shadow-sm">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-neutral-400 font-mono text-sm">
          {post.publishedDate && (
            <time className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-neutral-300 shadow-[0_0_15px_rgba(255,255,255,0.02)] backdrop-blur-sm">
              {post.publishedDate}
            </time>
          )}
        </div>
      </header>

      {/* Content */}
      <div
        className="prose prose-invert prose-lg max-w-none 
        prose-headings:text-white prose-headings:font-semibold prose-headings:tracking-tight
        prose-p:text-neutral-300 prose-p:leading-relaxed
        prose-a:text-blue-300 prose-a:no-underline prose-a:border-b prose-a:border-blue-500/30 hover:prose-a:border-blue-400 hover:prose-a:text-blue-200 prose-a:transition-colors
        prose-blockquote:border-l-4 prose-blockquote:border-blue-500 prose-blockquote:bg-gradient-to-r prose-blockquote:from-blue-500/10 prose-blockquote:to-transparent prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:not-italic prose-blockquote:rounded-r-lg
        prose-code:text-blue-200 prose-code:bg-white/10 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:border prose-code:border-white/10 prose-code:font-medium
        prose-li:text-neutral-300
        prose-strong:text-white
      "
      >
        <DocumentRenderer document={content} />
      </div>
    </article>
  );
}
