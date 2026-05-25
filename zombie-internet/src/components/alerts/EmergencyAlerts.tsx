'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { emergencyAlerts } from '@/lib/data';
import type { Alert } from '@/types';

function AlertItem({ alert, index }: { alert: Alert; index: number }) {
  const [dismissed, setDismissed] = useState(false);

  const config = {
    critical: {
      border: 'border-zomb-red/60',
      bg: 'bg-zomb-red/8',
      titleColor: 'text-zomb-red',
      badgeBg: 'bg-zomb-red',
      badgeText: 'text-black',
      glow: 'box-glow-red',
      label: '● CRITICAL',
      pulse: true,
    },
    warning: {
      border: 'border-zomb-amber/50',
      bg: 'bg-zomb-amber/5',
      titleColor: 'text-zomb-amber',
      badgeBg: 'bg-zomb-amber',
      badgeText: 'text-black',
      glow: 'box-glow-amber',
      label: '▲ WARNING',
      pulse: false,
    },
    info: {
      border: 'border-blue-500/40',
      bg: 'bg-blue-500/5',
      titleColor: 'text-blue-400',
      badgeBg: 'bg-blue-500',
      badgeText: 'text-black',
      glow: '',
      label: '◆ INFO',
      pulse: false,
    },
  }[alert.level];

  if (dismissed) return null;

  return (
    <motion.div
      initial={{ opacity: 0, x: -20, height: 0 }}
      animate={{ opacity: 1, x: 0, height: 'auto' }}
      exit={{ opacity: 0, x: 20, height: 0 }}
      transition={{ delay: index * 0.1, duration: 0.3 }}
      className={`border ${config.border} ${config.bg} ${config.glow} relative overflow-hidden`}
    >
      {/* Critical flash overlay */}
      {alert.level === 'critical' && (
        <motion.div
          className="absolute inset-0 bg-zomb-red/5 pointer-events-none"
          animate={{ opacity: [0, 0.5, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div className="p-3">
        <div className="flex items-start justify-between gap-2 mb-1">
          <div className="flex items-center gap-2 flex-wrap">
            <motion.span
              className={`text-xs font-mono font-bold px-1.5 py-0.5 ${config.badgeBg} ${config.badgeText} tracking-widest`}
              animate={config.pulse ? { opacity: [1, 0.5, 1] } : {}}
              transition={{ duration: 1, repeat: Infinity }}
            >
              {config.label}
            </motion.span>
            <span className={`text-sm font-mono font-bold ${config.titleColor}`}>
              {alert.title}
            </span>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className="text-xs font-mono text-zomb-white/30">{alert.timestamp}</span>
            <button
              onClick={() => setDismissed(true)}
              className="text-zomb-white/20 hover:text-zomb-white/60 text-xs font-mono transition-colors"
            >
              [×]
            </button>
          </div>
        </div>
        <p className="text-xs font-mono text-zomb-white/60 leading-relaxed">{alert.message}</p>
        <div className="mt-1.5 text-xs font-mono text-zomb-white/25">
          SOURCE: {alert.source}
        </div>
      </div>
    </motion.div>
  );
}

const EXTRA_ALERTS: Omit<Alert, 'id'>[] = [
  {
    level: 'critical',
    title: '☣ NEW OUTBREAK — MIDWEST CORRIDOR',
    message: 'Rapid spread detected along I-80 corridor. Estimated 2.4M newly exposed. All travel between Chicago and Denver suspended immediately.',
    timestamp: '00:02:11',
    source: 'NATIONAL GUARD COMMAND',
  },
  {
    level: 'warning',
    title: '⚡ WATER SUPPLY CONTAMINATION RISK',
    message: 'Several municipal water treatment facilities offline. Boil all water before consumption. Do not drink tap water in zones 3, 5, 8, or 12.',
    timestamp: '00:08:55',
    source: 'EPA EMERGENCY OFFICE',
  },
];

export function EmergencyAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>(emergencyAlerts);
  const [newAlertQueue, setNewAlertQueue] = useState(0);

  // Periodically inject new alerts
  useEffect(() => {
    const interval = setInterval(() => {
      const extra = EXTRA_ALERTS[newAlertQueue % EXTRA_ALERTS.length];
      setAlerts(prev => [
        { ...extra, id: `new-${Date.now()}` },
        ...prev,
      ]);
      setNewAlertQueue(q => q + 1);
    }, 18000);
    return () => clearInterval(interval);
  }, [newAlertQueue]);

  return (
    <div className="space-y-0">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border border-zomb-red/40 bg-zomb-red/10 border-b-0">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-zomb-red"
            animate={{ opacity: [1, 0.1, 1], scale: [1, 1.3, 1] }}
            transition={{ duration: 0.8, repeat: Infinity }}
          />
          <span className="text-zomb-red text-xs font-mono tracking-widest uppercase font-bold">
            EMERGENCY ALERT SYSTEM — ACTIVE
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zomb-red/50">{alerts.length} ACTIVE</span>
        </div>
      </div>

      {/* Scrollable alert list */}
      <div className="border border-zomb-red/30 border-t-0 max-h-[520px] overflow-y-auto space-y-0 divide-y divide-zomb-red/10">
        <AnimatePresence>
          {alerts.map((alert, i) => (
            <AlertItem key={alert.id} alert={alert} index={i} />
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
