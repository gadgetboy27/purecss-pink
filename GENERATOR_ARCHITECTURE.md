# HTML+CSS Art Generator - Technical Architecture

## System Overview

Transform pure CSS art from hand-crafted masterpieces into a **prompt-driven generative system** while maintaining authenticity.

## Core Architecture

```
┌─────────────────┐
│  User Interface │
│   - Text Prompt │
│   - Style Params│
│   - Seed Input  │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Prompt Analyzer │ ← GPT-4/Claude API
│  - Extract theme│
│  - Identify     │
│    elements     │
│  - Suggest      │
│    palette      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Parameter Engine │
│  - Seed → PRNG  │
│  - Generate CSS │
│    variables    │
│  - Map to       │
│    templates    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│Template Renderer│
│  - Select base  │
│    structure    │
│  - Apply params │
│  - Generate HTML│
│    + CSS        │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Quality Filter │
│  - Visual checks│
│  - Validate CSS │
│  - Reject broken│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│   NFT Metadata  │
│  - IPFS upload  │
│  - Mint token   │
│  - Record seed  │
└─────────────────┘
```

## Example: "Sunset Over Mountains"

### Input
```json
{
  "prompt": "sunset over mountains",
  "seed": "1732550400-user123-a7f3k9",
  "style": "geometric"
}
```

### Parameter Extraction
```javascript
const parameters = {
  theme: "landscape",
  elements: ["sky", "sun", "mountains"],
  palette: {
    primary: "#FF6B35",   // sunset orange
    secondary: "#F7931E", // golden
    tertiary: "#4A4A4A",  // mountain silhouette
    background: "#2E294E" // evening sky
  },
  composition: {
    horizon: 0.65,        // 65% down from top
    sunPosition: 0.3,     // 30% from left
    mountainCount: 5,
    layerDepth: 3
  }
}
```

### Seed-Based Randomization
```javascript
// Deterministic PRNG from seed
function seededRandom(seed) {
  const hash = cyrb128(seed);
  const rng = sfc32(...hash);
  return rng;
}

// Generate unique values
const rng = seededRandom("1732550400-user123-a7f3k9");

const uniqueParams = {
  sunGradient: {
    angle: rng() * 360,           // Random gradient angle
    stops: generateColorStops(rng, palette)
  },
  mountains: Array.from({length: 5}, () => ({
    height: 30 + rng() * 40,      // 30-70% height
    rotation: -5 + rng() * 10,    // Slight tilt
    borderRadius: generateOrganic(rng)
  })),
  skyLayers: generateGradientLayers(rng, palette.background)
}
```

### Generated CSS Template
```css
.sky {
  background: linear-gradient(
    ${uniqueParams.skyLayers.angle}deg,
    ${uniqueParams.skyLayers.stops.join(', ')}
  );
  height: ${uniqueParams.composition.horizon * 100}%;
}

.sun {
  position: absolute;
  top: ${uniqueParams.composition.horizon * 100 - 10}%;
  left: ${uniqueParams.composition.sunPosition * 100}%;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    ${uniqueParams.sunGradient.stops.join(', ')}
  );
  box-shadow: 0 0 60px ${palette.primary}cc,
              0 0 100px ${palette.secondary}88;
}

${uniqueParams.mountains.map((m, i) => `
.mountain-${i} {
  position: absolute;
  bottom: 0;
  left: ${i * 15}%;
  width: 25%;
  height: ${m.height}%;
  background: linear-gradient(
    180deg,
    ${darken(palette.tertiary, i * 10)} 0%,
    ${palette.tertiary} 100%
  );
  border-radius: ${m.borderRadius};
  transform: rotate(${m.rotation}deg);
  z-index: ${10 - i};
}
`).join('\n')}
```

## Template Categories

### 1. Geometric Portraits
**Scope:** Stylized faces using shapes
**Parameters:**
- Face shape (oval, round, square)
- Feature positions (eyes, nose, mouth)
- Color palette
- Asymmetry factor
- Shadow depth

