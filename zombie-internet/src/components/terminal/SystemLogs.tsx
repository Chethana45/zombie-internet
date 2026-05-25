'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { systemLogs } from '@/lib/data';
import { TerminalPanel } from '@/components/ui/TerminalPanel';
import { BlinkingCursor } from '@/components/ui/GlitchText';
import type { SystemLog } from '@/types';
import clsx from 'clsx';

const AUTO_LOGS: Omit<SystemLog, 'id'>[] = [
  { timestamp: '', level: 'ERROR', message: 'Segment fault in outbreak_tracker.c:4471 — core dumped.', source: 'TRACKER' },
  { timestamp: '', level: 'CRITICAL', message: 'Power supply voltage dropping. Emergency shutdown in 60 seconds unless restored.', source: 'POWER' },
  { timestamp: '', level: 'WARN', message: 'Unusual memory access pattern detected. Possible rootkit infection.', source: 'SECURITY' },
  { timestamp: '', level: 'INFO', message: 'Satellite link re-established. Latency 1840ms. Acceptable for emergency ops.', source: 'SAT_LINK' },
  { timestamp: '', level: 'CRITICAL', message: 'PANIC: kernel: null pointer dereference at 0x000dead0beef.', source: 'KERNEL' },
  { timestamp: '', level: 'ERROR', message: 'Bio-sensor array offline: sectors 7, 8, 12, 19. No data from these zones.', source: 'BIO_SENSE' },
  { timestamp: '', level: 'INFO', message: 'Civilian check-in rate declining. Down 34% in last hour.', source: 'CIVIL_SYS' },
  { timestamp: '', level: 'WARN', message: 'Unidentified signal detected on military frequency 47.3MHz.', source: 'SIGNALS' },
  { timestamp: '', level: 'DEBUG', message: 'zombie_counter.run() > 3,900,000. Threshold exceeded. Escalating.', source: 'DEBUG' },
  { timestamp: '', level: 'CRITICAL', message: 'CONTAINMENT FAILURE: Zone 9G breach confirmed. 40,000+ exposed.', source: 'CONTAINMENT' },
];

function getTimestamp(): string {
  const now = new Date();
  return `${String(now.getHours()).padStart(2,'0')}:${String(now.getMinutes()).padStart(2,'0')}:${String(now.getSeconds()).padStart(2,'0')}.${String(now.getMilliseconds()).padStart(3,'0')}`;
}

function LogLine({ log, index }: { log: SystemLog; index: number }) {
  const levelConfig = {
    CRITICAL: 'text-zomb-red font-bold',
    ERROR: 'text-orange-400',
    WARN: 'text-zomb-amber',
    INFO: 'text-zomb-green/70',
    DEBUG: 'text-zomb-white/30',
  }[log.level];

  const levelBg = {
    CRITICAL: 'bg-zomb-red text-black',
    ERROR: 'bg-orange-500 text-black',
    WARN: 'bg-zomb-amber text-black',
    INFO: 'bg-zomb-green/30 text-zomb-green',
    DEBUG: 'bg-zomb-white/10 text-zomb-white/50',
  }[log.level];

  return (
    <motion.div
      initial={{ opacity: 0, x: -5 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.15, delay: index * 0.02 }}
      className={clsx(
        'px-3 py-1 flex items-start gap-2 font-mono text-xs hover:bg-zomb-white/3 transition-colors font-mono',
        log.level === 'CRITICAL' && 'bg-zomb-red/5'
      )}
    >
      <span className="text-zomb-white/20 shrink-0 w-28 text-xs">{log.timestamp}</span>
      <span className={clsx('shrink-0 px-1 text-xs font-bold tracking-wide w-16 text-center', levelBg)}>
        {log.level}
      </span>
      <span className="text-zomb-white/30 shrink-0 w-20 truncate text-xs">[{log.source}]</span>
      <span className={clsx('flex-1 leading-relaxed', levelConfig)}>{log.message}</span>
    </motion.div>
  );
}

export function SystemLogs() {
  const [logs, setLogs] = useState<SystemLog[]>(
    systemLogs.map(l => ({ ...l, timestamp: l.timestamp }))
  );
  const [autoIdx, setAutoIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (paused) return;
    const interval = setInterval(() => {
      const next = AUTO_LOGS[autoIdx % AUTO_LOGS.length];
      setLogs(prev => [
        { ...next, id: `auto-${Date.now()}`, timestamp: getTimestamp() },
        ...prev.slice(0, 49),
      ]);
      setAutoIdx(i => i + 1);
    }, 2500);
    return () => clearInterval(interval);
  }, [autoIdx, paused]);

  const criticalCount = logs.filter(l => l.level === 'CRITICAL').length;
  const errorCount = logs.filter(l => l.level === 'ERROR').length;

  return (
    <TerminalPanel
      title="SYSTEM LOG — KERNEL OUTPUT"
      subtitle={`${logs.length} ENTRIES`}
      borderColor="green"
      headerExtra={
        <div className="flex items-center gap-2">
          <span className="text-xs font-mono text-zomb-red/70">{criticalCount} CRIT</span>
          <span className="text-xs font-mono text-orange-400/70">{errorCount} ERR</span>
          <button
            onClick={() => setPaused(p => !p)}
            className={clsx(
              'text-xs font-mono px-2 py-0.5 border transition-colors',
              paused
                ? 'border-zomb-amber/40 text-zomb-amber hover:bg-zomb-amber/10'
                : 'border-zomb-green/30 text-zomb-green/60 hover:bg-zomb-green/10'
            )}
          >
            {paused ? '▶ RESUME' : '‖ PAUSE'}
          </button>
        </div>
      }
      animate={false}
    >
      <div
        ref={scrollRef}
        className="overflow-y-auto max-h-64 divide-y divide-zomb-border/50"
      >
        <AnimatePresence>
          {logs.map((log, i) => (
            <LogLine key={log.id} log={log} index={i} />
          ))}
        </AnimatePresence>
      </div>

      {/* Input prompt */}
      <div className="border-t border-zomb-border px-3 py-2 flex items-center gap-2 bg-zomb-dark">
        <span className="text-zomb-green/50 text-xs font-mono">root@zombie-net:~$</span>
        <span className="text-zomb-green text-xs font-mono">_</span>
        <BlinkingCursor className="text-xs" />
      </div>
    </TerminalPanel>
  );
}
