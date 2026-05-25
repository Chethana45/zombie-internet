'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';

interface GlitchTextProps {
  text: string;
  className?: string;
  intensity?: 'low' | 'medium' | 'high';
  color?: 'green' | 'red' | 'amber' | 'white';
}

export function GlitchText({ text, className, intensity = 'medium', color = 'green' }: GlitchTextProps) {
  const colorClass = {
    green: 'text-zomb-green glow-green',
    red: 'text-zomb-red glow-red',
    amber: 'text-zomb-amber glow-amber',
    white: 'text-zomb-white',
  }[color];

  return (
    <span
      className={clsx('glitch-text relative inline-block', colorClass, className)}
      data-text={text}
    >
      {text}
    </span>
  );
}

interface TypewriterTextProps {
  text: string;
  className?: string;
  delay?: number;
  speed?: number;
}

export function TypewriterText({ text, className, delay = 0, speed = 50 }: TypewriterTextProps) {
  return (
    <motion.span
      className={className}
      initial={{ opacity: 1 }}
    >
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + i * (speed / 1000), duration: 0 }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export function BlinkingCursor({ className }: { className?: string }) {
  return (
    <motion.span
      className={clsx('inline-block text-zomb-green', className)}
      animate={{ opacity: [1, 0, 1] }}
      transition={{ duration: 1, repeat: Infinity, ease: 'steps(1)' }}
    >
      █
    </motion.span>
  );
}