**Example Prompt:** "abstract portrait in pink and teal"

### 2. Landscapes
**Scope:** Simplified nature scenes
**Parameters:**
- Horizon position
- Element count (mountains, trees, clouds)
- Time of day (affects palette)
- Weather (clear, foggy, stormy)
- Composition balance

**Example Prompt:** "foggy forest at dawn"

### 3. Geometric Patterns
**Scope:** Repeating shapes and tessellations
**Parameters:**
- Grid size
- Shape types (circles, polygons, waves)
- Color distribution
- Symmetry type (radial, bilateral, none)
- Animation (optional)

**Example Prompt:** "hypnotic spiral pattern in blues"

### 4. Abstract Compositions
**Scope:** Non-representational art
**Parameters:**
- Element count
- Size distribution
- Overlap factor
- Gradient complexity
- Balance (ordered vs chaotic)

**Example Prompt:** "chaotic energy in warm colors"

## Authenticity Implementation

### Generation Metadata (stored on-chain)
```json
{
  "tokenId": 1,
  "prompt": "sunset over mountains",
  "seed": "1732550400-user123-a7f3k9",
  "parameters": {
    "horizon": 0.65,
    "sunPosition": 0.3,
    "mountainCount": 5,
    "palette": ["#FF6B35", "#F7931E", "#4A4A4A", "#2E294E"]
  },
  "template": "landscape-v1",
  "generatedAt": 1732550400,
  "artist": "0x123...abc",
  "htmlHash": "QmX5f7...",  // IPFS hash
  "cssHash": "QmY8g2...",
  "verification": {
    "reproducible": true,
    "algorithm": "v1.0.0",
    "constraints": ["no-svg", "pure-css"]
  }
}
```

### Verification System
Anyone can verify authenticity:
```bash
# Reproduce the artwork from on-chain data
$ css-art-verify \
  --seed "1732550400-user123-a7f3k9" \
  --template "landscape-v1" \
  --params '{"horizon":0.65,...}' \
  --output verify.html

# Compare hash
$ ipfs hash verify.html
# QmX5f7... ✓ Matches on-chain hash
```

## Smart Contract Architecture

```solidity
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/common/ERC2981.sol";

contract CSSArtNFT is ERC721, ERC2981 {
    struct ArtMetadata {
        string prompt;
        string seed;
        string parameters;
        string template;
        uint256 generatedAt;
        string htmlIpfsHash;
        string cssIpfsHash;
    }

    mapping(uint256 => ArtMetadata) public artworks;
    uint256 private _tokenIds;

    // 10% royalty to creator
    uint96 private constant ROYALTY_FEE = 1000;

    function mint(
        address artist,
        string memory prompt,
        string memory seed,
        string memory parameters,
        string memory template,
        string memory htmlHash,
        string memory cssHash
    ) public returns (uint256) {
        _tokenIds++;
        uint256 tokenId = _tokenIds;

        _safeMint(artist, tokenId);
        _setTokenRoyalty(tokenId, artist, ROYALTY_FEE);

        artworks[tokenId] = ArtMetadata({
            prompt: prompt,
            seed: seed,
            parameters: parameters,
            template: template,
            generatedAt: block.timestamp,
            htmlIpfsHash: htmlHash,
            cssIpfsHash: cssHash
        });

        return tokenId;
    }

    // Verify artwork can be reproduced
    function verifyArtwork(
        uint256 tokenId,
        string memory reproducedHash
    ) public view returns (bool) {
        return keccak256(bytes(artworks[tokenId].htmlIpfsHash)) ==
               keccak256(bytes(reproducedHash));
    }
}
```

## Revenue Model

### Pricing Tiers
| Complexity | Elements | Price | Example |
|------------|----------|-------|---------|
| Simple     | < 20     | 0.01Ξ | "gradient sunset" |
| Medium     | 20-50    | 0.05Ξ | "geometric portrait" |
| Complex    | 50-100   | 0.1Ξ  | "abstract cityscape" |
| Master     | 100+     | 0.5Ξ  | "detailed landscape" |

