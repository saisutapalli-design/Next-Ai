import React, { useEffect, useState } from 'react';
import { 
  FlaskConical, 
  Github, 
  ExternalLink, 
  Trophy, 
  Users,
  Search,
  Zap,
  Activity,
  ChevronRight,
  Plus,
  Beaker
} from 'lucide-react';
import { motion } from 'motion/react';

export const POCs: React.FC = () => {
  const [pocs, setPocs] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/pocs').then(res => res.json()).then(setPocs);
  }, []);

  const filtered = pocs.filter(p => 
    p.name.toLowerCase().includes(search.toLowerCase()) || 
    p.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-gl-orange"></div>
            <span className="text-xs font-black text-gl-orange uppercase tracking-[0.4em]">Experimental Lab</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase">
            POC <span className="text-gl-orange">Registry</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 mt-6 text-xl font-medium leading-relaxed">
            Internal AI experiments, prototypes, and technical validation records driving future innovation.
          </p>
        </div>
        <button className="flex items-center gap-4 bg-gl-orange text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gl-dark dark:hover:bg-white transition-all shadow-2xl shadow-gl-orange/30 group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Register POC
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search experiments, prototypes, or validation records..." 
          className="w-full pl-16 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gl-orange/20 focus:border-gl-orange transition-all text-sm font-bold text-slate-900 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {filtered.map((poc, idx) => (
          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.05 }}
            key={poc.id}
            className="group bg-gl-surface dark:bg-gl-surface-dark rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:border-gl-orange/30 transition-all duration-500 overflow-hidden flex flex-col"
          >
            <div className="p-10 flex-1">
              <div className="flex items-start justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-gl-orange group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-gl-orange/20">
                  <Beaker className="w-8 h-8 group-hover:scale-110 transition-transform" />
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center gap-2 text-gl-orange mb-1">
                    <Trophy className="w-5 h-5" />
                    <span className="text-2xl font-black">{poc.reusability_score}%</span>
                  </div>
                  <span className="text-[8px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-[0.3em]">Reusability Index</span>
                </div>
              </div>

              <h3 className="text-3xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-gl-orange transition-colors leading-tight">{poc.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 mb-10 leading-relaxed font-medium text-sm line-clamp-2">{poc.description}</p>

              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 group-hover:border-gl-orange/20 transition-colors">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Architecture</p>
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider">{poc.model_type || 'N/A'}</p>
                </div>
                <div className="p-6 bg-slate-50 dark:bg-white/5 rounded-2xl border border-slate-100 dark:border-white/5 group-hover:border-gl-orange/20 transition-colors">
                  <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-2">Data Source</p>
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider truncate">{poc.dataset || 'Internal'}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-slate-400 dark:text-slate-500">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/10">
                  <Users className="w-4 h-4 text-gl-orange" />
                  <span className="text-[10px] font-black uppercase tracking-widest">{poc.team}</span>
                </div>
              </div>
            </div>

            <div className="px-10 py-8 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex items-center justify-between group-hover:bg-gl-orange/5 transition-colors">
              <div className="flex items-center gap-6">
                <a href={poc.repo_link || '#'} className="flex items-center gap-3 text-slate-400 dark:text-slate-500 hover:text-gl-orange transition-all font-black text-[10px] uppercase tracking-widest">
                  <Github className="w-5 h-5" /> Repository
                </a>
              </div>
              <button className="text-gl-orange font-black text-[10px] uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all">
                View Validation <ExternalLink className="w-4 h-4" />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
