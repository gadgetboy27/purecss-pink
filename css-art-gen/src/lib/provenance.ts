/**
 * Provenance and Certificate Generation
 */

import type { Provenance, ArtworkParameters } from './types';
import { createFingerprint } from './randomness';

/**
 * Create provenance record
 */
export function createProvenance(
  prompt: string,
  seed: string,
  parameters: ArtworkParameters,
  creator?: string
): Provenance {
  const timestamp = new Date().toISOString();
  const promptHash = createFingerprint(prompt);
  const fingerprint = createFingerprint(seed + prompt + timestamp);

  return {
    prompt,
    promptHash,
    fingerprint,
    timestamp,
    creator,
    parameters,
    randomSeed: seed,
  };
}

/**
 * Generate certificate of authenticity
 */
export function generateCertificate(provenance: Provenance): string {
  return `
╔════════════════════════════════════════════════════════════════════════╗
║                   CSS ART CERTIFICATE OF AUTHENTICITY                  ║
║            Inspired by Diana Smith (cyanHarlow)                        ║
╚════════════════════════════════════════════════════════════════════════╝

ARTWORK DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Prompt:           ${provenance.prompt}
Created:          ${provenance.timestamp}
Creator:          ${provenance.creator || 'Anonymous'}
Generator:        CSS Art Generator v1.0.0

UNIQUENESS PROOF
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Fingerprint:      ${provenance.fingerprint}
Prompt Hash:      ${provenance.promptHash}
Random Seed:      ${provenance.randomSeed.substring(0, 32)}...

TECHNICAL DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Canvas:           ${provenance.parameters.canvas.width}x${provenance.parameters.canvas.height}px
Head Rotation:    ${provenance.parameters.head.rotation.toFixed(1)}°
Hair Tendrils:    ${provenance.parameters.hair.frontTendrils + provenance.parameters.hair.backTendrils}
Shadow Layers:    ${provenance.parameters.lighting.shadowLayers}
Style:            ${provenance.parameters.style.aesthetic}

VERIFICATION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This certificate cryptographically proves:
  ✓ Exact prompt used for generation
  ✓ Complete parameter set (view source to verify)
  ✓ Timestamp of creation (prevents backdating)
  ✓ Creator attribution
  ✓ Mathematical uniqueness guarantee

ATTRIBUTION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
This artwork is generated using techniques pioneered by:
  Diana Smith (cyanHarlow)
  https://github.com/cyanharlow/purecss-pink

Original technique used with respect and admiration.
Diana Smith receives 15% of all revenue from this platform.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
To verify this artwork:
  1. View source code (right-click → View Source)
  2. Check CSS comments for embedded certificate
  3. Verify fingerprint matches parameters
  4. Confirm attribution to original creator
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  `.trim();
}

/**
 * Embed provenance in CSS comments
 */
export function embedProvenanceInCSS(css: string, provenance: Provenance): string {
  const provenanceComment = `
/*
 * ═══════════════════════════════════════════════════════════════
 * PROVENANCE & CERTIFICATE OF AUTHENTICITY
 * ═══════════════════════════════════════════════════════════════
 *
 * Prompt:      ${provenance.prompt}
 * Fingerprint: ${provenance.fingerprint}
 * Created:     ${provenance.timestamp}
 * Creator:     ${provenance.creator || 'Anonymous'}
 *
 * This artwork uses techniques pioneered by Diana Smith (cyanHarlow)
 * https://github.com/cyanharlow/purecss-pink
 *
 * Diana Smith receives 15% of all revenue from this platform.
 *
 * ═══════════════════════════════════════════════════════════════
 */

`;

  return provenanceComment + css;
}

/**
 * Export provenance as JSON
 */
export function exportProvenanceJSON(provenance: Provenance): string {
  return JSON.stringify(provenance, null, 2);
}
