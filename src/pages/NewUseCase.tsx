import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Save, 
  Info, 
  Tag, 
  MapPin, 
  Cpu, 
  Briefcase,
  TrendingUp
} from 'lucide-react';
import { motion } from 'motion/react';

export const NewUseCase: React.FC = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    industry: 'Retail',
    business_function: '',
    ai_capability: 'Generative AI',
    stage: 'POC',
    business_impact: '',
    tags: '',
    contact_person: 'Jane Doe',
    region: 'North America',
    lat: 37.7749,
    lng: -122.4194
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/use-cases', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
      navigate('/use-cases');
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20">
      <Link to="/use-cases" className="inline-flex items-center gap-2 text-slate-500 hover:text-nextai-primary transition-colors font-medium">
        <ArrowLeft className="w-4 h-4" /> Back to Use Cases
      </Link>

      <header>
        <h2 className="text-3xl font-bold text-slate-900">Submit New AI Use Case</h2>
        <p className="text-slate-500 mt-1">Share your AI solution with the global enterprise community.</p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Briefcase className="w-4 h-4 text-nextai-primary" /> Project Title
              </label>
              <input 
                required
                type="text" 
                placeholder="e.g. Intelligent Inventory Forecasting"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-nextai-primary/20 focus:border-nextai-primary outline-none transition-all"
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Info className="w-4 h-4 text-nextai-primary" /> Description & Problem Statement
              </label>
              <textarea 
                required
                rows={4}
                placeholder="Describe the problem and how AI solved it..."
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-nextai-primary/20 focus:border-nextai-primary outline-none transition-all"
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Industry</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-nextai-primary/20 outline-none"
                  value={formData.industry}
                  onChange={e => setFormData({...formData, industry: e.target.value})}
                >
                  <option>Retail</option>
                  <option>Manufacturing</option>
                  <option>Finance</option>
                  <option>Healthcare</option>
                  <option>Logistics</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700">Deployment Stage</label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-nextai-primary/20 outline-none"
                  value={formData.stage}
                  onChange={e => setFormData({...formData, stage: e.target.value})}
                >
                  <option>Idea</option>
                  <option>POC</option>
                  <option>MVP</option>
                  <option>Production</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <Cpu className="w-4 h-4 text-nextai-primary" /> AI Capability
                </label>
                <select 
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-nextai-primary/20 outline-none"
                  value={formData.ai_capability}
                  onChange={e => setFormData({...formData, ai_capability: e.target.value})}
                >
                  <option>Generative AI</option>
                  <option>Computer Vision</option>
                  <option>NLP</option>
                  <option>Predictive Analytics</option>
                  <option>Anomaly Detection</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-nextai-primary" /> Region
                </label>
                <input 
                  type="text" 
                  placeholder="e.g. Europe"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-nextai-primary/20 outline-none"
                  value={formData.region}
                  onChange={e => setFormData({...formData, region: e.target.value})}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-nextai-primary" /> Business Impact
              </label>
              <input 
                type="text" 
                placeholder="e.g. 20% increase in efficiency"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-nextai-primary/20 outline-none"
                value={formData.business_impact}
                onChange={e => setFormData({...formData, business_impact: e.target.value})}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                <Tag className="w-4 h-4 text-nextai-primary" /> Tags (comma separated)
              </label>
              <input 
                type="text" 
                placeholder="e.g. LLM, Python, Automation"
                className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-nextai-primary/20 outline-none"
                value={formData.tags}
                onChange={e => setFormData({...formData, tags: e.target.value})}
              />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-end gap-4">
          <button 
            type="button"
            onClick={() => navigate('/use-cases')}
            className="px-8 py-3 rounded-xl font-bold text-slate-500 hover:bg-slate-100 transition-colors"
          >
            Cancel
          </button>
          <button 
            type="submit"
            className="flex items-center gap-2 bg-nextai-primary text-white px-10 py-3 rounded-xl font-bold shadow-lg shadow-nextai-primary/20 hover:bg-nextai-secondary transition-all"
          >
            <Save className="w-5 h-5" />
            Save Use Case
          </button>
        </div>
      </form>
    </div>
  );
};
