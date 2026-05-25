'use client';

import { motion } from 'framer-motion';
import clsx from 'clsx';
import { ReactNode } from 'react';

interface TerminalPanelProps {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  className?: string;
  borderColor?: 'green' | 'red' | 'amber' | 'gray';
  headerExtra?: ReactNode;
  animate?: boolean;
}

export function TerminalPanel({
  title,
  subtitle,
  children,
  className,
  borderColor = 'green',
  headerExtra,
  animate = true,
}: TerminalPanelProps) {
  const borderClass = {
    green: 'border-zomb-green/30 box-glow-green',
    red: 'border-zomb-red/40 box-glow-red',
    amber: 'border-zomb-amber/30 box-glow-amber',
    gray: 'border-zomb-border',
  }[borderColor];

  const titleColorClass = {
    green: 'text-zomb-green',
    red: 'text-zomb-red',
    amber: 'text-zomb-amber',
    gray: 'text-zomb-white/60',
  }[borderColor];

  const panel = (
    <div className={clsx('terminal-panel border', borderClass, className)}>
      {(title || headerExtra) && (
        <div className={clsx(
          'flex items-center justify-between px-3 py-2 border-b',
          borderColor === 'red' ? 'border-zomb-red/20 bg-zomb-red/5' :
          borderColor === 'amber' ? 'border-zomb-amber/20 bg-zomb-amber/5' :
          borderColor === 'gray' ? 'border-zomb-border' :
          'border-zomb-green/15 bg-zomb-green/5'
        )}>
          <div>
            {title && (
              <span className={clsx('text-xs font-mono font-bold tracking-widest uppercase', titleColorClass)}>
                {title}
              </span>
            )}
            {subtitle && (
              <span className="ml-3 text-xs text-zomb-white/30 font-mono">{subtitle}</span>
            )}
          </div>
          {headerExtra && <div>{headerExtra}</div>}
        </div>
      )}
      <div>{children}</div>
    </div>
  );

  if (!animate) return panel;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      {panel}
    </motion.div>
  );
}

interface StatusBadgeProps {
  status: 'online' | 'offline' | 'degraded' | 'compromised' | 'critical' | 'warning' | 'info';
  label?: string;
  pulse?: boolean;
}

export function StatusBadge({ status, label, pulse = false }: StatusBadgeProps) {
  const config = {
    online: { color: 'bg-zomb-green', text: 'text-zomb-green', label: 'ONLINE' },
    offline: { color: 'bg-zomb-red', text: 'text-zomb-red', label: 'OFFLINE' },
    degraded: { color: 'bg-zomb-amber', text: 'text-zomb-amber', label: 'DEGRADED' },
    compromised: { color: 'bg-purple-500', text: 'text-purple-400', label: 'COMPROMISED' },
    critical: { color: 'bg-zomb-red', text: 'text-zomb-red', label: 'CRITICAL' },
    warning: { color: 'bg-zomb-amber', text: 'text-zomb-amber', label: 'WARNING' },
    info: { color: 'bg-blue-500', text: 'text-blue-400', label: 'INFO' },
  }[status];

  return (
    <span className={clsx('inline-flex items-center gap-1.5 text-xs font-mono', config.text)}>
      <span className={clsx('w-1.5 h-1.5 rounded-full', config.color, pulse && 'animate-pulse')} />
      {label || config.label}
    </span>
  );
}
