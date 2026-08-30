import { Link } from 'react-router-dom';
import { Settings, ArrowLeft } from 'lucide-react';
import { motion } from 'motion/react';

export default function AdminLogin() {
  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Ambient Glow */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.8, 0.5] }} 
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none"
      />
      
      <motion.div 
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-white/5 backdrop-blur-3xl border border-white/10 rounded-3xl p-10 shadow-2xl relative z-10 text-center"
      >
        <div className="flex flex-col items-center justify-center gap-4 mb-8">
          <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center shadow-inner mb-2">
            <Settings className="w-8 h-8 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white tracking-tight mb-2">Under Maintenance</h1>
            <p className="text-zinc-400 text-sm leading-relaxed">
              The Owner Portal is currently undergoing scheduled maintenance. Please check back later.
            </p>
          </div>
        </div>

        <Link
          to="/"
          className="w-full flex justify-center items-center gap-2 py-4 px-4 bg-white hover:bg-zinc-200 text-black rounded-2xl text-sm font-bold transition-all shadow-[0_0_20px_rgba(255,255,255,0.1)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)]"
        >
          <ArrowLeft className="w-4 h-4" /> Return to Home
        </Link>
      </motion.div>
    </div>
  );
}
