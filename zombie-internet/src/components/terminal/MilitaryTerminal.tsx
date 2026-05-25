'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { BlinkingCursor } from '@/components/ui/GlitchText';

const BOOT_LINES = [
  '> INITIALIZING SECURE COMMS LAYER...',
  '> AUTHENTICATING: CLEARANCE LEVEL DELTA...',
  '> ENCRYPTION: AES-256-MIL ACTIVE',
  '> CONNECTING TO OPERATION LAST LIGHT HQ...',
  '> SYNC: JOINT CHIEFS OF STAFF — CONFIRMED',
  '> UPLINK: NSA RELAY NODE 7 — NOMINAL',
  '> WARNING: CIVILIAN CHANNELS COMPROMISED',
  '> MILITARY INTRANET: OPERATIONAL',
  '> READY FOR INPUT. TYPE "HELP" FOR COMMANDS.',
];

const COMMANDS: Record<string, string[]> = {
  help: [
    '  AVAILABLE COMMANDS:',
    '  status      — current operation status',
    '  zones       — list secure/infected zones',
    '  sitrep      — situation report',
    '  resources   — supply chain status',
    '  casualty    — casualty estimates',
    '  comms       — active comm channels',
    '  clear       — clear terminal',
  ],
  status: [
    '  ─── OPERATION LAST LIGHT ────────────────────',
    '  STATUS:       ACTIVE — PHASE 2 CONTAINMENT',
    '  COMMANDER:    GEN. MARCUS HOLLOWAY, US ARMY',
    '  THEATER:      CONTINENTAL UNITED STATES',
    '  FORCES DEPLOYED: 847,000 (Active) | 1.2M (Reserve)',
    '  CIVILIAN SAFE ZONES: 2,471 ACTIVE | 983 COMPROMISED',
    '  PERIMETER INTEGRITY: 61% — CRITICAL DECLINE',
    '  TIME SINCE OUTBREAK: 04:08:17',
    '  ─────────────────────────────────────────────',
  ],
  zones: [
    '  ─── ZONE STATUS ─────────────────────────────',
    '  ZONE A [SECURE]     Montana, Dakotas          ✓',
    '  ZONE B [SECURE]     Rural Wyoming, Idaho      ✓',
    '  ZONE C [CONTESTED]  Colorado, Utah            ⚠',
    '  ZONE D [INFECTED]   Illinois, Indiana         ✗',
    '  ZONE E [INFECTED]   Northeast Corridor        ✗',
    '  ZONE F [OVERRUN]    Metro NY/NJ               ✗',
    '  ZONE G [OVERRUN]    Los Angeles Basin         ✗',
    '  ZONE H [UNKNOWN]    Most of Florida           ?',
    '  ─────────────────────────────────────────────',
  ],
  sitrep: [
    '  ─── SITUATION REPORT — 04:17:00 UTC ─────────',
    '  THREAT: X-MRTZ-9B (mutated strain)',
    '  TRANSMISSION: Contact/Fluid — CONFIRMED',
    '  AIRBORNE: UNDER INVESTIGATION — ASSUME YES',
    '  INCUBATION: 4-18 hours post-exposure',
    '  REANIMATION: Within 2h of death by any cause',
    '  COGNITIVE FUNCTION: NONE. THREAT IS LETHAL.',
    '  ROE: SHOOT TO STOP. AIM CENTER MASS.',
    '  RECOMMENDATION: FULL STRATEGIC WITHDRAWAL',
    '  CLASSIFIED: EYES ONLY — LEVEL 5+',
    '  ─────────────────────────────────────────────',
  ],
  resources: [
    '  ─── SUPPLY CHAIN STATUS ─────────────────────',
    '  AMMUNITION:    CRITICAL — 23% RESERVES',
    '  FUEL:          LOW — 31% RESERVES',
    '  FOOD (MRE):    MODERATE — 67% RESERVES',
    '  WATER:         ADEQUATE — 78% RESERVES',
    '  MEDICAL:       CRITICAL — 12% RESERVES',
    '  COMMS GEAR:    MODERATE — 55% OPERATIONAL',
    '  AIRLIFT CAP:   DEGRADED — 40% OPERATIONAL',
    '  NEXT RESUPPLY: UNKNOWN — LOGISTICS COLLAPSED',
    '  ─────────────────────────────────────────────',
  ],
  casualty: [
    '  ─── CASUALTY ESTIMATES ──────────────────────',
    '  MILITARY KIA:      47,291',
    '  MILITARY MIA:      128,471',
    '  CIVILIAN DEAD:     1,847,291 (ESTIMATED)',
    '  CIVILIAN MISSING:  8,492,817',
    '  INFECTED/REANIMD:  3,847,291+ (RISING)',
    '  SAFE ZONE POP:     12,847,291',
    '  NOTE: DATA ACCURACY ~60%. FIELD COMMS DOWN.',
    '  THESE NUMBERS ARE 6 HOURS OLD.',
    '  ─────────────────────────────────────────────',
  ],
  comms: [
    '  ─── ACTIVE COMM CHANNELS ────────────────────',
    '  CH 1: JOINT CHIEFS HQ        [ENCRYPTED] ✓',
    '  CH 2: FEMA NATIONAL          [ENCRYPTED] ✓',
    '  CH 3: CDC EMERGENCY          [DEGRADED]  ⚠',
    '  CH 4: NATO COMMAND           [OFFLINE]   ✗',
    '  CH 5: WHITE HOUSE BUNKER     [ENCRYPTED] ✓',
    '  CH 6: CIVILIAN BROADCAST     [OPEN]      ✓',
    '  CH 7: HAM RELAY NETWORK      [OPEN]      ✓',
    '  CH 8: ISS ORBITAL RELAY      [NOMINAL]   ✓',
    '  ─────────────────────────────────────────────',
  ],
};

