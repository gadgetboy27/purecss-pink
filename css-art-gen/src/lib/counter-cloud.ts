/**
 * Cloud-Compatible Counter
 * Uses in-memory storage for serverless environments (Vercel)
 * For production, replace with database (Supabase, PlanetScale, etc.)
 */

interface GenerationRecord {
  generationNumber: number;
  fingerprint: string;
  promptHash: string;
  timestamp: string;
  ipHash?: string;
}

interface CounterData {
  totalGenerated: number;
  lastGeneration: string;
  startedAt: string;
}

// In-memory storage (resets on each deployment)
let counter: CounterData = {
  totalGenerated: 0,
  lastGeneration: new Date().toISOString(),
  startedAt: new Date().toISOString(),
};

let registry: GenerationRecord[] = [];
const recentGenerations = new Map<string, number[]>(); // IP -> timestamps

/**
 * Get current counter value
 */
export async function getCounter(): Promise<CounterData> {
  return counter;
}

/**
 * Increment counter and register new generation
 */
export async function incrementCounter(
  fingerprint: string,
  promptHash: string,
  ipAddress?: string
): Promise<number> {
  const newNumber = counter.totalGenerated + 1;

  // Update counter
  counter.totalGenerated = newNumber;
  counter.lastGeneration = new Date().toISOString();

  // Add to registry
  const record: GenerationRecord = {
    generationNumber: newNumber,
    fingerprint,
    promptHash,
    timestamp: new Date().toISOString(),
    ipHash: ipAddress ? hashIP(ipAddress) : undefined,
  };

  registry.push(record);

  // Keep only last 1000 records (memory limit)
  if (registry.length > 1000) {
    registry.shift();
  }

  return newNumber;
}

/**
 * Check rate limit (in-memory)
 */
export async function checkRateLimit(ipAddress: string): Promise<boolean> {
  if (!ipAddress) return true;

  const ipHash = hashIP(ipAddress);
  const now = Date.now();
  const oneHourAgo = now - 60 * 60 * 1000;

  // Get recent generations for this IP
  let timestamps = recentGenerations.get(ipHash) || [];

  // Filter to last hour
  timestamps = timestamps.filter(ts => ts > oneHourAgo);

  // Update map
  recentGenerations.set(ipHash, [...timestamps, now]);

  // Allow max 10 per hour
  return timestamps.length < 10;
}

/**
 * Hash IP for privacy
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
 * Get generation stats
 */
export async function getStats() {
  const now = new Date();
  const startedAt = new Date(counter.startedAt);
  const daysRunning = Math.max(
    1,
    Math.floor((now.getTime() - startedAt.getTime()) / (1000 * 60 * 60 * 24))
  );

  return {
    totalGenerated: counter.totalGenerated,
    averagePerDay: Math.round(counter.totalGenerated / daysRunning),
    last24Hours: registry.length, // Approximate
    startedAt: counter.startedAt,
    lastGeneration: counter.lastGeneration,
    note: 'In-memory storage - resets on deployment. Use database for production.',
  };
}

/**
 * Verify generation (in-memory only)
 */
export async function verifyGeneration(
  generationNumber: number,
  fingerprint: string
): Promise<boolean> {
  const record = registry.find(
    r => r.generationNumber === generationNumber && r.fingerprint === fingerprint
  );
  return !!record;
}

/**
 * Format generation number
 */
export function formatGenerationNumber(num: number): string {
  return `#${num.toString().padStart(6, '0')}`;
}
