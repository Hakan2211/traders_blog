import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Traders Blog',
  description: 'A blog about trading and investing',
};

export default function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b">
        <div className="max-w-4xl mx-auto py-4 px-4">
          <nav className="flex items-center justify-between">
            <a href="/" className="text-xl font-bold">
              Traders Blog
            </a>
            <div className="flex gap-4">
              <a href="/" className="hover:underline">
                Home
              </a>
              <a href="/keystatic" className="hover:underline text-blue-600">
                Admin
              </a>
            </div>
          </nav>
        </div>
      </header>
      <main>{children}</main>
    </div>
  );
}
