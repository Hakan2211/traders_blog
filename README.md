# Traders Blog

A Next.js blog with Keystatic Cloud CMS - easy to fork and deploy!

## 🚀 Quick Start (For Non-Techies)

### Step 1: Fork this Repository

Click the "Fork" button on GitHub to create your own copy.

### Step 2: Create a Keystatic Cloud Account

1. Go to [keystatic.cloud](https://keystatic.cloud) and sign up
2. Create a new project
3. Connect it to your forked GitHub repository
4. Copy your **Project Key** (looks like `yourname/yourproject`)

### Step 3: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "Import Project" and select your forked repository
3. In the "Environment Variables" section, add:

   | Name                            | Value                                                     |
   | ------------------------------- | --------------------------------------------------------- |
   | `NEXT_PUBLIC_KEYSTATIC_PROJECT` | Your Keystatic project key (e.g., `yourname/yourproject`) |

4. Click "Deploy"

### Step 4: Configure Keystatic Cloud

1. Go back to your Keystatic Cloud project settings
2. Add your Vercel URL as the "Primary URL" (e.g., `https://your-blog.vercel.app`)
3. Check "Allow local development" if you want to edit locally

**That's it! Visit `/keystatic` on your site to start writing posts!**

---

## Features

- 📝 **Keystatic Cloud** - Easy content management
- 📱 **Responsive Design** - Works on all devices
- 🚀 **One-Click Deploy** - Fork, configure, done!

## Local Development

1. Clone your forked repository
2. Run `npm install`
3. Run `npm run dev`
4. Open [http://localhost:3000](http://localhost:3000)

For local admin access, visit [http://localhost:3000/keystatic](http://localhost:3000/keystatic)

## Project Structure

```
my-app/
├── content/posts/       # Your blog posts
├── public/images/       # Images for posts
├── src/
│   ├── app/
│   │   ├── (site)/      # Public blog pages
│   │   ├── api/keystatic/  # CMS API
│   │   └── keystatic/   # Admin UI
│   └── keystatic.config.ts  # CMS configuration
```

## Environment Variables

| Variable                        | Description                      |
| ------------------------------- | -------------------------------- |
| `NEXT_PUBLIC_KEYSTATIC_PROJECT` | Your Keystatic Cloud project key |

## Tech Stack

- Next.js 16
- Keystatic Cloud
- Tailwind CSS 4
- Vercel

## License

MIT
