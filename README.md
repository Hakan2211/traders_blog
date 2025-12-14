# Traders Blog

A Next.js blog with Keystatic Cloud CMS.

## Features

- 📝 **Keystatic Cloud** - Hosted content management at `/keystatic`
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

In local development, Keystatic runs in **local mode** - content is saved directly to your filesystem.

### Production Setup (Keystatic Cloud)

For production, the blog uses Keystatic Cloud for content management.

1. Sign up at [Keystatic Cloud](https://keystatic.cloud)
2. Create a new project and connect your GitHub repo
3. Update the `cloud.project` in `keystatic.config.ts` with your project slug
4. Deploy to Vercel

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
```

## Creating Content

1. Go to `/keystatic`
2. Log in with your Keystatic Cloud account
3. Click **"Posts"** in the sidebar
4. Click **"Create"** to add a new post
5. Fill in the title, date, excerpt, and content
6. Click **"Save"** to create the post

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **CMS**: Keystatic Cloud
- **Styling**: Tailwind CSS 4
- **Deployment**: Vercel

## License

MIT
