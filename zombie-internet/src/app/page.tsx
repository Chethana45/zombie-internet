'use client';

import { motion } from 'framer-motion';
import { SiteHeader } from '@/components/ui/SiteHeader';
import { SiteFooter } from '@/components/ui/SiteFooter';
import { CRTOverlay, AmbientParticles } from '@/components/ui/CRTOverlay';
import { InfectionCounter } from '@/components/dashboard/InfectionCounter';
import { NetworkDashboard } from '@/components/dashboard/NetworkDashboard';
import { EmergencyAlerts } from '@/components/alerts/EmergencyAlerts';
import { SocialFeed } from '@/components/feed/SocialFeed';
import { SystemLogs } from '@/components/terminal/SystemLogs';
import { MilitaryTerminal } from '@/components/terminal/MilitaryTerminal';
import { MissingPersons } from '@/components/feed/MissingPersons';

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="h-px flex-1 bg-gradient-to-r from-zomb-border to-transparent" />
      <span className="text-xs font-mono text-zomb-white/20 tracking-widest uppercase shrink-0">
        {children}
      </span>
      <div className="h-px flex-1 bg-gradient-to-l from-zomb-border to-transparent" />
    </div>
  );
}

export default function Home() {
  return (
    <div className="min-h-screen bg-zomb-black text-zomb-green relative">
      <AmbientParticles />
      <CRTOverlay />

      <SiteHeader />

      <main className="relative z-10 px-3 md:px-4 py-6 max-w-[1600px] mx-auto">

        {/* ── ROW 1: Infection counter (full width) ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6"
        >
          <SectionLabel>Global Situation</SectionLabel>
          <InfectionCounter />
        </motion.div>

        {/* ── ROW 2: Alerts + Social Feed ── */}
        <div className="mb-6">
          <SectionLabel>Live Intelligence</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <EmergencyAlerts />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.15 }}
            >
              <SocialFeed />
            </motion.div>
          </div>
        </div>

        {/* ── ROW 3: Network + Missing Persons ── */}
        <div className="mb-6">
          <SectionLabel>Infrastructure & Missing</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <NetworkDashboard />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.25 }}
            >
              <MissingPersons />
            </motion.div>
          </div>
        </div>

        {/* ── ROW 4: Military Terminal + System Logs ── */}
        <div className="mb-6">
          <SectionLabel>Terminal Access</SectionLabel>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <div className="space-y-2">
                <p className="text-xs font-mono text-zomb-amber/50 px-1">
                  ⚔ MILITARY TERMINAL — Type <span className="text-zomb-amber">help</span> to see commands
                </p>
                <MilitaryTerminal />
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.35 }}
            >
              <SystemLogs />
            </motion.div>
          </div>
        </div>

        {/* ── ROW 5: Bottom status bar ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="border border-zomb-border bg-zomb-dark px-4 py-2 flex flex-wrap items-center justify-between gap-2"
        >
          <div className="flex items-center gap-4 text-xs font-mono text-zomb-white/25">
            <span>NODE: EMERGENCY-RELAY</span>
            <span>INTEGRITY: 88%</span>
            <span>CONNECTIONS: 47,291,847</span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono">
            <motion.span
              className="text-zomb-green/40"
              animate={{ opacity: [0.4, 1, 0.4] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            >
              ● SYSTEM OPERATIONAL
            </motion.span>
            <span className="text-zomb-white/15">ZOMBIE.NET v2.1.4-emergency</span>
          </div>
        </motion.div>

      </main>

      <SiteFooter />
    </div>
  );
}
