import Link from 'next/link';
import { reader } from '../lib/reader';

export default async function HomePage() {
  // 1. Read all posts
  const posts = await reader.collections.posts.all();

  return (
    <main className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">My Course Blog</h1>

      <div className="grid gap-6 text-black">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="block p-6 border rounded-lg hover:shadow-lg transition"
          >
            <h2 className="text-2xl font-bold">{post.entry.title}</h2>
            <p className="text-gray-500 mt-2">{post.entry.publishedDate}</p>
            <p className="mt-4">{post.entry.excerpt}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}
