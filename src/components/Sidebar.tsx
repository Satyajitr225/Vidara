import { UserProfile } from "../types";
import { 
  BarChart2, BookOpen, Compass, Bot, MessageSquare, Award, Settings, LogOut, Flame, ShieldAlert, Zap
} from "lucide-react";

interface SidebarProps {
  user: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  isAdmin: boolean;
}

export default function Sidebar({ user, activeTab, setActiveTab, onLogout, isAdmin }: SidebarProps) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: BarChart2 },
    { id: "learning", label: "Playbooks", icon: BookOpen },
    { id: "execution", label: "Execution Roadmaps", icon: Compass },
    { id: "ai-assistant", label: "AI Co-pilot", icon: Bot },
    { id: "community", label: "Communities", icon: MessageSquare },
    { id: "monetization", label: "Cohorts & Market", icon: Zap },
  ];

  // Calculate XP Progress bar width
  const xpNeededForNextLevel = user.level * 1000;
  // Calculate relative XP in the current level
  const relativeXpInLevel = user.xp % 1000;
  const progressPercent = Math.min(100, Math.floor((relativeXpInLevel / 1000) * 100));

  return (
    <aside className="w-64 glass-bright border-r border-white/5 flex flex-col justify-between h-screen sticky top-0 shrink-0">
      
      {/* Brand & Profile Section */}
      <div className="p-6">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="font-display font-extrabold text-white tracking-wider text-base">V</span>
          </div>
          <div>
            <h1 className="font-display font-black text-lg text-white leading-tight tracking-tight">VIDARA</h1>
            <span className="block text-[9px] text-purple-400 font-mono tracking-widest uppercase">System Active</span>
          </div>
        </div>

        {/* User Stats Card */}
        <div className="p-4 rounded-xl bg-white/3 border border-white/5 mb-6 relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-purple-500/10 to-transparent blur-xl -z-10" />
          
          <div className="flex items-center space-x-3.5">
            <img 
              src={user.photoUrl} 
              alt={user.name} 
              className="w-10 h-10 rounded-full object-cover border border-purple-500/30"
              referrerPolicy="no-referrer"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-bold text-sm text-white truncate leading-tight">{user.name}</h4>
              <p className="text-[10px] text-slate-400 font-mono truncate">@{user.username}</p>
            </div>
          </div>

          {/* XP Progress Bar */}
          <div className="mt-4">
            <div className="flex justify-between items-center text-[10px] text-slate-400 font-mono mb-1">
              <span>Lvl {user.level}</span>
              <span>{relativeXpInLevel} / 1000 XP</span>
            </div>
            <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Streaks & Level Indicators */}
          <div className="grid grid-cols-2 gap-2 mt-3.5 pt-3 border-t border-white/5 text-center">
            <div className="flex flex-col items-center border-r border-white/5">
              <div className="flex items-center space-x-1">
                <Flame className={`w-4 h-4 ${user.streak > 0 ? 'text-amber-500' : 'text-slate-500'}`} />
                <span className="font-mono text-xs font-black text-white">{user.streak}d</span>
              </div>
              <span className="text-[8px] uppercase tracking-widest text-slate-500 mt-0.5">Active Streak</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="font-mono text-xs font-black text-purple-400">{user.executionScore}%</span>
              <span className="text-[8px] uppercase tracking-widest text-slate-500 mt-0.5">Exec Score</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="space-y-1.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full p-3 rounded-xl flex items-center space-x-3 text-xs font-semibold cursor-pointer transition-all ${
                  isActive 
                    ? "bg-purple-600/15 border border-purple-500/30 text-white" 
                    : "border border-transparent text-slate-400 hover:text-white hover:bg-white/2"
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'text-purple-400' : 'text-slate-500'}`} />
                <span>{item.label}</span>
              </button>
            );
          })}

          {/* Admin panel menu link (if admin mode) */}
          {isAdmin && (
            <button
              onClick={() => setActiveTab("admin")}
              className={`w-full p-3 rounded-xl flex items-center space-x-3 text-xs font-semibold cursor-pointer transition-all border ${
                activeTab === "admin"
                  ? "bg-amber-500/10 border-amber-500/20 text-amber-300"
                  : "border-transparent text-amber-500/50 hover:text-amber-400 hover:bg-amber-500/3"
              }`}
            >
              <ShieldAlert className="w-4 h-4" />
              <span>Admin Console</span>
            </button>
          )}
        </nav>
      </div>

      {/* Footer Settings & Power action */}
      <div className="p-6 border-t border-white/5 space-y-4">
        {/* User Rank Title Badge */}
        <div className="flex items-center space-x-2 px-2.5 py-1.5 rounded-lg bg-purple-500/5 border border-purple-500/10 text-[10px] text-purple-300 font-mono">
          <Award className="w-3.5 h-3.5 text-purple-400 shrink-0" />
          <span className="uppercase tracking-wider truncate">{user.skillLevel || "Aspirant"}</span>
        </div>

        <button 
          onClick={onLogout}
          className="w-full p-2.5 rounded-xl border border-white/5 hover:bg-red-500/5 hover:border-red-500/20 text-slate-500 hover:text-red-400 text-xs font-semibold transition-all flex items-center justify-center space-x-2 cursor-pointer"
        >
          <LogOut className="w-4 h-4" />
          <span>Exit Workspace</span>
        </button>
      </div>

    </aside>
  );
}
