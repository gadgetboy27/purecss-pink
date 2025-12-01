/**
 * CSS Art Generator - Parameter System
 * Proof of Concept: Parameterizing the PureCSS Pink Portrait
 */

// ============================================================================
// PARAMETER SCHEMA
// ============================================================================

const PORTRAIT_PARAMETERS = {
  // -------------------------------------------------------------------------
  // METADATA & PROVENANCE
  // -------------------------------------------------------------------------
  metadata: {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    prompt: '',
    promptHash: '',
    creatorAddress: '',
    uniqueId: ''
  },

  // -------------------------------------------------------------------------
  // CANVAS SETTINGS
  // -------------------------------------------------------------------------
  canvas: {
    width: 650,
    height: 800,
    backgroundColor: '#36021e',
    backgroundGradient: 'linear-gradient(to right, #3c0226, #230105)'
  },

  // -------------------------------------------------------------------------
  // COLOR PALETTE
  // -------------------------------------------------------------------------
  palette: {
    // Skin tones
    skin: {
      base: '#122028',
      shadow: '#0c151e',
      highlight: '#c10254',
      midtone: '#0a0c18'
    },
    // Hair colors
    hair: {
      base: '#0d090d',
      highlight: '#ce025b',
      shadow: '#08060a',
      shimmer: 'rgba(97, 200, 249, 0.05)'
    },
    // Eye colors
    eyes: {
      iris: '#e8028c',
      sclera: '#204b5f',
      lid: '#102c3b',
      lash: '#0e0009'
    },
    // Lip colors
    lips: {
      upper: '#230228',
      lower: '#271231',
      shine: '#a60054'
    },
    // Clothing
    clothing: {
      primary: '#366077',
      shadow: '#0c191c',
      highlight: '#e80465'
    },
    // Environmental
    ambient: {
      cheekShine: '#083241',
      foreheadShine: '#09a2fc',
      rimLight: 'rgba(3, 200, 200, 0.27)'
    }
  },

  // -------------------------------------------------------------------------
  // HEAD STRUCTURE
  // -------------------------------------------------------------------------
  head: {
    // Size and position
    width: '37%',
    height: '37%',
    top: '14%',
    left: '29%',

    // Shape (CSS border-radius)
    borderRadius: '50% 50% 76% 24% / 40% 2% 98% 61%',

    // Rotation
    rotation: 17, // degrees

    // Lighting
    shadows: [
      { type: 'inset', x: 7, y: 33, blur: 14, spread: -4, color: '#c10254' },
      { type: 'inset', x: -5, y: -1, blur: 12, spread: -1, color: 'rgba(239, 2, 112, 0.55)' },
      { type: 'inset', x: -70, y: -2, blur: 63, spread: 2, color: 'rgba(6, 8, 14, 0.96)' }
    ]
  },

  // -------------------------------------------------------------------------
  // FACIAL FEATURES
  // -------------------------------------------------------------------------
  features: {
    // Nose
    nose: {
      width: '18%',
      height: '20%',
      top: '55%',
      left: '-3.5%',
      rotation: 22,
      borderRadius: '0% 90% 80% 15% / 0% 9% 56% 15%'
    },

    // Eyes
    eye: {
      width: '24%',
      height: '30%',
      top: '36%',
      left: '4%',
      rotation: -11,

      iris: {
        width: '51%',
        height: '100%',
        color: '#e8028c',
        borderRadius: '0 40% 40% 0'
      },

      lashes: {
        count: 5, // top and bottom
        topRotations: [92, 62, 31, 43, 51],
        bottomRotations: [6, 6, 2, 1, -11],
        color: '#0e0009'
      }
    },

    // Eyebrow
    eyebrow: {
      width: '19%',
      height: '14%',
      top: '37%',
      left: '7%',
      rotation: -29,
      blur: 1.5,
      borderRadius: '11% 72% 0 0 / 9% 78% 0 0',
      thickness: 10
    },

    // Lips
    lips: {
      top: {
        width: '15%',
        height: '4%',
        bottom: '18%',
        left: '3%',
        rotation: 25,
        borderRadius: '20% 10% 90% 20% / 30% 0 98% 70%'
      },
      bottom: {
        width: '11%',
        height: '8%',
        bottom: '11%',
        left: '5%',
        rotation: 7,
        borderRadius: '20% 10% 47% 50% / 30% 0 98% 70%'
      }
    },

    // Ear
    ear: {
      enabled: true,
      width: '9%',
      height: '16%',
      top: '44%',
      left: '50%',
      rotation: 10,
      borderRadius: '40% 60% 80% 20% / 30% 50% 50% 9%'
    }
  },

  // -------------------------------------------------------------------------
  // HAIR SYSTEM
  // -------------------------------------------------------------------------
  hair: {
    // Hair zones: back, front, highlights
    zones: {
      back: {
        enabled: true,
        tendrils: 26, // a-z
        baseRotation: -82,
        spread: 240 // degrees
      },
      front: {
        enabled: true,
        tendrils: 40,
        baseRotation: -7,
        spread: 180
      },
      highlights: {
        enabled: true,
        tendrils: 6,
        opacity: 0.5
      }
    },

    // Tendril properties
    tendril: {
      baseWidth: '5%',
      baseHeight: '100%',
      blur: 1, // pixels

      // Variation ranges
      widthRange: [3, 8], // percentage
      heightRange: [20, 100], // percentage
      opacityRange: [0.4, 1.0],
      rotationRange: [-143, 165] // degrees
    },

    // Flow and style
    style: {
      curliness: 0.7, // 0-1, affects rotation variance
      flow: 'windswept', // 'straight' | 'wavy' | 'windswept' | 'wild'
      volume: 1.0 // 0-2, affects spread
    }
  },

  // -------------------------------------------------------------------------
  // BODY & CLOTHING
  // -------------------------------------------------------------------------
  body: {
    // Neck
    neck: {
      width: '17%',
      height: '15%',
      top: '43%',
      left: '43.2%',
      rotation: -22,
      borderRadius: '98% 0 70% 0% / 19% 0 1% 58%'
    },

    // Shoulders
    shoulders: {
      width: '34%',
      height: '55%',
      top: '52%',
      left: '36%',
      rotation: -4,
      borderRadius: '57% 43% 25% 16% / 93% 34% 66% 7%'
    },

    // Arm
    arm: {
      width: '20%',
      height: '49%',
      top: '57%',
      left: '45%',
      rotation: -2,
      borderRadius: '50% 50% 44% 16% / 20% 11% 80% 55%'
    },

    // Clothing
    clothing: {
      enabled: true,
      type: 'shirt', // 'shirt' | 'dress' | 'bare'

      shirt: {
        width: '118%',
        height: '37%',
        bottom: '13%',
        left: '-25%',
        rotation: 6,

        wrinkles: 4, // number of fold details

        bodice: {
          borderRadius: '30% 70% 2% 24% / 17% 9% 86% 69%'
        }
      }
    }
  },

  // -------------------------------------------------------------------------
  // LIGHTING & ATMOSPHERE
  // -------------------------------------------------------------------------
  lighting: {
    // Global light direction
    direction: 'top-left', // 'top-left' | 'top-right' | 'front' | 'dramatic'
    intensity: 0.8, // 0-1

    // Specific light effects
    effects: {
      cheekShine: {
        enabled: true,
        color: '#083241',
        blur: 43,
        spread: 17,
        opacity: 1.0
      },

      foreheadShine: {
        enabled: true,
        color: '#09a2fc',
        blur: 22,
        opacity: 1.0
      },

      rimLight: {
        enabled: true,
        color: 'rgba(3, 200, 200, 0.27)',
        blur: 12
      }
    },

    // Shadow complexity
    shadows: {
      layers: 8, // how many shadow layers
      maxBlur: 40,
      maxSpread: 20
    }
  },

  // -------------------------------------------------------------------------
  // ARTISTIC STYLE
  // -------------------------------------------------------------------------
  style: {
    // Overall aesthetic
    aesthetic: 'oil-painting', // 'oil-painting' | 'watercolor' | 'geometric' | 'minimalist'

    // Detail level
    detail: 'high', // 'low' | 'medium' | 'high' | 'ultra'

    // Edge treatment
    edges: 'soft', // 'sharp' | 'soft' | 'blurred'

    // Color treatment
    colorStyle: 'saturated', // 'saturated' | 'muted' | 'monochrome' | 'pastel'

    // Contrast
    contrast: 'high' // 'low' | 'medium' | 'high' | 'dramatic'
  }
};

