# Traders Blog

A Next.js blog with Keystatic CMS and GitHub OAuth authentication.

## Features

- 📝 **Keystatic CMS** - Visual content editor at `/keystatic`
- 🔐 **GitHub OAuth** - Secure authentication for content editing
- 📱 **Responsive Design** - Works on all devices
- 🚀 **Vercel Ready** - One-click deploy with Git integration

## Getting Started

### Local Development

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd my-app
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   ```

4. **Open the app**
   - Blog: [http://localhost:3000](http://localhost:3000)
   - Admin: [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

In local development, Keystatic runs in **local mode** - no GitHub authentication required. Content is saved directly to your filesystem.

### Production Setup (Vercel + GitHub OAuth)

For production, Keystatic uses GitHub as the content storage backend. You'll need to set up GitHub OAuth.

#### Step 1: Create a GitHub OAuth App

1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **"New OAuth App"**
3. Fill in the details:
   - **Application name**: Traders Blog Admin
   - **Homepage URL**: `https://your-domain.vercel.app`
   - **Authorization callback URL**: `https://your-domain.vercel.app/api/keystatic/github/oauth/callback`
4. Click **"Register application"**
5. Copy the **Client ID**
6. Click **"Generate a new client secret"** and copy it

#### Step 2: Generate a Secret Key

Generate a random secret for session encryption:

```bash
openssl rand -hex 32
```

#### Step 3: Configure Vercel Environment Variables

In your Vercel project settings, add these environment variables:

| Variable                         | Value                               |
| -------------------------------- | ----------------------------------- |
| `KEYSTATIC_GITHUB_CLIENT_ID`     | Your GitHub OAuth Client ID         |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Your GitHub OAuth Client Secret     |
| `KEYSTATIC_SECRET`               | The random hex string you generated |

**Note**: Vercel automatically sets `NEXT_PUBLIC_VERCEL_GIT_REPO_OWNER` and `NEXT_PUBLIC_VERCEL_GIT_REPO_SLUG` when you connect a GitHub repo.

#### Step 4: Deploy

Deploy to Vercel, and your admin panel at `/keystatic` will now require GitHub login.

## Project Structure

```
my-app/
├── content/
│   └── posts/           # Blog posts (managed by Keystatic)
├── public/
│   └── images/posts/    # Post images
├── src/
│   ├── app/
│   │   ├── (site)/      # Public blog routes
│   │   │   ├── blog/[slug]/  # Individual post pages
│   │   │   └── page.tsx      # Blog listing page
│   │   ├── api/keystatic/    # Keystatic API routes
│   │   └── keystatic/        # Admin UI
│   ├── lib/
│   │   └── reader.ts    # Keystatic content reader
│   └── keystatic.config.ts   # Keystatic configuration
└── .env.example         # Environment variables template
```

## Creating Content

1. Go to `/keystatic` (requires GitHub login in production)
2. Click **"Posts"** in the sidebar
3. Click **"Create"** to add a new post
4. Fill in:
   - **Title**: The post title (auto-generates the URL slug)
   - **Published Date**: When the post was published
   - **Excerpt**: A short summary for the listing page
   - **Content**: The full post content (rich text editor)
5. Click **"Save"** to create the post

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Keystatic
- **Styling**: Tailwind CSS 4
- **Authentication**: GitHub OAuth
- **Deployment**: Vercel

## License

MIT
