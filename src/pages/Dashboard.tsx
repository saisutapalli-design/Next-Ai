import React, { useEffect, useState } from 'react';
import { 
  Users, 
  Briefcase, 
  FlaskConical, 
  Cpu, 
  Library, 
  TrendingUp, 
  Clock,
  ArrowRight,
  Plus,
  Sparkles,
  Zap,
  Activity,
  BrainCircuit
} from 'lucide-react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';

const StatCard: React.FC<{ title: string; value: number; icon: any; color: string }> = ({ title, value, icon: Icon, color }) => (
  <motion.div 
    whileHover={{ y: -5 }}
    className="bg-gl-surface dark:bg-gl-surface-dark p-8 rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all flex items-center gap-6 group"
  >
    <div className={`p-4 rounded-xl ${color}/10 dark:${color}/20 group-hover:scale-110 transition-transform`}>
      <Icon className={`w-6 h-6 ${color.replace('bg-', 'text-')}`} />
    </div>
    <div>
      <p className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-1">{title}</p>
      <h3 className="text-3xl font-black text-slate-900 dark:text-white leading-none">{value}</h3>
    </div>
  </motion.div>
);

export const Dashboard: React.FC = () => {
  const [stats, setStats] = useState({ useCases: 0, pocs: 0, capabilities: 0, assets: 0 });
  const [recentUseCases, setRecentUseCases] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/stats').then(res => res.json()).then(setStats);
    fetch('/api/use-cases').then(res => res.json()).then(data => setRecentUseCases(data.slice(0, 5)));
  }, []);

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-3xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-[2px] bg-gl-orange"></div>
            <span className="text-xs font-black text-gl-orange uppercase tracking-[0.4em]">Innovation Hub</span>
          </div>
          <h2 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white tracking-tight leading-tight uppercase">
            Platform <span className="text-gl-orange">Intelligence</span>
          </h2>
          <p className="text-slate-400 dark:text-slate-500 mt-6 text-xl font-medium leading-relaxed">
            Empowering digital transformation through GlobalLogic's integrated AI ecosystem.
          </p>
        </div>
        <Link 
          to="/use-cases/new"
          className="flex items-center gap-4 bg-gl-orange text-white px-10 py-5 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-gl-dark dark:hover:bg-white transition-all shadow-2xl shadow-gl-orange/30 group"
        >
          <Plus className="w-5 h-5 group-hover:rotate-90 transition-transform" />
          Deploy Solution
        </Link>
      </header>

      {/* AI Insights Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gl-orange/5 dark:bg-gl-orange/10 border border-gl-orange/20 rounded-3xl p-8 relative overflow-hidden"
      >
        <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
          <div className="w-16 h-16 rounded-2xl gl-gradient flex items-center justify-center text-white shadow-xl shadow-gl-orange/20 shrink-0">
            <Sparkles className="w-8 h-8 animate-pulse" />
          </div>
          <div className="flex-1">
            <h3 className="text-xs font-black text-gl-orange uppercase tracking-[0.3em] mb-2">AI-Generated Insights</h3>
            <p className="text-slate-700 dark:text-slate-300 font-medium text-lg leading-relaxed">
              Based on recent activity, your team is focusing on <span className="text-gl-orange font-black">Generative AI</span> in the <span className="text-gl-orange font-black">Retail</span> sector. 
              There's a <span className="text-gl-orange font-black">24% increase</span> in reusable asset utilization this month.
            </p>
          </div>
          <button className="bg-white dark:bg-slate-900 text-gl-orange px-6 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-gl-orange hover:text-white transition-all border border-gl-orange/20">
            View Full Analysis
          </button>
        </div>
        <BrainCircuit className="absolute -right-12 -top-12 w-64 h-64 text-gl-orange/5 rotate-12" />
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <StatCard title="AI Use Cases" value={stats.useCases} icon={Briefcase} color="bg-gl-orange" />
        <StatCard title="Active POCs" value={stats.pocs} icon={FlaskConical} color="bg-blue-500" />
        <StatCard title="Capabilities" value={stats.capabilities} icon={Cpu} color="bg-purple-500" />
        <StatCard title="Reusable Assets" value={stats.assets} icon={Library} color="bg-emerald-500" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Recent Activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-4">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-gl-orange" />
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Recent Deployments</h3>
            </div>
            <Link to="/use-cases" className="text-[10px] font-black text-gl-orange uppercase tracking-widest hover:underline flex items-center gap-2">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentUseCases.map((uc, idx) => (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                key={uc.id}
              >
                <Link 
                  to={`/use-cases/${uc.id}`}
                  className="p-8 bg-gl-surface dark:bg-gl-surface-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm hover:shadow-xl transition-all group flex items-center justify-between"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-14 h-14 rounded-xl bg-slate-50 dark:bg-white/5 flex items-center justify-center text-slate-400 dark:text-slate-500 group-hover:bg-gl-orange group-hover:text-white transition-all">
                      <Zap className="w-6 h-6" />
                    </div>
                    <div>
                      <h4 className="text-xl font-black text-slate-900 dark:text-white uppercase tracking-tight group-hover:text-gl-orange transition-colors">{uc.title}</h4>
                      <p className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mt-1">{uc.industry} • {uc.business_function}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-8">
                    <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                      uc.stage === 'Production' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-100 dark:border-emerald-500/20' :
                      uc.stage === 'MVP' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 border border-blue-100 dark:border-blue-500/20' :
                      'bg-amber-50 dark:bg-amber-500/10 text-amber-600 border border-amber-100 dark:border-amber-500/20'
                    }`}>
                      {uc.stage}
                    </span>
                    <ArrowRight className="w-6 h-6 text-slate-200 dark:text-slate-800 group-hover:text-gl-orange group-hover:translate-x-2 transition-all" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Sidebar Insights */}
        <div className="space-y-8">
          <div className="flex items-center gap-3 border-b border-slate-100 dark:border-white/5 pb-4">
            <TrendingUp className="w-5 h-5 text-gl-orange" />
            <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.3em]">Market Trends</h3>
          </div>
          <div className="space-y-4">
            {[
              { name: 'Generative AI', count: 12, growth: '+15%', icon: Cpu, color: 'text-gl-orange bg-gl-orange/5 dark:bg-gl-orange/10' },
              { name: 'Computer Vision', count: 8, growth: '+5%', icon: Cpu, color: 'text-blue-500 bg-blue-500/5 dark:bg-blue-500/10' },
              { name: 'Predictive Analytics', count: 15, growth: '+22%', icon: TrendingUp, color: 'text-emerald-500 bg-emerald-500/5 dark:bg-emerald-500/10' },
            ].map((item) => (
              <div key={item.name} className="flex items-center justify-between p-6 bg-gl-surface dark:bg-gl-surface-dark rounded-2xl border border-slate-100 dark:border-white/5 shadow-sm group hover:border-gl-orange transition-all">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-xl ${item.color} group-hover:scale-110 transition-transform`}>
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest block">{item.name}</span>
                    <span className="text-[10px] text-emerald-500 font-bold">{item.growth} growth</span>
                  </div>
                </div>
                <span className="text-[10px] font-black text-slate-300 dark:text-slate-600 uppercase">{item.count} Projects</span>
              </div>
            ))}
          </div>

          <div className="bg-gl-dark dark:bg-black/40 rounded-3xl p-10 text-white relative overflow-hidden border border-white/5 shadow-2xl">
            <div className="relative z-10">
              <div className="w-12 h-[2px] bg-gl-orange mb-6"></div>
              <h4 className="text-2xl font-black uppercase tracking-tight leading-tight">GlobalLogic <br/><span className="text-gl-orange">Methodology</span></h4>
              <p className="text-slate-400 text-sm mt-6 leading-relaxed font-medium">Accelerate your AI journey with our proprietary design-led engineering approach.</p>
              <button className="mt-10 bg-gl-orange text-white px-8 py-4 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-gl-orange transition-all shadow-xl shadow-gl-orange/20">
                Connect with Experts
              </button>
            </div>
            <Cpu className="absolute -bottom-12 -right-12 w-64 h-64 text-white/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