export function MilitaryTerminal() {
  const [output, setOutput] = useState<{ text: string; type: 'system' | 'input' | 'response' | 'error' }[]>([]);
  const [input, setInput] = useState('');
  const [booting, setBooting] = useState(true);
  const [bootLine, setBootLine] = useState(0);
  const [ready, setReady] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bootLine < BOOT_LINES.length) {
      const timeout = setTimeout(() => {
        setOutput(prev => [...prev, { text: BOOT_LINES[bootLine], type: 'system' }]);
        setBootLine(b => b + 1);
      }, 300 + Math.random() * 200);
      return () => clearTimeout(timeout);
    } else {
      setTimeout(() => {
        setBooting(false);
        setReady(true);
      }, 500);
    }
  }, [bootLine]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [output]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    setOutput(prev => [...prev, { text: `> ${cmd}`, type: 'input' }]);

    if (trimmed === 'clear') {
      setTimeout(() => setOutput([]), 100);
      return;
    }

    const response = COMMANDS[trimmed];
    if (response) {
      setTimeout(() => {
        setOutput(prev => [...prev, ...response.map(r => ({ text: r, type: 'response' as const }))]);
      }, 100);
    } else if (trimmed === '') {
      return;
    } else {
      setTimeout(() => {
        setOutput(prev => [...prev, {
          text: `  UNKNOWN COMMAND: "${trimmed}". TYPE "HELP" FOR AVAILABLE COMMANDS.`,
          type: 'error',
        }]);
      }, 100);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && input !== '') return;
    handleCommand(input);
    setInput('');
  };

  return (
    <div
      className="border border-zomb-amber/40 bg-zomb-dark relative overflow-hidden cursor-text"
      style={{ boxShadow: '0 0 20px rgba(255, 170, 0, 0.15), inset 0 0 20px rgba(255, 170, 0, 0.03)' }}
      onClick={() => inputRef.current?.focus()}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2 border-b border-zomb-amber/30 bg-zomb-amber/8">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-zomb-amber"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.2, repeat: Infinity }}
          />
          <span className="text-zomb-amber text-xs font-mono tracking-widest font-bold uppercase">
            MIL-TERM // OPERATION LAST LIGHT — CLASSIFIED
          </span>
        </div>
        <span className="text-xs font-mono text-zomb-amber/40">CLEARANCE: DELTA-5</span>
      </div>

      {/* Terminal output */}
      <div
        ref={scrollRef}
        className="p-4 h-56 overflow-y-auto font-mono text-xs space-y-0.5"
      >
        <AnimatePresence>
          {output.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.1 }}
              className={
                line.type === 'system' ? 'text-zomb-amber/70' :
                line.type === 'input' ? 'text-zomb-white/80' :
                line.type === 'error' ? 'text-zomb-red/80' :
                'text-zomb-amber/90'
              }
            >
              {line.text}
            </motion.div>
          ))}
        </AnimatePresence>
        {booting && (
          <motion.span
            className="text-zomb-amber/50"
            animate={{ opacity: [1, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
          >
            ▌
          </motion.span>
        )}
      </div>

      {/* Input */}
      {ready && (
        <div className="border-t border-zomb-amber/20 px-4 py-2 flex items-center gap-2 bg-zomb-dark">
          <span className="text-zomb-amber/60 text-xs font-mono shrink-0">
            mil-net@delta:~$
          </span>
          <form onSubmit={handleSubmit} className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              className="flex-1 bg-transparent text-zomb-amber text-xs font-mono outline-none border-none"
              autoComplete="off"
              spellCheck={false}
              placeholder="type command..."
            />
          </form>
          <BlinkingCursor className="text-zomb-amber text-xs" />
        </div>
      )}
    </div>
  );
}
