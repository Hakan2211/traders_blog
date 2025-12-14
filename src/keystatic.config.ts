// keystatic.config.ts
import {
  config,
  fields,
  collection,
  LocalConfig,
  GitHubConfig,
} from '@keystatic/core';

const repoOwner =
  process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER ??
  process.env.VERCEL_GIT_REPO_OWNER;
const repoName =
  process.env.NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG ??
  process.env.VERCEL_GIT_REPO_SLUG;

const shouldUseGithubStorage =
  process.env.NODE_ENV !== 'development' && !!repoOwner && !!repoName;

if (process.env.NODE_ENV !== 'development' && !shouldUseGithubStorage) {
  console.warn(
    [
      '[keystatic] GitHub storage mode requires the following env vars:',
      '- NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER (or VERCEL_GIT_REPO_OWNER)',
      '- NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG (or VERCEL_GIT_REPO_SLUG)',
      '',
      'Falling back to local storage. (On Vercel this is read-only; you will not be able to create/edit content.)',
    ].join('\n')
  );
}

const storage: LocalConfig['storage'] | GitHubConfig['storage'] =
  shouldUseGithubStorage
    ? {
        kind: 'github',
        repo: `${repoOwner!}/${repoName!}`,
        branchPrefix: 'keystatic/',
      }
    : { kind: 'local' };

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
