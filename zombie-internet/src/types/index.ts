export interface SocialPost {
  id: string;
  username: string;
  handle: string;
  content: string;
  timestamp: string;
  likes: number;
  replies: number;
  isInfected?: boolean;
  isMilitary?: boolean;
  isOfficial?: boolean;
  verified?: boolean;
  location?: string;
}

export interface Alert {
  id: string;
  level: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  timestamp: string;
  source: string;
}

export interface SystemLog {
  id: string;
  timestamp: string;
  level: 'ERROR' | 'WARN' | 'INFO' | 'CRITICAL' | 'DEBUG';
  message: string;
  source: string;
}

export interface MissingPerson {
  id: string;
  name: string;
  age: number;
  lastSeen: string;
  description: string;
  contact: string;
  daysAgo: number;
  status: 'missing' | 'found' | 'deceased' | 'unknown';
}

export interface NetworkNode {
  id: string;
  name: string;
  status: 'online' | 'degraded' | 'offline' | 'compromised';
  integrity: number;
  region: string;
  lastPing: string;
}

export interface InfectionData {
  region: string;
  confirmed: number;
  suspected: number;
  critical: number;
  trend: 'rising' | 'stable' | 'declining';
}
