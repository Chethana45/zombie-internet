'use client';

import { motion } from 'framer-motion';
import { useGlitchTrigger } from '@/hooks/useInfectionCounter';

export function CRTOverlay() {
  const glitching = useGlitchTrigger(6000, 200);

  return (
    <>
      {/* Horizontal scan line that sweeps down */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-zomb-green/10 to-transparent pointer-events-none z-[9997]"
        animate={{ y: ['0vh', '100vh'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
      />

      {/* Occasional full-screen glitch flash */}
      {glitching && (
        <motion.div
          className="fixed inset-0 pointer-events-none z-[9996] bg-zomb-green/3"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0, 1, 0] }}
          transition={{ duration: 0.2 }}
          style={{
            backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(0,255,65,0.03) 3px, rgba(0,255,65,0.03) 4px)',
          }}
        />
      )}
    </>
  );
}

export function AmbientParticles() {
  const particles = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 2 + 0.5,
    duration: 8 + Math.random() * 15,
    delay: Math.random() * 10,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map(p => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-zomb-green/20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
