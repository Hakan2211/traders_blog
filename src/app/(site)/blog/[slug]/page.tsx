import { reader } from '../../../lib/reader';
import { notFound } from 'next/navigation';
import { DocumentRenderer } from '@keystatic/core/renderer';

export async function generateStaticParams() {
  const slugs = await reader.collections.posts.list();
  return slugs.map((slug: string) => ({ slug }));
}

// 1. Update the type definition to wrap params in a Promise
export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // 2. Await the params object before using the slug
  const { slug } = await params;

  const post = await reader.collections.posts.read(slug);

  if (!post) return notFound();

  const content = await post.content();

  return (
    <article className="max-w-3xl mx-auto py-10 px-4 prose lg:prose-xl dark:prose-invert">
      <h1 className="font-bold text-4xl mb-4">{post.title}</h1>
      <div className="text-gray-500 mb-8">
        Published on: {post.publishedDate}
      </div>
      <DocumentRenderer document={content} />
    </article>
  );
}
