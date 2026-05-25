'use client';

import { motion } from 'framer-motion';
import { TerminalPanel, StatusBadge } from '@/components/ui/TerminalPanel';
import { missingPersons } from '@/lib/data';
import { useState } from 'react';
import clsx from 'clsx';

export function MissingPersons() {
  const [selected, setSelected] = useState<string | null>(null);
  const [search, setSearch] = useState('');

  const filtered = missingPersons.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.lastSeen.toLowerCase().includes(search.toLowerCase())
  );

  const missing = missingPersons.filter(p => p.status === 'missing').length;
  const unknown = missingPersons.filter(p => p.status === 'unknown').length;

  return (
    <TerminalPanel
      title="☐ MISSING PERSONS DATABASE"
      subtitle={`${missingPersons.length} REPORTS ACTIVE`}
      borderColor="amber"
      headerExtra={
        <div className="flex items-center gap-3 text-xs font-mono">
          <span className="text-zomb-amber/70">{missing} MISSING</span>
          <span className="text-zomb-white/30">{unknown} UNKNOWN</span>
        </div>
      }
    >
      {/* Stats banner */}
      <div className="px-4 py-2 border-b border-zomb-amber/20 bg-zomb-amber/3">
        <p className="text-xs font-mono text-zomb-amber/60">
          ⚠ DATABASE PARTIALLY DEGRADED — LAST FULL SYNC: 2H AGO — SUBMIT REPORTS VIA EMERGENCY RELAY
        </p>
      </div>

      {/* Search */}
      <div className="px-4 py-2 border-b border-zomb-border">
        <div className="flex items-center gap-2">
          <span className="text-zomb-amber/50 text-xs font-mono">SEARCH:</span>
          <input
            type="text"
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="name or location..."
            className="flex-1 bg-transparent text-zomb-white/70 text-xs font-mono outline-none border-none placeholder-zomb-white/20"
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="text-zomb-white/30 hover:text-zomb-white/60 text-xs font-mono"
            >
              [×]
            </button>
          )}
        </div>
      </div>

      {/* Person list */}
      <div className="divide-y divide-zomb-border max-h-[420px] overflow-y-auto">
        {filtered.map((person, i) => {
          const isSelected = selected === person.id;
          const statusColor = {
            missing: 'text-zomb-red',
            unknown: 'text-zomb-amber',
            found: 'text-zomb-green',
            deceased: 'text-zomb-white/40',
          }[person.status];

          return (
            <motion.div
              key={person.id}
              initial={{ opacity: 0, y: 5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className={clsx(
                'cursor-pointer transition-colors',
                isSelected
                  ? 'bg-zomb-amber/8 border-l-2 border-l-zomb-amber'
                  : 'hover:bg-zomb-white/3 border-l-2 border-l-transparent'
              )}
              onClick={() => setSelected(isSelected ? null : person.id)}
            >
              <div className="px-4 py-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      {/* Photo placeholder */}
                      <div className="w-8 h-8 border border-zomb-amber/30 bg-zomb-amber/5 flex items-center justify-center text-zomb-amber/50 text-xs font-terminal shrink-0">
                        {person.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-mono font-bold text-zomb-white/80">
                            {person.name}
                          </span>
                          <span className="text-xs font-mono text-zomb-white/30">
                            Age {person.age}
                          </span>
                          <span className={clsx('text-xs font-mono font-bold uppercase', statusColor)}>
                            [{person.status}]
                          </span>
                        </div>
                        <div className="text-xs font-mono text-zomb-white/40 mt-0.5">
                          Last seen: {person.lastSeen}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <div className="text-xs font-mono text-zomb-white/25">
                      {person.daysAgo === 0 ? 'Today' : `${person.daysAgo}d ago`}
                    </div>
                    <div className="text-xs font-mono text-zomb-amber/40 mt-0.5">
                      {isSelected ? '▲ COLLAPSE' : '▼ DETAILS'}
                    </div>
                  </div>
                </div>

                {/* Expanded details */}
                {isSelected && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.2 }}
                    className="mt-3 pl-10 space-y-1.5 border-l border-zomb-amber/20"
                  >
                    <div>
                      <span className="text-xs font-mono text-zomb-white/30">DESCRIPTION: </span>
                      <span className="text-xs font-mono text-zomb-white/60">{person.description}</span>
                    </div>
                    <div>
                      <span className="text-xs font-mono text-zomb-white/30">CONTACT: </span>
                      <span className="text-xs font-mono text-zomb-amber/70">{person.contact}</span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <button className="text-xs font-mono px-2 py-1 border border-zomb-amber/30 text-zomb-amber/70 hover:bg-zomb-amber/10 transition-colors">
                        [REPORT SIGHTING]
                      </button>
                      <button className="text-xs font-mono px-2 py-1 border border-zomb-white/10 text-zomb-white/30 hover:bg-zomb-white/5 transition-colors">
                        [SHARE]
                      </button>
                    </div>
                  </motion.div>
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer CTA */}
      <div className="px-4 py-2.5 border-t border-zomb-amber/20 bg-zomb-dark flex items-center justify-between">
        <span className="text-xs font-mono text-zomb-white/25">
          SUBMIT MISSING PERSON: RELAY NODE 7 → CHANNEL 6
        </span>
        <motion.span
          className="text-xs font-mono text-zomb-amber/50"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          {missingPersons.length} REPORTS TOTAL
        </motion.span>
      </div>
    </TerminalPanel>
  );
}
