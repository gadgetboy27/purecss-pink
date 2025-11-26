/**
 * Security & Validation Module
 *
 * Protects against:
 * - Spam/abuse
 * - Malicious inputs
 * - Bot traffic
 * - Deceptive practices
 */

export interface ValidationResult {
  valid: boolean;
  reason?: string;
}

/**
 * Validate prompt for security and quality
 */
export function validatePrompt(prompt: string): ValidationResult {
  // Length checks
  if (!prompt || prompt.trim().length === 0) {
    return {
      valid: false,
      reason: 'Prompt cannot be empty',
    };
  }

  if (prompt.length < 3) {
    return {
      valid: false,
      reason: 'Prompt too short (minimum 3 characters)',
    };
  }

  if (prompt.length > 500) {
    return {
      valid: false,
      reason: 'Prompt too long (maximum 500 characters)',
    };
  }

  // Check for spam patterns
  const spamPatterns = [
    /(.)\1{10,}/i, // Repeated characters
    /https?:\/\//i, // URLs
    /<script/i, // Script tags
    /javascript:/i, // JavaScript protocol
    /onclick/i, // Event handlers
    /onerror/i,
    /eval\(/i, // Dangerous functions
  ];

  for (const pattern of spamPatterns) {
    if (pattern.test(prompt)) {
      return {
        valid: false,
        reason: 'Prompt contains suspicious content',
      };
    }
  }

  // Check for excessive numbers/special characters (likely bot)
  const alphaCount = (prompt.match(/[a-zA-Z]/g) || []).length;
  const totalLength = prompt.trim().length;

  if (alphaCount / totalLength < 0.3) {
    return {
      valid: false,
      reason: 'Prompt must contain meaningful text',
    };
  }

  // All checks passed
  return { valid: true };
}

/**
 * Sanitize prompt for display/storage
 */
export function sanitizePrompt(prompt: string): string {
  return prompt
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .replace(/\s+/g, ' ') // Normalize whitespace
    .substring(0, 500); // Enforce max length
}

/**
 * Rate limit configuration
 */
export const RATE_LIMITS = {
  // Per IP address
  perIP: {
    perHour: 10,
    perDay: 50,
  },
  // Global (all users)
  global: {
    perHour: 1000,
    perDay: 10000,
  },
};

/**
 * Detect potential bot traffic
 */
export function detectBot(userAgent: string | null): boolean {
  if (!userAgent) return true; // No user agent = likely bot

  const botPatterns = [
    /bot/i,
    /crawl/i,
    /spider/i,
    /slurp/i,
    /scrape/i,
    /curl/i,
    /wget/i,
  ];

  return botPatterns.some(pattern => pattern.test(userAgent));
}

/**
 * Quality thresholds for artwork acceptance
 */
export const QUALITY_THRESHOLDS = {
  minPromptLength: 3,
  maxPromptLength: 500,
  minWordsInPrompt: 2, // At least 2 words
  requiredWords: ['portrait', 'painting', 'art', 'face', 'person'], // At least one
};

/**
 * Validate prompt meets quality standards
 */
export function validateQuality(prompt: string): ValidationResult {
  const words = prompt.trim().toLowerCase().split(/\s+/);

  // Check minimum words
  if (words.length < QUALITY_THRESHOLDS.minWordsInPrompt) {
    return {
      valid: false,
      reason: 'Prompt should describe the artwork (e.g., "serene portrait in blue tones")',
    };
  }

  // Check for art-related keywords (optional but recommended)
  const hasArtKeyword = QUALITY_THRESHOLDS.requiredWords.some(keyword =>
    prompt.toLowerCase().includes(keyword)
  );

  if (!hasArtKeyword) {
    // Warning but allow (for flexibility)
    console.warn('Prompt lacks art-related keywords:', prompt);
  }

  return { valid: true };
}

/**
 * Generate secure hash for storage
 */
export function secureHash(input: string): string {
  // Simple hash for MVP - use crypto.subtle.digest in production
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash;
  }
  return Math.abs(hash).toString(16).padStart(16, '0');
}
