import { reader } from '@/lib/reader';
import { PostsList } from '@/components/posts-list';

export default async function HomePage() {
  const posts = await reader.collections.posts.all();

  // Serialize posts to remove functions (content) before passing to client component
  const serializedPosts = posts.map((post) => ({
    slug: post.slug,
    entry: {
      ...post.entry,
      content: undefined,
    },
  }));

  return <PostsList posts={serializedPosts} />;
}
