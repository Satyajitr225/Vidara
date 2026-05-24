import { useState } from "react";
import { UserProfile, PortfolioProject } from "../types";
import { 
  ShieldAlert, Cpu, BarChart2, Check, RefreshCw, XCircle, Play, Sparkles, Send
} from "lucide-react";

interface AdminPanelProps {
  user: UserProfile;
}

export default function AdminPanel({ user }: AdminPanelProps) {
  const [submissions, setSubmissions] = useState<any[]>([
    {
      id: "sub_1",
      studentName: "Lucas Sinclair",
      studentUsername: "sinclair_build",
      projectTitle: "Calendify OAuth Proxy",
      projectDesc: "Coded an express routing layer that prevents auth client keys from leaking on public browser domains. Connected Redis sessions cached.",
      linkUrl: "https://calendify.vidara.io",
      submittedAt: "10 min ago",
      status: "pending",
      reviewComment: "",
      score: 8
    },
    {
      id: "sub_2",
      studentName: "Eleanor Vance",
      studentUsername: "vance_maker",
      projectTitle: "Bento CSS Grid Boilerplate",
      projectDesc: "A layout containing responsive margins and Apple style spacing templates designed purely in modern Tailwind v4.",
      linkUrl: "https://bento.vidara.io",
      submittedAt: "1 hour ago",
      status: "approved",
      reviewComment: "Remarkable bento grid. The spacing and negative parameters feel premium.",
      score: 9.5
    }
  ]);

  const [simulatedEngineState, setSimulatedEngineState] = useState({
    activeUsersCount: 1242,
    todayIncome: 1480,
    apiQuotaUsed: 7852,
    serverUptime: "99.98%"
  });

  const [loadingTelemetry, setLoadingTelemetry] = useState(false);

  const handleApproveSubmission = (id: string, idx: number) => {
    setSubmissions(submissions.map((sub, i) => i === idx ? { ...sub, status: "approved" } : sub));
    alert(`✅ Submission approved! Status metrics for student have been incremented in the ledger.`);
  };

  const handleDeclineSubmission = (id: string, idx: number) => {
    setSubmissions(submissions.map((sub, i) => i === idx ? { ...sub, status: "declined" } : sub));
    alert(`❌ Submission flagged for corrections.`);
  };

  const handleRefreshTelemetry = () => {
    setLoadingTelemetry(true);
    setTimeout(() => {
      setSimulatedEngineState({
        activeUsersCount: Math.floor(1200 + Math.random() * 200),
        todayIncome: Math.floor(1400 + Math.random() * 180),
        apiQuotaUsed: Math.floor(7800 + Math.random() * 200),
        serverUptime: "99.99%"
      });
      setLoadingTelemetry(false);
    }, 1200);
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Admin Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight flex items-center space-x-2.5">
            <ShieldAlert className="w-8 h-8 text-amber-500 animate-pulse" />
            <span>Admin Control Console</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Platform telemetry logistics, cohort moderation, and teacher-guided evaluations.</p>
        </div>

        {/* Refresh telemetry */}
        <button
          onClick={handleRefreshTelemetry}
          className="px-4 py-2.5 rounded-xl border border-white/5 bg-slate-900 hover:bg-slate-950 text-slate-400 hover:text-white text-xs font-mono font-bold flex items-center space-x-2 transition-all cursor-pointer"
          disabled={loadingTelemetry}
        >
          <RefreshCw className={`w-4 h-4 ${loadingTelemetry ? 'animate-spin' : ''}`} />
          <span>Sync Realtime Telemetry</span>
        </button>
      </div>

      {/* Analytics Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        
        {/* Metric 1 */}
        <div className="glass p-5 rounded-xl border border-white/5 relative overflow-hidden">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block mb-2">Workspace Nodes</span>
          <div className="text-2xl font-display font-black text-white">{simulatedEngineState.activeUsersCount} active</div>
          <p className="text-[10px] text-slate-400 mt-1">Online builders container streams</p>
        </div>

        {/* Metric 2 */}
        <div className="glass p-5 rounded-xl border border-white/5 relative overflow-hidden">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block mb-2">Telemetry Income</span>
          <div className="text-2xl font-display font-black text-white">${simulatedEngineState.todayIncome} USD</div>
          <p className="text-[10px] text-slate-400 mt-1">Direct stripe subscriptions today</p>
        </div>

        {/* Metric 3 */}
        <div className="glass p-5 rounded-xl border border-white/5 relative overflow-hidden">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block mb-2">Gemini Usage Cap</span>
          <div className="text-2xl font-display font-black text-white">{simulatedEngineState.apiQuotaUsed} / 10k</div>
          <p className="text-[10px] text-slate-400 mt-1">Token cache quota parameters</p>
        </div>

        {/* Metric 4 */}
        <div className="glass p-5 rounded-xl border border-white/5 relative overflow-hidden">
          <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest block mb-2">Relay Node Latency</span>
          <div className="text-2xl font-display font-black text-white">{simulatedEngineState.serverUptime}</div>
          <p className="text-[10px] text-slate-400 mt-1">Ingress load proxy uptime</p>
        </div>

      </div>

      {/* Main content split: Submissions check on Left, Moderation status on Right */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Submissions queue checking */}
        <div className="glass p-6 rounded-2xl border border-white/5 lg:col-span-2 space-y-6 text-left">
          <div>
            <h3 className="font-display font-bold text-lg text-white">Student Build Link Queue</h3>
            <p className="text-xs text-slate-400">Validate or query manual overrides on submitted proof-of-work link portfolios.</p>
          </div>

          <div className="space-y-4">
            {submissions.map((sub, idx) => (
              <div key={sub.id} className="p-5 rounded-xl bg-slate-950 border border-white/5 leading-relaxed font-light space-y-4">
                
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold text-sm text-white">{sub.projectTitle}</h4>
                    <span className="text-[10px] text-slate-400 font-mono uppercase truncate block mt-0.5">By: @{sub.studentUsername} • {sub.submittedAt}</span>
                  </div>
                  <span className={`px-2 py-0.5 rounded font-mono text-[9px] uppercase tracking-wider ${
                    sub.status === "approved" 
                      ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-400" 
                      : sub.status === "declined"
                        ? "bg-red-500/10 border border-red-500/20 text-red-400"
                        : "bg-amber-500/10 border border-amber-500/20 text-amber-400"
                  }`}>
                    {sub.status}
                  </span>
                </div>

                <p className="text-xs text-slate-350">{sub.projectDesc}</p>

                {sub.linkUrl && (
                  <div className="p-2 rounded bg-white/2 border border-white/5 text-[10px] text-purple-400 font-mono">
                    Target deployment link: <a href={sub.linkUrl} target="_blank" rel="noreferrer" className="hover:underline">{sub.linkUrl}</a>
                  </div>
                )}

                {/* Approve Decline Controls */}
                {sub.status === "pending" && (
                  <div className="flex justify-end gap-2.5 pt-3 border-t border-white/4">
                    <button
                      onClick={() => handleDeclineSubmission(sub.id, idx)}
                      className="px-4.5 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Flag Correct
                    </button>
                    <button
                      onClick={() => handleApproveSubmission(sub.id, idx)}
                      className="px-4.5 py-2 rounded-xl bg-white text-black hover:bg-slate-200 text-xs font-semibold cursor-pointer transition-colors"
                    >
                      Judge Valid
                    </button>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Global systems mod log on Right */}
        <div className="glass p-6 rounded-2xl border border-white/5 space-y-6 text-left">
          <div>
            <h3 className="font-display font-bold text-lg text-white">Console System Audits</h3>
            <p className="text-xs text-slate-400">Platform container logging status</p>
          </div>

          <div className="p-4 rounded-xl bg-slate-950 border border-white/5 font-mono text-[10px] text-slate-400 space-y-3">
            <div className="flex justify-between text-slate-500">
              <span>[2026-05-22T04:16:00Z]</span>
              <span className="text-green-400">NODE_ONLINE</span>
            </div>
            <p className="text-slate-300">
              ⚡ express gateway initialized. bind threshold on port 3000 mapping internally to reverse nginx load router.
            </p>

            <div className="flex justify-between text-slate-500 pt-2 border-t border-white/4">
              <span>[2026-05-22T04:16:03Z]</span>
              <span className="text-purple-400">GEMINI_CLIENT_LOAD</span>
            </div>
            <p className="text-slate-300">
              🛠️ init @google/genai. set User-Agent to 'aistudio-build'. sandbox credentials registered from metadata telemetry configuration rules.
            </p>

            <div className="flex justify-between text-slate-500 pt-2 border-t border-white/4">
              <span>[2026-05-22T04:16:05Z]</span>
              <span className="text-teal-400">STREAKS_MONITOR</span>
            </div>
            <p className="text-slate-300">
              🔍 automated daily streak monitor running chronologically. checkin rates validated past local UTC deadlines.
            </p>
          </div>

          <div className="p-4 bg-white/2 rounded-xl border border-white/5 text-xs text-slate-400 font-light leading-normal">
            ⚙️ <strong>Security Rules Node:</strong> Telemetry logs suggest no unauthorized API key exposures. Keep all client requests proxied through server routes `/api/*` to comply with sandbox policies.
          </div>
        </div>

      </div>

    </div>
  );
}
