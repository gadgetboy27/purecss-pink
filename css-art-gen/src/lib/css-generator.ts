/**
 * CSS Generation System
 * Converts parameters into actual CSS code
 */

import type { ArtworkParameters } from './types';

/**
 * Generate complete CSS from parameters
 */
export function generateCSS(params: ArtworkParameters): string {
  let css = `/* CSS Art Generator - Generated Artwork */\n\n`;

  // Base styles
  css += generateBaseStyles();

  // Canvas/Paper
  css += generateCanvasStyles(params);

  // Head
  css += generateHeadStyles(params);

  // Hair
  css += generateHairStyles(params);

  // Features
  css += generateFeaturesStyles(params);

  // Lighting effects
  css += generateLightingStyles(params);

  return css;
}

function generateBaseStyles(): string {
  return `
div, div:after, div:before {
  position: absolute;
  print-color-adjust: exact;
  filter: opacity(1);
  box-sizing: border-box;
}

html {
  min-width: 765px;
}

body {
  background-color: #0e0909;
  background-image: linear-gradient(to bottom, #121f27, #040709);
  padding: 2.25% 5px;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

`;
}

function generateCanvasStyles(params: ArtworkParameters): string {
  return `
.paper {
  position: relative;
  margin: auto;
  background-color: ${params.canvas.backgroundColor};
  overflow: hidden;
  box-sizing: content-box;
  width: ${params.canvas.width}px;
  height: ${params.canvas.height}px;
}

.container {
  position: relative;
  margin: auto;
  width: 100%;
  height: 100%;
  background-image: ${params.canvas.backgroundGradient};
}

`;
}

function generateHeadStyles(params: ArtworkParameters): string {
  return `
.head {
  border-radius: ${params.head.borderRadius};
  transform: rotate(${params.head.rotation}deg);
  background-color: ${params.palette.skin.base};
  background-image:
    linear-gradient(150deg, ${params.palette.skin.highlight}03 75%, ${params.palette.skin.highlight} 78%),
    linear-gradient(152deg, transparent 88%, ${params.palette.skin.shadow} 91%);
  box-shadow:
    inset 7px 33px 14px -4px ${params.palette.skin.highlight},
    inset -5px -1px 12px -1px ${params.palette.skin.highlight}55,
    inset -70px -2px 63px 2px ${params.palette.skin.shadow}96,
    inset 20px 2px 20px -3px ${params.palette.skin.midtone};
  width: ${params.head.width};
  height: ${params.head.height};
  left: ${params.head.left};
  top: ${params.head.top};
}

`;
}

function generateHairStyles(params: ArtworkParameters): string {
  let css = `
.hair {
  width: 65%;
  height: 60%;
  top: 2.5%;
  left: 17%;
  transform: rotate(${params.hair.flowAngle}deg);
}

.hair.back {
  z-index: 1;
}

.hair.front {
  z-index: 100;
}

.hair.highlights {
  z-index: 101;
  opacity: 0.6;
}

.tendril {
  width: 5%;
  height: 100%;
  filter: blur(${params.style.blur}px);
  transform-origin: 50% 0;
}

.tendril:before, .tendril:after {
  content: "";
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  position: absolute;
}

.front .tendril:before {
  background-image: radial-gradient(
    ellipse farthest-corner at -28% 50%,
    transparent 49%,
    ${params.palette.hair.shadow}91 55%,
    ${params.palette.hair.base}76,
    transparent 85%
  );
  background-size: 100% 8%;
  background-position: 0 22%;
}

.front .tendril:after {
  background-image: radial-gradient(
    ellipse farthest-corner at 128% 50%,
    transparent 57%,
    ${params.palette.hair.base},
    transparent 71%
  );
  background-size: 100% 8%;
}

.back .tendril:before {
  background-image: radial-gradient(
    ellipse farthest-corner at -28% 50%,
    transparent 53%,
    ${params.palette.hair.highlight} 67%,
    transparent 71%
  );
  background-size: 100% 8%;
  background-position: 0 22%;
}

.back .tendril:after {
  background-image: radial-gradient(
    ellipse farthest-corner at 128% 50%,
    transparent 59%,
    ${params.palette.hair.highlight},
    transparent 71%
  );
  background-size: 100% 8%;
}

`;

  // Generate individual tendril positions for front hair
  for (let i = 1; i <= params.hair.frontTendrils; i++) {
    const rotation = -180 + (360 / params.hair.frontTendrils) * i * params.hair.curliness;
    const left = 30 + (50 / params.hair.frontTendrils) * i;
    const height = 40 + (Math.sin(i) * 20);
    const top = 10 + (Math.cos(i) * 15);

    css += `.front .tendril-${i} {
  left: ${left.toFixed(1)}%;
  height: ${height.toFixed(1)}%;
  top: ${top.toFixed(1)}%;
  transform: rotate(${rotation.toFixed(1)}deg);
  opacity: ${(0.6 + Math.random() * 0.4).toFixed(2)};
}\n\n`;
  }

  // Generate individual tendril positions for back hair
  for (let i = 1; i <= params.hair.backTendrils; i++) {
    const rotation = -90 + (180 / params.hair.backTendrils) * i;
    const left = 20 + (80 / params.hair.backTendrils) * i;
    const height = 35 + (Math.sin(i) * 25);
    const top = 5 + (Math.cos(i) * 20);

    css += `.back .tendril-${i} {
  left: ${left.toFixed(1)}%;
  height: ${height.toFixed(1)}%;
  top: ${top.toFixed(1)}%;
  transform: rotate(${rotation.toFixed(1)}deg);
}\n\n`;
  }

  return css;
}

