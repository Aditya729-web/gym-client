import React, { useEffect, useState } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, Users, Calendar, CreditCard, 
  Settings, LogOut, Activity, UserPlus, Bell
} from 'lucide-react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

function AdminLayout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/admin/login');
  };

  const navItems = [
    { name: 'Overview', path: '/admin/overview', icon: LayoutDashboard },
    { name: 'Members', path: '/admin/members', icon: Users },
    { name: 'Schedule', path: '/admin/schedule', icon: Calendar },
    { name: 'Billing', path: '/admin/billing', icon: CreditCard },
    { name: 'Settings', path: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#050505] text-zinc-300 font-sans flex overflow-hidden">
      {/* Ambient Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-zinc-800/20 via-[#050505] to-[#050505]"></div>
      </div>

      {/* Glass Sidebar */}
      <motion.div 
        initial={{ x: -300 }}
        animate={{ x: 0 }}
        transition={{ type: "spring", stiffness: 100, damping: 20 }}
        className="w-64 bg-white/5 backdrop-blur-3xl border-r border-white/10 flex flex-col fixed inset-y-0 z-20"
      >
        <div className="p-8 flex items-center gap-3">
          <div className="w-10 h-10 bg-white/10 border border-white/20 rounded-xl flex items-center justify-center">
            <Activity className="w-5 h-5 text-white" />
          </div>
          <span className="font-bold text-xl tracking-tight text-white">APEX</span>
        </div>
        
        <nav className="flex-1 px-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.includes(item.path);
            return (
              <Link
                key={item.name}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium transition-all",
                  isActive 
                    ? "bg-white text-black shadow-lg" 
                    : "text-zinc-400 hover:bg-white/10 hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="p-6 border-t border-white/10">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-medium text-zinc-400 hover:text-white hover:bg-white/10 w-full transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Sign Out
          </button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="ml-64 flex-1 flex flex-col min-h-screen relative z-10">
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
          className="h-20 bg-black/40 backdrop-blur-2xl border-b border-white/10 flex items-center justify-between px-10 sticky top-0 z-20"
        >
          <h1 className="text-xl font-bold text-white tracking-tight">
            {navItems.find(i => location.pathname.includes(i.path))?.name || 'Dashboard'}
          </h1>
          <div className="flex items-center gap-6">
            <button className="p-2.5 text-zinc-400 hover:text-white hover:bg-white/10 rounded-full transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-white rounded-full"></span>
            </button>
            <div className="flex items-center gap-3">
              <div className="text-right hidden md:block">
                <p className="text-sm font-medium text-white">Director</p>
                <p className="text-xs text-zinc-500">Admin</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/10 border border-white/20 flex items-center justify-center">
                <Activity className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        </motion.header>
        <main className="flex-1 p-10 overflow-y-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
}

function Overview() {
  const [stats, setStats] = useState<any>(null);
  
  useEffect(() => {
    fetch('/api/admin/stats')
      .then(res => res.json())
      .then(data => setStats(data))
      .catch(console.error);
  }, []);

  const revenueData = [
    { name: 'Jan', revenue: 1440000 },
    { name: 'Feb', revenue: 1560000 },
    { name: 'Mar', revenue: 1680000 },
    { name: 'Apr', revenue: 1640000 },
    { name: 'May', revenue: 1840000 },
    { name: 'Jun', revenue: 1960000 },
  ];

  const attendanceData = [
    { time: '6am', count: 45 },
    { time: '9am', count: 20 },
    { time: '12pm', count: 15 },
    { time: '5pm', count: 65 },
    { time: '8pm', count: 35 },
  ];
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };
  
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <motion.div variants={staggerContainer} initial="hidden" animate="visible" className="space-y-8">
      {/* Metric Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Members', value: stats?.totalMembers || '-', icon: Users, trend: '+4.5%' },
          { title: 'Active Members', value: stats?.activeMembers || '-', icon: Activity, trend: '+2.1%' },
          { title: 'Monthly Revenue', value: stats ? `₹${stats.monthlyRevenue.toLocaleString('en-IN')}` : '-', icon: CreditCard, trend: '+8.4%' },
          { title: 'New Sign-ups', value: stats?.newSignups || '-', icon: UserPlus, trend: '+1.2%' },
        ].map((metric, i) => (
          <motion.div variants={fadeInUp} key={i} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-6 rounded-3xl shadow-lg">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/10 flex items-center justify-center">
                <metric.icon className="w-6 h-6 text-white" />
              </div>
              <span className="text-xs font-bold px-2.5 py-1 bg-white/10 text-white rounded-full">
                {metric.trend}
              </span>
            </div>
            <div>
              <p className="text-sm font-medium text-zinc-400 mb-1">{metric.title}</p>
              <p className="text-3xl font-bold text-white tracking-tight">{metric.value}</p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div variants={fadeInUp} className="lg:col-span-2 bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-lg">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-lg font-bold text-white">Revenue Overview</h3>
            <select className="text-sm bg-white/10 border border-white/10 text-white rounded-xl px-4 py-2 outline-none">
              <option>Last 6 Months</option>
              <option>This Year</option>
            </select>
          </div>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff1a" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} tickFormatter={(value) => `₹${value/1000}k`} dx={-10} />
                <RechartsTooltip 
                  contentStyle={{backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'}}
                  itemStyle={{color: '#fff'}}
                />
                <Line type="monotone" dataKey="revenue" stroke="#ffffff" strokeWidth={3} dot={{r: 4, fill: '#000', strokeWidth: 2, stroke: '#fff'}} activeDot={{r: 6, fill: '#fff'}} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
        
        <motion.div variants={fadeInUp} className="bg-white/5 backdrop-blur-2xl border border-white/10 p-8 rounded-3xl shadow-lg">
          <h3 className="text-lg font-bold text-white mb-8">Peak Hours</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={attendanceData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#ffffff1a" />
                <XAxis dataKey="time" axisLine={false} tickLine={false} tick={{fill: '#a1a1aa', fontSize: 12}} dy={10} />
                <RechartsTooltip 
                  cursor={{fill: 'rgba(255,255,255,0.05)'}} 
                  contentStyle={{backgroundColor: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.1)', color: '#fff'}}
                />
                <Bar dataKey="count" fill="#ffffff" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Members() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/admin/members')
      .then(res => res.json())
      .then(data => setMembers(data))
      .catch(console.error);
  }, []);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }} 
      animate={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.4 }}
      className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl shadow-lg overflow-hidden"
    >
      <div className="p-8 border-b border-white/10 flex justify-between items-center bg-white/5">
        <h3 className="text-lg font-bold text-white">Member Directory</h3>
        <button className="px-6 py-2.5 bg-white text-black rounded-full text-sm font-bold shadow-lg hover:bg-zinc-200 transition-colors">
          Add Member
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 border-b border-white/10 text-zinc-400">
            <tr>
              <th className="px-8 py-5 font-medium">Name</th>
              <th className="px-8 py-5 font-medium">Email</th>
              <th className="px-8 py-5 font-medium">Plan</th>
              <th className="px-8 py-5 font-medium">Join Date</th>
              <th className="px-8 py-5 font-medium">Status</th>
              <th className="px-8 py-5 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {members.map((member) => (
              <tr key={member.id} className="hover:bg-white/5 transition-colors">
                <td className="px-8 py-5 font-medium text-white">{member.name}</td>
                <td className="px-8 py-5 text-zinc-400">{member.email}</td>
                <td className="px-8 py-5 text-zinc-300">{member.plan}</td>
                <td className="px-8 py-5 text-zinc-400">{member.joinDate}</td>
                <td className="px-8 py-5">
                  <span className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium border",
                    member.status === 'Active' ? "bg-white/10 border-white/20 text-white" : "bg-red-500/10 border-red-500/20 text-red-400"
                  )}>
                    {member.status}
                  </span>
                </td>
                <td className="px-8 py-5 text-right">
                  <button className="text-white hover:text-zinc-300 font-medium text-sm transition-colors">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
}

function ComingSoon({ title }: { title: string }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      className="flex flex-col items-center justify-center h-[60vh] text-center"
    >
      <motion.div 
        animate={{ rotate: 360 }}
        transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
        className="w-20 h-20 bg-white/5 border border-white/10 rounded-3xl flex items-center justify-center mb-6 shadow-inner backdrop-blur-md"
      >
        <Settings className="w-10 h-10 text-white" />
      </motion.div>
      <h2 className="text-2xl font-bold text-white mb-3">{title} Module</h2>
      <p className="text-zinc-400 max-w-md">This module is currently under development. It will feature comprehensive management tools for {title.toLowerCase()}.</p>
    </motion.div>
  );
}

export default function AdminDashboard() {
  return (
    <AdminLayout>
      <Routes>
        <Route path="/" element={<Overview />} />
        <Route path="/overview" element={<Overview />} />
        <Route path="/members" element={<Members />} />
        <Route path="/schedule" element={<ComingSoon title="Class & Schedule" />} />
        <Route path="/billing" element={<ComingSoon title="Payments & Billing" />} />
        <Route path="/settings" element={<ComingSoon title="Settings" />} />
      </Routes>
    </AdminLayout>
  );
}
