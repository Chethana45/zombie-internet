'use client';

import { motion } from 'framer-motion';

export function SiteFooter() {
  return (
    <footer className="border-t border-zomb-border bg-zomb-black mt-8">
      <div className="px-4 py-4">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-3">
          <div className="text-xs font-mono text-zomb-green/40">
            ☣ ZOMBIE.NET — EMERGENCY BROADCAST SYSTEM
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-zomb-white/20">
            <span>RELAY NODE: ALPHA-7</span>
            <span>UPTIME: 99.2%</span>
            <motion.span
              animate={{ opacity: [0.2, 0.8, 0.2] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              SIGNAL STRONG
            </motion.span>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-zomb-border mb-3" />

        {/* Warning message */}
        <div className="text-center">
          <p className="text-xs font-mono text-zomb-white/20 leading-relaxed max-w-3xl mx-auto">
            THIS IS A SIMULATED EMERGENCY BROADCAST INTERFACE — ALL CONTENT IS FICTIONAL AND FOR ENTERTAINMENT PURPOSES ONLY.
            NO REAL EMERGENCY IS OCCURRING. IF YOU ARE EXPERIENCING A REAL EMERGENCY, CONTACT YOUR LOCAL AUTHORITIES.
          </p>
        </div>

        <div className="mt-3 flex items-center justify-center gap-2">
          <motion.span
            className="w-1 h-1 rounded-full bg-zomb-green/30"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
          <span className="text-xs font-mono text-zomb-white/15">
            ZOMBIE.NET © YEAR ZERO — ALL RIGHTS DEVOURED
          </span>
          <motion.span
            className="w-1 h-1 rounded-full bg-zomb-green/30"
            animate={{ opacity: [0.3, 1, 0.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: 1 }}
          />
        </div>
      </div>
    </footer>
  );
}
