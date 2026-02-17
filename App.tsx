import React, { useState } from 'react';
import { Background } from './components/Layout/Background';
import { LandingPage } from './components/LandingPage';
import { MapView } from './components/Map/MapView';
import { AnalyticsPanel } from './components/Map/AnalyticsPanel';
import { useCabSimulation } from './services/backendSimulation';
import { AppView } from './types';
import { motion, AnimatePresence } from 'framer-motion';

const App: React.FC = () => {
  const [view, setView] = useState<AppView>(AppView.LANDING);
  
  // Simulation is only active when in MAP view
  const { cab, route, aiMessage } = useCabSimulation(view === AppView.MAP);

  return (
    <div className="relative w-full min-h-screen overflow-hidden font-sans text-slate-100">
      <Background />

      <AnimatePresence mode="wait">
        {view === AppView.LANDING ? (
          <motion.div
            key="landing"
            exit={{ opacity: 0, y: -50 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0"
          >
            <LandingPage onStart={() => setView(AppView.MAP)} />
          </motion.div>
        ) : (
          <motion.div
            key="map"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="relative w-full h-screen"
          >
            <AnalyticsPanel route={route} aiMessage={aiMessage} />
            
            {/* Main Map Visualization */}
            <div className="absolute inset-0 z-0">
               <MapView cab={cab} route={route} />
            </div>

            {/* Top Bar for Map View */}
            <div className="absolute top-0 left-0 w-full p-4 md:hidden z-[1000] bg-gradient-to-b from-slate-900/90 to-transparent pointer-events-none">
              <span className="text-xl font-bold text-cyan-400 drop-shadow-md ml-14">PickNGo</span>
            </div>

            {/* Back Button (Demo purpose) */}
            <button 
              onClick={() => setView(AppView.LANDING)}
              className="absolute top-4 right-4 z-[1001] bg-slate-800/80 hover:bg-red-500/80 text-white px-3 py-1 rounded-md text-xs backdrop-blur-md border border-white/10 transition-colors"
            >
              Exit Demo
            </button>
            
            {/* Toast Notification Simulation */}
            <AnimatePresence>
               {route.etaSeconds < 60 && (
                 <motion.div
                   initial={{ y: 100, opacity: 0 }}
                   animate={{ y: 0, opacity: 1 }}
                   exit={{ y: 100, opacity: 0 }}
                   className="absolute bottom-8 left-1/2 -translate-x-1/2 z-[1000] bg-cyan-600 text-white px-6 py-3 rounded-full shadow-lg border border-cyan-400 font-bold flex items-center gap-2"
                 >
                   <span className="w-3 h-3 bg-white rounded-full animate-ping" />
                   Your ride is arriving now!
                 </motion.div>
               )}
            </AnimatePresence>

          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;