import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  MapPin, 
  Calendar, 
  User, 
  Tag, 
  ExternalLink,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Layers,
  TrendingUp,
  MessageSquare,
  Sparkles,
  Zap,
  Globe,
  ChevronRight
} from 'lucide-react';
import { motion } from 'motion/react';
import { Map } from '../components/Map';

export const UseCaseDetail: React.FC = () => {
  const { id } = useParams();
  const [useCase, setUseCase] = useState<any>(null);

  useEffect(() => {
    fetch(`/api/use-cases/${id}`).then(res => res.json()).then(setUseCase);
  }, [id]);

  if (!useCase) return (
    <div className="flex flex-col items-center justify-center h-96 gap-6">
      <div className="w-16 h-16 border-4 border-gl-orange border-t-transparent rounded-full animate-spin shadow-xl shadow-gl-orange/20"></div>
      <p className="text-xs font-black text-gl-orange uppercase tracking-[0.4em] animate-pulse">Loading Intelligence...</p>
    </div>
  );

  return (
    <div className="space-y-12 pb-20">
      <Link to="/use-cases" className="inline-flex items-center gap-3 text-slate-400 dark:text-slate-500 hover:text-gl-orange transition-all text-[10px] font-black uppercase tracking-[0.2em] group">
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" /> Back to Solutions
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-12">
          <header className="border-b border-slate-100 dark:border-white/5 pb-12">
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-1.5 bg-gl-orange/5 dark:bg-gl-orange/10 border border-gl-orange/20 rounded-lg">
                <Globe className="w-3.5 h-3.5 text-gl-orange" />
                <span className="text-[10px] font-black text-gl-orange uppercase tracking-[0.2em]">
                  {useCase.industry}
                </span>
              </div>
              <span className={`px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-widest ${
                useCase.stage === 'Production' ? 'bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 border border-emerald-100 dark:border-emerald-500/20' :
                useCase.stage === 'MVP' ? 'bg-blue-50 dark:bg-blue-500/10 text-blue-600 border border-blue-100 dark:border-blue-500/20' :
                'bg-amber-50 dark:bg-amber-500/10 text-amber-600 border border-amber-100 dark:border-amber-500/20'
              }`}>
                {useCase.stage}
              </span>
            </div>
            <h2 className="text-5xl lg:text-6xl font-black text-slate-900 dark:text-white leading-tight uppercase tracking-tight">{useCase.title}</h2>
            <div className="flex flex-wrap items-center gap-8 mt-10 text-slate-400 dark:text-slate-500">
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10">
                <MapPin className="w-4 h-4 text-gl-orange" />
                <span className="text-[10px] font-black uppercase tracking-widest">{useCase.region}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10">
                <User className="w-4 h-4 text-gl-orange" />
                <span className="text-[10px] font-black uppercase tracking-widest">{useCase.contact_person}</span>
              </div>
              <div className="flex items-center gap-3 px-4 py-2 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10">
                <Tag className="w-4 h-4 text-gl-orange" />
                <span className="text-[10px] font-black uppercase tracking-widest">{useCase.ai_capability}</span>
              </div>
            </div>
          </header>

          <section className="bg-white dark:bg-slate-900 p-12 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm space-y-12 relative overflow-hidden">
            <Zap className="absolute -right-12 -top-12 w-48 h-48 text-gl-orange/5 rotate-12" />
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-gl-orange"></div>
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.4em]">Problem Statement</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-xl">{useCase.description}</p>
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-[2px] bg-emerald-500"></div>
                <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.4em]">Solution Overview</h3>
              </div>
              <p className="text-slate-500 dark:text-slate-400 leading-relaxed font-medium text-lg">
                {useCase.solution_overview || "The solution leverages advanced AI models to automate and optimize the business process, resulting in significant efficiency gains across the enterprise ecosystem."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6 relative z-10">
              <div className="p-10 bg-slate-50 dark:bg-black/20 rounded-3xl border border-slate-100 dark:border-white/5 group hover:border-gl-orange/30 transition-all duration-500">
                <h4 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-6 flex items-center gap-3">
                  <Cpu className="w-5 h-5 text-gl-orange" /> Tech Stack
                </h4>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-bold uppercase tracking-widest leading-relaxed">{useCase.tools_tech || "Python, PyTorch, Azure AI Services, React, GlobalLogic NEXT AI Framework"}</p>
              </div>
              <div className="p-10 bg-emerald-50 dark:bg-emerald-500/10 rounded-3xl border border-emerald-100 dark:border-emerald-500/20 group hover:border-emerald-500/40 transition-all duration-500">
                <h4 className="text-[10px] font-black text-emerald-900 dark:text-emerald-400 uppercase tracking-widest mb-6 flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-emerald-600 dark:text-emerald-500" /> Business Impact
                </h4>
                <p className="text-xs text-emerald-800 dark:text-emerald-300 font-black uppercase tracking-widest leading-relaxed">{useCase.business_impact}</p>
              </div>
            </div>
          </section>

          <section className="space-y-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-[2px] bg-gl-orange"></div>
              <h3 className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-[0.5em]">Global Deployment</h3>
            </div>
            <div className="rounded-3xl overflow-hidden border border-slate-100 dark:border-white/5 shadow-2xl">
              <Map location={useCase.region} className="h-[500px]" />
            </div>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
          <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm group hover:shadow-2xl transition-all duration-500">
            <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8 flex items-center justify-between">
              Architecture <Sparkles className="w-4 h-4 text-gl-orange" />
            </h3>
            <div className="aspect-video bg-slate-50 dark:bg-black/20 rounded-2xl flex items-center justify-center border border-dashed border-slate-200 dark:border-white/10 group-hover:border-gl-orange/30 transition-all">
              <Layers className="w-16 h-16 text-slate-200 dark:text-slate-800 group-hover:text-gl-orange/20 transition-colors" />
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-6 text-center font-bold uppercase tracking-[0.2em]">System Architecture Blueprint</p>
            <button className="w-full mt-10 flex items-center justify-center gap-3 bg-gl-dark dark:bg-white text-white dark:text-gl-dark py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-gl-orange dark:hover:bg-gl-orange dark:hover:text-white transition-all shadow-lg hover:shadow-gl-orange/20">
              <ExternalLink className="w-4 h-4" /> Full View
            </button>
          </div>

          <div className="bg-white dark:bg-slate-900 p-10 rounded-3xl border border-slate-100 dark:border-white/5 shadow-sm group hover:shadow-2xl transition-all duration-500">
            <h3 className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest mb-8">Related Assets</h3>
            <div className="space-y-4">
              {[
                { name: 'LLM Prompt Template', type: 'Asset', icon: Cpu },
                { name: 'Data Pipeline Script', type: 'Code', icon: Globe },
              ].map((asset) => (
                <div key={asset.name} className="flex items-center justify-between p-5 bg-slate-50 dark:bg-black/20 rounded-2xl border border-slate-100 dark:border-white/5 group/asset cursor-pointer hover:border-gl-orange/30 transition-all">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-white dark:bg-slate-800 flex items-center justify-center text-slate-400 group-hover/asset:text-gl-orange transition-colors">
                      <asset.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black text-slate-900 dark:text-white uppercase tracking-widest">{asset.name}</p>
                      <p className="text-[8px] text-slate-400 dark:text-slate-500 uppercase font-black tracking-widest mt-1">{asset.type}</p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-200 dark:text-slate-800 group-hover/asset:text-gl-orange group-hover/asset:translate-x-1 transition-all" />
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gl-dark dark:bg-slate-900 p-10 rounded-3xl border border-gl-dark dark:border-white/5 shadow-2xl relative overflow-hidden">
            <div className="w-12 h-[2px] bg-gl-orange mb-8"></div>
            <h3 className="text-2xl font-black text-white uppercase tracking-tight mb-8">Innovation Lead</h3>
            <div className="flex items-center gap-5 mb-10">
              <div className="w-16 h-16 rounded-2xl bg-gl-orange text-white flex items-center justify-center font-black text-2xl shadow-xl shadow-gl-orange/20">
                {useCase.contact_person?.split(' ').map((n: string) => n[0]).join('')}
              </div>
              <div>
                <p className="text-lg font-black text-white uppercase tracking-tight leading-none">{useCase.contact_person}</p>
                <p className="text-[10px] text-slate-400 uppercase font-bold tracking-[0.2em] mt-2">Principal Architect</p>
              </div>
            </div>
            <button className="w-full bg-gl-orange text-white py-5 rounded-2xl text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-gl-dark transition-all flex items-center justify-center gap-3 shadow-xl shadow-gl-orange/20">
              <MessageSquare className="w-4 h-4" /> Send Inquiry
            </button>
            <Zap className="absolute -left-8 -bottom-8 w-32 h-32 text-white/5 rotate-12" />
          </div>
        </div>
      </div>
    </div>
  );
};
