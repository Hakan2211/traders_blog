import { config, fields, collection } from '@keystatic/core';

// Determine storage mode based on environment
const isLocal = process.env.NODE_ENV === 'development';

const storage = isLocal
  ? ({ kind: 'local' } as const)
  : ({
      kind: 'github',
      repo: `${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER}/${process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG}`,
    } as const);

export default config({
  storage,
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*/',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({
          name: { label: 'Title' },
        }),
        publishedDate: fields.date({ label: 'Published Date' }),
        excerpt: fields.text({ label: 'Excerpt', multiline: true }),
        content: fields.document({
          label: 'Content',
          formatting: true,
          dividers: true,
          links: true,
          images: {
            directory: 'public/images/posts',
            publicPath: '/images/posts/',
          },
        }),
      },
    }),
  },
});
