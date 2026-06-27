import React, { useState } from 'react';
import { SUPPORTED_LANGUAGES, TranslationHistoryItem } from '../types';
import { ArrowRight, Copy, Check, Languages, Sparkles, RefreshCw, KeyRound, Volume2, History, Trash2 } from 'lucide-react';

export default function TranslatorView() {
  const [sourceText, setSourceText] = useState("Architecture is the learned game, correct and magnificent, of forms assembled in the light.");
  const [targetLang, setTargetLang] = useState("es");
  const [translatedText, setTranslatedText] = useState("");
  const [providerUsed, setProviderUsed] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [customApiKey, setCustomApiKey] = useState("");
  const [showKeyInput, setShowKeyInput] = useState(false);
  const [history, setHistory] = useState<TranslationHistoryItem[]>([]);

  const handleTranslate = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!sourceText.trim()) return;

    setIsLoading(true);
    setError(null);
    setTranslatedText("");

    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: sourceText,
          targetLanguage: targetLang,
          rapidApiKey: customApiKey.trim() || undefined
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation request failed');
      }

      const result = data.translatedText;
      setTranslatedText(result);
      setProviderUsed(data.provider || 'RapidAPI');

      // Add to history
      const selectedLangObj = SUPPORTED_LANGUAGES.find(l => l.code === targetLang);
      const newItem: TranslationHistoryItem = {
        id: Date.now().toString(),
        originalText: sourceText,
        translatedText: result,
        targetLang: selectedLangObj ? `${selectedLangObj.name} (${selectedLangObj.nativeName})` : targetLang,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        provider: data.provider || 'RapidAPI'
      };
      setHistory(prev => [newItem, ...prev.slice(0, 9)]);

    } catch (err: any) {
      setError(err.message || 'Unable to translate text at this moment.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    if (!translatedText) return;
    navigator.clipboard.writeText(translatedText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const speakText = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = langCode;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <div className="flex-1 p-6 md:p-12 max-w-6xl mx-auto w-full flex flex-col gap-10">
      {/* Title Header */}
      <div className="border-b border-[#1A1A1A]/10 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-gray-500 mb-2 block flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5" /> Slab 01 // Feature Requirement
          </span>
          <h1 className="text-4xl md:text-6xl font-light tracking-tight italic">
            Linguistic Converter
          </h1>
        </div>
        <p className="text-sm font-sans text-gray-600 max-w-sm">
          Convert English strings into your favourite global language. Powered by RapidAPI Deep Translate.
        </p>
      </div>

      {/* Optional RapidAPI Key Configuration Bar */}
      <div className="bg-[#E5E2DD]/60 border border-[#1A1A1A]/10 p-4 font-sans text-xs">
        <div 
          onClick={() => setShowKeyInput(!showKeyInput)}
          className="flex justify-between items-center cursor-pointer font-bold uppercase tracking-wider text-gray-700"
        >
          <span className="flex items-center gap-2">
            <KeyRound className="w-3.5 h-3.5" /> Custom RapidAPI Credentials (Optional)
          </span>
          <span className="text-[10px] underline">{showKeyInput ? 'Hide' : 'Configure Key'}</span>
        </div>
        
        {showKeyInput && (
          <div className="mt-3 pt-3 border-t border-[#1A1A1A]/10 flex flex-col sm:flex-row gap-3 items-center">
            <input 
              type="password"
              placeholder="Paste your RapidAPI X-RapidAPI-Key here..."
              value={customApiKey}
              onChange={(e) => setCustomApiKey(e.target.value)}
              className="flex-1 w-full bg-[#F5F2ED] border border-[#1A1A1A]/20 px-3 py-2 font-mono text-xs focus:outline-none focus:border-[#1A1A1A]"
            />
            <span className="text-[10px] text-gray-500 italic">
              Leave blank to utilize default server API keys.
            </span>
          </div>
        )}
      </div>

      {/* Main Workspace Grid */}
      <form onSubmit={handleTranslate} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Box: English Source */}
        <div className="flex flex-col border border-[#1A1A1A]/20 bg-white/40 shadow-sm relative min-h-[300px]">
          <div className="bg-[#1A1A1A] text-[#F5F2ED] px-6 py-3 flex justify-between items-center font-sans text-xs uppercase tracking-widest font-bold">
            <span>Source // English</span>
            <span className="text-[10px] opacity-60">String Input</span>
          </div>
          
          <textarea
            value={sourceText}
            onChange={(e) => setSourceText(e.target.value)}
            placeholder="Type or paste English string here..."
            className="flex-1 p-6 font-serif text-xl md:text-2xl leading-relaxed bg-transparent resize-none focus:outline-none placeholder:text-gray-400 placeholder:italic"
            rows={6}
          />

          <div className="p-4 border-t border-[#1A1A1A]/10 flex justify-between items-center bg-[#F5F2ED]/50 font-sans text-xs text-gray-500">
            <span>{sourceText.length} characters</span>
            <button
              type="button"
              onClick={() => setSourceText("")}
              className="hover:text-[#1A1A1A] uppercase tracking-wider text-[10px]"
            >
              Clear
            </button>
          </div>
        </div>

        {/* Right Box: Target Translation */}
        <div className="flex flex-col border border-[#1A1A1A]/20 bg-white/40 shadow-sm relative min-h-[300px]">
          <div className="bg-[#1A1A1A] text-[#F5F2ED] px-6 py-3 flex justify-between items-center font-sans text-xs uppercase tracking-widest font-bold">
            <div className="flex items-center gap-2">
              <span>Target //</span>
              <select
                value={targetLang}
                onChange={(e) => setTargetLang(e.target.value)}
                className="bg-transparent text-amber-200 font-bold focus:outline-none cursor-pointer"
              >
                {SUPPORTED_LANGUAGES.map(lang => (
                  <option key={lang.code} value={lang.code} className="bg-[#1A1A1A] text-[#F5F2ED]">
                    {lang.name} ({lang.nativeName})
                  </option>
                ))}
              </select>
            </div>
            {providerUsed && (
              <span className="text-[9px] bg-white/10 px-2 py-0.5 rounded text-amber-300 tracking-normal">
                {providerUsed}
              </span>
            )}
          </div>

          <div className="flex-1 p-6 relative flex flex-col justify-between">
            {isLoading ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-3 text-gray-500 font-sans text-xs tracking-widest uppercase py-12">
                <RefreshCw className="w-6 h-6 animate-spin text-[#1A1A1A]" />
                <span>Translating via RapidAPI...</span>
              </div>
            ) : error ? (
              <div className="flex-1 flex items-center justify-center p-6 text-red-600 font-sans text-sm text-center">
                {error}
              </div>
            ) : translatedText ? (
              <div className="font-serif text-xl md:text-2xl leading-relaxed italic text-[#1A1A1A] whitespace-pre-wrap">
                {translatedText}
              </div>
            ) : (
              <div className="flex-1 flex items-center justify-center text-gray-400 italic font-serif text-lg text-center">
                Translation output will appear here...
              </div>
            )}
          </div>

          <div className="p-4 border-t border-[#1A1A1A]/10 flex justify-between items-center bg-[#F5F2ED]/50">
            <div className="flex gap-4">
              {translatedText && (
                <button
                  type="button"
                  onClick={() => speakText(translatedText, targetLang)}
                  className="p-2 hover:bg-[#1A1A1A]/10 rounded transition-colors text-gray-700"
                  title="Listen to pronunciation"
                >
                  <Volume2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="flex gap-3">
              {translatedText && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="px-4 py-2 border border-[#1A1A1A]/20 font-sans text-[10px] uppercase tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors flex items-center gap-1.5"
                >
                  {copied ? <Check className="w-3 h-3 text-green-600" /> : <Copy className="w-3 h-3" />}
                  {copied ? 'Copied' : 'Copy Output'}
                </button>
              )}

              <button
                type="submit"
                disabled={isLoading || !sourceText.trim()}
                className="px-8 py-3 bg-[#1A1A1A] text-white font-sans text-[10px] uppercase tracking-[0.2em] font-bold hover:bg-gray-800 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <span>Translate</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Translation Archive / History */}
      {history.length > 0 && (
        <section className="mt-6 pt-8 border-t border-[#1A1A1A]/10">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl italic font-serif flex items-center gap-2">
              <History className="w-4 h-4 text-gray-600" /> Recent Inquiries
            </h3>
            <button
              onClick={() => setHistory([])}
              className="font-sans text-[10px] uppercase tracking-widest text-gray-500 hover:text-red-600 flex items-center gap-1"
            >
              <Trash2 className="w-3 h-3" /> Clear Archive
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {history.map((item, idx) => (
              <div 
                key={item.id} 
                className="border border-[#1A1A1A]/10 p-5 bg-white/30 flex flex-col justify-between gap-4 hover:border-[#1A1A1A]/30 transition-colors"
              >
                <div className="flex justify-between items-start font-sans text-[10px] uppercase tracking-wider text-gray-500 border-b border-[#1A1A1A]/10 pb-2">
                  <span className="font-bold text-[#1A1A1A]">0{idx + 1} // {item.targetLang}</span>
                  <span>{item.timestamp}</span>
                </div>
                <div>
                  <div className="text-xs text-gray-500 truncate mb-1">"{item.originalText}"</div>
                  <div className="text-base font-serif italic text-[#1A1A1A] line-clamp-3">
                    {item.translatedText}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