### Royalty Distribution
```
Resale Price: 1.0 ETH
├─ 88.0% → Seller (0.88 ETH)
├─ 10.0% → Original Artist (0.10 ETH)
└─  2.0% → Platform (0.02 ETH)
```

### Custom Commissions
- **Personal prompts**: 2x base price
- **Commercial license**: 10x base price
- **Exclusive rights**: 50x base price

## Technical Stack

### Backend
```yaml
Generation API:
  - Node.js + Express
  - OpenAI/Anthropic API (prompt analysis)
  - Deterministic PRNG library
  - CSS template engine
  - IPFS client (web3.storage)

Blockchain:
  - Ethereum (mainnet) or Polygon (lower fees)
  - Hardhat for development
  - OpenZeppelin contracts
  - Ethers.js for interaction
```

### Frontend
```yaml
Web App:
  - React + TypeScript
  - TailwindCSS (ironically)
  - Wagmi for wallet connection
  - React Query for caching
  - Monaco Editor (code preview)

Features:
  - Live prompt → preview
  - Parameter sliders
  - Seed randomizer
  - Gallery browser
  - Mint interface
```

### Storage
```yaml
IPFS:
  - HTML files
  - CSS files
  - Preview images
  - Metadata JSON

On-Chain:
  - Token ownership
  - Generation parameters
  - IPFS hashes
  - Royalty info
```

## Differentiation from "AI Slop"

| Feature | AI Slop | CSS Art Generator |
|---------|---------|-------------------|
| **Output** | Opaque pixels | Transparent code |
| **Process** | Black box | Open algorithm |
| **Skill** | Prompt engineering | CSS expertise |
| **Learning** | No takeaway | Inspect → learn |
| **Reproduction** | Impossible | Verifiable on-chain |
| **Constraints** | None | Intentional limits |
| **Value** | Aesthetic only | Code + aesthetic |

## Marketing Positioning

### "Code as Art, Art as Code"
- Own the **source**, not just the image
- Every NFT is a **CSS masterclass**
- **Inspect element** to see the magic

### "Anti-AI Authenticity"
- **No neural networks** in generation
- **Deterministic algorithms** only
- **100% reproducible** from seed
- **On-chain verification**

### "Functional Collectibles"
- **Deploy as webpage** (live URL per NFT)
- **Remix with permission** (on-chain licensing)
- **Animated versions** (CSS keyframes)
- **Responsive editions** (mobile-optimized)

## Next Steps to Build This

1. **Prototype Phase**
   - [ ] Create 3-5 base templates
   - [ ] Build parameter→CSS engine
   - [ ] Test prompt→parameter extraction
   - [ ] Validate seed→uniqueness

2. **Alpha Launch**
   - [ ] Deploy smart contract (testnet)
   - [ ] Build minimal UI
   - [ ] Generate 100 test pieces
   - [ ] Community feedback

3. **Beta Launch**
   - [ ] Expand to 10+ templates
   - [ ] Add custom commission system
   - [ ] Implement verification tool
   - [ ] Launch on Polygon

4. **Full Launch**
   - [ ] Migrate to Ethereum mainnet
   - [ ] Partnerships with CSS artists
   - [ ] Educational content series
   - [ ] Marketplace integration

## Conclusion

**YES, this can be turned into a prompt-style app.**

The key is balancing:
- **Generative uniqueness** (seeds + parameters)
- **Human craftsmanship** (hand-designed templates/algorithms)
- **Transparent authenticity** (on-chain verification)
- **Constrained creativity** (pure CSS limits)

This positions it as **anti-AI-slop** because:
1. The process is transparent and verifiable
2. The output is educational (view source)
3. The constraints demonstrate skill
4. The code itself has value beyond the visual

The NFT doesn't just certify "I own this image" but rather:
**"I own this unique, verifiable, reproducible piece of code art created by a deterministic algorithm at this specific moment in time."**
