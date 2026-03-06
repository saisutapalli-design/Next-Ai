import React, { useEffect, useState } from 'react';
import { 
  Search, 
  Filter, 
  Plus, 
  ExternalLink, 
  ChevronRight,
  MapPin,
  Tag,
  Layers,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';

export const UseCases: React.FC = () => {
  const [useCases, setUseCases] = useState<any[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  useEffect(() => {
    fetch('/api/use-cases').then(res => res.json()).then(setUseCases);
  }, []);

  const filtered = useCases.filter(uc => {
    const matchesSearch = uc.title.toLowerCase().includes(search.toLowerCase()) || 
                         uc.description.toLowerCase().includes(search.toLowerCase());
    const matchesFilter = filter === 'All' || uc.industry === filter || uc.stage === filter;
    return matchesSearch && matchesFilter;
  });

  const industries = Array.from(new Set(useCases.map(uc => uc.industry)));

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-gl-orange"></div>
            <span className="text-xs font-black text-gl-orange uppercase tracking-[0.4em]">Solution Repository</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase">
            AI <span className="text-gl-orange">Use Cases</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 mt-6 text-xl font-medium leading-relaxed">
            Explore our curated collection of enterprise-grade AI implementations and digital solutions.
          </p>
        </div>
        <Link 
          to="/use-cases/new"
          className="flex items-center gap-4 bg-gl-orange text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gl-dark dark:hover:bg-white transition-all shadow-2xl shadow-gl-orange/30 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Register Solution
        </Link>
      </header>

      <div className="flex flex-col md:flex-row gap-6">
        <div className="relative flex-1">
          <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
          <input 
            type="text" 
            placeholder="Search by title, industry, or technology..." 
            className="w-full pl-16 pr-6 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gl-orange/20 focus:border-gl-orange transition-all text-sm font-bold text-slate-900 dark:text-white"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="flex gap-4">
          <div className="relative">
            <Filter className="absolute left-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <select 
              className="pl-14 pr-10 py-5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-white/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-gl-orange/20 focus:border-gl-orange appearance-none text-xs font-black uppercase tracking-widest text-slate-600 dark:text-slate-300 cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="All">All Industries</option>
              {industries.map(ind => <option key={ind} value={ind}>{ind}</option>)}
            </select>
            <ChevronRight className="absolute right-6 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 rotate-90 pointer-events-none" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filtered.map((uc, idx) => (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.05 }}
            key={uc.id}
            className="group bg-gl-surface dark:bg-gl-surface-dark rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:border-gl-orange/30 transition-all duration-500 flex flex-col overflow-hidden"
          >
            <div className="p-10 flex-1 relative">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/10">
                  <Layers className="w-3 h-3 text-gl-orange" />
                  <span className="text-[10px] font-black text-slate-500 dark:text-slate-400 uppercase tracking-widest">
                    {uc.industry}
                  </span>
                </div>
                <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  uc.stage === 'Production' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-100 dark:border-emerald-500/20' :
                  uc.stage === 'MVP' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 border border-blue-100 dark:border-blue-500/20' :
                  'bg-amber-50 dark:bg-amber-500/10 text-amber-600 border border-amber-100 dark:border-amber-500/20'
                }`}>
                  {uc.stage}
                </span>
              </div>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white group-hover:text-gl-orange transition-colors mb-4 uppercase tracking-tight leading-tight">
                {uc.title}
              </h3>
              <p className="text-slate-500 dark:text-slate-400 text-sm line-clamp-3 mb-8 font-medium leading-relaxed">
                {uc.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {uc.tags?.split(',').map((tag: string) => (
                  <div key={tag} className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 dark:bg-white/5 rounded-md border border-slate-100 dark:border-white/10">
                    <Tag className="w-2.5 h-2.5 text-slate-400" />
                    <span className="text-[9px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                      {tag.trim()}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="px-10 py-8 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 flex items-center justify-between group-hover:bg-gl-orange/5 transition-colors">
              <div className="flex items-center gap-2 text-slate-400 dark:text-slate-500">
                <Globe className="w-4 h-4 text-gl-orange" />
                <span className="text-[10px] font-black uppercase tracking-widest">{uc.region || 'Global'}</span>
              </div>
              <Link 
                to={`/use-cases/${uc.id}`}
                className="text-[10px] font-black text-gl-orange uppercase tracking-widest flex items-center gap-2 group-hover:gap-4 transition-all"
              >
                Explore Solution <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
