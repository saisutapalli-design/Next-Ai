import React, { useState } from 'react';
import { 
  Search as SearchIcon, 
  ArrowRight, 
  Briefcase, 
  FlaskConical, 
  Library,
  ChevronRight,
  Sparkles,
  Zap,
  Globe,
  Cpu,
  Beaker
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';

export const Search: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsSearching(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`);
      const data = await res.json();
      setResults(data);
    } finally {
      setIsSearching(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-16 px-4">
      <div className="text-center space-y-8">
        <div className="flex items-center justify-center gap-4 mb-4">
          <div className="w-16 h-[2px] bg-gl-orange"></div>
          <span className="text-xs font-black text-gl-orange uppercase tracking-[0.5em]">Enterprise Intelligence</span>
          <div className="w-16 h-[2px] bg-gl-orange"></div>
        </div>
        <h2 className="text-6xl lg:text-7xl font-black text-slate-900 dark:text-white tracking-tight uppercase leading-tight">
          Global <span className="text-gl-orange">AI Search</span>
        </h2>
        <p className="text-xl text-slate-400 dark:text-slate-500 font-medium max-w-2xl mx-auto leading-relaxed">
          Discover use cases, POCs, and technical assets across the entire GlobalLogic NEXT AI ecosystem.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative group">
        <div className="relative flex items-center">
          <SearchIcon className="absolute left-8 w-7 h-7 text-slate-400 group-focus-within:text-gl-orange transition-colors" />
          <input 
            type="text" 
            placeholder="WHAT ARE YOU LOOKING FOR? (E.G. 'LLM', 'RETAIL', 'VISION')" 
            className="w-full pl-20 pr-56 py-10 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-3xl text-2xl shadow-2xl focus:outline-none focus:ring-2 focus:ring-gl-orange/20 focus:border-gl-orange transition-all uppercase font-black tracking-widest placeholder:text-slate-200 dark:placeholder:text-slate-800 text-slate-900 dark:text-white"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button 
            type="submit"
            className="absolute right-4 bg-gl-orange text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gl-dark dark:hover:bg-white transition-all shadow-2xl shadow-gl-orange/30 group-hover:scale-105 active:scale-95"
          >
            Execute Search
          </button>
        </div>
      </form>

      <div className="space-y-8">
        <AnimatePresence mode="wait">
          {isSearching ? (
            <motion.div 
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center justify-center py-32 gap-6"
            >
              <div className="w-20 h-20 border-4 border-gl-orange border-t-transparent rounded-full animate-spin shadow-xl shadow-gl-orange/20"></div>
              <p className="text-xs font-black text-gl-orange uppercase tracking-[0.4em] animate-pulse">Querying Neural Index...</p>
            </motion.div>
          ) : results.length > 0 ? (
            <motion.div 
              key="results"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between px-4 border-b border-slate-100 dark:border-white/5 pb-6">
                <h3 className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.4em]">Found {results.length} Intelligence Records</h3>
                <Sparkles className="w-4 h-4 text-gl-orange" />
              </div>
              {results.map((res, idx) => (
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  key={`${res.type}-${res.id}`}
                >
                  <Link 
                    to={res.type === 'use-case' ? `/use-cases/${res.id}` : '#'}
                    className="flex items-center gap-10 p-10 bg-white dark:bg-slate-900 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:border-gl-orange/30 transition-all duration-500 group relative overflow-hidden"
                  >
                    <div className={`w-20 h-20 flex items-center justify-center rounded-2xl transition-all duration-500 shadow-sm group-hover:shadow-xl ${
                      res.type === 'use-case' ? 'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-600 group-hover:bg-gl-orange group-hover:text-white group-hover:shadow-gl-orange/20' :
                      res.type === 'poc' ? 'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-600 group-hover:bg-gl-dark dark:group-hover:bg-white dark:group-hover:text-gl-dark group-hover:text-white' :
                      'bg-slate-50 dark:bg-white/5 text-slate-400 dark:text-slate-600 group-hover:bg-gl-orange group-hover:text-white group-hover:shadow-gl-orange/20'
                    }`}>
                      {res.type === 'use-case' ? <Briefcase className="w-10 h-10" /> :
                       res.type === 'poc' ? <Beaker className="w-10 h-10" /> :
                       <Cpu className="w-10 h-10" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-300 dark:text-slate-600 bg-slate-50 dark:bg-white/5 px-3 py-1 rounded-lg">{res.type}</span>
                      </div>
                      <h4 className="text-3xl font-black text-slate-900 dark:text-white group-hover:text-gl-orange transition-colors uppercase tracking-tight leading-tight">{res.name}</h4>
                      <p className="text-slate-500 dark:text-slate-400 font-medium line-clamp-1 mt-3 text-lg leading-relaxed">{res.description}</p>
                    </div>
                    <div className="w-16 h-16 rounded-full bg-slate-50 dark:bg-white/5 flex items-center justify-center group-hover:bg-gl-orange group-hover:text-white transition-all duration-500">
                      <ChevronRight className="w-8 h-8 group-hover:translate-x-1 transition-transform" />
                    </div>
                    <Zap className="absolute -right-4 -bottom-4 w-24 h-24 text-gl-orange/5 rotate-12 group-hover:scale-110 transition-transform" />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
          ) : query && !isSearching ? (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-40 bg-slate-50 dark:bg-black/20 rounded-3xl border border-dashed border-slate-200 dark:border-white/10"
            >
              <div className="w-24 h-24 bg-slate-100 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-8">
                <SearchIcon className="w-10 h-10 text-slate-300 dark:text-slate-700" />
              </div>
              <p className="text-xl font-black text-slate-400 dark:text-slate-500 uppercase tracking-[0.3em]">No Intelligence Records Found</p>
              <p className="text-xs text-slate-300 dark:text-slate-600 mt-6 uppercase font-black tracking-widest max-w-md mx-auto leading-relaxed">Try broader technical terms, industry keywords, or check your spelling.</p>
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  );
};
