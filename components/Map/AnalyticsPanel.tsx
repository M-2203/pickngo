import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Navigation, Users, Zap } from 'lucide-react';
import { RouteData } from '../../types';

interface AnalyticsPanelProps {
  route: RouteData;
  aiMessage: string;
}

const StatItem: React.FC<{ icon: any, label: string, value: string, sub?: string }> = ({ icon: Icon, label, value, sub }) => (
  <div className="flex items-start gap-3 mb-4 last:mb-0">
    <div className="p-2 rounded-lg bg-cyan-500/20 text-cyan-400">
      <Icon size={20} />
    </div>
    <div>
      <p className="text-xs text-slate-400 uppercase tracking-wide">{label}</p>
      <p className="text-lg font-bold text-white leading-none">{value}</p>
      {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
    </div>
  </div>
);

export const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ route, aiMessage }) => {
  // Format seconds to MM:SS
  const formatTime = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${mins} min ${s} sec`;
  };

  return (
    <motion.div 
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      className="absolute top-4 left-4 md:top-8 md:left-8 z-[1000] w-80"
    >
      <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 rounded-2xl p-6 shadow-2xl text-white">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-white/10 pb-4">
          <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
          Live Journey
        </h2>

        <StatItem 
          icon={Clock} 
          label="Estimated Arrival" 
          value={formatTime(route.etaSeconds)} 
          sub="Predictive traffic analysis applied"
        />

        <StatItem 
          icon={Navigation} 
          label="Next Stop" 
          value={route.nextStop} 
        />

        <StatItem 
          icon={Users} 
          label="Availability" 
          value="4 Cabs Nearby" 
          sub="HGS Shuttle Network"
        />

        {/* AI Insight Section */}
        <div className="mt-6 pt-4 border-t border-white/10">
          <div className="flex items-center gap-2 text-cyan-400 mb-2">
            <Zap size={16} />
            <span className="text-xs font-bold uppercase">PickNGo AI Insight</span>
          </div>
          <p className="text-sm text-slate-300 italic">
            "{aiMessage}"
          </p>
        </div>
      </div>
    </motion.div>
  );
};