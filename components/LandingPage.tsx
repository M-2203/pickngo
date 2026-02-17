import React from 'react';
import { motion } from 'framer-motion';
import { MapPin, Navigation, Car, ArrowRight } from 'lucide-react';
import { Logo } from './UI/Logo';

interface LandingPageProps {
  onStart: () => void;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { staggerChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1 }
};

export const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="min-h-screen flex flex-col relative text-white overflow-hidden">
      {/* Navigation */}
      <nav className="p-6 flex justify-between items-center z-10">
        <div className="flex items-center gap-3">
          <Logo className="w-10 h-10" animate />
          <span className="text-2xl font-bold tracking-wider text-cyan-400">PickNGo</span>
        </div>
        <button className="px-4 py-2 text-sm text-cyan-200 border border-cyan-500/30 rounded-full hover:bg-cyan-500/10 transition-colors">
          Employee Login
        </button>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow flex flex-col items-center justify-center text-center px-4 z-10">
        <motion.div 
          className="max-w-4xl w-full"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div variants={itemVariants} className="mb-8">
            <div className="inline-block p-8 rounded-2xl bg-white/5 backdrop-blur-lg border border-white/10 shadow-2xl relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <h1 className="text-5xl md:text-7xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 via-white to-orange-300">
                Your Ride, Real-time.
              </h1>
              <p className="text-xl md:text-2xl text-gray-300 font-light">
                Effortless Commutes, Every Time.
              </p>
            </div>
          </motion.div>

          {/* Features Grid */}
          <motion.div variants={itemVariants} className="grid md:grid-cols-3 gap-6 mb-12">
             {[
               { icon: MapPin, title: "Track & Predict", desc: "Live GPS movement with precise arrival times." },
               { icon: Navigation, title: "Smart Routing", desc: "AI-powered paths avoiding urban congestion." },
               { icon: Car, title: "Instant Access", desc: "Locate available HGS shuttles instantly." }
             ].map((feature, idx) => (
               <div key={idx} className="p-6 rounded-xl bg-slate-800/40 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-500/50 transition-all hover:-translate-y-1">
                 <feature.icon className="w-10 h-10 text-cyan-400 mb-4 mx-auto" />
                 <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
                 <p className="text-sm text-slate-300">{feature.desc}</p>
               </div>
             ))}
          </motion.div>

          <motion.div variants={itemVariants}>
            <button 
              onClick={onStart}
              className="group relative px-8 py-4 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full text-lg font-bold shadow-[0_0_20px_rgba(6,182,212,0.5)] hover:shadow-[0_0_40px_rgba(6,182,212,0.7)] transition-all transform hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2">
                Find My Ride <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </motion.div>
      </main>

      <div className="absolute bottom-0 w-full h-32 bg-gradient-to-t from-slate-900 to-transparent pointer-events-none" />
    </div>
  );
};