// ============================================================================
// VARIATION GENERATORS
// ============================================================================

/**
 * Generate variations based on mood/prompt keywords
 */
const MOOD_PRESETS = {
  'melancholic': {
    palette: {
      skin: { base: '#0a3d62', highlight: '#3c6382' },
      hair: { base: '#0c2340', highlight: '#1e3799' },
      ambient: { cheekShine: '#0652DD', foreheadShine: '#1e90ff' }
    },
    lighting: {
      direction: 'top-right',
      intensity: 0.5,
      shadows: { layers: 10 }
    }
  },

  'hopeful': {
    palette: {
      skin: { base: '#f9ca24', highlight: '#f0932b' },
      hair: { base: '#ffbe76', highlight: '#fffa65' },
      ambient: { cheekShine: '#ffd32a', foreheadShine: '#fff59d' }
    },
    lighting: {
      direction: 'front',
      intensity: 0.9,
      shadows: { layers: 4 }
    }
  },

  'dramatic': {
    palette: {
      skin: { base: '#1e1e1e', highlight: '#ff0844' },
      hair: { base: '#0a0a0a', highlight: '#d11145' }
    },
    lighting: {
      direction: 'dramatic',
      intensity: 1.0,
      shadows: { layers: 12 }
    },
    style: {
      contrast: 'dramatic'
    }
  },

  'serene': {
    palette: {
      skin: { base: '#a8dadc', highlight: '#457b9d' },
      hair: { base: '#1d3557', highlight: '#457b9d' },
      ambient: { cheekShine: '#48cae4', foreheadShine: '#ade8f4' }
    },
    lighting: {
      direction: 'top-left',
      intensity: 0.6,
      shadows: { layers: 5 }
    },
    style: {
      edges: 'soft',
      colorStyle: 'muted'
    }
  }
};

