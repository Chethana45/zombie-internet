'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { GlitchText } from '@/components/ui/GlitchText';
import { useElapsedTime } from '@/hooks/useInfectionCounter';

const TICKER_ITEMS = [
  '⚠ MARTIAL LAW IN EFFECT — ALL METRO AREAS',
  '☣ CDC: NEW MUTATION DETECTED — X-MRTZ-9B — INCREASED TRANSMISSION RATE',
  '🛡 MILITARY PERIMETER ACTIVE — DO NOT APPROACH CHECKPOINTS WITHOUT ID',
  '🚨 EASTERN SEABOARD QUARANTINE FAILING — EVACUATE NORTH IMMEDIATELY',
  '⚡ POWER GRID: 72 HOURS TO FAILURE — EASTERN US',
  '📡 INTERNET UPTIME DEGRADED — PRIORITIZED FOR EMERGENCY COMMS ONLY',
  '🏥 ALL HOSPITALS IN ZONES D-F OVERRUN — DO NOT SEEK MEDICAL AID IN THOSE AREAS',
  '💧 WATER SUPPLY COMPROMISED IN ZONES 3, 5, 8, 12 — BOIL ALL WATER',
  '✈ ALL CIVILIAN AIR TRAVEL SUSPENDED — MILITARY FLIGHTS ONLY',
  '🔴 SHOOT-ON-SIGHT ORDER: ANYONE APPROACHING INFECTED WITHOUT GEAR',
  '☢ NUCLEAR PLANTS ENTERING CONTROLLED SHUTDOWN — REMAIN CALM',
  '📻 HAM RADIO NETWORK ACTIVE — FREQ: 7.285 MHz — FOR CIVILIAN COMMS',
];

function TickerTape() {
  const [idx, setIdx] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIdx(i => (i + 1) % TICKER_ITEMS.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-0 overflow-hidden border-b border-zomb-red/30 bg-zomb-red/10">
      <div className="shrink-0 bg-zomb-red px-3 py-1.5 text-black text-xs font-mono font-bold tracking-widest uppercase">
        BREAKING
      </div>
      <div className="flex-1 overflow-hidden py-1.5 px-3">
        <AnimatePresence mode="wait">
          <motion.span
            key={idx}
            initial={{ x: 60, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -60, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeOut' }}
            className="text-xs font-mono text-zomb-red/90 block"
          >
            {TICKER_ITEMS[idx]}
          </motion.span>
        </AnimatePresence>
      </div>
      <div className="shrink-0 px-3 text-xs font-mono text-zomb-red/40">
        {idx + 1}/{TICKER_ITEMS.length}
      </div>
    </div>
  );
}

export function SiteHeader() {
  const elapsed = useElapsedTime();
  const [time, setTime] = useState('');

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(now.toUTCString().replace('GMT', 'UTC'));
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="border-b border-zomb-border sticky top-0 z-50 bg-zomb-black/95 backdrop-blur-sm">
      <TickerTape />

      {/* Main header */}
      <div className="px-4 py-3 flex items-center justify-between gap-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="text-2xl"
          >
            ☣
          </motion.div>
          <div>
            <GlitchText
              text="ZOMBIE.NET"
              className="text-2xl md:text-3xl font-display tracking-[0.15em] block"
              color="green"
            />
            <span className="text-xs font-mono text-zomb-green/40 tracking-widest">
              EMERGENCY BROADCAST SYSTEM v2.1.4
            </span>
          </div>
        </div>

        {/* Status indicators */}
        <div className="hidden md:flex items-center gap-4 text-xs font-mono">
          <div className="text-center">
            <div className="text-zomb-red glow-red font-bold text-sm">CRITICAL</div>
            <div className="text-zomb-white/30">THREAT LEVEL</div>
          </div>
          <div className="w-px h-8 bg-zomb-border" />
          <div className="text-center">
            <div className="text-zomb-amber font-bold text-sm">{elapsed}</div>
            <div className="text-zomb-white/30">OUTBREAK T+</div>
          </div>
          <div className="w-px h-8 bg-zomb-border" />
          <div className="text-center hidden lg:block">
            <div className="text-zomb-white/50 text-xs">{time}</div>
            <div className="text-zomb-white/30">CURRENT TIME</div>
          </div>
        </div>

        {/* Live indicator */}
        <div className="flex items-center gap-2">
          <motion.div
            className="w-2 h-2 rounded-full bg-zomb-red"
            animate={{ opacity: [1, 0.2, 1], scale: [1, 1.4, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="text-xs font-mono text-zomb-red font-bold tracking-widest">LIVE</span>
        </div>
      </div>

      {/* Nav */}
      <div className="border-t border-zomb-border flex overflow-x-auto">
        {[
          { label: '☣ INFECTION FEED', active: true },
          { label: '⚠ ALERTS', active: false },
          { label: '◈ NETWORK', active: false },
          { label: '⚔ MIL-OPS', active: false },
          { label: '☐ MISSING', active: false },
          { label: '▓ LOGS', active: false },
        ].map(item => (
          <div
            key={item.label}
            className={`px-4 py-2 text-xs font-mono tracking-wider border-r border-zomb-border shrink-0 cursor-default transition-colors ${
              item.active
                ? 'bg-zomb-green/10 text-zomb-green border-b-2 border-b-zomb-green'
                : 'text-zomb-white/30 hover:text-zomb-white/60 hover:bg-zomb-white/5'
            }`}
          >
            {item.label}
          </div>
        ))}
      </div>
    </header>
  );
}
