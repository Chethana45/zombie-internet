'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { socialPosts } from '@/lib/data';
import type { SocialPost } from '@/types';
import clsx from 'clsx';

const NEW_POSTS: Omit<SocialPost, 'id'>[] = [
  {
    username: 'PanicBroadcast',
    handle: '@panic__broadcast',
    content: 'THEY JUST BREACHED THE HOSPITAL ON 9TH STREET. STAFF AND PATIENTS RUNNING. SOMEBODY HELP US PLEASE. ANYONE. I\'M ON THE 4TH FLOOR.',
    timestamp: 'just now',
    likes: 0,
    replies: 0,
    location: 'Portland, OR',
  },
  {
    username: '▓▒░H4RV3Y░▒▓',
    handle: '@h4rv3y_turns',
    content: 'i SeE yOu On yOuR pHoNe. I kNoW wHeRe YoU aRe. TaSty TaStY hUmAn. CoMiNg SoOn. WaIt FoR uS :)',
    timestamp: 'just now',
    likes: Math.floor(Math.random() * 50000),
    replies: Math.floor(Math.random() * 5000),
    isInfected: true,
  },
  {
    username: 'GridSurvivor77',
    handle: '@grid_survivor77',
    content: 'Confirmed: the tunnels under 3rd Ave are CLEAR. Take the maintenance entrance near Gate B. We have 40 people down here. Medical supplies and food for 2 weeks. No infected. Come if you can.',
    timestamp: 'just now',
    likes: Math.floor(Math.random() * 200000),
    replies: Math.floor(Math.random() * 50000),
    location: 'Seattle, WA',
  },
];

