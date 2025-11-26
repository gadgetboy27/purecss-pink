/**
 * Type definitions for CSS Art Generator
 */

export interface ArtworkParameters {
  // Canvas
  canvas: {
    width: number;
    height: number;
    backgroundColor: string;
    backgroundGradient: string;
  };

  // Color palette
  palette: {
    skin: {
      base: string;
      shadow: string;
      highlight: string;
      midtone: string;
    };
    hair: {
      base: string;
      highlight: string;
      shadow: string;
    };
    eyes: {
      iris: string;
      sclera: string;
      lid: string;
    };
    lips: {
      upper: string;
      lower: string;
      shine: string;
    };
    ambient: {
      cheekShine: string;
      foreheadShine: string;
    };
  };

  // Head structure
  head: {
    width: string;
    height: string;
    top: string;
    left: string;
    borderRadius: string;
    rotation: number;
  };

  // Hair
  hair: {
    frontTendrils: number;
    backTendrils: number;
    highlightTendrils: number;
    curliness: number;
    flowAngle: number;
  };

  // Features
  features: {
    eyeSize: number;
    noseSize: number;
    lipFullness: number;
  };

  // Lighting
  lighting: {
    intensity: number;
    angle: number;
    shadowLayers: number;
  };

  // Style
  style: {
    blur: number;
    contrast: 'low' | 'medium' | 'high' | 'dramatic';
    aesthetic: 'oil-painting' | 'watercolor' | 'geometric' | 'minimalist';
  };
}

export interface Provenance {
  prompt: string;
  promptHash: string;
  fingerprint: string;
  timestamp: string;
  creator?: string;
  parameters: ArtworkParameters;
  randomSeed: string;
}

export interface GenerationRequest {
  prompt: string;
  preset?: MoodPreset;
  creator?: string;
}

export type MoodPreset = 'melancholic' | 'hopeful' | 'dramatic' | 'serene' | 'joyful';

export interface MoodColors {
  primary: string;
  secondary: string;
  accent: string;
  shadow: string;
  highlight: string;
}
