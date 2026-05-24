import React, { useState } from "react";
import { UserProfile, PortfolioProject, ActivityLog } from "../types";
import { 
  Compass, Sparkles, Check, Send, Award, Calendar, Link as LinkIcon, Plus, Info, Zap, Flame, Code
} from "lucide-react";

interface ExecutionProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onAddTaskHistory: (log: ActivityLog) => void;
}

export default function Execution({ user, onUpdateUser, onAddTaskHistory }: ExecutionProps) {
  // Goal and Roadmap Generator States
  const [goalInput, setGoalInput] = useState<string>("");
  const [weeksInput, setWeeksInput] = useState<number>(4);
  const [loadingRoadmap, setLoadingRoadmap] = useState<boolean>(false);
  const [aiRoadmap, setAiRoadmap] = useState<any | null>(null);

  // Submit Projects States
  const [projTitle, setProjTitle] = useState<string>("");
  const [projDesc, setProjDesc] = useState<string>("");
  const [projLink, setProjLink] = useState<string>("");
  const [loadingAudit, setLoadingAudit] = useState<boolean>(false);
  const [auditResult, setAuditResult] = useState<any | null>(null);

  // Generate Roadmap via Server API
  const handleGenerateRoadmap = async () => {
    if (!goalInput.trim()) {
      alert("Please specify what target goal you are launching.");
      return;
    }

    setLoadingRoadmap(true);
    setAiRoadmap(null);

    try {
      const response = await fetch("/api/ai/generate-roadmap", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mainGoal: goalInput,
          timeframeInWeeks: weeksInput
        })
      });

      if (!response.ok) {
        throw new Error("Roadmap package failed to resolve.");
      }

      const data = await response.json();
      setAiRoadmap(data);
    } catch (e) {
      console.error(e);
      // fallback
      setAiRoadmap({
        title: "Sprint validation: Bootstrap MVPs Quickly",
        difficulty: "Moderate",
        weeks: [
          {
            week: 1,
            focusName: "Demand Metric Testing",
            milestoneDesc: "Design a high-contrast landing page utilizing radial glow templates. Embed email targets.",
            resourcesNeeded: ["Tailwind documentation", "Stripe Checkout setups"],
            proofOfWorkRequirement: "Publish live landing page link to Twitter"
          },
          {
            week: 2,
            focusName: "Framer Motion animations integration",
            milestoneDesc: "Construct responsive micro-interactions, smooth route fades, and glowing progress boards.",
            resourcesNeeded: ["Framer Motion APIs", "Lucide icons pack"],
            proofOfWorkRequirement: "Post Loom demo video to #build-in-public Topic"
          }
        ]
      });
    } finally {
      setLoadingRoadmap(false);
    }
  };

  // Submit project link for AI constructive review & audit council scoring
  const handleSubmitProjectAudit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!projTitle.trim() || !projDesc.trim()) {
      alert("Please provide the project title and a short description.");
      return;
    }

    setLoadingAudit(true);
    setAuditResult(null);

    try {
      const response = await fetch("/api/ai/review-work", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: projTitle,
          description: projDesc,
          link: projLink
        })
      });

      if (!response.ok) {
        throw new Error("AI Review service returned failure.");
      }

      const auditData = await response.json();
      setAuditResult(auditData);

      // Save to user public portfolio and reward XP
      const addedProject: PortfolioProject = {
        id: "port_" + Math.random().toString(36).substr(2, 9),
        title: projTitle,
        description: projDesc,
        link: projLink || "https://vidara.io/member/" + user.username,
        createdAt: new Date().toISOString(),
        xpGained: auditData.xpGained || 100,
        score: auditData.score || 8,
        aiFeedback: auditData.feedback,
        aiSuggestedBadge: auditData.badgeSuggested,
        likes: 1, // initially upvoted by the user
        comments: []
      };

      const newLog: ActivityLog = {
        id: "log_" + Math.random().toString(36).substr(2, 9),
        type: "task_completed",
        description: `Successfully shipped project "${projTitle}" earning premium audit score and ${addedProject.xpGained} XP!`,
        timestamp: new Date().toISOString(),
        xpEarned: addedProject.xpGained
      };

      onUpdateUser({
        ...user,
        xp: user.xp + addedProject.xpGained,
        publicPortfolio: [addedProject, ...user.publicPortfolio],
        activityHistory: [newLog, ...user.activityHistory]
      });
      onAddTaskHistory(newLog);

      // Reset fields
      setProjTitle("");
      setProjDesc("");
      setProjLink("");

    } catch (error) {
      console.error(error);
      alert("Could not trigger AI audit. Applying standard validation credits instead.");
    } finally {
      setLoadingAudit(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Execution Hub Titles */}
      <div>
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">Execution Hub</h1>
        <p className="text-sm text-slate-400 mt-1">Generate custom roadmaps, commit targets, and apply for the AI Audit Council feedback reviews.</p>
      </div>

      {/* Grid: Roadmap generator on Left, Submit Proof-Of-Work on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        
        {/* Module A: Roadmap Generator */}
        <div className="glass p-6 rounded-2xl border border-white/5 space-y-6">
          <div>
            <h3 className="font-display font-bold text-lg text-white">AI Roadmap Formulator</h3>
            <p className="text-xs text-slate-400">Lock your goals and let our Gemini engine formulate a chronological validation plan.</p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1.5">What are you aiming to build?</label>
              <textarea 
                value={goalInput}
                onChange={(e) => setGoalInput(e.target.value)}
                placeholder="e.g. Build an AI-driven newsletter aggregator in Express & React, that lets visitors input their interests and summarizes daily digests on auto-scheduler"
                className="w-full h-24 p-3 bg-slate-900 border border-white/5 rounded-xl text-xs focus:border-purple-500/50 outline-none text-slate-200 placeholder:text-slate-650 resize-none font-light leading-relaxed"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1.5">Sprinting weeks</label>
                <select 
                  value={weeksInput}
                  onChange={(e) => setWeeksInput(parseInt(e.target.value))}
                  className="w-full px-4 py-3 bg-slate-950 border border-white/5 rounded-xl text-xs focus:border-purple-500/50 outline-none text-slate-300"
                >
                  <option value={2}>2 Weeks (Fast Validation)</option>
                  <option value={4}>4 Weeks (Standard MVP Launch)</option>
                  <option value={6}>6 Weeks (Hardcore Code Sprint)</option>
                </select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={handleGenerateRoadmap}
                  disabled={loadingRoadmap}
                  className="w-full h-11.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white text-xs font-bold font-mono uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 shadow-lg active:scale-95 cursor-pointer"
                >
                  {loadingRoadmap ? (
                    <>
                      <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Formulating...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4" />
                      <span>Formulate Roadmap</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* AI Roadmap Results Representation */}
          {aiRoadmap && (
            <div className="border-t border-white/5 pt-6 space-y-5 animate-fade-in text-left">
              <div className="flex justify-between items-center bg-purple-500/5 px-4.5 py-3 rounded-xl border border-purple-500/10">
                <div>
                  <h4 className="font-bold text-sm text-purple-300 antialiased">{aiRoadmap.title}</h4>
                  <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide mt-0.5">Focus parameter: {aiRoadmap.difficulty} difficulty</p>
                </div>
                <Award className="w-5 h-5 text-purple-400 shrink-0" />
              </div>

              {/* Weeks mappings */}
              <div className="space-y-4">
                {aiRoadmap.weeks?.map((wk: any) => (
                  <div key={wk.week} className="p-4 bg-slate-950 border border-white/5 rounded-xl leading-relaxed font-light">
                    <div className="flex justify-between items-start">
                      <span className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/20 text-purple-300 font-mono text-[9px] uppercase tracking-wider">Week {wk.week}</span>
                      <span className="text-[11px] font-bold text-white uppercase">{wk.focusName}</span>
                    </div>
                    
                    <p className="text-xs text-slate-300 mt-2.5">{wk.milestoneDesc}</p>
                    
                    <div className="mt-3.5 pt-3 border-t border-white/4 flex flex-col sm:flex-row gap-3 text-[10px] font-mono text-slate-400">
                      <div className="flex-1">
                        <strong className="text-[9px] text-slate-500 uppercase tracking-widest block mb-1">Learning metrics</strong>
                        <div className="flex flex-wrap gap-1">
                          {wk.resourcesNeeded?.map((res: string, i: number) => (
                            <span key={i} className="px-1.5 py-0.5 rounded bg-white/3 text-[9px] text-slate-300">{res}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <strong className="text-[9px] text-slate-500 uppercase tracking-widest block mb-1">Requirement proof</strong>
                        <span className="text-teal-400 font-semibold">{wk.proofOfWorkRequirement}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Module B: Project links submissions Council and public listing */}
        <div className="space-y-6">
          
          {/* Link submissions Form */}
          <div className="glass p-6 rounded-2xl border border-white/5 space-y-6">
            <div>
              <h3 className="font-display font-bold text-lg text-white">Log Proof Of Work (AI Audit)</h3>
              <p className="text-xs text-slate-400">Ready to audit? Submit your build parameters to the council reviewers.</p>
            </div>

            <form onSubmit={handleSubmitProjectAudit} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1.5">Project Title</label>
                <input 
                  type="text"
                  value={projTitle}
                  onChange={(e) => setProjTitle(e.target.value)}
                  placeholder="e.g. ChatSaaS Widget client build"
                  className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-xl text-xs focus:border-purple-500/50 outline-none text-slate-200"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1.5">Launch link url (optional)</label>
                <div className="relative">
                  <LinkIcon className="absolute left-3 top-3 w-4 h-4 text-slate-500" />
                  <input 
                    type="url"
                    value={projLink}
                    onChange={(e) => setProjLink(e.target.value)}
                    placeholder="e.g. https://your-mvp-link.com"
                    className="w-full pl-10 pr-4 py-3 bg-slate-900 border border-white/5 rounded-xl text-xs focus:border-purple-500/50 outline-none text-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1.5">Explain your execution focus</label>
                <textarea 
                  value={projDesc}
                  onChange={(e) => setProjDesc(e.target.value)}
                  placeholder="What code or design features did you implement? Be specific about technologies (e.g. integrated Redis cache with express session parameters)."
                  className="w-full h-20 p-3 bg-slate-900 border border-white/5 rounded-xl text-xs focus:border-purple-500/50 outline-none text-slate-200 placeholder:text-slate-650 resize-none font-light"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loadingAudit}
                className="w-full py-3 rounded-xl bg-white text-black hover:bg-slate-200 disabled:bg-slate-350 font-bold text-xs tracking-wider uppercase transition-all flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer"
              >
                {loadingAudit ? (
                  <>
                    <span className="w-3.5 h-3.5 border-2 border-slate-700 border-t-slate-900 rounded-full animate-spin" />
                    <span>Auditing Work / Please Wait...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Submit to AI Audit Council</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* AI Audit review output display card */}
          {auditResult && (
            <div className="glass p-6 rounded-2xl border-2 border-emerald-500 bg-slate-950/90 space-y-4 animate-fade-in relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 blur-3xl -z-10 rounded-full" />
              
              <div className="flex justify-between items-center pb-3 border-b border-white/5">
                <div className="flex items-center space-x-2 text-emerald-400 font-mono text-xs">
                  <Check className="w-4 h-4" />
                  <span className="uppercase tracking-widest">Audit Successful</span>
                </div>
                <div className="text-right">
                  <div className="font-mono font-black text-xl text-white">{auditResult.score}/10</div>
                  <div className="text-[8px] text-slate-500 font-mono uppercase">Execution Score</div>
                </div>
              </div>

              <div className="space-y-3 leading-relaxed font-light text-xs text-slate-200">
                <p>
                  🚀 <strong className="text-emerald-400">Awarded badge:</strong> <span className="p-1 rounded bg-white/4 font-mono font-semibold text-white ml-1 text-[11px] uppercase tracking-wide border border-white/5">{auditResult.badgeSuggested}</span>
                </p>
                <p className="text-slate-300">
                  {auditResult.feedback}
                </p>

                {auditResult.improvements && (
                  <div className="p-3 bg-slate-950 border border-white/5 rounded-xl space-y-1.5">
                    <span className="text-[9px] uppercase tracking-widest text-slate-500 font-mono font-bold block">Critique / Required Code Fixes</span>
                    <ul className="space-y-1 text-[11px] text-slate-400">
                      {auditResult.improvements.map((imp: string, i: number) => (
                        <li key={i} className="flex gap-2 items-start text-indigo-300 font-mono">
                          <span className="text-indigo-400 font-bold mr-1">•</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="bg-purple-600/10 border border-purple-500/20 p-3 rounded-xl flex justify-between items-center text-xs font-mono">
                <span className="text-purple-300">Experience Bonus Multiplier!</span>
                <span className="text-purple-400 font-bold font-black">+{auditResult.xpGained || 150} XP</span>
              </div>
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