function PostCard({ post, isNew = false }: { post: SocialPost; isNew?: boolean }) {
  const [likes, setLikes] = useState(post.likes);

  useEffect(() => {
    const interval = setInterval(() => {
      setLikes(l => l + Math.floor(Math.random() * 50));
    }, 3000 + Math.random() * 5000);
    return () => clearInterval(interval);
  }, []);

  const postStyle = post.isInfected
    ? 'border-zomb-red/40 bg-zomb-red/5'
    : post.isOfficial || post.isMilitary
    ? 'border-zomb-green/30 bg-zomb-green/3'
    : 'border-zomb-border bg-zomb-dark';

  const nameColor = post.isInfected
    ? 'text-zomb-red'
    : post.isMilitary
    ? 'text-zomb-amber'
    : post.isOfficial
    ? 'text-zomb-green'
    : 'text-zomb-white/80';

  const textColor = post.isInfected
    ? 'text-zomb-red/80'
    : 'text-zomb-white/70';

  return (
    <motion.div
      initial={isNew ? { opacity: 0, y: -30, scale: 0.97 } : { opacity: 1 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      className={clsx('border p-3 relative overflow-hidden', postStyle)}
    >
      {/* Infected glitch overlay */}
      {post.isInfected && (
        <motion.div
          className="absolute inset-0 bg-zomb-red/10 pointer-events-none"
          animate={{ opacity: [0, 0.3, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, times: [0, 0.5, 1] }}
        />
      )}

      {/* New post flash */}
      {isNew && (
        <motion.div
          className="absolute top-0 left-0 right-0 h-0.5 bg-zomb-green"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.3 }}
        />
      )}

      <div className="flex items-start gap-2">
        {/* Avatar */}
        <div className={clsx(
          'w-8 h-8 rounded-sm flex items-center justify-center text-xs font-terminal shrink-0 border',
          post.isInfected
            ? 'bg-zomb-red/20 border-zomb-red/40 text-zomb-red'
            : post.isMilitary
            ? 'bg-zomb-amber/20 border-zomb-amber/30 text-zomb-amber'
            : post.isOfficial
            ? 'bg-zomb-green/15 border-zomb-green/30 text-zomb-green'
            : 'bg-zomb-gray border-zomb-border text-zomb-white/40'
        )}>
          {post.isInfected ? '☣' : post.isMilitary ? '⚔' : post.isOfficial ? '◈' : post.username.charAt(0)}
        </div>

        <div className="flex-1 min-w-0">
          {/* Name row */}
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className={clsx('text-xs font-mono font-bold', nameColor)}>
              {post.username}
            </span>
            {post.verified && (
              <span className="text-xs text-zomb-green/60">✓</span>
            )}
            <span className="text-xs font-mono text-zomb-white/25">{post.handle}</span>
            {post.isMilitary && (
              <span className="text-xs font-mono px-1 py-0 bg-zomb-amber/20 text-zomb-amber border border-zomb-amber/30">
                MILITARY
              </span>
            )}
            {post.isOfficial && (
              <span className="text-xs font-mono px-1 py-0 bg-zomb-green/15 text-zomb-green border border-zomb-green/30">
                OFFICIAL
              </span>
            )}
            {post.isInfected && (
              <motion.span
                className="text-xs font-mono px-1 py-0 bg-zomb-red/20 text-zomb-red border border-zomb-red/40"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 0.8, repeat: Infinity }}
              >
                ☣ INFECTED
              </motion.span>
            )}
          </div>

          {/* Content */}
          <p className={clsx(
            'text-xs font-mono leading-relaxed',
            textColor,
            post.isInfected && 'tracking-wide'
          )}>
            {post.content}
          </p>

          {/* Footer */}
          <div className="mt-2 flex items-center gap-4 text-xs font-mono text-zomb-white/25">
            <span>♥ {likes.toLocaleString()}</span>
            <span>↩ {post.replies.toLocaleString()}</span>
            {post.location && <span>◎ {post.location}</span>}
            <span className="ml-auto">{post.timestamp}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

export function SocialFeed() {
  const [posts, setPosts] = useState<SocialPost[]>(socialPosts);
  const [newPostIdx, setNewPostIdx] = useState(0);
  const [filter, setFilter] = useState<'all' | 'official' | 'infected' | 'civilian'>('all');

  useEffect(() => {
    const interval = setInterval(() => {
      const next = NEW_POSTS[newPostIdx % NEW_POSTS.length];
      setPosts(prev => [{ ...next, id: `live-${Date.now()}` }, ...prev.slice(0, 29)]);
      setNewPostIdx(i => i + 1);
    }, 7000);
    return () => clearInterval(interval);
  }, [newPostIdx]);

  const filtered = posts.filter(p => {
    if (filter === 'official') return p.isOfficial || p.isMilitary;
    if (filter === 'infected') return p.isInfected;
    if (filter === 'civilian') return !p.isOfficial && !p.isMilitary && !p.isInfected;
    return true;
  });

  const FILTERS = [
    { key: 'all', label: 'ALL' },
    { key: 'official', label: 'OFFICIAL' },
    { key: 'infected', label: '☣ INFECTED' },
    { key: 'civilian', label: 'CIVILIAN' },
  ] as const;

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="border border-zomb-green/30 border-b-0 bg-zomb-green/5 px-4 py-2.5 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <motion.span
            className="w-2 h-2 rounded-full bg-zomb-green"
            animate={{ opacity: [1, 0.2, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
          />
          <span className="text-zomb-green text-xs font-mono tracking-widest uppercase font-bold">
            PANIC FEED — LIVE SOCIAL STREAM
          </span>
        </div>
        <span className="text-xs font-mono text-zomb-green/40">
          {posts.length} POSTS
        </span>
      </div>

      {/* Filter tabs */}
      <div className="border border-zomb-green/20 border-b-0 border-t-0 flex">
        {FILTERS.map(f => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={clsx(
              'flex-1 py-1.5 text-xs font-mono tracking-widest transition-colors border-r last:border-r-0 border-zomb-green/10',
              filter === f.key
                ? 'bg-zomb-green/15 text-zomb-green'
                : 'text-zomb-white/30 hover:text-zomb-white/60 hover:bg-zomb-white/5'
            )}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Feed */}
      <div className="border border-zomb-green/20 border-t-0 flex-1 overflow-y-auto max-h-[600px]">
        <div className="divide-y divide-zomb-border">
          <AnimatePresence>
            {filtered.map((post, i) => (
              <PostCard
                key={post.id}
                post={post}
                isNew={i === 0 && post.id.startsWith('live-')}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
