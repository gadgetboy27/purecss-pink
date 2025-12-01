/**
 * Parameter Generation System
 * Converts prompts and random seeds into CSS artwork parameters
 */

import type { ArtworkParameters, MoodPreset, MoodColors } from './types';
import { generateRandomValues, mapRange } from './randomness';

// Mood preset configurations
export const MOOD_PRESETS: Record<MoodPreset, MoodColors> = {
  melancholic: {
    primary: '#0a3d62',
    secondary: '#3c6382',
    accent: '#60a3bc',
    shadow: '#000814',
    highlight: '#e3f2fd',
  },
  hopeful: {
    primary: '#f9ca24',
    secondary: '#f0932b',
    accent: '#fffa65',
    shadow: '#573b1a',
    highlight: '#fff9e6',
  },
  dramatic: {
    primary: '#1e1e1e',
    secondary: '#ff0844',
    accent: '#d11145',
    shadow: '#000000',
    highlight: '#ff6b9d',
  },
  serene: {
    primary: '#a8dadc',
    secondary: '#457b9d',
    accent: '#48cae4',
    shadow: '#1d3557',
    highlight: '#ade8f4',
  },
  joyful: {
    primary: '#ff6b6b',
    secondary: '#4ecdc4',
    accent: '#ffe66d',
    shadow: '#2d3561',
    highlight: '#ffeaa7',
  },
};

/**
 * Detect mood from prompt keywords
 */
export function detectMood(prompt: string): MoodPreset | null {
  const lowerPrompt = prompt.toLowerCase();

  for (const mood of Object.keys(MOOD_PRESETS) as MoodPreset[]) {
    if (lowerPrompt.includes(mood)) {
      return mood;
    }
  }

  // Check for synonyms
  if (lowerPrompt.match(/sad|blue|melancholy|somber/)) return 'melancholic';
  if (lowerPrompt.match(/happy|bright|optimistic|light/)) return 'hopeful';
  if (lowerPrompt.match(/intense|dark|moody|shadow/)) return 'dramatic';
  if (lowerPrompt.match(/calm|peaceful|gentle|soft/)) return 'serene';
  if (lowerPrompt.match(/vibrant|energetic|lively|cheerful/)) return 'joyful';

  return null;
}

/**
 * Generate artwork parameters from seed and mood
 */
export function generateParameters(
  seed: string,
  mood?: MoodPreset
): ArtworkParameters {
  // Generate 30 random values from seed
  const randValues = generateRandomValues(seed, 30);

  // Get mood colors or use default
  const moodColors = mood ? MOOD_PRESETS[mood] : MOOD_PRESETS.serene;

  const params: ArtworkParameters = {
    canvas: {
      width: 650,
      height: 800,
      backgroundColor: moodColors.shadow,
      backgroundGradient: `linear-gradient(to right, ${moodColors.shadow}, ${moodColors.primary})`,
    },

    palette: {
      skin: {
        base: moodColors.primary,
        shadow: moodColors.shadow,
        highlight: moodColors.accent,
        midtone: moodColors.secondary,
      },
      hair: {
        base: adjustBrightness(moodColors.shadow, -20),
        highlight: moodColors.accent,
        shadow: moodColors.shadow,
      },
      eyes: {
        iris: moodColors.accent,
        sclera: adjustBrightness(moodColors.primary, 30),
        lid: moodColors.primary,
      },
      lips: {
        upper: adjustBrightness(moodColors.secondary, -10),
        lower: moodColors.secondary,
        shine: moodColors.highlight,
      },
      ambient: {
        cheekShine: adjustBrightness(moodColors.accent, 20),
        foreheadShine: moodColors.highlight,
      },
    },

    head: {
      width: '37%',
      height: '37%',
      top: `${mapRange(randValues[0], 0, 100, 12, 16)}%`,
      left: `${mapRange(randValues[1], 0, 100, 27, 31)}%`,
      borderRadius: '50% 50% 76% 24% / 40% 2% 98% 61%',
      rotation: mapRange(randValues[2], 0, 100, 10, 25),
    },

    hair: {
      frontTendrils: Math.floor(mapRange(randValues[3], 0, 100, 35, 45)),
      backTendrils: Math.floor(mapRange(randValues[4], 0, 100, 20, 30)),
      highlightTendrils: Math.floor(mapRange(randValues[5], 0, 100, 4, 8)),
      curliness: mapRange(randValues[6], 0, 100, 0.5, 1.0),
      flowAngle: mapRange(randValues[7], 0, 100, -15, 15),
    },

    features: {
      eyeSize: mapRange(randValues[8], 0, 100, 0.9, 1.1),
      noseSize: mapRange(randValues[9], 0, 100, 0.95, 1.05),
      lipFullness: mapRange(randValues[10], 0, 100, 0.9, 1.2),
    },

    lighting: {
      intensity: mapRange(randValues[11], 0, 100, 0.6, 1.0),
      angle: mapRange(randValues[12], 0, 100, 0, 360),
      shadowLayers: Math.floor(mapRange(randValues[13], 0, 100, 6, 12)),
    },

    style: {
      blur: mapRange(randValues[14], 0, 100, 0.5, 2.5),
      contrast: mood === 'dramatic' ? 'dramatic' : 'high',
      aesthetic: 'oil-painting',
    },
  };

  return params;
}

/**
 * Adjust color brightness
 */
function adjustBrightness(hex: string, amount: number): string {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse RGB
  let r = parseInt(hex.substring(0, 2), 16);
  let g = parseInt(hex.substring(2, 4), 16);
  let b = parseInt(hex.substring(4, 6), 16);

  // Adjust
  r = Math.max(0, Math.min(255, r + amount));
  g = Math.max(0, Math.min(255, g + amount));
  b = Math.max(0, Math.min(255, b + amount));

  // Convert back to hex
  const rHex = r.toString(16).padStart(2, '0');
  const gHex = g.toString(16).padStart(2, '0');
  const bHex = b.toString(16).padStart(2, '0');

  return `#${rHex}${gHex}${bHex}`;
}

/**
 * Validate parameters
 */
export function validateParameters(params: ArtworkParameters): boolean {
  // Basic validation
  if (params.canvas.width <= 0 || params.canvas.height <= 0) return false;
  if (params.head.rotation < -180 || params.head.rotation > 180) return false;
  if (params.hair.frontTendrils < 0 || params.hair.backTendrils < 0) return false;
  if (params.features.eyeSize <= 0 || params.features.noseSize <= 0) return false;

  return true;
}