function generateFeaturesStyles(params: ArtworkParameters): string {
  return `
.eye {
  background-image: radial-gradient(ellipse at 42% 43%, ${params.palette.skin.shadow}50 23%, transparent 56%);
  transform: rotate(-11deg) scale(${params.features.eyeSize});
  width: 24%;
  height: 30%;
  left: 4%;
  top: 36%;
}

.iris {
  width: 51%;
  height: 100%;
  left: 0;
  top: 12%;
  border-radius: 0 40% 40% 0;
  background-color: ${params.palette.eyes.iris};
}

.eyeball {
  width: 49%;
  height: 20%;
  top: 41%;
  left: 33%;
  overflow: hidden;
  background-color: ${params.palette.eyes.sclera};
  border-radius: 0 0 90% 10% / 0 0 81% 87%;
}

.nose {
  width: ${18 * params.features.noseSize}%;
  height: ${20 * params.features.noseSize}%;
  transform: rotate(22deg);
  background-image:
    linear-gradient(163deg, ${params.palette.skin.midtone} 19%, transparent 23%);
  box-shadow:
    inset 6px -5px 5px -3px ${params.palette.skin.highlight},
    inset 0px 9px 12px -5px ${params.palette.skin.shadow};
  border-radius: 0% 90% 80% 15% / 0% 9% 56% 15%;
  top: 55%;
  left: -3.5%;
}

.toplip {
  border-radius: 20% 10% 90% 20% / 30% 0 98% 70%;
  background-color: ${params.palette.lips.upper};
  box-shadow:
    inset 5px 0px 2px -2px ${params.palette.lips.shine},
    inset -2px -4px 8px -1px ${params.palette.skin.shadow};
  width: ${15 * params.features.lipFullness}%;
  height: ${4 * params.features.lipFullness}%;
  transform: rotate(25deg);
  bottom: 18%;
  left: 3%;
}

.bottomlip {
  border-radius: 20% 10% 47% 50% / 30% 0 98% 70%;
  background-color: ${params.palette.lips.lower};
  box-shadow:
    inset 3px 1px 2px 1px ${params.palette.lips.shine},
    inset 5px 1px 11px 4px ${params.palette.skin.shadow};
  width: ${11 * params.features.lipFullness}%;
  height: ${8 * params.features.lipFullness}%;
  transform: rotate(7deg);
  bottom: 11%;
  left: 5%;
}

`;
}

function generateLightingStyles(params: ArtworkParameters): string {
  return `
.cheekshine {
  transform: rotate(-48deg);
  width: 24%;
  box-shadow:
    0 0 43px 17px ${params.palette.ambient.cheekShine},
    0 0 13px 2px ${params.palette.ambient.cheekShine}54;
  left: 22%;
  top: 55%;
  opacity: ${params.lighting.intensity};
}

.foreheadshine {
  transform: rotate(13deg);
  box-shadow: -27px 0 22px 3px ${params.palette.ambient.foreheadShine};
  top: 19%;
  height: 22%;
  left: 34%;
  opacity: ${params.lighting.intensity};
}

.cheekbone {
  transform: rotate(-32deg);
  width: 31%;
  box-shadow: 0 0 40px 37px ${params.palette.skin.shadow}72;
  left: 27%;
  top: 59%;
}

`;
}

/**
 * Generate complete HTML structure
 */
export function generateHTML(params: ArtworkParameters, css: string): string {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CSS Art - Generated Portrait</title>
    <style>
${css}
    </style>
</head>
<body>
    <div class="paper">
        <div class="container">
            <div class="head">
                <div class="nose"></div>
                <div class="forehead"></div>
                <div class="cheekbone"></div>
                <div class="cheekshine"></div>
                <div class="foreheadshine"></div>
                <div class="eye">
                    <div class="eyeball">
                        <div class="iris"></div>
                    </div>
                </div>
                <div class="bottomlip"></div>
                <div class="toplip"></div>
            </div>

            <div class="hair back">
${generateHairHTML('back', params.hair.backTendrils)}
            </div>

            <div class="hair front">
${generateHairHTML('front', params.hair.frontTendrils)}
            </div>

            <div class="hair highlights">
${generateHairHTML('highlight', params.hair.highlightTendrils)}
            </div>
        </div>
    </div>

    <!--
    Generated by CSS Art Generator
    Based on technique by Diana Smith (cyanHarlow)
    https://github.com/cyanharlow/purecss-pink
    -->
</body>
</html>`;

  return html;
}

function generateHairHTML(className: string, count: number): string {
  let html = '';
  for (let i = 1; i <= count; i++) {
    html += `                <div class="tendril tendril-${i}"></div>\n`;
  }
  return html;
}
