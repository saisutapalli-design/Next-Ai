import React, { useEffect, useState } from 'react';
import { 
  Cpu, 
  Sparkles, 
  Eye, 
  MessageSquare, 
  Activity, 
  ShieldAlert,
  ArrowRight,
  Zap,
  BrainCircuit,
  Database,
  Network
} from 'lucide-react';
import { motion } from 'motion/react';

const iconMap: Record<string, any> = {
  Sparkles,
  Eye,
  MessageSquare,
  Activity,
  ShieldAlert,
  Cpu,
  Zap,
  BrainCircuit,
  Database,
  Network
};

export const Capabilities: React.FC = () => {
  const [capabilities, setCapabilities] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/capabilities').then(res => res.json()).then(setCapabilities);
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-gl-orange"></div>
            <span className="text-xs font-black text-gl-orange uppercase tracking-[0.4em]">Technical Excellence</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase">
            AI <span className="text-gl-orange">Capabilities</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 mt-6 text-xl font-medium leading-relaxed">
            Our core technological pillars driving enterprise-grade AI transformation and innovation.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {capabilities.map((cap, idx) => {
          const Icon = iconMap[cap.icon] || Cpu;
          return (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              key={cap.id}
              className="group bg-gl-surface dark:bg-gl-surface-dark rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:border-gl-orange/30 transition-all duration-500 overflow-hidden"
            >
              <div className="p-10">
                <div className="flex items-center justify-between mb-10">
                  <div className="w-16 h-16 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-gl-orange group-hover:text-white transition-all duration-500 shadow-sm group-hover:shadow-xl group-hover:shadow-gl-orange/20">
                    <Icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase tracking-widest">CAP-{cap.id}</span>
                </div>
                <h3 className="text-2xl font-black text-slate-900 dark:text-white mb-4 uppercase tracking-tight group-hover:text-gl-orange transition-colors">{cap.name}</h3>
                <p className="text-slate-500 dark:text-slate-400 leading-relaxed mb-10 font-medium text-sm">
                  {cap.description}
                </p>
                
                <div className="space-y-6">
                  <div className="flex items-center justify-between text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">
                    <span>Performance Metrics</span>
                    <div className="h-[1px] flex-1 mx-4 bg-slate-100 dark:bg-white/5"></div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-2xl text-center border border-slate-100 dark:border-white/5 group-hover:border-gl-orange/20 transition-colors">
                      <p className="text-2xl font-black text-slate-900 dark:text-white">12</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-1">Deployments</p>
                    </div>
                    <div className="p-5 bg-slate-50 dark:bg-white/5 rounded-2xl text-center border border-slate-100 dark:border-white/5 group-hover:border-gl-orange/20 transition-colors">
                      <p className="text-2xl font-black text-slate-900 dark:text-white">5</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest mt-1">Core Assets</p>
                    </div>
                  </div>
                </div>

                <button className="w-full mt-10 py-5 bg-gl-dark dark:bg-black/40 text-white text-[10px] font-black uppercase tracking-widest hover:bg-gl-orange transition-all rounded-2xl shadow-lg hover:shadow-gl-orange/20 flex items-center justify-center gap-3 group/btn">
                  Explore Capability <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
