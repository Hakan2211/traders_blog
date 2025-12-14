import { Dock } from '@/components/dock';
import { reader } from '@/lib/reader';

export default async function SiteLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const settings = await reader.singletons.settings.read();
  const twitterUrl = settings?.twitterUrl;

  return (
    <>
      {/* Background Noise Texture */}
      <div
        className="fixed inset-0 z-0 opacity-[0.01] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      ></div>

      <main className="relative z-10 pb-32">{children}</main>

      <Dock twitterUrl={twitterUrl} />
    </>
  );
}
