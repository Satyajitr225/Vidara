import React, { useState, useEffect, useRef } from "react";
import { UserProfile, ExecutionTask, ActivityLog } from "../types";
import { 
  Play, Pause, RotateCcw, CheckCircle, Circle, Flame, Sparkles, TrendingUp, Calendar, 
  HelpCircle, Clock, Check, Plus, AlertCircle, ArrowUpRight
} from "lucide-react";

interface DashboardProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onAddTaskHistory: (log: ActivityLog) => void;
}

export default function Dashboard({ user, onUpdateUser, onAddTaskHistory }: DashboardProps) {
  // Focus Timer States
  const [timerDuration, setTimerDuration] = useState<number>(1500); // default 25 mins
  const [timerSecondsLeft, setTimerSecondsLeft] = useState<number>(1500);
  const [timerIsRunning, setTimerIsRunning] = useState<boolean>(false);
  const [totalFocusedMinutes, setTotalFocusedMinutes] = useState<number>(45); // mocked starter minutes
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Focus Timer Sound Synthesizer (Standard Sine Wave Audio Synth for zero asset requirements)
  const playFocusFinishedBeep = () => {
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = audioCtx.createOscillator();
      const gainNode = audioCtx.createGain();
      
      oscillator.type = "sine";
      oscillator.frequency.value = 880; // High frequency beep (A5)
      gainNode.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      
      oscillator.connect(gainNode);
      gainNode.connect(audioCtx.destination);
      oscillator.start();
      oscillator.stop(audioCtx.currentTime + 0.8);
    } catch (e) {
      console.log("Audio contexts blocked or unsupported");
    }
  };

  // Timer Countdown loop
  useEffect(() => {
    if (timerIsRunning) {
      timerRef.current = setInterval(() => {
        setTimerSecondsLeft((prev) => {
          if (prev <= 1) {
            handleFocusFinished();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerIsRunning]);

  const handleFocusFinished = () => {
    setTimerIsRunning(false);
    playFocusFinishedBeep();
    
    const minutesCompleted = Math.floor(timerDuration / 60);
    setTotalFocusedMinutes((prev) => prev + minutesCompleted);
    
    // Reward XP & log activity
    const newLog: ActivityLog = {
      id: "log_" + Math.random().toString(36).substr(2, 9),
      type: "streak_milestone",
      description: `Completed a deep build focus timer session of ${minutesCompleted} mins.`,
      timestamp: new Date().toISOString(),
      xpEarned: 150
    };

    onUpdateUser({
      ...user,
      xp: user.xp + 150,
      streak: user.streak + 1, // build streak increment
      activityHistory: [newLog, ...user.activityHistory]
    });

    onAddTaskHistory(newLog);
    alert(`⚡ Core Deep Focus Complete! You gained +150 XP and incremented your building streak!`);
    setTimerSecondsLeft(timerDuration);
  };

  const handleToggleTimer = () => {
    setTimerIsRunning(!timerIsRunning);
  };

  const handleResetTimer = () => {
    setTimerIsRunning(false);
    setTimerSecondsLeft(timerDuration);
  };

  const handleSelectDuration = (seconds: number) => {
    setTimerIsRunning(false);
    setTimerDuration(seconds);
    setTimerSecondsLeft(seconds);
  };

  // Interactive Daily Checklist Goals states
  const [tasks, setTasks] = useState<ExecutionTask[]>([
    { id: "tsk_1", title: "Review product wireframes with Gemini AI Coach", category: "Daily Check-in", isCompleted: true, proofRequired: false, xpReward: 50, dueDate: "Today" },
    { id: "tsk_2", title: "Write and commit raw index APIs in public repository", category: "Weekly Mission", isCompleted: false, proofRequired: true, xpReward: 120, dueDate: "Today" },
    { id: "tsk_3", title: "Launch micro-landing page to target first 5 customers", category: "Core Milestone", isCompleted: false, proofRequired: true, xpReward: 250, dueDate: "Tomorrow" },
    { id: "tsk_4", title: "Log proof-of-work link in #build-in-public Topic", category: "Daily Check-in", isCompleted: false, proofRequired: false, xpReward: 50, dueDate: "Today" }
  ]);
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const handleToggleTask = (id: string) => {
    const updatedTasks = tasks.map((t) => {
      if (t.id === id) {
        const nextState = !t.isCompleted;
        if (nextState) {
          // Add XP
          const newLog: ActivityLog = {
            id: "log_" + Math.random().toString(36).substr(2, 9),
            type: "task_completed",
            description: `Finished task: "${t.title}"`,
            timestamp: new Date().toISOString(),
            xpEarned: t.xpReward
          };
          
          // Calculate new execution score
          const completedCount = tasks.filter((task) => task.id === id ? true : task.isCompleted).length;
          const totalCount = tasks.length;
          const nextScore = Math.floor((completedCount / totalCount) * 100);

          onUpdateUser({
            ...user,
            xp: user.xp + t.xpReward,
            executionScore: nextScore,
            activityHistory: [newLog, ...user.activityHistory]
          });
          onAddTaskHistory(newLog);
        }
        return { ...t, isCompleted: nextState };
      }
      return t;
    });
    setTasks(updatedTasks);
  };

  const handleAddNewTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const newTask: ExecutionTask = {
      id: "tsk_" + Math.random().toString(36).substr(2, 9),
      title: newTaskTitle,
      category: "Weekly Mission",
      isCompleted: false,
      proofRequired: false,
      xpReward: 80,
      dueDate: "3 days left"
    };

    setTasks([...tasks, newTask]);
    setNewTaskTitle("");
  };

  const formatTimerTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Generate simulated weekly streak progress calendars
  const checkins = [
    { day: "Mon", completed: true },
    { day: "Tue", completed: true },
    { day: "Wed", completed: true },
    { day: "Thu", completed: true },
    { day: "Fri", completed: true },
    { day: "Sat", completed: false },
    { day: "Sun", completed: false }
  ];

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Dynamic Welcome Heading */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">Workspace Dashboard</h1>
          <p className="text-sm text-slate-400 mt-1">Sovereign Building Tracker • Adaptive AI telemetry loaded.</p>
        </div>

        <div className="flex items-center space-x-3 bg-purple-500/5 px-4.5 py-2 rounded-xl border border-purple-500/10">
          <Sparkles className="w-4.5 h-4.5 text-purple-400" />
          <span className="text-xs text-purple-200">
            Current Tier status: <strong className="text-purple-400 font-semibold">{user.skillLevel}</strong>
          </span>
        </div>
      </div>

      {/* Grid 1: Metric Bento Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-start text-slate-500">
            <span className="text-[10px] uppercase tracking-widest font-mono">Platform Accumulation</span>
            <TrendingUp className="w-4 h-4 text-purple-400" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-display font-black text-white">{user.xp}</div>
            <div className="text-xs text-slate-400 mt-1">Total Experience points (XP)</div>
          </div>
        </div>

        {/* Metric 2 */}
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-start text-slate-500">
            <span className="text-[10px] uppercase tracking-widest font-mono">Goal Compliance</span>
            <CheckCircle className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-display font-black text-white">{user.executionScore}%</div>
            <div className="text-xs text-slate-400 mt-1">Daily tasks execution score</div>
          </div>
        </div>

        {/* Metric 3 */}
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-start text-slate-500">
            <span className="text-[10px] uppercase tracking-widest font-mono">Momentum Keep</span>
            <Flame className="w-4 h-4 text-amber-500" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-display font-black text-white">{user.streak} Days</div>
            <div className="text-xs text-slate-400 mt-1">Autonomous building streak</div>
          </div>
        </div>

        {/* Metric 4 */}
        <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden">
          <div className="flex justify-between items-start text-slate-500">
            <span className="text-[10px] uppercase tracking-widest font-mono">Deep Session Time</span>
            <Clock className="w-4 h-4 text-teal-400" />
          </div>
          <div className="mt-4">
            <div className="text-3xl font-display font-black text-white">{totalFocusedMinutes}m</div>
            <div className="text-xs text-slate-400 mt-1">Aggregate focused minutes</div>
          </div>
        </div>

      </div>

      {/* Grid 2: Core Focus Timer + Interactive Checklist */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Core Focus Timer Module */}
        <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-full min-h-[440px] relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-3xl -z-10 rounded-full" />
          
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-display font-bold text-lg text-white">Focus Engine</h3>
              <p className="text-xs text-slate-400">Lock distractions. Accumulate XP.</p>
            </div>
            <span className="p-2 ml-auto rounded-lg bg-teal-500/10 text-teal-300 font-mono text-[10px] tracking-wider uppercase animate-pulse">
              {timerIsRunning ? "Active Deep Focus" : "Standby Duration"}
            </span>
          </div>

          <div className="text-center my-6">
            <div className="font-mono text-6xl sm:text-7xl font-black text-white tracking-tight bg-gradient-to-b from-white to-slate-400 bg-clip-text text-transparent select-none">
              {formatTimerTime(timerSecondsLeft)}
            </div>
            <span className="block text-[10px] text-slate-500 font-mono tracking-widest uppercase mt-4">
              Reward upon finish: <strong className="text-purple-400 font-semibold">+150 XP</strong>
            </span>
          </div>

          {/* Quick timing selector presets */}
          <div className="grid grid-cols-3 gap-2.5 my-6">
            {[
              { label: "Sprint 15m", val: 900 },
              { label: "Classic 25m", val: 1500 },
              { label: "Extreme 50m", val: 3000 }
            ].map((p) => (
              <button
                key={p.val}
                onClick={() => handleSelectDuration(p.val)}
                className={`py-2 px-1 rounded-xl text-xs font-semibold cursor-pointer border ${
                  timerDuration === p.val 
                    ? "bg-purple-600/20 border-purple-500/40 text-purple-200" 
                    : "bg-slate-900 border-white/5 text-slate-500 hover:text-slate-300 hover:border-white/10"
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          {/* Controls toggle */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggleTimer}
              className={`flex-1 h-12 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center space-x-2 transition-all cursor-pointer ${
                timerIsRunning 
                  ? "bg-slate-900 border border-red-500/20 text-red-400 hover:text-red-300 hover:bg-red-500/5" 
                  : "bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/10"
              }`}
            >
              {timerIsRunning ? (
                <>
                  <Pause className="w-4 h-4" />
                  <span>Pause Engine</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" />
                  <span>Ignite Session</span>
                </>
              )}
            </button>

            <button
              onClick={handleResetTimer}
              className="w-12 h-12 rounded-xl bg-slate-900 border border-white/5 text-slate-400 hover:text-white flex items-center justify-center transition-all cursor-pointer"
              title="Reset timer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Interactive Checklist & Daily Task manager */}
        <div className="glass p-6 rounded-2xl border border-white/5 lg:col-span-2 flex flex-col justify-between h-full">
          <div>
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-display font-bold text-lg text-white">Daily Execution Logs</h3>
                <p className="text-xs text-slate-400">Perform checks to dynamically boost execution score mechanics.</p>
              </div>
              <span className="text-xs text-slate-400 font-mono">
                Active tasks: {tasks.filter(t => !t.isCompleted).length}
              </span>
            </div>

            {/* Tasks Mapping Block */}
            <div className="space-y-3 mb-6 max-h-[290px] overflow-y-auto pr-1">
              {tasks.map((task) => (
                <div 
                  key={task.id}
                  onClick={() => handleToggleTask(task.id)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer select-none group ${
                    task.isCompleted 
                      ? "bg-slate-900/30 border-white/5 opacity-50" 
                      : "bg-slate-900 border-white/5 hover:border-purple-500/20"
                  }`}
                >
                  <div className="flex items-center space-x-3.5 min-w-0 flex-1">
                    {task.isCompleted ? (
                      <CheckCircle className="w-5 h-5 text-purple-400 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-600 group-hover:text-purple-400 transition-colors shrink-0" />
                    )}
                    <div className="min-w-0">
                      <p className={`text-xs font-medium text-slate-200 truncate ${task.isCompleted ? 'line-through text-slate-500' : ''}`}>
                        {task.title}
                      </p>
                      <div className="flex items-center space-x-2.5 mt-1 text-[9px] font-mono tracking-wider">
                        <span className="p-1 rounded bg-white/3 border border-white/5 uppercase text-slate-400">{task.category}</span>
                        <span className="text-slate-500">Due: {task.dueDate}</span>
                      </div>
                    </div>
                  </div>

                  <span className="text-[10px] font-mono text-purple-400 bg-purple-500/5 px-2.5 py-1 rounded border border-purple-500/10 shrink-0">
                    +{task.xpReward} XP
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Task input form */}
          <form onSubmit={handleAddNewTask} className="flex gap-2.5 pt-4 border-t border-white/5">
            <input 
              type="text" 
              value={newTaskTitle}
              onChange={(e) => setNewTaskTitle(e.target.value)}
              placeholder="e.g. Schedule Product Hunt placeholder launch date..."
              className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:border-purple-500/50 outline-none text-slate-200 placeholder:text-slate-600"
            />
            <button 
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-white text-black hover:bg-slate-200 text-xs font-bold transition-all flex items-center space-x-1.5 active:scale-95 cursor-pointer"
            >
              <Plus className="w-4 h-4" />
              <span>Log Task</span>
            </button>
          </form>

        </div>

      </div>

      {/* Grid 3: Adaptive AI Advisor Panel + Streak Habit Calendar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Adaptive AI Copilot Guidance Box */}
        <div className="glass p-6 rounded-2xl border border-white/5 md:col-span-2 relative overflow-hidden flex flex-col justify-between min-h-[220px]">
          <div className="absolute top-0 right-0 w-44 h-44 bg-purple-600/5 blur-3xl -z-10 rounded-full" />
          
          <div>
            <div className="flex items-center space-x-2.5 text-purple-400">
              <Sparkles className="w-5 h-5 text-purple-400 animate-spin-slow" />
              <h3 className="font-display font-bold text-base text-white">Adaptive AI Copilot Analysis</h3>
            </div>

            <div className="mt-4 p-4 rounded-xl bg-purple-500/3 border border-purple-500/10 text-xs text-slate-300 leading-relaxed font-light space-y-3">
              <p>
                💡 <strong className="text-purple-300 font-semibold">Launcher Insight:</strong> Your interests heavily leverage <strong className="text-purple-400 font-mono">SaaS Building</strong>. Based on standard market validation datasets, 82% of developers fail here due to delaying public validation launch.
              </p>
              <p className="text-[11px] text-slate-400">
                Action target: Go to the learning tab and read the <em className="text-slate-300 font-medium font-sans">"Pre-Demand Validation"</em> guide notes. Run the test, trigger the AI Business Idea Validator, and write down 5 target user lists using Twitter search filters before creating more complex database schemas.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[10px] text-slate-500 font-mono mt-4 pt-4 border-t border-white/5">
            <span>LLM Grid: GEMINI-3.5-FLASH (Active)</span>
            <span className="flex items-center space-x-1 text-purple-400">
              <span>Calibrate roadmap parameters</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>

        {/* Streak Habit Tracker Calendar */}
        <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between">
          <div>
            <h3 className="font-display font-bold text-base text-white">Streak Habit Progress</h3>
            <p className="text-xs text-slate-400">Weekly consistent streak logs check-in</p>

            <div className="grid grid-cols-7 gap-1.5 my-6 text-center">
              {checkins.map((chk, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="text-[10px] text-slate-500 font-mono">{chk.day}</div>
                  <div className={`aspect-square w-full rounded-lg border flex items-center justify-center transition-all ${
                    chk.completed 
                      ? "bg-gradient-to-tr from-amber-600 to-amber-500 border-amber-500/40 text-black shadow-lg shadow-amber-500/10" 
                      : "bg-slate-900 border-white/5"
                  }`}>
                    <Flame className={`w-4 h-4 ${chk.completed ? 'text-white' : 'text-slate-750'}`} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-3 bg-white/2 border border-white/5 rounded-xl text-[10px] text-slate-400 font-mono leading-relaxed">
            🏁 Complete at least <strong>1 deep session</strong> or <strong>1 task submission</strong> tomorrow to lock in your <strong>{user.streak + 1} day</strong> milestone.
          </div>
        </div>

      </div>

    </div>
  );
}
