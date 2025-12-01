/**
 * Generation Counter System
 *
 * Tracks every artwork generated with:
 * - Unique generation number
 * - Timestamp
 * - Prompt hash
 * - Fingerprint
 *
 * Stored persistently to prove authenticity and prevent inflation claims
 */

import { writeFile, readFile, mkdir } from 'fs/promises';
import { existsSync } from 'fs';
import path from 'path';

const COUNTER_FILE = path.join(process.cwd(), 'data', 'generation-counter.json');
const REGISTRY_FILE = path.join(process.cwd(), 'data', 'generation-registry.json');

export interface GenerationRecord {
  generationNumber: number;
  fingerprint: string;
  promptHash: string;
  timestamp: string;
  ipHash?: string; // Hashed IP for rate limiting
}

export interface CounterData {
  totalGenerated: number;
  lastGeneration: string;
  startedAt: string;
}

/**
 * Initialize counter and registry files
 */
async function initializeStorage() {
  const dataDir = path.join(process.cwd(), 'data');

  if (!existsSync(dataDir)) {
    await mkdir(dataDir, { recursive: true });
  }

  if (!existsSync(COUNTER_FILE)) {
    const initialCounter: CounterData = {
      totalGenerated: 0,
      lastGeneration: new Date().toISOString(),
      startedAt: new Date().toISOString(),
    };
    await writeFile(COUNTER_FILE, JSON.stringify(initialCounter, null, 2));
  }

  if (!existsSync(REGISTRY_FILE)) {
    await writeFile(REGISTRY_FILE, JSON.stringify([], null, 2));
  }
}

/**
 * Get current counter value
 */
export async function getCounter(): Promise<CounterData> {
  await initializeStorage();
  const data = await readFile(COUNTER_FILE, 'utf-8');
  return JSON.parse(data);
}

/**
 * Increment counter and register new generation
 */
export async function incrementCounter(
  fingerprint: string,
  promptHash: string,
  ipAddress?: string
): Promise<number> {
  await initializeStorage();

  // Read current counter
  const counter = await getCounter();
  const newNumber = counter.totalGenerated + 1;

  // Update counter
  counter.totalGenerated = newNumber;
  counter.lastGeneration = new Date().toISOString();
  await writeFile(COUNTER_FILE, JSON.stringify(counter, null, 2));

  // Add to registry
  const registry: GenerationRecord[] = JSON.parse(
    await readFile(REGISTRY_FILE, 'utf-8')
  );

  const record: GenerationRecord = {
    generationNumber: newNumber,
    fingerprint,
    promptHash,
    timestamp: new Date().toISOString(),
    ipHash: ipAddress ? hashIP(ipAddress) : undefined,
  };

  registry.push(record);

  // Keep only last 10,000 records to prevent file bloat
  if (registry.length > 10000) {
    registry.shift();
  }

  await writeFile(REGISTRY_FILE, JSON.stringify(registry, null, 2));

  return newNumber;
}

/**
 * Verify a generation number exists
 */
export async function verifyGeneration(
  generationNumber: number,
  fingerprint: string
): Promise<boolean> {
  await initializeStorage();

  const registry: GenerationRecord[] = JSON.parse(
    await readFile(REGISTRY_FILE, 'utf-8')
  );

  const record = registry.find(
    r => r.generationNumber === generationNumber && r.fingerprint === fingerprint
  );

  return !!record;
}

/**
 * Get generation stats
 */
export async function getStats() {
  const counter = await getCounter();
  const registry: GenerationRecord[] = JSON.parse(
    await readFile(REGISTRY_FILE, 'utf-8')
  );

  const now = new Date();
  const startedAt = new Date(counter.startedAt);
  const daysRunning = Math.max(
    1,
    Math.floor((now.getTime() - startedAt.getTime()) / (1000 * 60 * 60 * 24))
  );

  // Last 24 hours
  const oneDayAgo = new Date(now.getTime() - 24 * 60 * 60 * 1000);
  const last24h = registry.filter(
    r => new Date(r.timestamp) > oneDayAgo
  ).length;

  return {
    totalGenerated: counter.totalGenerated,
    averagePerDay: Math.round(counter.totalGenerated / daysRunning),
    last24Hours: last24h,
    startedAt: counter.startedAt,
    lastGeneration: counter.lastGeneration,
  };
}

/**
 * Hash IP address for privacy
 */
function hashIP(ip: string): string {
  let hash = 0;
  for (let i = 0; i < ip.length; i++) {
    const char = ip.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16);
}

/**
 * Check if IP has generated recently (rate limiting)
 */
export async function checkRateLimit(ipAddress: string): Promise<boolean> {
  if (!ipAddress) return true; // Allow if no IP

  const ipHash = hashIP(ipAddress);
  const registry: GenerationRecord[] = JSON.parse(
    await readFile(REGISTRY_FILE, 'utf-8')
  );

  // Check last hour
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  const recentFromIP = registry.filter(
    r => r.ipHash === ipHash && new Date(r.timestamp) > oneHourAgo
  );

  // Allow max 10 per hour per IP (generous for testing, tighten for production)
  return recentFromIP.length < 10;
}

/**
 * Get generation certificate number display
 */
export function formatGenerationNumber(num: number): string {
  return `#${num.toString().padStart(6, '0')}`;
}
