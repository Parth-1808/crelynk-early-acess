import { useCallback, useMemo, useRef, type ReactNode } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface BubbleBackgroundProps {
  interactive?: boolean;
  colors?: {
    first?: string;
    second?: string;
    third?: string;
    fourth?: string;
    fifth?: string;
    sixth?: string;
  };
  intensity?: number;
  blurAmount?: number;
  className?: string;
  children?: ReactNode;
}

const DEFAULT_COLORS = {
  first: '18,113,255',
  second: '221,74,255',
  third: '0,220,255',
  fourth: '200,50,50',
  fifth: '180,180,50',
  sixth: '140,100,255',
};

const BLOB_COUNT = 6;

interface BlobConfig {
  color: string;
  size: number;
  startLeft: number;
  startTop: number;
  xKeyframes: number[];
  yKeyframes: number[];
  duration: number;
  delay: number;
  opacity: number;
  blur: number;
  mouseInfluence: number;
}

function generateBlobConfigs(
  colorValues: string[],
  blurAmount: number,
): BlobConfig[] {
  const configs: BlobConfig[] = [];

  for (let i = 0; i < BLOB_COUNT; i++) {
    const color = colorValues[i % colorValues.length];
    const quadrant = i % 4;
    let startLeft: number, startTop: number;

    switch (quadrant) {
      case 0: startLeft = -15 + Math.random() * 30; startTop = -15 + Math.random() * 40; break;
      case 1: startLeft = 55 + Math.random() * 35;  startTop = -15 + Math.random() * 40; break;
      case 2: startLeft = -15 + Math.random() * 30; startTop = 45 + Math.random() * 40; break;
      default: startLeft = 55 + Math.random() * 35;  startTop = 45 + Math.random() * 40; break;
    }

    const size = 500 + Math.random() * 500;
    const amp = 20 + Math.random() * 30;

    configs.push({
      color,
      size,
      startLeft,
      startTop,
      xKeyframes: [0, amp, -amp * 0.5, amp * 0.3, 0],
      yKeyframes: [0, -amp * 0.6, amp * 0.4, -amp * 0.2, 0],
      duration: 20 + Math.random() * 15 + i * 2,
      delay: i * 1.2,
      opacity: 0.04 + (i % colorValues.length) * 0.025,
      blur: blurAmount * (0.5 + (i % 6) * 0.08),
      mouseInfluence: 10 + i * 3,
    });
  }

  return configs;
}

function Blob({
  config,
  springX,
  springY,
  intensity,
}: {
  config: BlobConfig;
  springX: import('framer-motion').MotionValue<number>;
  springY: import('framer-motion').MotionValue<number>;
  intensity: number;
}) {
  const offsetX = useTransform(springX, [0, 1], [-config.mouseInfluence * intensity, config.mouseInfluence * intensity]);
  const offsetY = useTransform(springY, [0, 1], [-config.mouseInfluence * intensity, config.mouseInfluence * intensity]);

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${config.startLeft}%`,
        top: `${config.startTop}%`,
        width: config.size,
        height: config.size,
        borderRadius: '50%',
        background: `radial-gradient(circle at 35% 30%, rgba(${config.color},${config.opacity * 2.5}), rgba(${config.color},${config.opacity * 0.8}) 50%, transparent)`,
        filter: `blur(${config.blur}px)`,
        translateX: offsetX,
        translateY: offsetY,
        willChange: 'transform',
      }}
      animate={{
        x: config.xKeyframes,
        y: config.yKeyframes,
      }}
      transition={{
        duration: config.duration,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: config.delay,
        repeatType: 'mirror',
      }}
    />
  );
}

export function BubbleBackground({
  interactive = false,
  colors = DEFAULT_COLORS,
  intensity = 1,
  blurAmount = 100,
  className = '',
  children,
}: BubbleBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const springX = useSpring(mouseX, { stiffness: 20, damping: 10 });
  const springY = useSpring(mouseY, { stiffness: 20, damping: 10 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!interactive) return;
      const rect = containerRef.current?.getBoundingClientRect();
      if (!rect) return;
      mouseX.set((e.clientX - rect.left) / rect.width);
      mouseY.set((e.clientY - rect.top) / rect.height);
    },
    [interactive, mouseX, mouseY],
  );

  const handleMouseLeave = useCallback(() => {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }, [mouseX, mouseY]);

  const colorValues = useMemo(
    () => [
      colors.first || DEFAULT_COLORS.first,
      colors.second || DEFAULT_COLORS.second,
      colors.third || DEFAULT_COLORS.third,
      colors.fourth || DEFAULT_COLORS.fourth,
      colors.fifth || DEFAULT_COLORS.fifth,
      colors.sixth || DEFAULT_COLORS.sixth,
    ],
    [colors],
  );

  const blobs = useMemo(
    () => generateBlobConfigs(colorValues, blurAmount),
    [colorValues, blurAmount],
  );

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{
        overflow: 'hidden',
      }}
    >
      {blobs.map((config, i) => (
        <Blob
          key={i}
          config={config}
          springX={springX}
          springY={springY}
          intensity={intensity}
        />
      ))}

      {children}
    </div>
  );
}

export function BubbleBackgroundDemo({
  interactive,
}: {
  interactive?: boolean;
}) {
  return (
    <BubbleBackground
      interactive={interactive}
      className="absolute inset-0 flex items-center justify-center"
    />
  );
}
