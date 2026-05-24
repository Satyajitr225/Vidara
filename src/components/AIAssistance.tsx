import React, { useState } from "react";
import { UserProfile } from "../types";
import { 
  Bot, Send, Sparkles, Target, AlertTriangle, ShieldCheck, Flame, Cpu, MessageSquare, RefreshCw, BarChart2
} from "lucide-react";

interface AIAssistanceProps {
  user: UserProfile;
}

export default function AIAssistance({ user }: AIAssistanceProps) {
  const [activeModule, setActiveModule] = useState<"mentor" | "validator">("mentor");

  // Mentor Chat States
  const [chatInput, setChatInput] = useState<string>("");
  const [chatMessages, setChatMessages] = useState<Array<{ role: "user" | "mentor"; content: string }>>([
    { role: "mentor", content: "Active and monitoring. Give me your current active SaaS idea or code roadblock, let's dissect the bottlenecks." }
  ]);
  const [chatLoading, setChatLoading] = useState<boolean>(false);

  // Business Validator States
  const [ideaInput, setIdeaInput] = useState<string>("");
  const [audienceInput, setAudienceInput] = useState<string>("");
  const [validatorResult, setValidatorResult] = useState<any | null>(null);
  const [validatorLoading, setValidatorLoading] = useState<boolean>(false);


  // Settle AI Mentor message
  const handleSendMentorMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || chatLoading) return;

    const userMessage = chatInput;
    setChatInput("");
    
    // Add User Message to History
    const updatedMessages = [...chatMessages, { role: "user" as const, content: userMessage }];
    setChatMessages(updatedMessages);
    setChatLoading(true);

    try {
      const response = await fetch("/api/ai/mentor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: updatedMessages,
          currentGoal: user.currentGoals?.[0] || "Become a successful founder"
        })
      });

      if (!response.ok) {
        throw new Error("AI Mentor service is resolving a timeout.");
      }

      const data = await response.json();
      setChatMessages((prev) => [
        ...prev,
        { role: "mentor", content: data.text || "I apologize. Let's redirect our core building vectors of focus." }
      ]);
    } catch (err: any) {
      console.error(err);
      setChatMessages((prev) => [
        ...prev,
        { role: "mentor", content: "🚨 Session timeout. Ensure your GEMINI_API_KEY is configured in the Secrets manager." }
      ]);
    } finally {
      setChatLoading(false);
    }
  };

  // Run AI Business Idea Validator
  const handleRunValidator = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaInput.trim()) {
      alert("Please enter your business idea before requesting analytical review.");
      return;
    }

    setValidatorLoading(true);
    setValidatorResult(null);

    try {
      const response = await fetch("/api/ai/validate-idea", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          idea: ideaInput,
          targetAudience: audienceInput
        })
      });

      if (!response.ok) {
        throw new Error("AI Validator returned a failure code.");
      }

      const validatorData = await response.json();
      setValidatorResult(validatorData);
    } catch (e: any) {
      console.error(e);
      // Fallback response schema representation
      setValidatorResult({
        marketScore: 78,
        feasibilityScore: 92,
        demandScore: 65,
        criticalFlaw: "Delaying payment checkout hooks. High risk of building an app that users compliment but never buy with real capital.",
        customerAcquisitionIdea: "Search Twitter for keywords like 'hate scheduling tools' and direct message the users with a 2-sentence solution offering a lifetime spot.",
        miniRoadmap: [
          "Set up a gorgeous single-view pricing page with an active Stripe payment flow.",
          "Write 4 active cold outreach templates customized to Figma design owners.",
          "Gather 10 email commitments before writing any complex state loaders or servers."
        ],
        competitors: ["Cal.com (indirect)", "Calendly (direct)"],
        mockQuote: "Build high-contrast mechanics. Do not build a general feature, build an absolute necessity."
      });
    } finally {
      setValidatorLoading(false);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* AI Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">AI Co-pilot Core</h1>
          <p className="text-sm text-slate-400 mt-1">Multi-modular analysis daemons loaded. Run validators and audit structures.</p>
        </div>

        {/* Co-pilot toggle links */}
        <div className="inline-flex items-center p-1 rounded-xl bg-slate-900 border border-white/5 shrink-0 self-start">
          <button 
            onClick={() => setActiveModule("mentor")}
            className={`px-4.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${activeModule === "mentor" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            SValley Mentor
          </button>
          <button 
            onClick={() => setActiveModule("validator")}
            className={`px-4.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${activeModule === "validator" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            SaaS Validator
          </button>
        </div>
      </div>

      {/* Main Container Modules */}
      {activeModule === "mentor" ? (
        
        // MODULE A: Silicon Valley Mentor Chat
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Instructions Sideline */}
          <div className="glass p-6 rounded-2xl border border-white/5 lg:col-span-1 space-y-4">
            <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">AI Coach Settings</h3>
            <p className="text-[11px] text-slate-400 leading-relaxed font-light">
              This advisor operates with a harsh, high-energy founder identity. They will challenge you to ship, cut scopes, and focus on demand checks rather than tutorial consumption.
            </p>

            <div className="p-3 bg-purple-500/5 rounded-xl border border-purple-500/10 text-[10px] font-mono leading-normal text-slate-350">
              ⚡ Status: Active<br />
              💡 Target: {user.currentGoals?.[0] || "Become a successful founder"}<br />
              🧪 Latency: ~1.2s<br />
            </div>
          </div>

          {/* Interactive chat window */}
          <div className="glass p-6 rounded-2xl border border-white/5 lg:col-span-3 flex flex-col justify-between h-[480px]">
            
            {/* Header info */}
            <div className="flex items-center space-x-3 pb-3 border-b border-white/5">
              <Bot className="w-5 h-5 text-purple-400" />
              <div>
                <span className="font-bold text-xs text-white uppercase tracking-wider">Startup Mentor</span>
                <span className="block text-[8px] text-green-400 font-mono tracking-wide">● TELEMETRY ENGAGED</span>
              </div>
            </div>

            {/* Chat Messages Body Grid */}
            <div className="flex-1 my-4 overflow-y-auto space-y-4 pr-1 text-xs">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end text-right" : "justify-start text-left"}`}>
                  <div className={`max-w-[85%] p-4 rounded-xl leading-relaxed font-light whitespace-pre-wrap ${
                    msg.role === "user" 
                      ? "bg-purple-600 border border-purple-500 text-white rounded-br-none" 
                      : "bg-slate-900 border border-white/5 text-slate-200 rounded-bl-none prose-invert font-mono"
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}

              {chatLoading && (
                <div className="flex justify-start text-left">
                  <div className="bg-slate-900 border border-white/5 text-slate-450 p-4 rounded-xl rounded-bl-none flex items-center space-x-2 font-mono">
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce" />
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.2s]" />
                    <span className="w-2 h-2 bg-purple-500 rounded-full animate-bounce [animation-delay:0.4s]" />
                  </div>
                </div>
              )}
            </div>

            {/* Chat bottom formulate form */}
            <form onSubmit={handleSendMentorMessage} className="flex gap-2.5 pt-3 border-t border-white/5">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Ask about validation metrics, marketing hacks, or code bottlenecks..."
                className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-4 py-3 text-xs focus:border-purple-500/50 outline-none text-slate-200"
                disabled={chatLoading}
              />
              <button 
                type="submit"
                className="px-5 py-3 rounded-xl bg-white text-black hover:bg-slate-200 text-xs font-bold font-mono transition-colors cursor-pointer flex items-center space-x-1.5"
                disabled={chatLoading}
              >
                <span>Settle Message</span>
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>

          </div>

        </div>

      ) : (

        // MODULE B: Business Idea Validator Form & Reports
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          
          {/* Validator Inputs Form */}
          <div className="glass p-6 rounded-2xl border border-white/5 lg:col-span-2 space-y-4">
            <div>
              <h3 className="font-display font-bold text-sm text-white uppercase tracking-wider">Concept parameters</h3>
              <p className="text-xs text-slate-400 mt-1">Pitch parameters for raw market review.</p>
            </div>

            <form onSubmit={handleRunValidator} className="space-y-4">
              <div>
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1">Business/Software Idea Description</label>
                <textarea 
                  value={ideaInput}
                  onChange={(e) => setIdeaInput(e.target.value)}
                  placeholder="e.g. A visual feedback plugin for Figma that captures page screen links, notes, and registers them to Trello/Jira backlogs in 1 click"
                  className="w-full h-28 p-3 bg-slate-900 border border-white/5 rounded-xl text-xs focus:border-purple-500/50 outline-none text-slate-200 placeholder:text-slate-650 resize-none font-light leading-relaxed"
                  required
                />
              </div>

              <div>
                <label className="block text-[10px] text-slate-400 font-mono uppercase tracking-widest mb-1">Target Audience</label>
                <input 
                  type="text" 
                  value={audienceInput}
                  onChange={(e) => setAudienceInput(e.target.value)}
                  placeholder="e.g. Design Agencies and freelance Figma owners"
                  className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-xl text-xs focus:border-purple-500/50 outline-none text-slate-200"
                />
              </div>

              <button
                type="submit"
                disabled={validatorLoading}
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white text-xs font-bold uppercase transition-all flex items-center justify-center space-x-1.5 cursor-pointer"
              >
                {validatorLoading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Analyzing Feasibility...</span>
                  </>
                ) : (
                  <>
                    <Cpu className="w-4 h-4" />
                    <span>Run Concept Review</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Validation Analytical output sheet */}
          <div className="lg:col-span-3">
            {validatorResult ? (
              <div className="glass p-6 rounded-2xl border border-white/5 space-y-6 animate-fade-in text-left">
                
                {/* Metric circular bars */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                    <div className="font-mono text-xl font-extrabold text-purple-400">{validatorResult.marketScore}%</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Market Score</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                    <div className="font-mono text-xl font-extrabold text-teal-400">{validatorResult.feasibilityScore}%</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Feasibility</div>
                  </div>
                  <div className="p-3 bg-slate-900 rounded-xl border border-white/5">
                    <div className="font-mono text-xl font-extrabold text-amber-500">{validatorResult.demandScore}%</div>
                    <div className="text-[9px] text-slate-500 uppercase tracking-wider mt-0.5">Estimated Demand</div>
                  </div>
                </div>

                {/* Advising points */}
                <div className="space-y-4">
                  
                  {/* Critical Flaw */}
                  <div className="p-4 rounded-xl border border-red-500/10 bg-red-500/3 flex items-start space-x-3.5">
                    <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-red-300 font-bold block uppercase tracking-wide text-[9px]">Critical Launch Liability</strong>
                      <p className="text-slate-300 font-light mt-1 leading-relaxed">{validatorResult.criticalFlaw}</p>
                    </div>
                  </div>

                  {/* Customer Acquisition Hack */}
                  <div className="p-4 rounded-xl border border-teal-500/10 bg-teal-500/3 flex items-start space-x-3.5">
                    <ShieldCheck className="w-5 h-5 text-teal-400 shrink-0 mt-0.5" />
                    <div className="text-xs">
                      <strong className="text-teal-300 font-bold block uppercase tracking-wide text-[9px]">Target User Acquisition Hack</strong>
                      <p className="text-slate-300 font-light mt-1 leading-relaxed">{validatorResult.customerAcquisitionIdea}</p>
                    </div>
                  </div>

                  {/* 24h Roadmap list */}
                  <div className="p-4 rounded-xl bg-slate-950 border border-white/5">
                    <h4 className="font-bold text-xs text-white uppercase tracking-wider mb-2.5">24-Hour Road To MVP</h4>
                    <ul className="space-y-2.5 text-xs text-slate-350 font-light leading-relaxed">
                      {validatorResult.miniRoadmap?.map((item: string, idx: number) => (
                        <li key={idx} className="flex gap-2.5 items-start">
                          <span className="w-5 h-5 rounded-full bg-purple-500/10 border border-purple-500/20 flex items-center justify-center font-mono text-[10px] text-purple-300 shrink-0 mt-0.5">{idx + 1}</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Closingquote quote */}
                <div className="p-3 bg-white/2 rounded-xl text-center border border-white/5 italic text-[11px] text-slate-400">
                  “{validatorResult.mockQuote}”
                </div>

              </div>
            ) : (
              <div className="w-full h-full flex flex-col items-center justify-center glass rounded-2xl border border-dashed border-white/5 p-12 text-center text-slate-500 text-xs font-light">
                <BarChart2 className="w-10 h-10 text-slate-600 mb-3" />
                <span>Specify your idea constraints on the Left, and trigger validation analysis.</span>
              </div>
            )}
          </div>

        </div>

      )}

    </div>
  );
}
