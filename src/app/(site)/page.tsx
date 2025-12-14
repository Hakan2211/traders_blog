import Link from 'next/link';
import { reader } from '@/lib/reader';

export default async function HomePage() {
  const posts = await reader.collections.posts.all();

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h1 className="text-4xl font-bold mb-8">Latest Posts</h1>

      {posts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">No posts yet.</p>
          <Link href="/keystatic" className="text-blue-600 hover:underline">
            Go to Admin to create your first post →
          </Link>
        </div>
      ) : (
        <div className="grid gap-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block p-6 border rounded-lg hover:shadow-lg transition bg-white dark:bg-gray-800"
            >
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {post.entry.title}
              </h2>
              {post.entry.publishedDate && (
                <p className="text-gray-500 mt-2">{post.entry.publishedDate}</p>
              )}
              {post.entry.excerpt && (
                <p className="mt-4 text-gray-600 dark:text-gray-300">
                  {post.entry.excerpt}
                </p>
              )}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
