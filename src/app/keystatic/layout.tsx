import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keystatic Admin',
  robots: 'noindex', // Crucial: Don't let Google index the admin page
};

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head />
      <body>{children}</body>
    </html>
  );
}
