import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Languages, ShieldAlert, Sparkles, Binary, ArrowUpRight } from 'lucide-react';

export default function OverviewView() {
  const navigate = useNavigate();

  return (
    <div className="flex-1 flex flex-col lg:flex-row min-h-[650px]">
      {/* Left Column: Featured Hero */}
      <section className="lg:w-3/5 border-b lg:border-b-0 lg:border-r border-[#1A1A1A]/10 p-8 md:p-12 flex flex-col justify-between bg-[#F5F2ED]">
        <div>
          <span className="text-[10px] uppercase tracking-[0.4em] font-sans text-gray-500 mb-4 block flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#1A1A1A]" /> Featured Inquiry // Slab 01
          </span>
          <h1 className="text-5xl md:text-7xl xl:text-8xl font-light leading-[0.92] tracking-tight mb-8 italic">
            Language <br/>& Entropy
          </h1>
          <p className="text-lg md:text-xl max-w-md leading-relaxed text-gray-700 italic">
            An exploration of linguistic conversion across boundaries and the mathematical beauty of random string generation.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-12">
          <div className="w-full sm:w-60 h-64 bg-[#E5E2DD] relative p-6 flex flex-col justify-between border border-[#1A1A1A]/10 overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1A1A]/40 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            <div className="relative z-10 font-sans text-xs uppercase tracking-widest font-bold text-[#1A1A1A]">
              Application 01
            </div>
            <div className="relative z-10 text-white">
              <Languages className="w-8 h-8 mb-2 opacity-90" />
              <div className="text-sm font-semibold italic font-serif">RapidAPI Text Translator</div>
              <div className="text-[10px] uppercase font-sans tracking-widest text-gray-200 mt-1">Deep Translate Engine</div>
            </div>
          </div>

          <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-end gap-4">
            <span className="text-5xl md:text-7xl font-bold opacity-10 font-sans">01</span>
            <button 
              onClick={() => navigate('/translator')}
              className="px-8 py-4 bg-[#1A1A1A] text-white text-[10px] uppercase tracking-[0.2em] font-sans hover:bg-gray-800 transition-colors flex items-center gap-2 shadow-sm"
            >
              Open Translator <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </section>

      {/* Right Column: List & Secondary Content */}
      <section className="lg:w-2/5 flex flex-col justify-between">
        <div className="p-8 md:p-10 flex flex-col gap-8 md:gap-10">
          <div 
            onClick={() => navigate('/translator')}
            className="group cursor-pointer"
          >
            <div className="flex justify-between items-baseline border-b border-[#1A1A1A]/30 pb-2">
              <h2 className="text-2xl italic group-hover:pl-2 transition-all duration-300">Universal Translator</h2>
              <span className="text-[10px] font-sans uppercase tracking-widest font-bold">01</span>
            </div>
            <p className="text-sm mt-3 text-gray-600 font-sans leading-relaxed">
              Takes English input strings and converts them to your favourite world language. Powered by RapidAPI with instant Google AI backup.
            </p>
          </div>

          <div 
            onClick={() => navigate('/generator')}
            className="group cursor-pointer"
          >
            <div className="flex justify-between items-baseline border-b border-[#1A1A1A]/30 pb-2">
              <h2 className="text-2xl italic group-hover:pl-2 transition-all duration-300">String Generator</h2>
              <span className="text-[10px] font-sans uppercase tracking-widest font-bold">02</span>
            </div>
            <p className="text-sm mt-3 text-gray-600 font-sans leading-relaxed">
              Generates random secure strings. Built strictly utilizing React hooks: <code className="font-mono bg-[#E5E2DD] px-1.5 py-0.5 rounded text-xs">useState</code>, <code className="font-mono bg-[#E5E2DD] px-1.5 py-0.5 rounded text-xs">useCallback</code> & <code className="font-mono bg-[#E5E2DD] px-1.5 py-0.5 rounded text-xs">useEffect</code>.
            </p>
          </div>

          <div className="group cursor-default">
            <div className="flex justify-between items-baseline border-b border-[#1A1A1A]/30 pb-2">
              <h2 className="text-2xl italic">Client Side Routing</h2>
              <span className="text-[10px] font-sans uppercase tracking-widest font-bold">03</span>
            </div>
            <p className="text-sm mt-3 text-gray-600 font-sans leading-relaxed">
              Seamless instantaneous single-page navigation orchestrated via <code className="font-mono bg-[#E5E2DD] px-1.5 py-0.5 rounded text-xs">react-router-dom</code> without full browser reloads.
            </p>
          </div>
        </div>

        <div className="bg-[#1A1A1A] p-8 md:p-10 text-[#F5F2ED] flex flex-col gap-6 m-4 md:m-6 shadow-md relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 border border-white/10 rounded-full pointer-events-none" />
          <div className="text-[10px] uppercase tracking-[0.4em] font-sans opacity-60 flex items-center gap-2">
            <Binary className="w-3.5 h-3.5 text-amber-300" /> Current Assignment
          </div>
          <div className="text-3xl md:text-4xl leading-tight font-serif italic">
            Beginners Slab 01 <br/> React Standards
          </div>
          <div className="flex flex-wrap justify-between items-center mt-4 pt-4 border-t border-white/10 gap-2">
            <span className="font-sans text-[10px] border border-white/20 px-3 py-1 bg-white/5 uppercase tracking-wider">Status: Completed</span>
            <button 
              onClick={() => navigate('/generator')}
              className="font-sans text-[10px] tracking-widest uppercase hover:underline flex items-center gap-1 text-amber-200"
            >
              Test Hooks App <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
