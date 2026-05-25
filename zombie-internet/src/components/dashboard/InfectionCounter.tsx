'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useInfectionCounter, useElapsedTime } from '@/hooks/useInfectionCounter';
import { infectionData } from '@/lib/data';
import { useState, useEffect } from 'react';

function AnimatedDigit({ digit }: { digit: string }) {
  return (
    <AnimatePresence mode="popLayout">
      <motion.span
        key={digit}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: 20, opacity: 0 }}
        transition={{ duration: 0.15, ease: 'easeOut' }}
        className="inline-block tabular-nums"
      >
        {digit}
      </motion.span>
    </AnimatePresence>
  );
}

export function InfectionCounter() {
  const count = useInfectionCounter();
  const elapsed = useElapsedTime();
  const [prevCount, setPrevCount] = useState(count);
  const [delta, setDelta] = useState(0);

  useEffect(() => {
    setDelta(count - prevCount);
    setPrevCount(count);
  }, [count]);

  const formatted = count.toLocaleString('en-US');
  const digits = formatted.split('');

  const totalConfirmed = infectionData.reduce((a, b) => a + b.confirmed, 0);
  const totalSuspected = infectionData.reduce((a, b) => a + b.suspected, 0);
  const totalCritical = infectionData.reduce((a, b) => a + b.critical, 0);

  return (
    <div className="relative overflow-hidden border border-zomb-red/40 bg-zomb-red-dark/20">
      {/* Animated red pulse border */}
      <motion.div
        className="absolute inset-0 border border-zomb-red/60 pointer-events-none"
        animate={{ opacity: [0.3, 1, 0.3] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zomb-red/30 bg-zomb-red/10">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-zomb-red"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="text-zomb-red text-xs font-mono tracking-widest uppercase font-bold">
            ☣ GLOBAL INFECTION COUNTER — LIVE
          </span>
        </div>
        <span className="text-zomb-red/60 text-xs font-mono">OUTBREAK T+{elapsed}</span>
      </div>

      {/* Main counter */}
      <div className="px-6 py-6 text-center">
        <div className="mb-1">
          <span className="text-zomb-red/50 text-xs font-mono tracking-[0.3em] uppercase">
            Confirmed Infected / Reanimated
          </span>
        </div>
        <div className="font-terminal text-6xl md:text-8xl text-zomb-red glow-red leading-none tracking-wider flex justify-center">
          {digits.map((d, i) => (
            <AnimatedDigit key={`${i}-${d}`} digit={d} />
          ))}
        </div>
        <motion.div
          className="mt-2 text-xs font-mono text-zomb-red/50"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          +{(3.7 + Math.random() * 2 - 1).toFixed(1)} NEW INFECTIONS / SECOND
        </motion.div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 border-t border-zomb-red/20">
        {[
          { label: 'CONFIRMED', value: totalConfirmed.toLocaleString(), color: 'text-zomb-red' },
          { label: 'SUSPECTED', value: totalSuspected.toLocaleString(), color: 'text-zomb-amber' },
          { label: 'CRITICAL', value: totalCritical.toLocaleString(), color: 'text-orange-400' },
        ].map((stat, i) => (
          <div
            key={stat.label}
            className={`px-4 py-3 text-center ${i < 2 ? 'border-r border-zomb-red/20' : ''}`}
          >
            <div className={`text-lg font-terminal ${stat.color}`}>{stat.value}</div>
            <div className="text-xs font-mono text-zomb-white/30 tracking-widest">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Region bars */}
      <div className="px-4 py-3 border-t border-zomb-red/20 space-y-2">
        <div className="text-xs font-mono text-zomb-red/50 tracking-widest mb-2">REGIONAL SPREAD</div>
        {infectionData.slice(0, 4).map((region) => {
          const pct = Math.min(100, (region.confirmed / 3000000) * 100);
          return (
            <div key={region.region} className="flex items-center gap-3">
              <span className="text-xs font-mono text-zomb-white/40 w-28 truncate">{region.region}</span>
              <div className="flex-1 h-1 bg-zomb-red/10 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-zomb-red rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 1.5, ease: 'easeOut' }}
                />
              </div>
              <span className="text-xs font-mono text-zomb-red/60 w-20 text-right">
                {region.confirmed.toLocaleString()}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
