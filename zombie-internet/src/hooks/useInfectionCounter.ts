'use client';

import { useState, useEffect } from 'react';
import { INITIAL_INFECTION_COUNT, INFECTION_RATE_PER_SECOND } from '@/lib/data';

export function useInfectionCounter() {
  const [count, setCount] = useState(INITIAL_INFECTION_COUNT);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount(prev => prev + INFECTION_RATE_PER_SECOND + (Math.random() * 2 - 1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return Math.floor(count);
}

export function useElapsedTime(startSeconds = 14729) {
  const [elapsed, setElapsed] = useState(startSeconds);

  useEffect(() => {
    const interval = setInterval(() => {
      setElapsed(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const hours = Math.floor(elapsed / 3600);
  const minutes = Math.floor((elapsed % 3600) / 60);
  const seconds = elapsed % 60;

  return `${String(hours).padStart(3, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

export function useGlitchTrigger(interval = 5000, duration = 300) {
  const [glitching, setGlitching] = useState(false);

  useEffect(() => {
    const trigger = setInterval(() => {
      setGlitching(true);
      setTimeout(() => setGlitching(false), duration);
    }, interval + Math.random() * 3000);
    return () => clearInterval(trigger);
  }, [interval, duration]);

  return glitching;
}
