import { config, fields, collection, singleton } from '@keystatic/core';

// Get project key from environment variable
// Users can set this in Vercel: NEXT_PUBLIC_KEYSTATIC_PROJECT
const keystatic_project =
  process.env.NEXT_PUBLIC_KEYSTATIC_PROJECT || 'hakanda/tradersblog';

export default config({
  storage:
    process.env.NODE_ENV === 'development'
      ? {
          kind: 'local',
        }
      : {
          kind: 'cloud',
        },
  cloud: {
    project: keystatic_project,
  },
  singletons: {
    settings: singleton({
      label: 'Settings',
      path: 'content/settings',
      schema: {
        headline: fields.text({ label: 'Headline' }),
        bio: fields.text({ label: 'Bio', multiline: true }),
        avatar: fields.image({
          label: 'Avatar',
          directory: 'public/images/avatar',
          publicPath: '/images/avatar',
        }),
        twitterUrl: fields.text({ label: 'Twitter URL' }),
      },
    }),
  },
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
