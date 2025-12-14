'use client';

import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Home, PenTool, Twitter } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function Dock({ twitterUrl }: { twitterUrl?: string | null }) {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-end gap-4 rounded-full border border-white/20 bg-neutral-900/60 px-4 pb-3 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] ring-1 ring-white/10"
      >
        <DockIcon
          mouseX={mouseX}
          href="/"
          icon={<Home className="h-full w-full" />}
          label="Home"
        />
        {twitterUrl && (
          <DockIcon
            mouseX={mouseX}
            href={twitterUrl}
            icon={<Twitter className="h-full w-full" />}
            label="Twitter"
          />
        )}
        <DockIcon
          mouseX={mouseX}
          href="/keystatic"
          icon={<PenTool className="h-full w-full" />}
          label="Admin"
        />
      </motion.div>
    </div>
  );
}

function DockIcon({
  mouseX,
  icon,
  href,
  label,
}: {
  mouseX: MotionValue;
  icon: React.ReactNode;
  href: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const distance = useTransform(mouseX, (val) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useSpring(widthSync, {
    mass: 0.1,
    stiffness: 150,
    damping: 12,
  });

  return (
    <Link
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
    >
      <motion.div
        ref={ref}
        style={{ width }}
        className="aspect-square w-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all relative group shadow-inner shadow-white/5"
      >
        <span className="p-2">{icon}</span>

        {/* Tooltip */}
        <span className="absolute -top-12 left-1/2 -translate-x-1/2 px-3 py-1.5 bg-neutral-900 border border-white/20 rounded-lg text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-xl">
          {label}
        </span>
      </motion.div>
    </Link>
  );
}
