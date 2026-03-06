import React, { useEffect, useState } from 'react';
import { 
  Library, 
  Search, 
  Download, 
  Github, 
  Tag, 
  FileCode, 
  Box, 
  Globe,
  Plus,
  ChevronRight,
  Database,
  Code2,
  Cpu
} from 'lucide-react';
import { motion } from 'motion/react';

export const Assets: React.FC = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('/api/assets').then(res => res.json()).then(setAssets);
  }, []);

  const filtered = assets.filter(a => 
    a.name.toLowerCase().includes(search.toLowerCase()) || 
    a.description.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-gl-orange"></div>
            <span className="text-xs font-black text-gl-orange uppercase tracking-[0.4em]">Knowledge Repository</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase">
            Technical <span className="text-gl-orange">Assets</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 mt-6 text-xl font-medium leading-relaxed">
            Reusable models, APIs, and architecture patterns designed for rapid enterprise scaling.
          </p>
        </div>
        <button className="flex items-center gap-4 bg-gl-orange text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gl-dark dark:hover:bg-white transition-all shadow-2xl shadow-gl-orange/30 group">
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Upload Asset
        </button>
      </header>

      <div className="relative">
        <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
        <input 
          type="text" 
          placeholder="Search by asset name, type, or technology..." 
          className="w-full pl-16 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gl-orange/20 focus:border-gl-orange transition-all text-sm font-bold text-slate-900 dark:text-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((asset, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={asset.id}
            className="group bg-gl-surface dark:bg-gl-surface-dark rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:border-gl-orange/30 transition-all duration-500 overflow-hidden flex flex-col"
          >
            <div className="p-10 flex-1">
              <div className="flex items-center justify-between mb-10">
                <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-gl-orange group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-gl-orange/20">
                  {asset.type === 'API' ? <Globe className="w-8 h-8" /> : 
                   asset.type === 'Model' ? <Cpu className="w-8 h-8" /> : 
                   <Code2 className="w-8 h-8" />}
                </div>
                <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest bg-slate-50 dark:bg-white/5 px-3 py-1 rounded-lg">{asset.type}</span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-gl-orange transition-colors">{asset.name}</h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm font-medium leading-relaxed mb-10 line-clamp-2">{asset.description}</p>
              
              <div className="flex flex-wrap gap-2 mb-10">
                {asset.tags?.split(',').map((tag: string) => (
                  <div key={tag} className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-white/5 rounded-md border border-slate-100 dark:border-white/10">
                    <Tag className="w-2.5 h-2.5 text-slate-400" />
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {tag.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="px-10 py-8 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex items-center gap-4">
              {asset.repo_link && (
                <a href={asset.repo_link} className="flex-1 flex items-center justify-center gap-3 bg-white dark:bg-slate-800 text-slate-900 dark:text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gl-dark dark:hover:bg-white hover:text-white dark:hover:text-gl-dark transition-all border border-slate-200 dark:border-white/10 shadow-sm">
                  <Github className="w-4 h-4" /> Repository
                </a>
              )}
              <button className="flex-1 flex items-center justify-center gap-3 bg-gl-orange text-white py-4 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-gl-dark dark:hover:bg-white transition-all shadow-lg hover:shadow-gl-orange/20">
                <Download className="w-4 h-4" /> Get Asset
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
