import React from 'react';

export const NextLogo: React.FC<{ className?: string }> = ({ className = "h-8" }) => {
  return (
    <div className={`flex items-center gap-3 font-bold ${className}`}>
      <div className="flex-shrink-0 w-10 h-10 gl-gradient flex items-center justify-center rounded-lg shadow-lg shadow-gl-orange/20">
        <span className="text-white font-black text-xl italic">GL</span>
      </div>
      <div className="flex flex-col leading-none">
        <span className="tracking-tighter text-xl uppercase font-black text-slate-900 dark:text-white">
          NEXT<span className="text-gl-orange">AI</span>
        </span>
        <span className="text-[8px] tracking-[0.3em] uppercase font-bold text-slate-400 mt-1">GlobalLogic AI</span>
      </div>
    </div>
  );
};