/**
 * Generate a unique parameter set from a prompt
 */
function generateFromPrompt(prompt) {
  const params = JSON.parse(JSON.stringify(PORTRAIT_PARAMETERS)); // deep clone

  // Extract mood keywords
  const moodKeywords = Object.keys(MOOD_PRESETS);
  const detectedMood = moodKeywords.find(mood =>
    prompt.toLowerCase().includes(mood)
  );

  if (detectedMood) {
    // Merge mood preset
    const preset = MOOD_PRESETS[detectedMood];
    Object.assign(params.palette, preset.palette);
    if (preset.lighting) Object.assign(params.lighting, preset.lighting);
    if (preset.style) Object.assign(params.style, preset.style);
  }

  // Extract color keywords
  const colorMap = {
    'blue': '#0a3d62',
    'red': '#c70039',
    'green': '#2d6a4f',
    'purple': '#6a0dad',
    'yellow': '#f9ca24',
    'pink': '#ff006e',
    'orange': '#f07810'
  };

  Object.entries(colorMap).forEach(([colorName, colorValue]) => {
    if (prompt.toLowerCase().includes(colorName)) {
      params.palette.skin.highlight = colorValue;
      // Generate complementary colors
      params.palette.hair.highlight = adjustColor(colorValue, -30);
    }
  });

  // Add uniqueness (timestamp + random)
  const timestamp = Date.now();
  const randomSeed = Math.random();

  // Subtle variations based on seed
  params.head.rotation += (randomSeed - 0.5) * 10;
  params.hair.style.curliness = Math.max(0, Math.min(1, randomSeed));

  // Generate hashes for provenance
  params.metadata.prompt = prompt;
  params.metadata.promptHash = hashString(prompt);
  params.metadata.generatedAt = new Date(timestamp).toISOString();
  params.metadata.uniqueId = hashString(JSON.stringify(params) + timestamp);

  return params;
}

