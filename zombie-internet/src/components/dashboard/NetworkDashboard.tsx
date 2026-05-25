'use client';

import { motion } from 'framer-motion';
import { TerminalPanel, StatusBadge } from '@/components/ui/TerminalPanel';
import { networkNodes } from '@/lib/data';
import { useState, useEffect } from 'react';
import type { NetworkNode } from '@/types';

function IntegrityBar({ value, status }: { value: number; status: NetworkNode['status'] }) {
  const color =
    status === 'online' ? 'bg-zomb-green' :
    status === 'degraded' ? 'bg-zomb-amber' :
    status === 'compromised' ? 'bg-purple-500' :
    'bg-zomb-red/30';

  return (
    <div className="flex items-center gap-2">
      <div className="flex-1 h-1.5 bg-zomb-border rounded-full overflow-hidden">
        <motion.div
          className={`h-full rounded-full ${color}`}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
        />
      </div>
      <span className="text-xs font-mono text-zomb-white/40 w-8 text-right">{value}%</span>
    </div>
  );
}

export function NetworkDashboard() {
  const [nodes, setNodes] = useState(networkNodes);
  const [totalIntegrity, setTotalIntegrity] = useState(0);

  useEffect(() => {
    const avg = nodes.reduce((a, b) => a + b.integrity, 0) / nodes.length;
    setTotalIntegrity(Math.round(avg));
  }, [nodes]);

  // Occasionally degrade a random node
  useEffect(() => {
    const interval = setInterval(() => {
      setNodes(prev => prev.map(node => {
        if (node.status === 'online' && Math.random() < 0.15) {
          const drop = Math.floor(Math.random() * 5);
          return { ...node, integrity: Math.max(0, node.integrity - drop) };
        }
        return node;
      }));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const online = nodes.filter(n => n.status === 'online').length;
  const degraded = nodes.filter(n => n.status === 'degraded').length;
  const offline = nodes.filter(n => n.status === 'offline' || n.status === 'compromised').length;

  return (
    <TerminalPanel
      title="NETWORK INTEGRITY DASHBOARD"
      subtitle={`${nodes.length} NODES MONITORED`}
      borderColor="green"
      headerExtra={
        <div className="flex items-center gap-2">
          <motion.div
            className="w-1.5 h-1.5 rounded-full bg-zomb-green"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-xs font-mono text-zomb-green/60">LIVE</span>
        </div>
      }
    >
      {/* Overall health */}
      <div className="px-4 py-3 border-b border-zomb-border grid grid-cols-4 gap-4">
        {[
          { label: 'NET INTEGRITY', value: `${totalIntegrity}%`, color: totalIntegrity > 60 ? 'text-zomb-green' : totalIntegrity > 30 ? 'text-zomb-amber' : 'text-zomb-red' },
          { label: 'ONLINE', value: online, color: 'text-zomb-green' },
          { label: 'DEGRADED', value: degraded, color: 'text-zomb-amber' },
          { label: 'OFFLINE/COMP', value: offline, color: 'text-zomb-red' },
        ].map(s => (
          <div key={s.label} className="text-center">
            <div className={`text-xl font-terminal ${s.color}`}>{s.value}</div>
            <div className="text-xs font-mono text-zomb-white/30 tracking-widest">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Node list */}
      <div className="divide-y divide-zomb-border">
        {nodes.map((node, i) => (
          <motion.div
            key={node.id}
            className="px-4 py-2.5 hover:bg-zomb-green/3 transition-colors"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.05 }}
          >
            <div className="flex items-center justify-between mb-1">
              <div className="flex items-center gap-3">
                <StatusBadge status={node.status} pulse={node.status === 'online'} />
                <span className="text-xs font-mono text-zomb-white/70">{node.name}</span>
              </div>
              <div className="flex items-center gap-3 text-right">
                <span className="text-xs font-mono text-zomb-white/30 hidden sm:block">{node.region}</span>
                <span className="text-xs font-mono text-zomb-white/20">{node.lastPing}</span>
              </div>
            </div>
            <IntegrityBar value={node.integrity} status={node.status} />
          </motion.div>
        ))}
      </div>

      {/* Footer */}
      <div className="px-4 py-2 border-t border-zomb-border bg-zomb-dark flex items-center justify-between">
        <span className="text-xs font-mono text-zomb-white/20">
          LAST FULL SYNC: 04:18:17 UTC
        </span>
        <motion.span
          className="text-xs font-mono text-zomb-green/40"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          AUTO-REFRESH: 10s
        </motion.span>
      </div>
    </TerminalPanel>
  );
}
