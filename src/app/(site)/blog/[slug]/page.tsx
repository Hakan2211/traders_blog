import { reader } from '@/lib/reader';
import { notFound } from 'next/navigation';
import { DocumentRenderer } from '@keystatic/core/renderer';

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();
  return slugs.map((slug: string) => ({ slug }));
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
    <article className="max-w-3xl mx-auto py-10 px-4">
      <header className="mb-8">
        <h1 className="font-bold text-4xl mb-4">{post.title}</h1>
        {post.publishedDate && (
          <div className="text-gray-500">
            Published on: {post.publishedDate}
          </div>
        )}
        {post.excerpt && (
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            {post.excerpt}
          </p>
        )}
      </header>
      <div className="prose lg:prose-xl dark:prose-invert max-w-none">
        <DocumentRenderer document={content} />
      </div>
    </article>
  );
}
