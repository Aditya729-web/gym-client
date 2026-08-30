import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, MapPin, Phone, Mail, Instagram, Twitter, Facebook, Play, Activity, Lock } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  const [introStage, setIntroStage] = useState(0);
  const phrases = ['Build Your Best', 'Transform Your Life', 'Unleash Your Potential'];
  const introFinished = introStage >= phrases.length;

  useEffect(() => {
    if (!introFinished) {
      const timer = setTimeout(() => {
        setIntroStage(prev => prev + 1);
      }, 1600);
      return () => clearTimeout(timer);
    }
  }, [introStage, introFinished]);

  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
  };

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans selection:bg-white/20 selection:text-white">
      <AnimatePresence>
        {!introFinished && (
          <motion.div 
            className="fixed inset-0 z-[100] bg-[#050505] flex items-center justify-center overflow-hidden"
            exit={{ opacity: 0, transition: { duration: 1, ease: 'easeInOut' } }}
          >
            {/* Ambient Background Image */}
            <motion.img 
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2940&auto=format&fit=crop" 
              className="absolute inset-0 w-full h-full object-cover opacity-30"
              initial={{ scale: 1.2, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.3 }}
              transition={{ duration: 5, ease: 'easeOut' }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-[#050505]"></div>
            
            <AnimatePresence mode="wait">
              {introStage < phrases.length && (
                <motion.h1
                  key={introStage}
                  initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, scale: 1.1, filter: 'blur(10px)' }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                  className="text-4xl md:text-7xl font-bold text-white tracking-tighter relative z-10 text-center"
                >
                  {phrases[introStage]}
                </motion.h1>
              )}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Subtle Ambient Background */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-zinc-800/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-20%] right-[-10%] w-[50%] h-[50%] bg-zinc-800/10 blur-[120px] rounded-full"></div>
      </div>

      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-black/40 backdrop-blur-2xl border-b border-white/10 text-white">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between"
        >
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-white/10 border border-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
              <Activity className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl tracking-tight">APEX FORGE</span>
          </div>
          <div className="hidden md:flex gap-8 text-sm font-medium text-zinc-400">
            <a href="#about" className="hover:text-white transition-colors">About</a>
            <a href="#classes" className="hover:text-white transition-colors">Classes</a>
            <a href="#trainers" className="hover:text-white transition-colors">Trainers</a>
            <a href="#pricing" className="hover:text-white transition-colors">Membership</a>
          </div>
          <div className="flex gap-4">
            <Link to="/admin/login" className="hidden md:flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium text-zinc-400 hover:text-white transition-colors">
              <Lock className="w-4 h-4" />
              Owner Login
            </Link>
            <button className="bg-white hover:bg-zinc-200 text-black px-6 py-2 rounded-full text-sm font-bold transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]">
              Join Now
            </button>
          </div>
        </motion.div>
      </nav>

      <main className="relative z-10">
        {/* Hero Section */}
        <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden border-b border-white/5">
          <div className="absolute inset-0 z-0 opacity-30">
            <img 
              src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=2940&auto=format&fit=crop" 
              alt="Gym Background" 
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/80 to-transparent"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/50 to-transparent"></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="max-w-2xl"
            >
              <div className="inline-block px-4 py-1.5 border border-white/10 bg-white/5 backdrop-blur-md rounded-full text-zinc-300 font-medium text-xs tracking-wide mb-6">
                Redefining Fitness.
              </div>
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-[1.1] mb-6 tracking-tighter">
                Forge your <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-zinc-500">ultimate</span> potential.
              </h1>
              <p className="text-lg text-zinc-400 mb-10 max-w-xl leading-relaxed">
                Premium equipment, elite trainers, and a community driven by progress. Experience fitness at its highest standard in a state-of-the-art environment.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="bg-white hover:bg-zinc-200 text-black px-8 py-4 rounded-full font-bold transition-colors flex items-center gap-2 shadow-[0_0_20px_rgba(255,255,255,0.15)]">
                  Start Free Trial <ArrowRight className="w-5 h-5" />
                </button>
                <button className="bg-white/5 hover:bg-white/10 border border-white/10 backdrop-blur-md text-white px-8 py-4 rounded-full font-medium transition-colors flex items-center gap-2">
                  <Play className="w-5 h-5" /> View Facilities
                </button>
              </div>
            </motion.div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="py-24 relative overflow-hidden">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center"
          >
            <motion.div variants={fadeInUp}>
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-6">We don't just train.<br />We transform.</h2>
              <p className="text-zinc-400 text-lg leading-relaxed mb-8">
                Founded in 2020, Apex Forge was built on a simple philosophy: fitness should be accessible, effective, and empowering. Our facility provides everything you need to surpass your goals.
              </p>
              <ul className="space-y-4 mb-8">
                {['24/7 Facility Access', 'Olympic-grade equipment', 'Expert coaching team', 'Luxury locker rooms'].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 font-medium text-zinc-200">
                    <div className="w-6 h-6 rounded-full bg-white/10 border border-white/10 flex items-center justify-center">
                      <CheckCircle2 className="w-3 h-3 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
            <motion.div variants={fadeInUp} className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl mt-8 transform hover:scale-105 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=2940&auto=format&fit=crop" alt="Workout" className="w-full h-64 object-cover" />
              </div>
              <div className="rounded-3xl border border-white/10 overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-500">
                <img src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=2940&auto=format&fit=crop" alt="Weights" className="w-full h-64 object-cover" />
              </div>
            </motion.div>
          </motion.div>
        </section>

        {/* Classes Grid */}
        <section id="classes" className="py-24 relative overflow-hidden">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-7xl mx-auto px-6"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">Elite Programs</h2>
              <p className="text-zinc-400 text-lg">From high-intensity intervals to mobility, we have a class for your specific goals.</p>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { name: 'Strength & Cond.', desc: 'Build pure power and athletic endurance.', img: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800' },
                { name: 'HIIT Protocol', desc: 'Maximum calorie burn in 45 minutes.', img: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800' },
                { name: 'Combat Fit', desc: 'Boxing and MMA-inspired conditioning.', img: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=800' }
              ].map((cls, i) => (
                <motion.div variants={fadeInUp} key={i} className="group relative rounded-3xl overflow-hidden aspect-[4/5] cursor-pointer border border-white/10 bg-white/5 backdrop-blur-xl">
                  <img src={cls.img} alt={cls.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                  <div className="absolute bottom-0 left-0 p-8 w-full">
                    <div className="bg-white/10 backdrop-blur-md border border-white/10 p-6 rounded-2xl">
                      <h3 className="text-xl font-bold text-white mb-2">{cls.name}</h3>
                      <p className="text-zinc-300 text-sm">{cls.desc}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Pricing Section (Glass Cards) */}
        <section id="pricing" className="py-24 relative overflow-hidden">
          <motion.div 
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="max-w-7xl mx-auto px-6"
          >
            <motion.div variants={fadeInUp} className="text-center max-w-2xl mx-auto mb-16">
              <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tighter mb-4">Membership Plans</h2>
              <p className="text-zinc-400 text-lg">No hidden fees. No complicated contracts. Just pure fitness.</p>
            </motion.div>
            
            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {/* Base */}
              <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2">Base</h3>
                <p className="text-zinc-400 text-sm mb-6">Perfect for self-guided training.</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">₹3,999</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['24/7 Gym Access', 'Cardio & Weight zones', 'Locker room access', '1 Free PT Session'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-white/50" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-xl border border-white/20 hover:bg-white/10 text-white text-sm font-bold transition-colors">Choose Base</button>
              </motion.div>

              {/* Elite */}
              <motion.div variants={fadeInUp} className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 flex flex-col relative transform md:-translate-y-4 shadow-2xl">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold shadow-lg">
                  Most Popular
                </div>
                <h3 className="text-xl font-bold text-white mb-2">Elite</h3>
                <p className="text-zinc-400 text-sm mb-6">Full access to classes and recovery.</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">₹6,999</span>
                  <span className="text-zinc-500 text-sm">/month</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['Everything in Base', 'Unlimited Group Classes', 'Sauna & Cold Plunge', 'Monthly Body Scan', 'Bring a guest on weekends'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-white">
                      <CheckCircle2 className="w-4 h-4 text-white" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-xl bg-white hover:bg-zinc-200 text-black text-sm font-bold transition-colors shadow-lg">Choose Elite</button>
              </motion.div>

              {/* Annual */}
              <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 flex flex-col hover:bg-white/10 transition-colors">
                <h3 className="text-xl font-bold text-white mb-2">Annual Elite</h3>
                <p className="text-zinc-400 text-sm mb-6">Commit long-term and save 20%.</p>
                <div className="mb-8">
                  <span className="text-5xl font-bold text-white">₹69,999</span>
                  <span className="text-zinc-500 text-sm">/year</span>
                </div>
                <ul className="space-y-4 mb-8 flex-1">
                  {['Everything in Elite', '20% Annual Discount', 'Free Gym Merchandise', 'Priority Class Booking'].map((feature, i) => (
                    <li key={i} className="flex items-center gap-3 text-sm text-zinc-300">
                      <CheckCircle2 className="w-4 h-4 text-white/50" /> {feature}
                    </li>
                  ))}
                </ul>
                <button className="w-full py-4 rounded-xl border border-white/20 hover:bg-white/10 text-white text-sm font-bold transition-colors">Choose Annual</button>
              </motion.div>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-black/60 backdrop-blur-2xl border-t border-white/5 py-16 relative z-10 overflow-hidden">
        <motion.div 
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-12"
        >
          <motion.div variants={fadeInUp} className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-8 bg-white/10 border border-white/10 rounded-lg flex items-center justify-center">
                <Activity className="w-4 h-4 text-white" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">APEX FORGE</span>
            </div>
            <p className="text-sm text-zinc-500 mb-6">Forging stronger bodies and minds since 2020. Your journey starts here.</p>
            <div className="flex gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Instagram className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Twitter className="w-4 h-4" /></a>
              <a href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white hover:text-black transition-colors"><Facebook className="w-4 h-4" /></a>
            </div>
          </motion.div>
          
          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-medium mb-6 text-sm">Quick Links</h4>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#classes" className="hover:text-white transition-colors">Class Schedule</a></li>
              <li><a href="#pricing" className="hover:text-white transition-colors">Membership</a></li>
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-medium mb-6 text-sm">Contact</h4>
            <ul className="space-y-4 text-sm text-zinc-500">
              <li className="flex gap-3 items-start"><MapPin className="w-4 h-4 text-white shrink-0 mt-0.5" /> <span>Champadali, Barasat, North 24 Paraganas- 700125</span></li>
              <li className="flex gap-3 items-center"><Phone className="w-4 h-4 text-white shrink-0" /> <span>+91 98765 43210</span></li>
              <li className="flex gap-3 items-center"><Mail className="w-4 h-4 text-white" /> join@apexforge.com</li>
            </ul>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <h4 className="text-white font-medium mb-6 text-sm">Newsletter</h4>
            <p className="text-sm text-zinc-500 mb-4">Get fitness tips and gym updates.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Email address" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2 w-full text-sm text-white focus:outline-none focus:border-white/30" />
              <button className="bg-white text-black px-4 py-2 rounded-xl text-sm font-bold hover:bg-zinc-200 transition-colors">Join</button>
            </div>
          </motion.div>
        </motion.div>
      </footer>
    </div>
  );
}
