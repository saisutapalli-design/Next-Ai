import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Briefcase, 
  FlaskConical, 
  Cpu, 
  Library, 
  TrendingUp, 
  Search, 
  Settings,
  Menu,
  X,
  User,
  Bell,
  Sparkles,
  ChevronDown,
  LogOut,
  Shield
} from 'lucide-react';
import { NextLogo } from './Logo';
import { motion, AnimatePresence } from 'motion/react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { ThemeToggle } from './ThemeToggle';
import { useTheme } from '../context/ThemeContext';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

const navItems = [
  { name: 'Dashboard', path: '/', icon: LayoutDashboard },
  { name: 'Use Cases', path: '/use-cases', icon: Briefcase },
  { name: 'POCs', path: '/pocs', icon: FlaskConical },
  { name: 'Capabilities', path: '/capabilities', icon: Cpu },
  { name: 'Assets', path: '/assets', icon: Library },
  { name: 'Sales Solutions', path: '/sales', icon: TrendingUp },
  { name: 'Search', path: '/search', icon: Search },
];

export const Layout: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [isProfileOpen, setIsProfileOpen] = React.useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  return (
    <div className="flex h-screen bg-gl-gray dark:bg-gl-dark overflow-hidden transition-colors duration-300">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="bg-gl-surface dark:bg-gl-surface-dark border-r border-slate-200 dark:border-white/5 flex flex-col z-50 shadow-[4px_0_24px_rgba(0,0,0,0.02)]"
      >
        <div className="p-8 flex items-center justify-between">
          <AnimatePresence mode="wait">
            {isSidebarOpen ? (
              <motion.div
                key="logo-full"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
              >
                <NextLogo />
              </motion.div>
            ) : (
              <motion.div
                key="logo-icon"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="mx-auto"
              >
                <div className="w-10 h-10 gl-gradient flex items-center justify-center rounded-lg shadow-lg shadow-gl-orange/20">
                  <span className="text-white font-black text-xl italic">GL</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        <nav className="flex-1 px-6 space-y-1 mt-8">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all duration-200 group relative overflow-hidden",
                  isActive 
                    ? "bg-gl-orange text-white font-bold shadow-lg shadow-gl-orange/20" 
                    : "text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 hover:text-gl-orange"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon className={cn("w-5 h-5 shrink-0 relative z-10")} />
                  {isSidebarOpen && (
                    <span className="text-sm tracking-tight font-bold relative z-10">{item.name}</span>
                  )}
                  {isActive && (
                    <motion.div 
                      layoutId="nav-active"
                      className="absolute inset-0 bg-gl-orange"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-6 border-t border-slate-100 dark:border-white/5 space-y-4">
          <div className="flex items-center gap-4 px-4 py-3 bg-slate-50 dark:bg-white/5 rounded-xl border border-slate-100 dark:border-white/10 group cursor-pointer hover:border-gl-orange transition-all">
            <div className="w-8 h-8 rounded-lg gl-gradient flex items-center justify-center text-white">
              <Sparkles className="w-4 h-4" />
            </div>
            {isSidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-[10px] font-black text-gl-orange uppercase tracking-widest">AI Assistant</p>
                <p className="text-[8px] text-slate-400 dark:text-slate-500 uppercase font-bold truncate">Online & Ready</p>
              </div>
            )}
          </div>
          
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-full flex items-center gap-4 px-4 py-3 text-slate-400 hover:text-gl-orange transition-colors"
          >
            {isSidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5 mx-auto" />}
            {isSidebarOpen && <span className="text-xs uppercase font-bold tracking-widest">Collapse</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Header */}
        <header className="h-20 bg-gl-surface/80 dark:bg-gl-surface-dark/80 backdrop-blur-md border-b border-slate-100 dark:border-white/5 flex items-center justify-between px-10 shrink-0 z-40">
          <div className="flex items-center gap-6">
            <h1 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">
              {navItems.find(item => item.path === location.pathname)?.name || 'Platform'}
            </h1>
          </div>
          
          <div className="flex items-center gap-6">
            <ThemeToggle />
            
            <button className="relative p-2 text-slate-400 hover:text-gl-orange transition-colors">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-gl-orange rounded-full border-2 border-white dark:border-gl-surface-dark"></span>
            </button>

            <div className="h-8 w-[1px] bg-slate-200 dark:bg-white/10"></div>

            <div className="relative">
              <button 
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center gap-3 group"
              >
                <div className="text-right hidden sm:block">
                  <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-wider group-hover:text-gl-orange transition-colors">Jane Doe</p>
                  <p className="text-[10px] text-slate-400 dark:text-slate-500 uppercase font-bold">Innovation Lead</p>
                </div>
                <div className="w-10 h-10 rounded-xl gl-gradient text-white flex items-center justify-center font-black text-xs shadow-lg shadow-gl-orange/20">
                  JD
                </div>
                <ChevronDown className={cn("w-4 h-4 text-slate-400 transition-transform", isProfileOpen && "rotate-180")} />
              </button>

              <AnimatePresence>
                {isProfileOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 mt-4 w-64 bg-gl-surface dark:bg-gl-surface-dark border border-slate-100 dark:border-white/5 rounded-2xl shadow-2xl p-2 z-50"
                  >
                    <div className="p-4 border-b border-slate-50 dark:border-white/5">
                      <p className="text-xs font-black text-slate-900 dark:text-white uppercase tracking-widest">Account Details</p>
                      <p className="text-[10px] text-slate-400 dark:text-slate-500 font-bold mt-1">jane.doe@globallogic.com</p>
                    </div>
                    <div className="py-2">
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-gl-orange rounded-xl transition-all">
                        <User className="w-4 h-4" /> Profile Settings
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-white/5 hover:text-gl-orange rounded-xl transition-all">
                        <Shield className="w-4 h-4" /> Security & Privacy
                      </button>
                      <button className="w-full flex items-center gap-3 px-4 py-3 text-xs font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all">
                        <LogOut className="w-4 h-4" /> Sign Out
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
