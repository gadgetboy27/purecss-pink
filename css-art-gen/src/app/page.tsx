'use client';

import { useState, useEffect } from 'react';
import type { MoodPreset, Provenance } from '@/lib/types';
import { generateSeed } from '@/lib/randomness';
import { detectMood, generateParameters, MOOD_PRESETS } from '@/lib/parameter-generator';
import { generateCSS, generateHTML } from '@/lib/css-generator';
import { createProvenance, generateCertificate, embedProvenanceInCSS } from '@/lib/provenance';
import { sanitizePrompt, validateQuality } from '@/lib/security';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<MoodPreset | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [provenance, setProvenance] = useState<Provenance | null>(null);
  const [generationNumber, setGenerationNumber] = useState<number | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);
  const [showLimitations, setShowLimitations] = useState(false);
  const [totalGenerated, setTotalGenerated] = useState<number>(0);
  const [error, setError] = useState<string>('');

  // Fetch counter on mount
  useEffect(() => {
    fetchCounter();
  }, []);

  const fetchCounter = async () => {
    try {
      const res = await fetch('/api/generate');
      const data = await res.json();
      setTotalGenerated(data.totalGenerated || 0);
    } catch (err) {
      console.error('Failed to fetch counter:', err);
    }
  };

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt!');
      return;
    }

    // Validate quality
    const validation = validateQuality(prompt);
    if (!validation.valid) {
      setError(validation.reason || 'Invalid prompt');
      return;
    }

    setError('');
    setIsGenerating(true);
    setShowCertificate(false);

    try {
      // Detect mood from prompt or use selected preset
      const mood = selectedPreset || detectMood(prompt) || 'serene';

      // Generate unique seed
      const seed = generateSeed(prompt);

      // Generate parameters
      const params = generateParameters(seed, mood);

      // Generate CSS
      const css = generateCSS(params);

      // Create provenance
      const sanitized = sanitizePrompt(prompt);
      const prov = createProvenance(sanitized, seed, params);
      setProvenance(prov);

      // Register generation and get number
      const genRes = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fingerprint: prov.fingerprint,
          promptHash: prov.promptHash,
          prompt: sanitized,
        }),
      });

      if (!genRes.ok) {
        const errorData = await genRes.json();
        throw new Error(errorData.message || 'Generation failed');
      }

      const genData = await genRes.json();
      setGenerationNumber(genData.generationNumber);

      // Update counter display
      setTotalGenerated(genData.generationNumber);

      // Embed provenance in CSS with generation number
      const cssWithProvenance = embedProvenanceInCSS(css, prov) +
        `\n/* Generation #${genData.generationNumber.toString().padStart(6, '0')} */\n`;

      // Generate complete HTML
      const html = generateHTML(params, cssWithProvenance);
      setGeneratedHTML(html);

    } catch (error: any) {
      console.error('Generation error:', error);
      setError(error.message || 'Failed to generate artwork. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedHTML || !generationNumber) return;

    const blob = new Blob([generatedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `css-art-${generationNumber.toString().padStart(6, '0')}-${provenance?.fingerprint.substring(0, 8)}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleViewCertificate = () => {
    setShowCertificate(!showCertificate);
  };

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent-pink via-primary-500 to-accent-cyan bg-clip-text text-transparent">
            CSS Art Generator
          </h1>
          <p className="text-lg text-gray-400 mb-2">
            Generate unique CSS portraits • Inspired by Diana Smith (cyanHarlow)
          </p>
          <p className="text-sm text-gray-500">
            Quality over quantity • {totalGenerated.toLocaleString()} artworks generated
          </p>
        </header>

        {/* Quality Notice */}
        <div className="mb-8 bg-primary-500/10 border border-primary-500/30 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <span className="text-2xl">🎨</span>
            <div className="flex-1">
              <h3 className="font-bold text-primary-500 mb-1">Not AI, Pure CSS</h3>
              <p className="text-sm text-gray-300 mb-2">
                We don't use neural networks or training data. Every artwork is generated using pure algorithms and CSS code.
                <button
                  onClick={() => setShowLimitations(!showLimitations)}
                  className="text-primary-500 hover:underline ml-1"
                >
                  {showLimitations ? 'Hide' : 'See'} what we CAN and CANNOT do
                </button>
              </p>

              {showLimitations && (
                <div className="mt-3 p-3 bg-black/30 rounded text-xs space-y-2">
                  <div>
                    <p className="text-accent-cyan font-bold mb-1">✅ What We CAN Do:</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      <li>Stylized CSS portraits (oil painting effect)</li>
                      <li>Unique color palettes and moods</li>
                      <li>60+ algorithmically-generated hair tendrils</li>
                      <li>Lighting effects and shadows</li>
                      <li>Provably unique (cryptographic fingerprint)</li>
                      <li>100% transparent (view source to see code)</li>
                    </ul>
                  </div>
                  <div>
                    <p className="text-accent-pink font-bold mb-1">❌ What We CANNOT Do:</p>
                    <ul className="list-disc list-inside text-gray-400 space-y-1">
                      <li>Photorealistic portraits</li>
                      <li>Complex multi-person scenes</li>
                      <li>Fine details (wrinkles, pores, etc.)</li>
                      <li>Non-portrait subjects (animals, landscapes)</li>
                      <li>"Anything you imagine" (we have constraints)</li>
                    </ul>
                  </div>
                  <p className="text-gray-500 italic text-center pt-2 border-t border-white/10">
                    Constraints breed creativity. We focus on what CSS does best.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Generator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-primary-500">⚙️ Generator Controls</h2>

            {/* Error Display */}
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded text-red-400 text-sm">
                {error}
              </div>
            )}

            {/* Prompt Input */}
            <div className="mb-6">
              <label htmlFor="prompt" className="block text-sm font-medium text-gray-300 mb-2">
                Your Prompt
              </label>
              <textarea
                id="prompt"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="e.g., 'serene portrait in blue tones with soft lighting'"
                className="w-full h-32 px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
              />
              <p className="text-xs text-gray-500 mt-1">
                {prompt.length}/500 characters • Min 2 words • Describe the mood and colors
              </p>
            </div>

            {/* Mood Presets */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-300 mb-3">
                Mood Presets (Optional)
              </label>
              <div className="grid grid-cols-2 gap-3">
                {(Object.keys(MOOD_PRESETS) as MoodPreset[]).map((mood) => (
                  <button
                    key={mood}
                    onClick={() => setSelectedPreset(mood === selectedPreset ? undefined : mood)}
                    className={`px-4 py-3 rounded-lg border transition-all capitalize ${
                      selectedPreset === mood
                        ? 'bg-primary-500/20 border-primary-500 text-primary-500'
                        : 'bg-white/5 border-white/10 text-gray-300 hover:bg-white/10'
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* Generate Button */}
            <button
              onClick={handleGenerate}
              disabled={isGenerating || !prompt.trim()}
              className="w-full py-4 bg-gradient-to-r from-accent-pink to-primary-500 text-white font-bold rounded-lg transition-transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isGenerating ? '🎨 Generating...' : '🎨 Generate Artwork'}
            </button>

            {/* Rate Limit Info */}
            <p className="text-xs text-gray-500 text-center mt-2">
              Rate limit: 10 per hour • Quality controlled
            </p>

            {/* Action Buttons */}
            {generatedHTML && (
              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={handleDownload}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
                >
                  ⬇️ Download HTML
                </button>
                <button
                  onClick={handleViewCertificate}
                  className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-white/10 transition-colors"
                >
                  📜 Certificate
                </button>
              </div>
            )}
          </div>

          {/* Right Panel - Preview */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-accent-cyan">🖼️ Preview</h2>
              {generationNumber && (
                <span className="px-3 py-1 bg-accent-cyan/20 border border-accent-cyan/30 rounded-full text-accent-cyan font-mono text-sm">
                  #{generationNumber.toString().padStart(6, '0')}
                </span>
              )}
            </div>

            {/* Preview Area */}
            <div className="bg-black/30 rounded-lg p-4 mb-6 min-h-[400px] flex items-center justify-center">
              {generatedHTML ? (
                <iframe
                  srcDoc={generatedHTML}
                  className="w-full h-[500px] border-none rounded"
                  title="Generated Artwork Preview"
                />
              ) : (
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🎨</div>
                  <p>Enter a prompt and click "Generate Artwork"</p>
                  <p className="text-sm mt-2">Your unique CSS portrait will appear here</p>
                </div>
              )}
            </div>

            {/* Metadata */}
            {provenance && (
              <div className="bg-black/30 rounded-lg p-4 font-mono text-sm">
                {generationNumber && (
                  <div className="flex justify-between py-2 border-b border-white/10">
                    <span className="text-gray-400">Generation:</span>
                    <span className="text-accent-cyan font-bold">
                      #{generationNumber.toString().padStart(6, '0')}
                    </span>
                  </div>
                )}
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Fingerprint:</span>
                  <span className="text-accent-cyan font-bold">
                    {provenance.fingerprint.substring(0, 16)}...
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-white/10">
                  <span className="text-gray-400">Prompt Hash:</span>
                  <span className="text-accent-cyan font-bold">
                    {provenance.promptHash.substring(0, 16)}...
                  </span>
                </div>
                <div className="flex justify-between py-2">
                  <span className="text-gray-400">Generated:</span>
                  <span className="text-accent-cyan font-bold">
                    {new Date(provenance.timestamp).toLocaleString()}
                  </span>
                </div>
              </div>
            )}

            {/* Certificate */}
            {showCertificate && provenance && (
              <div className="mt-6 bg-black rounded-lg p-4 border-2 border-accent-cyan">
                <pre className="text-accent-cyan text-xs overflow-x-auto whitespace-pre-wrap font-mono">
                  {generateCertificate(provenance)}
                  {generationNumber && `\n\nGENERATION NUMBER: #${generationNumber.toString().padStart(6, '0')}`}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4">Why This Is Different</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="font-bold text-primary-500 mb-2">✨ Transparent Generation</h4>
              <p>Every artwork is generated using pure CSS and HTML. View source to see exactly how it's made. No black boxes, no AI, no stolen training data.</p>
            </div>
            <div>
              <h4 className="font-bold text-primary-500 mb-2">🔐 Provable Uniqueness</h4>
              <p>Each artwork has a cryptographic fingerprint and generation number. You can verify it's one-of-a-kind and see exactly when it was created.</p>
            </div>
            <div>
              <h4 className="font-bold text-primary-500 mb-2">🎨 Original Technique</h4>
              <p>Based on the pioneering work of Diana Smith (cyanHarlow). She receives 15% of all platform revenue. Full attribution, not exploitation.</p>
            </div>
            <div>
              <h4 className="font-bold text-primary-500 mb-2">🚫 Quality Over Quantity</h4>
              <p>Rate limits prevent spam. We don't do "infinite generations." Constraints maintain value and quality. This is the anti-AI-slop.</p>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="text-3xl font-bold text-primary-500">{totalGenerated.toLocaleString()}</div>
            <div className="text-xs text-gray-400 mt-1">Total Generated</div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="text-3xl font-bold text-primary-500">10</div>
            <div className="text-xs text-gray-400 mt-1">Per Hour Limit</div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="text-3xl font-bold text-primary-500">100%</div>
            <div className="text-xs text-gray-400 mt-1">Transparent</div>
          </div>
          <div className="bg-white/5 p-4 rounded-lg border border-white/10">
            <div className="text-3xl font-bold text-primary-500">0</div>
            <div className="text-xs text-gray-400 mt-1">AI Used</div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          <p>
            Inspired by <a href="https://github.com/cyanharlow/purecss-pink" target="_blank" rel="noopener noreferrer" className="text-primary-500 hover:underline">Diana Smith's purecss-pink</a>
          </p>
          <p className="mt-2">
            MVP Demo • Not for production use • Contact Diana Smith before commercial launch
          </p>
          <p className="mt-2 text-xs">
            Quality over quantity • Transparency over hype • Constraints over false promises
          </p>
        </footer>
      </div>
    </main>
  );
}