/**
 * Hash function for uniqueness proof
 */
function hashString(str) {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash = hash & hash; // Convert to 32-bit integer
  }
  return 'hash_' + Math.abs(hash).toString(16);
}

/**
 * Adjust color brightness/hue
 */
function adjustColor(hex, amount) {
  // Simple color adjustment (would use proper color lib in production)
  const num = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00FF) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000FF) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// ============================================================================
// CSS GENERATOR
// ============================================================================

/**
 * Convert parameters to CSS
 */
function parametersToCSS(params) {
  let css = '/* Generated CSS Portrait */\n\n';

  // Canvas/Paper
  css += `.paper {\n`;
  css += `  width: ${params.canvas.width}px;\n`;
  css += `  background-color: ${params.canvas.backgroundColor};\n`;
  css += `  background-image: ${params.canvas.backgroundGradient};\n`;
  css += `}\n\n`;

  // Head
  css += `.head {\n`;
  css += `  width: ${params.head.width};\n`;
  css += `  height: ${params.head.height};\n`;
  css += `  top: ${params.head.top};\n`;
  css += `  left: ${params.head.left};\n`;
  css += `  border-radius: ${params.head.borderRadius};\n`;
  css += `  transform: rotate(${params.head.rotation}deg);\n`;
  css += `  background-color: ${params.palette.skin.base};\n`;

  // Generate box-shadows
  const shadows = params.head.shadows.map(s =>
    `${s.type === 'inset' ? 'inset ' : ''}${s.x}px ${s.y}px ${s.blur}px ${s.spread}px ${s.color}`
  ).join(', ');
  css += `  box-shadow: ${shadows};\n`;
  css += `}\n\n`;

  // Eyes
  css += `.iris {\n`;
  css += `  background-color: ${params.palette.eyes.iris};\n`;
  css += `}\n\n`;

  // Hair tendrils (simplified - would need full algorithm)
  css += `/* Hair - ${params.hair.zones.front.tendrils} front tendrils */\n`;
  css += `.tendril {\n`;
  css += `  width: ${params.hair.tendril.baseWidth};\n`;
  css += `  height: ${params.hair.tendril.baseHeight};\n`;
  css += `  filter: blur(${params.hair.tendril.blur}px);\n`;
  css += `}\n\n`;

  // Add metadata as CSS comment
  css += `/*\n`;
  css += ` * PROVENANCE:\n`;
  css += ` * Prompt: "${params.metadata.prompt}"\n`;
  css += ` * Generated: ${params.metadata.generatedAt}\n`;
  css += ` * Unique ID: ${params.metadata.uniqueId}\n`;
  css += ` * Prompt Hash: ${params.metadata.promptHash}\n`;
  css += ` */\n`;

  return css;
}

// ============================================================================
// EXAMPLE USAGE
// ============================================================================

// Example 1: Generate from prompt
const artwork1 = generateFromPrompt("melancholic portrait in blue tones");
console.log('Artwork 1 Parameters:', JSON.stringify(artwork1, null, 2));
console.log('Artwork 1 CSS:', parametersToCSS(artwork1));

// Example 2: Generate serene portrait
const artwork2 = generateFromPrompt("serene portrait with green highlights");
console.log('Artwork 2 Unique ID:', artwork2.metadata.uniqueId);

// Example 3: Dramatic red portrait
const artwork3 = generateFromPrompt("dramatic red portrait");
console.log('Artwork 3 Unique ID:', artwork3.metadata.uniqueId);

// ============================================================================
// EXPORTS
// ============================================================================

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PORTRAIT_PARAMETERS,
    MOOD_PRESETS,
    generateFromPrompt,
    parametersToCSS,
    hashString
  };
}
