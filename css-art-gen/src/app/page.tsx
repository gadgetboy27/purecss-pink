'use client';

import { useState } from 'react';
import type { MoodPreset, Provenance } from '@/lib/types';
import { generateSeed } from '@/lib/randomness';
import { detectMood, generateParameters, MOOD_PRESETS } from '@/lib/parameter-generator';
import { generateCSS, generateHTML } from '@/lib/css-generator';
import { createProvenance, generateCertificate, embedProvenanceInCSS } from '@/lib/provenance';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [selectedPreset, setSelectedPreset] = useState<MoodPreset | undefined>();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedHTML, setGeneratedHTML] = useState('');
  const [provenance, setProvenance] = useState<Provenance | null>(null);
  const [showCertificate, setShowCertificate] = useState(false);

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      alert('Please enter a prompt!');
      return;
    }

    setIsGenerating(true);
    setShowCertificate(false);

    // Simulate generation delay for better UX
    await new Promise(resolve => setTimeout(resolve, 500));

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
      const prov = createProvenance(prompt, seed, params);
      setProvenance(prov);

      // Embed provenance in CSS
      const cssWithProvenance = embedProvenanceInCSS(css, prov);

      // Generate complete HTML
      const html = generateHTML(params, cssWithProvenance);
      setGeneratedHTML(html);

    } catch (error) {
      console.error('Generation error:', error);
      alert('Failed to generate artwork. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownload = () => {
    if (!generatedHTML) return;

    const blob = new Blob([generatedHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `css-art-${provenance?.fingerprint.substring(0, 8)}.html`;
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
        <header className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-accent-pink via-primary-500 to-accent-cyan bg-clip-text text-transparent">
            CSS Art Generator
          </h1>
          <p className="text-lg text-gray-400">
            Generate unique CSS portraits from prompts • Inspired by Diana Smith (cyanHarlow)
          </p>
        </header>

        {/* Generator Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Panel - Controls */}
          <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
            <h2 className="text-2xl font-bold mb-6 text-primary-500">⚙️ Generator Controls</h2>

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
            <h2 className="text-2xl font-bold mb-6 text-accent-cyan">🖼️ Preview</h2>

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
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Info Section */}
        <div className="mt-12 bg-white/5 backdrop-blur-sm rounded-lg p-6 border border-white/10">
          <h3 className="text-xl font-bold mb-4">About This Project</h3>
          <div className="grid md:grid-cols-2 gap-6 text-sm text-gray-300">
            <div>
              <h4 className="font-bold text-primary-500 mb-2">✨ Transparent Generation</h4>
              <p>Every artwork is generated using pure CSS and HTML. View source to see exactly how it's made.</p>
            </div>
            <div>
              <h4 className="font-bold text-primary-500 mb-2">🔐 Provable Uniqueness</h4>
              <p>Each artwork has a cryptographic fingerprint proving its uniqueness and authenticity.</p>
            </div>
            <div>
              <h4 className="font-bold text-primary-500 mb-2">🎨 Original Technique</h4>
              <p>Based on the pioneering work of Diana Smith (cyanHarlow). She receives 15% of all platform revenue.</p>
            </div>
            <div>
              <h4 className="font-bold text-primary-500 mb-2">🚫 No AI Slop</h4>
              <p>Pure algorithmic art with no neural networks, no training data, just code and creativity.</p>
            </div>
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
        </footer>
      </div>
    </main>
  );
}
