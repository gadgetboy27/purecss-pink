/**
 * Randomness utilities for CSS Art Generator
 * Phase 1: Deterministic seed-based randomness
 * Phase 2: Chainlink VRF
 * Phase 3: Random.org for premium
 */

export class SeededRandom {
  private seed: number;

  constructor(seed: string | number) {
    this.seed = typeof seed === 'string'
      ? this.hashString(seed)
      : seed;
  }

  /**
   * Simple string hash function
   */
  private hashString(str: string): number {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return Math.abs(hash);
  }

  /**
   * Pseudo-random number generator using seed
   * Simple LCG (Linear Congruential Generator)
   */
  next(): number {
    this.seed = (this.seed * 1103515245 + 12345) & 0x7fffffff;
    return this.seed / 0x7fffffff;
  }

  /**
   * Generate random integer in range [min, max]
   */
  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  /**
   * Generate random float in range [min, max]
   */
  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  /**
   * Pick random item from array
   */
  pick<T>(array: T[]): T {
    return array[this.nextInt(0, array.length - 1)];
  }
}

/**
 * Generate unique seed from inputs
 */
export function generateSeed(prompt: string, creator?: string): string {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2);

  const components = [
    prompt,
    timestamp,
    random,
    creator || 'anonymous'
  ];

  return components.join('::');
}

/**
 * Create cryptographic fingerprint
 */
export function createFingerprint(seed: string): string {
  // Simple hash for now - in production use crypto.subtle.digest
  let hash = 0;
  for (let i = 0; i < seed.length; i++) {
    const char = seed.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}

/**
 * Generate random values for artwork parameters
 */
export function generateRandomValues(seed: string, count: number): number[] {
  const rng = new SeededRandom(seed);
  const values: number[] = [];

  for (let i = 0; i < count; i++) {
    values.push(rng.next() * 100);
  }

  return values;
}

/**
 * Map value from one range to another
 */
export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
}
