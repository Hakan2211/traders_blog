'use client';

import {
  MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Home, LineChart, PenTool, Settings } from 'lucide-react';
import Link from 'next/link';
import { useRef } from 'react';

export function Dock() {
  const mouseX = useMotionValue(Infinity);

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50">
      <motion.div
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
        className="mx-auto flex h-16 items-end gap-4 rounded-2xl border border-white/10 bg-neutral-900/50 px-4 pb-3 backdrop-blur-md shadow-2xl"
      >
        <DockIcon
          mouseX={mouseX}
          href="/"
          icon={<Home className="h-full w-full" />}
          label="Home"
        />
        <DockIcon
          mouseX={mouseX}
          href="/keystatic"
          icon={<PenTool className="h-full w-full" />}
          label="Admin"
        />
        {/* Decorative icons for the 'Trader' aesthetic */}
        <DockIcon
          mouseX={mouseX}
          href="/"
          icon={<LineChart className="h-full w-full" />}
          label="Markets"
        />
        <DockIcon
          mouseX={mouseX}
          href="/"
          icon={<Settings className="h-full w-full" />}
          label="Config"
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
    <Link href={href}>
      <motion.div
        ref={ref}
        style={{ width }}
        className="aspect-square w-10 rounded-full bg-neutral-800 border border-white/5 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-neutral-700 transition-colors relative group"
      >
        <span className="p-2">{icon}</span>

        {/* Tooltip */}
        <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-neutral-900 border border-white/10 rounded text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
          {label}
        </span>
      </motion.div>
    </Link>
  );
}
