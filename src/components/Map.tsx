import React from 'react';
import { MapPin, Globe, Zap } from 'lucide-react';

interface MapProps {
  location?: string;
  className?: string;
}

export const Map: React.FC<MapProps> = ({ location = "Global", className = "h-64" }) => {
  // Using a static Google Maps embed for the demo
  const encodedLocation = encodeURIComponent(location);
  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=${process.env.GOOGLE_MAPS_API_KEY || ''}&q=${encodedLocation}`;

  return (
    <div className={`w-full bg-slate-100 dark:bg-slate-900 overflow-hidden relative rounded-3xl ${className}`}>
      {!process.env.GOOGLE_MAPS_API_KEY ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center bg-slate-50 dark:bg-black/20 border border-slate-200 dark:border-white/5 overflow-hidden">
          <div className="relative mb-8">
            <div className="w-20 h-20 bg-gl-orange/10 dark:bg-gl-orange/20 flex items-center justify-center rounded-2xl relative z-10">
              <Globe className="w-10 h-10 text-gl-orange animate-pulse" />
            </div>
            <div className="absolute -inset-4 bg-gl-orange/5 rounded-full animate-ping"></div>
          </div>
          
          <h4 className="text-sm font-black uppercase tracking-[0.3em] text-slate-900 dark:text-white mb-4">Interactive Intelligence Map</h4>
          <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest max-w-xs leading-relaxed">
            Connect your Google Maps API Key in the environment settings to enable real-time global deployment tracking.
          </p>
          
          <div className="mt-10 flex items-center gap-3 px-6 py-3 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl shadow-gl-orange/5">
            <MapPin className="w-4 h-4 text-gl-orange" />
            <span className="text-[10px] font-black text-gl-orange uppercase tracking-[0.2em]">{location}</span>
          </div>
          
          <Zap className="absolute -right-12 -bottom-12 w-48 h-48 text-gl-orange/5 rotate-12" />
        </div>
      ) : (
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src={mapUrl}
          allowFullScreen
          title={`Map showing ${location}`}
        ></iframe>
      )}
    </div>
  );
};
