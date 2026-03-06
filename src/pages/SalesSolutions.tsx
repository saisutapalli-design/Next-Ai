import React from 'react';
import { 
  TrendingUp, 
  CheckCircle2, 
  ArrowRight, 
  MessageSquare, 
  FileText, 
  Presentation,
  Layers,
  Zap,
  Target,
  BarChart3,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';

export const SalesSolutions: React.FC = () => {
  const solutions = [
    {
      title: "AI-Powered Customer Service",
      benefit: "40% reduction in support costs",
      pitch: "Scale your customer support without increasing headcount using our enterprise-grade LLM wrapper.",
      tech: "Generative AI, NLP",
      stage: "Production Ready"
    },
    {
      title: "Visual Quality Control",
      benefit: "99.8% defect detection accuracy",
      pitch: "Automate manufacturing inspection with high-precision computer vision models.",
      tech: "Computer Vision",
      stage: "POC Available"
    },
    {
      title: "Predictive Maintenance",
      benefit: "Prevent $2M+ in annual downtime",
      pitch: "Identify equipment failures before they happen using our anomaly detection suite.",
      tech: "Predictive Analytics",
      stage: "MVP Ready"
    }
  ];

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-gl-orange"></div>
            <span className="text-xs font-black text-gl-orange uppercase tracking-[0.4em]">Sales Enablement</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase">
            Solution <span className="text-gl-orange">Hub</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 mt-6 text-xl font-medium leading-relaxed">
            Ready-to-pitch AI solutions with proven business benefits and architecture templates for rapid deployment.
          </p>
        </div>
      </header>

      <div className="grid grid-cols-1 gap-12">
        {solutions.map((sol, idx) => (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: idx * 0.1 }}
            key={sol.title}
            className="group bg-gl-surface dark:bg-gl-surface-dark rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-2xl hover:border-gl-orange/30 transition-all duration-500 overflow-hidden flex flex-col lg:flex-row"
          >
            <div className="p-12 lg:w-2/3 space-y-10">
              <div className="flex items-center gap-6">
                <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                  sol.stage === 'Production Ready' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-100 dark:border-emerald-500/20' :
                  'bg-blue-50 dark:bg-blue-500/10 text-blue-600 border border-blue-100 dark:border-blue-500/20'
                }`}>
                  {sol.stage}
                </span>
                <div className="flex items-center gap-2 px-3 py-1 bg-slate-50 dark:bg-white/5 rounded-lg border border-slate-100 dark:border-white/10">
                  <Zap className="w-3 h-3 text-gl-orange" />
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{sol.tech}</span>
                </div>
              </div>
              
              <h3 className="text-4xl font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-gl-orange transition-colors leading-tight">{sol.title}</h3>
              
              <div className="flex items-center gap-4 text-emerald-600 dark:text-emerald-500 font-black text-2xl uppercase tracking-tight">
                <BarChart3 className="w-8 h-8" />
                {sol.benefit}
              </div>

              <div className="p-10 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 relative overflow-hidden group-hover:border-gl-orange/20 transition-colors">
                <h4 className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-6 flex items-center gap-2">
                  <Target className="w-4 h-4 text-gl-orange" /> Strategic Value Proposition
                </h4>
                <p className="text-slate-700 dark:text-slate-300 italic font-medium text-lg leading-relaxed relative z-10">"{sol.pitch}"</p>
                <Zap className="absolute -right-8 -bottom-8 w-32 h-32 text-gl-orange/5 rotate-12" />
              </div>

              <div className="flex flex-wrap gap-6 pt-6">
                <button className="flex items-center gap-3 bg-gl-orange text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-gl-dark dark:hover:bg-white transition-all shadow-xl shadow-gl-orange/20">
                  <Presentation className="w-5 h-5" /> Download Pitch Deck
                </button>
                <button className="flex items-center gap-3 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white px-8 py-4 rounded-xl font-black uppercase tracking-widest text-xs hover:bg-slate-200 dark:hover:bg-slate-700 transition-all border border-slate-200 dark:border-white/10">
                  <FileText className="w-5 h-5" /> Case Study
                </button>
                <button className="flex items-center gap-2 text-gl-orange font-black uppercase tracking-widest text-xs px-4 py-4 hover:underline group/btn">
                  Consult Expert <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>

            <div className="lg:w-1/3 bg-slate-50 dark:bg-black/20 p-12 flex flex-col justify-center items-center border-l border-slate-100 dark:border-white/5">
              <div className="w-full aspect-square bg-gl-surface dark:bg-gl-surface-dark rounded-3xl shadow-inner border border-slate-200 dark:border-white/10 flex flex-col items-center justify-center p-12 text-center space-y-8 group/card hover:border-gl-orange/30 transition-all">
                <div className="w-24 h-24 rounded-2xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-100 dark:text-slate-800 group-hover/card:bg-gl-orange/10 group-hover/card:text-gl-orange transition-all duration-500">
                  <Layers className="w-12 h-12" />
                </div>
                <div>
                  <h4 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Architecture Template</h4>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-3 font-bold uppercase tracking-[0.2em] leading-relaxed">Standardized deployment pattern for {sol.title}</p>
                </div>
                <button className="text-[10px] font-black text-gl-orange uppercase tracking-widest hover:underline flex items-center gap-2">
                  Preview Diagram <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
