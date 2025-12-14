// keystatic.config.ts
import {
  config,
  fields,
  collection,
  LocalConfig,
  GitHubConfig,
} from '@keystatic/core';

const storage: LocalConfig['storage'] | GitHubConfig['storage'] =
  process.env.NODE_ENV === 'development'
    ? {
        kind: 'local',
      }
    : ({
        kind: 'github',
        clientId: process.env.KEYSTATIC_GITHUB_CLIENT_ID,
        clientSecret: process.env.KEYSTATIC_GITHUB_CLIENT_SECRET,
        repo: {
          owner:
            process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER ||
            process.env.VERCEL_GIT_REPO_OWNER!,
          name:
            process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG ||
            process.env.VERCEL_GIT_REPO_SLUG!,
        },
        branchPrefix: 'keystatic/',
      } as unknown as GitHubConfig['storage']);

export default config({
  storage,
  collections: {
    posts: collection({
      label: 'Posts',
      slugField: 'title',
      path: 'content/posts/*',
      format: { contentField: 'content' },
      schema: {
        title: fields.slug({ name: { label: 'Title' } }),
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
