import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Keystatic Admin',
  robots: 'noindex',
};

export default function KeystaticLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="keystatic-admin">{children}</div>;
}
