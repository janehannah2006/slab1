import React, { useState, useCallback, useEffect } from 'react';
import { Copy, Check, RefreshCw, Sparkles, Sliders, Shield, Terminal, Code2 } from 'lucide-react';

export default function GeneratorView() {
  // ==========================================
  // HOOK 1: useState
  // Used for managing component state variables
  // ==========================================
  const [length, setLength] = useState<number>(24);
  const [includeUpper, setIncludeUpper] = useState<boolean>(true);
  const [includeLower, setIncludeLower] = useState<boolean>(true);
  const [includeNumbers, setIncludeNumbers] = useState<boolean>(true);
  const [includeSymbols, setIncludeSymbols] = useState<boolean>(true);
  const [randomString, setRandomString] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);
  const [generationCount, setGenerationCount] = useState<number>(0);

  // ==========================================
  // HOOK 2: useCallback
  // Memoizes the generator function based on state deps
  // ==========================================
  const generateRandomString = useCallback(() => {
    let charset = "";
    if (includeUpper) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLower) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumbers) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%^&*()_+-=[]{}|;:,.<>?";

    // Fallback if user unchecks everything
    if (!charset) {
      setRandomString("Please select at least one character set.");
      return;
    }

    let generated = "";
    const array = new Uint32Array(length);
    window.crypto.getRandomValues(array);

    for (let i = 0; i < length; i++) {
      generated += charset[array[i] % charset.length];
    }

    setRandomString(generated);
    setGenerationCount(prev => prev + 1);
  }, [length, includeUpper, includeLower, includeNumbers, includeSymbols]);

  // ==========================================
  // HOOK 3: useEffect
  // Automatically fires generation on mount & when deps change
  // ==========================================
  useEffect(() => {
    generateRandomString();
  }, [generateRandomString]);

  const handleCopy = () => {
    if (!randomString || randomString.startsWith("Please select")) return;
    navigator.clipboard.writeText(randomString);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Entropy estimation calculation
  let poolSize = 0;
  if (includeUpper) poolSize += 26;
  if (includeLower) poolSize += 26;
  if (includeNumbers) poolSize += 10;
  if (includeSymbols) poolSize += 28;
  const entropyBits = poolSize > 0 ? Math.round(length * Math.log2(poolSize)) : 0;

  return (
    <div className="flex-1 p-6 md:p-12 max-w-6xl mx-auto w-full flex flex-col gap-10">
      {/* Title Header */}
      <div className="border-b border-[#1A1A1A]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-gray-500 mb-2 block flex items-center gap-1.5">
            <Terminal className="w-3.5 h-3.5" /> Slab 01 // React Hooks Mandate
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight italic">
            Random Entropy
          </h1>
        </div>
        <p className="text-sm font-sans text-gray-600 max-w-sm">
          Cryptographically secure string generator orchestrated strictly via React <code className="font-mono text-xs">useState</code>, <code className="font-mono text-xs">useCallback</code> & <code className="font-mono text-xs">useEffect</code>.
        </p>
      </div>

      {/* Hero Display Box */}
      <div className="bg-[#1A1A1A] text-[#F5F2ED] p-8 md:p-12 flex flex-col gap-8 shadow-xl relative overflow-hidden">
        <div className="flex justify-between items-center font-sans text-[10px] uppercase tracking-[0.3em] opacity-60 border-b border-white/10 pb-4">
          <span>Output 02 // Generated Entropy</span>
          <span>{entropyBits} Bits Entropy</span>
        </div>

        <div className="font-mono text-2xl md:text-4xl lg:text-5xl tracking-wider break-all py-6 select-all font-medium text-amber-200 min-h-[100px] flex items-center">
          {randomString}
        </div>

        <div className="flex flex-wrap justify-between items-center pt-4 border-t border-white/10 gap-4">
          <div className="font-sans text-xs text-gray-400">
            Generation Cycle #{generationCount}
          </div>

          <div className="flex gap-4">
            <button
              onClick={generateRandomString}
              className="px-6 py-3 bg-white/10 hover:bg-white/20 font-sans text-[10px] uppercase tracking-[0.2em] transition-colors flex items-center gap-2 cursor-pointer"
            >
              <RefreshCw className="w-3.5 h-3.5" /> Regenerate
            </button>

            <button
              onClick={handleCopy}
              disabled={randomString.startsWith("Please select")}
              className="px-8 py-3 bg-[#F5F2ED] text-[#1A1A1A] font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-white transition-colors flex items-center gap-2 shadow-sm cursor-pointer disabled:opacity-50"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-green-700" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? "Copied String" : "Copy String"}
            </button>
          </div>
        </div>
      </div>

      {/* Controls & Hooks Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column (7 cols): Parameters */}
        <div className="lg:col-span-7 border border-[#1A1A1A]/10 p-8 bg-white/40 flex flex-col gap-8">
          <h3 className="text-xl italic font-serif border-b border-[#1A1A1A]/10 pb-3 flex items-center gap-2">
            <Sliders className="w-4 h-4 text-gray-600" /> Entropy Parameters
          </h3>

          {/* Length Slider */}
          <div className="flex flex-col gap-3 font-sans">
            <div className="flex justify-between items-center text-xs uppercase tracking-wider">
              <span className="font-bold text-gray-700">String Length</span>
              <span className="font-mono font-bold text-base bg-[#1A1A1A] text-white px-2 py-0.5">{length}</span>
            </div>
            <input
              type="range"
              min={4}
              max={64}
              value={length}
              onChange={(e) => setLength(Number(e.target.value))}
              className="w-full accent-[#1A1A1A] h-2 bg-[#E5E2DD] cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-gray-400 font-mono">
              <span>4 chars</span>
              <span>32 chars</span>
              <span>64 chars</span>
            </div>
          </div>

          {/* Character Toggles */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans pt-2">
            <label className="flex items-center justify-between p-4 border border-[#1A1A1A]/10 bg-[#F5F2ED] cursor-pointer hover:border-[#1A1A1A]/40 transition-colors select-none">
              <span className="text-xs uppercase tracking-wider font-medium">Uppercase (A-Z)</span>
              <input
                type="checkbox"
                checked={includeUpper}
                onChange={(e) => setIncludeUpper(e.target.checked)}
                className="w-4 h-4 accent-[#1A1A1A] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-[#1A1A1A]/10 bg-[#F5F2ED] cursor-pointer hover:border-[#1A1A1A]/40 transition-colors select-none">
              <span className="text-xs uppercase tracking-wider font-medium">Lowercase (a-z)</span>
              <input
                type="checkbox"
                checked={includeLower}
                onChange={(e) => setIncludeLower(e.target.checked)}
                className="w-4 h-4 accent-[#1A1A1A] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-[#1A1A1A]/10 bg-[#F5F2ED] cursor-pointer hover:border-[#1A1A1A]/40 transition-colors select-none">
              <span className="text-xs uppercase tracking-wider font-medium">Numbers (0-9)</span>
              <input
                type="checkbox"
                checked={includeNumbers}
                onChange={(e) => setIncludeNumbers(e.target.checked)}
                className="w-4 h-4 accent-[#1A1A1A] cursor-pointer"
              />
            </label>

            <label className="flex items-center justify-between p-4 border border-[#1A1A1A]/10 bg-[#F5F2ED] cursor-pointer hover:border-[#1A1A1A]/40 transition-colors select-none">
              <span className="text-xs uppercase tracking-wider font-medium">Symbols (!@#$)</span>
              <input
                type="checkbox"
                checked={includeSymbols}
                onChange={(e) => setIncludeSymbols(e.target.checked)}
                className="w-4 h-4 accent-[#1A1A1A] cursor-pointer"
              />
            </label>
          </div>
        </div>

        {/* Right Column (5 cols): Hooks Architecture Explainer */}
        <div className="lg:col-span-5 bg-[#E5E2DD]/70 border border-[#1A1A1A]/10 p-8 flex flex-col justify-between font-sans">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gray-500 font-bold block mb-4">
              Codebase Architecture
            </span>
            <h4 className="text-2xl font-serif italic text-[#1A1A1A] mb-6">
              Hook Implementation
            </h4>

            <div className="flex flex-col gap-6 text-xs text-gray-700">
              <div className="border-l-2 border-[#1A1A1A] pl-4">
                <div className="font-mono font-bold text-[#1A1A1A] mb-1">1. useState</div>
                <p className="leading-relaxed text-gray-600">
                  Holds reactive UI states: string length, character checkboxes, copy confirmation, and current random string output.
                </p>
              </div>

              <div className="border-l-2 border-[#1A1A1A] pl-4">
                <div className="font-mono font-bold text-[#1A1A1A] mb-1">2. useCallback</div>
                <p className="leading-relaxed text-gray-600">
                  Stabilizes <code className="font-mono">generateRandomString()</code> reference across renders, preventing infinite loop cascades.
                </p>
              </div>

              <div className="border-l-2 border-[#1A1A1A] pl-4">
                <div className="font-mono font-bold text-[#1A1A1A] mb-1">3. useEffect</div>
                <p className="leading-relaxed text-gray-600">
                  Subscribes to parameter changes and mounts initial string generation automatically.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-[#1A1A1A]/10 flex items-center justify-between text-[10px] uppercase tracking-widest text-gray-500 font-bold">
            <span>React 19 Functional Strict</span>
            <Shield className="w-4 h-4 text-[#1A1A1A]" />
          </div>
        </div>
      </div>
    </div>
  );
}
