import { useState } from "react";
import { UserProfile, Course, ActivityLog } from "../types";
import { 
  BookOpen, Sparkles, AlertCircle, Check, Award, ArrowRight, Play, FileText, ChevronRight, HelpCircle
} from "lucide-react";

interface LearningProps {
  user: UserProfile;
  onUpdateUser: (updated: UserProfile) => void;
  onAddTaskHistory: (log: ActivityLog) => void;
}

export default function Learning({ user, onUpdateUser, onAddTaskHistory }: LearningProps) {
  const [activeCourseId, setActiveCourseId] = useState<string>("crs_1");
  const [loadingAi, setLoadingAi] = useState<boolean>(false);
  const [aiSummary, setAiSummary] = useState<string[] | null>(null);
  const [aiQuiz, setAiQuiz] = useState<any[] | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);

  const playbooks: Course[] = [
    {
      id: "crs_1",
      title: "Unfair Demand Validation",
      description: "How to test customer willingness to pay in 24 hours without writing a single line of backend database code.",
      category: "Startup Growth",
      difficulty: "Hardcore",
      xpReward: 300,
      type: "notion-note",
      duration: "15 min read",
      contentMarkdown: `## Core Hypothesis: Code is Liability
Most founders spend 6 months building a gorgeous, modular Postgres backend only to realize that nobody actually wants their product. Before writing code, you face two crucial validation filters:
1. **Attention**: Can you get targeted people to stop scroll scrolling and look at your solution?
2. **Transaction**: Will they click a button and put down hard currency or commit valuable workspace email keys?

### The 24-Hour Validation Blueprint
Rather than writing React routing, create a simple high-fidelity landing page detailing your precise value proposition.
- **The Call To Action**: Replace generic "Join waitlist" inputs with an active pricing tier structure. Clicking a tier takes the user to a "Sprinting Spot Registration" or mock payment.
- **Measure Intent**: Track the percentage of site visitors who express intent to pay. If intent metric falls below 5%, the idea is functionally invalid. Pivot parameters immediately.`,
      lessons: [
        { id: "les_1", title: "Why Tutorials Kill Progress", duration: "3:15" },
        { id: "les_2", title: "Intent vs Waitlist Metrics", duration: "5:20" },
        { id: "les_3", title: "Conducting 10 Radical Interviews", duration: "6:40" }
      ]
    },
    {
      id: "crs_2",
      title: "Landing Page Mechanics",
      description: "Apple-style display typography, Linear-smooth visual scroll rhythm, and high conversion CTA design guide.",
      category: "Product Design",
      difficulty: "Moderate",
      xpReward: 200,
      type: "notion-note",
      duration: "10 min read",
      contentMarkdown: `## Designing For Emotion
High-end visual aesthetics convey instant authority. Your landing page layout must communicate venture-backed trust.

### Visual Architecture Guidelines
- **Typography Sizing**: Pair high-contrast, display-weight "Space Grotesk" or "Outfit" headings with clean, low-opacity body texts. Give headings room to breathe with tracking tight lines.
- **The Rhythm**: Alternate dense columns containing technical telemetry or charts alongside spacious clean margins.
- **Bento Card Structure**: Segment key features in standalone rounded cards outlined by low opacity gradient borders. Avoid generic templates to establish immediate brand authenticity.`,
      lessons: [
        { id: "les_4", title: "Dynamic Font Pairings", duration: "4:10" },
        { id: "les_5", title: "Tailwind Radial Backers", duration: "6:15" }
      ]
    },
    {
      id: "crs_3",
      title: "Hardcore Scale Mechanics",
      description: "Managing Node database spikes during launch, caching, and setting up proxy relays for AI models.",
      category: "Technical Building",
      difficulty: "Hardcore",
      xpReward: 400,
      type: "video",
      duration: "25 min stream",
      contentMarkdown: `## Infrastructure Realism
When your platform launches to global index platforms, a massive latency peak can ruin conversion workflows.

### Hardening Express & Caching
- **Proxy Caching**: Place server-side cache headers for static resources or read-only database listings.
- **Lazy Load AI Clients**: Do not initialize API wrappers during module loading to avoid coldstart process crashes. Use safe try-catch blocks to default back smoothly.
- **Payload Management**: Use Gzip compressors and limit raw payload transfers to 10MB to maintain responsive operations under high telemetry rates.`,
      lessons: [
        { id: "les_6", title: "Tuning Cloud Run Thresholds", duration: "12:10" },
        { id: "les_7", title: "Express Server Isolation", duration: "10:50" }
      ]
    }
  ];

  const activeCourse = playbooks.find((c) => c.id === activeCourseId) || playbooks[0];

  // Request AI Summary & Quiz from Gemini Server API
  const handleTriggerAiAnalysis = async () => {
    setLoadingAi(true);
    setAiSummary(null);
    setAiQuiz(null);
    setQuizAnswers({});
    setQuizSubmitted(false);

    try {
      const response = await fetch("/api/ai/quiz-summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: activeCourse.title,
          bodyText: activeCourse.contentMarkdown
        })
      });

      if (!response.ok) {
        throw new Error("Could not construct AI telemetry packet.");
      }

      const data = await response.json();
      setAiSummary(data.summaryBullets || ["Built on premium logic metrics.", "Requires strict validation target check.", "Always build in public."]);
      setAiQuiz(data.quiz || []);
    } catch (error) {
      console.error(error);
      // Fallback data
      setAiSummary([
        "Validate demand with pricing click tracking instead of creating bloated databases first.",
        "Code acts as a heavy financial and mental liability if customer parameters are unverified.",
        "Aim for attention metrics and customer interviews before committing to months of coding."
      ]);
      setAiQuiz([
        {
          id: 1,
          question: "What represents the absolute highest metric of customer willingness to pay?",
          options: [
            "A standard visual newsletter waitlist submission (Email only)",
            "A credit card intent click or spot registration commit",
            "A polite compliment during a soft demo",
            "Five stars on a community forum"
          ],
          correctIndex: 1,
          commentExplanation: "Direct transaction intent actions are 10x more reliable than waitlists."
        }
      ]);
    } finally {
      setLoadingAi(false);
    }
  };

  const handleSelectOption = (qIdx: number, optIdx: number) => {
    setQuizAnswers({
      ...quizAnswers,
      [qIdx]: optIdx
    });
  };

  const handleSubmitQuiz = () => {
    if (!aiQuiz) return;
    setQuizSubmitted(true);

    // Calculate score
    let correctCount = 0;
    aiQuiz.forEach((q, idx) => {
      if (quizAnswers[idx] === q.correctIndex) {
        correctCount++;
      }
    });

    const passed = correctCount === aiQuiz.length;

    if (passed) {
      const newLog: ActivityLog = {
        id: "log_" + Math.random().toString(36).substr(2, 9),
        type: "task_completed",
        description: `Passed AI-generated Quiz for Course: "${activeCourse.title}" perfectly!`,
        timestamp: new Date().toISOString(),
        xpEarned: activeCourse.xpReward
      };

      onUpdateUser({
        ...user,
        xp: user.xp + activeCourse.xpReward,
        activityHistory: [newLog, ...user.activityHistory]
      });

      onAddTaskHistory(newLog);
      alert(`🎉 Masterful! 100% Score! You achieved +${activeCourse.xpReward} XP for mastering "${activeCourse.title}"!`);
    } else {
      alert(`⚠️ You scored ${correctCount}/${aiQuiz.length}. Review the startup feedback comments below and retry!`);
    }
  };

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Playbooks Header */}
      <div>
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">Startup Playbooks</h1>
        <p className="text-sm text-slate-400 mt-1">High-performance guides outlining execution, design, and growth mechanics.</p>
      </div>

      {/* Main Layout Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: Course Category Tabs */}
        <div className="space-y-4 lg:col-span-1">
          <div className="glass p-4 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] text-slate-500 font-mono uppercase tracking-widest px-2 block mb-3">Available Syllabus</span>
            
            {playbooks.map((crs) => {
              const isSelected = activeCourseId === crs.id;
              return (
                <button
                  key={crs.id}
                  onClick={() => {
                    setActiveCourseId(crs.id);
                    setAiSummary(null);
                    setAiQuiz(null);
                    setQuizAnswers({});
                    setQuizSubmitted(false);
                  }}
                  className={`w-full p-4 rounded-xl text-left transition-all border block cursor-pointer ${
                    isSelected 
                      ? "bg-purple-600/15 border-purple-500/30 shadow-md" 
                      : "bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/2"
                  }`}
                >
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] uppercase font-mono tracking-wider text-purple-400">{crs.category}</span>
                    <span className="text-[10px] text-slate-500">{crs.duration}</span>
                  </div>
                  <h4 className="font-bold text-sm text-white mt-1.5 leading-tight">{crs.title}</h4>
                  <p className="text-[11px] text-slate-400 font-light mt-1.5 line-clamp-2 leading-relaxed">{crs.description}</p>
                  
                  <div className="mt-3 flex items-center justify-between text-[10px] font-mono">
                    <span className="text-slate-500">Tier: {crs.difficulty}</span>
                    <span className="text-purple-300 font-semibold">+{crs.xpReward} XP Reward</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Course Lessons Stream */}
          <div className="glass p-4 rounded-xl border border-white/5">
            <h3 className="text-xs font-mono uppercase text-slate-400 tracking-wider mb-2 px-2">Video sprint support</h3>
            <div className="space-y-2">
              {activeCourse.lessons.map((les) => (
                <div key={les.id} className="p-3 bg-slate-900 border border-white/5 rounded-lg flex items-center justify-between hover:border-purple-500/10 transition-colors">
                  <div className="flex items-center space-x-2.5">
                    <Play className="w-4 h-4 text-purple-400 shrink-0" />
                    <span className="text-xs font-medium text-slate-200 truncate">{les.title}</span>
                  </div>
                  <span className="text-[10px] text-slate-400 font-mono shrink-0">{les.duration}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Notion Note Reader & Interactive AI Quiz Generator */}
        <div className="space-y-6 lg:col-span-2">
          
          {/* Note content */}
          <div className="p-8 rounded-2xl glass border border-white/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-44 h-44 bg-purple-500/3 blur-3xl -z-10 rounded-full" />
            
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-white/5">
              <div className="flex items-center space-x-2.5 text-slate-400">
                <FileText className="w-5 h-5 text-purple-400" />
                <span className="text-xs font-mono uppercase tracking-wider">Playbook Note Viewer</span>
              </div>
              <span className="text-xs text-purple-400 font-mono py-1 px-2.5 rounded bg-purple-500/5 border border-purple-500/10 uppercase tracking-widest">{activeCourse.difficulty} level</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl text-white mb-6 leading-tight tracking-tight">{activeCourse.title}</h2>

            <div className="prose prose-invert prose-xs text-xs text-slate-300 leading-relaxed font-light space-y-6 whitespace-pre-wrap">
              {activeCourse.contentMarkdown}
            </div>

            {/* Notion footer info */}
            <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between text-[10px] text-slate-500 font-mono">
              <span>Updated: May 2026</span>
              <span>Author: Vidara Architecture Board</span>
            </div>
          </div>

          {/* AI Interactive Panel triggers */}
          <div className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/5 blur-2xl -z-10 rounded-full" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-display font-bold text-lg text-white flex items-center space-x-2">
                  <Sparkles className="w-5 h-5 text-purple-400" />
                  <span>Gemini Knowledge Coach</span>
                </h3>
                <p className="text-xs text-slate-400">Review learning content, generate summaries, and take the execution validation quiz to claim the {activeCourse.xpReward} XP.</p>
              </div>

              <button
                onClick={handleTriggerAiAnalysis}
                disabled={loadingAi}
                className="px-6 py-3.5 rounded-xl bg-purple-600 hover:bg-purple-500 disabled:bg-purple-800 text-white text-xs font-bold transition-all shadow-lg active:scale-95 flex items-center justify-center space-x-2 cursor-pointer shrink-0"
              >
                {loadingAi ? (
                  <>
                    <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                    <span>Analyzing Notes...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Summarize & Quiz Me</span>
                  </>
                )}
              </button>
            </div>

            {/* AI Results Output Container */}
            {(aiSummary || aiQuiz) && (
              <div className="mt-6 border-t border-white/5 pt-6 space-y-6 animate-fade-in">
                
                {/* AI Summary Bullets */}
                {aiSummary && (
                  <div className="p-4 rounded-xl bg-white/2 border border-white/5 space-y-2.5">
                    <h4 className="font-bold text-xs text-purple-400 uppercase tracking-widest font-mono">Core Summary Bullets</h4>
                    <ul className="space-y-2 text-xs text-slate-300 font-light">
                      {aiSummary.map((b, i) => (
                        <li key={i} className="flex gap-2.5 items-start">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* AI Interactive Quiz */}
                {aiQuiz && (
                  <div className="space-y-6">
                    <div className="flex items-center space-x-2">
                      <HelpCircle className="w-4 h-4 text-purple-400" />
                      <h4 className="font-bold text-xs text-white uppercase tracking-widest font-mono">Execution Quiz</h4>
                    </div>

                    <div className="space-y-5">
                      {aiQuiz.map((q, idx) => (
                        <div key={q.id || idx} className="space-y-3">
                          <p className="text-xs font-semibold text-slate-200">
                            {idx + 1}. {q.question}
                          </p>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                            {q.options.map((opt: string, optIdx: number) => {
                              const isSelected = quizAnswers[idx] === optIdx;
                              const isCorrect = optIdx === q.correctIndex;
                              const showStatus = quizSubmitted;

                              let cardStyle = "bg-slate-900 border-white/5 text-slate-300";
                              if (isSelected) {
                                cardStyle = "bg-purple-600/10 border-purple-500 text-purple-200";
                              }
                              if (showStatus) {
                                if (isCorrect) {
                                  cardStyle = "bg-emerald-500/10 border-emerald-500 text-emerald-300";
                                } else if (isSelected) {
                                  cardStyle = "bg-red-500/10 border-red-500 text-red-350";
                                }
                              }

                              return (
                                <button
                                  key={optIdx}
                                  onClick={() => !quizSubmitted && handleSelectOption(idx, optIdx)}
                                  className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${cardStyle}`}
                                  disabled={quizSubmitted}
                                >
                                  {opt}
                                </button>
                              );
                            })}
                          </div>

                          {/* Feedback Explanation */}
                          {quizSubmitted && q.commentExplanation && (
                            <p className="text-[11px] text-slate-400 bg-white/2 border border-white/5 p-3 rounded-xl font-light leading-relaxed">
                              📢 <strong className="font-semibold text-purple-400">Advisor Feedback:</strong> {q.commentExplanation}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Submit/Retry actions */}
                    <div className="pt-4 border-t border-white/5 flex gap-4">
                      {!quizSubmitted ? (
                        <button
                          onClick={handleSubmitQuiz}
                          disabled={Object.keys(quizAnswers).length < aiQuiz.length}
                          className="px-6 py-2.5 rounded-xl bg-white text-black font-extrabold text-xs tracking-wider uppercase transition-all disabled:opacity-50 active:scale-95 cursor-pointer ml-auto"
                        >
                          Submit Quiz Answers
                        </button>
                      ) : (
                        <button
                          onClick={() => {
                            setQuizAnswers({});
                            setQuizSubmitted(false);
                          }}
                          className="px-6 py-2.5 rounded-xl border border-white/5 text-slate-400 hover:text-white hover:bg-white/5 text-xs font-bold font-mono uppercase tracking-wider cursor-pointer ml-auto"
                        >
                          Retry Quiz
                        </button>
                      )}
                    </div>

                  </div>
                )}

              </div>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}
