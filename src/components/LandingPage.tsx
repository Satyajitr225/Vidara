import { useState } from "react";
import { ArrowRight, Sparkles, Check, Zap, Target, Flame, Users, ShieldAlert, ChevronDown } from "lucide-react";

interface LandingPageProps {
  onJoin: () => void;
}

export default function LandingPage({ onJoin }: LandingPageProps) {
  const [billingCycle, setBillingCycle] = useState<"monthly" | "yearly">("yearly");
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const testimonials = [
    {
      quote: "Vidara completely broke my tutorial hell cycle. Instead of watching videos for 3 months, the AI forced me to launch on Twitter in 48 hours. I built my first $1k SaaS in 2 weeks.",
      name: "Marcus Aurelius Chen",
      role: "Founder, QuickMail AI",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote: "The community gamification makes execution as addictive as Duolingo, but instead of learning Spanish, you are literally shipping production-ready applications with elite mentors.",
      name: "Sophia Martinez",
      role: "Ex-Stripe Engine, Now Solopreneur",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
    },
    {
      quote: "I inputted my vague ideas into the AI Business Validator and within 1 minute, I had an interactive 4-week roadmap, core target customers identified, and a custom marketing strategy that actually worked.",
      name: "Zayn Malik Roy",
      role: "SaaS Builder",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    }
  ];

  const faqs = [
    {
      q: "Is Vidara another course platform?",
      a: "Absolutely not. Video and content represent only 10% of Vidara. The other 90% is focused purely on action. You set real-world goals, generate AI Roadmaps, track daily focus, upload proof-of-work, and build products for public peer reviews."
    },
    {
      q: "How does the AI Accountability feedback work?",
      a: "When you upload any project link or submit a build task, our backend AI (Gemini 3.5 Flash) performs a complete execution teardown. It rates your validation level on a scale from 1 to 10, gives 2 critical constructive codebase/business improvements, and suggests premium custom badges."
    },
    {
      q: "Can I use the AI validator for any industry?",
      a: "Yes! Vidara's built-in AI validation engines are customized for SaaS, mobile apps, newsletters, design agencies, dev boilderplates, or ecommerce brands."
    },
    {
      q: "What is the community layer like?",
      a: "It's a cross between Discord and Reddit. You have dedicated channels (e.g. #founder-circles, #build-in-public, #tech-building), where other builders upvote your submissions, comment on proofs-of-work, and trade advice on high-fidelity channels."
    }
  ];

  return (
    <div className="min-h-screen text-slate-100 font-sans custom-gradient-bg selection:bg-purple-500 overflow-x-hidden">
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between border-b border-white/5">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-purple-600 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
            <span className="font-display font-extrabold text-white text-lg tracking-wider">V</span>
          </div>
          <div>
            <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-white via-slate-200 to-indigo-300 bg-clip-text text-transparent">VIDARA</span>
            <span className="block text-[10px] text-purple-400 font-mono tracking-widest uppercase">Learn • Execute • Become</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Framework</a>
          <a href="#testimonials" className="hover:text-white transition-colors">Wall of Proof</a>
          <a href="#pricing" className="hover:text-white transition-colors">Cohorts</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>

        <button 
          onClick={onJoin}
          className="px-5 py-2 rounded-xl text-sm font-semibold bg-white text-black hover:bg-slate-200 transition-all flex items-center space-x-2 shadow-xl shadow-white/5 active:scale-95 cursor-pointer"
        >
          <span>Get Started</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </header>

      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-6 pt-20 pb-24 text-center lg:pt-32">
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-purple-600/10 blur-[130px] -z-10 rounded-full" />

        <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 text-xs font-semibold tracking-wide mb-8 animate-pulse">
          <Sparkles className="w-3.5 h-3.5 text-purple-400" />
          <span>The Sovereign Builder Era Is Here</span>
        </div>

        <h1 className="max-w-4xl mx-auto font-display font-extrabold text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[1.1] mb-8">
          Stop learning. <br />
          <span className="bg-gradient-to-r from-purple-400 via-indigo-300 to-teal-300 bg-clip-text text-transparent">
            Start building in real life.
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-slate-400 text-lg sm:text-xl font-light leading-relaxed mb-12">
          Vidara is the premium execution-first network for ambitious visionaries. 
          Replace passive tutorial consuming with personalized AI Roadmaps, real accountability challenges, and peer-reviewed launches.
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 max-w-md mx-auto">
          <button 
            onClick={onJoin}
            className="w-full sm:w-auto px-8 py-4 rounded-xl font-bold bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white transition-all shadow-xl shadow-purple-600/20 flex items-center justify-center space-x-3 scale-100 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
          >
            <span>Launch Your Workspace</span>
            <ArrowRight className="w-5 h-5" />
          </button>
          
          <a 
            href="#features" 
            className="w-full sm:w-auto px-6 py-4 rounded-xl font-semibold border border-white/10 hover:border-white/20 hover:bg-white/5 text-slate-300 transition-all flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span>Read Manifesto</span>
          </a>
        </div>

        {/* Dynamic Social Proof Metrics */}
        <div className="mt-20 pt-10 border-t border-white/5 flex flex-wrap justify-center items-center gap-12 text-center lg:gap-24">
          <div>
            <div className="font-display font-extrabold text-4xl text-white">4,821+</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-mono">Projects Launched</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-4xl text-white">96.3%</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-mono">Execution Consistency</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-4xl text-white">12,650 hrs</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-mono">Deep Build Focus</div>
          </div>
          <div>
            <div className="font-display font-extrabold text-4xl text-white">$1.8M+</div>
            <div className="text-xs text-slate-500 uppercase tracking-widest mt-1 font-mono">Collective Revenue Built</div>
          </div>
        </div>
      </section>

      {/* Visual Product Showcase Box */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="relative rounded-2xl border border-white/10 bg-slate-950/40 p-1.5 shadow-2xl overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-teal-500/5 opacity-50 group-hover:opacity-100 transition-opacity" />
          <img 
            ref={(el) => {
              if (el) el.src = "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&auto=format&fit=crop&q=80";
            }}
            alt="Vidara Dashboard Preview" 
            className="w-full h-auto rounded-xl object-cover aspect-[2.35/1] selection:bg-transparent"
            referrerPolicy="no-referrer"
          />
          {/* Glass Overlay Badges */}
          <div className="absolute bottom-6 left-6 right-6 flex flex-wrap gap-4 items-center justify-between glass p-4 rounded-xl border border-white/10">
            <div className="flex items-center space-x-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
              </span>
              <span className="text-sm font-medium text-slate-200">Live community build: <strong className="text-purple-400 font-semibold">"Aesthetify SaaS"</strong> reviewed with code score 9.4/10</span>
            </div>
            <span className="text-xs font-mono text-slate-400">UTC System Live Sync</span>
          </div>
        </div>
      </section>

      {/* Features Blueprint */}
      <section id="features" className="max-w-7xl mx-auto px-6 py-24 border-t border-white/5 relative">
        <div className="absolute top-1/2 left-0 -translate-y-1/2 w-96 h-96 bg-indigo-600/5 blur-[120px] -z-10 rounded-full" />
        
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight mb-4 text-white">
            Designed for Action. Optimized for Success.
          </h2>
          <p className="text-slate-400 font-light text-lg">
            Passive reading will not transform your career. This is the ultimate tool stack engineered to force consistent builder execution.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="rounded-2xl border border-white/5 p-8 hover:border-white/12 transition-all hover:translate-y-[-4px] bg-slate-950/20">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-400 mb-6">
              <Zap className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3 text-white">AI Startup Copilot</h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Instantly validate software concepts, outline custom time-boxed Roadmaps, review proof-of-work link submissions, and get automated technical feedback.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="rounded-2xl border border-white/5 p-8 hover:border-white/12 transition-all hover:translate-y-[-4px] bg-slate-950/20">
            <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-400 mb-6">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3 text-white">Hardcore Accountability</h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Integrate habit checklists, streaks, and real-time deep work focus timers. Settle stakes with active verification, keeping procrastination at absolute zero.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="rounded-2xl border border-white/5 p-8 hover:border-white/12 transition-all hover:translate-y-[-4px] bg-slate-950/20">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 flex items-center justify-center text-teal-400 mb-6">
              <Flame className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-xl mb-3 text-white">High-Octane Community</h3>
            <p className="text-slate-400 text-sm font-light leading-relaxed">
              Trade insights in structured topic networks, Discord-style discussion threads, live chats, upvote portfolios, and climb the real-time XP leaderboards.
            </p>
          </div>
        </div>
      </section>

      {/* Wall of Proof Testimonials */}
      <section id="testimonials" className="max-w-7xl mx-auto px-6 py-20 bg-slate-950/40 rounded-3xl border border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-radial-gradient from-purple-500/5 to-transparent pointer-events-none" />
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="font-mono text-purple-400 text-xs tracking-wider uppercase">Don't believe us?</span>
          <h2 className="font-display font-black text-3xl sm:text-5xl tracking-tight text-white mt-2">
            The Wall of Proof
          </h2>
          <p className="text-slate-400 mt-2 font-light">
            Here is what people are executing and shipping on Vidara right now.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative z-10">
          {testimonials.map((test, i) => (
            <div key={i} className="glass p-8 rounded-2xl flex flex-col justify-between border border-white/10 hover:border-white/25 transition-all">
              <p className="text-slate-300 italic font-light text-base leading-relaxed mb-6">
                “{test.quote}”
              </p>
              <div className="flex items-center space-x-3.5">
                <img 
                  src={test.avatar} 
                  alt={test.name} 
                  className="w-10 h-10 rounded-full object-cover"
                  referrerPolicy="no-referrer"
                />
                <div>
                  <h4 className="font-semibold text-sm text-white">{test.name}</h4>
                  <p className="text-xs text-purple-400 font-medium">{test.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Models */}
      <section id="pricing" className="max-w-7xl mx-auto px-6 py-28 text-center">
        <div className="max-w-3xl mx-auto mb-16">
          <h2 className="font-display font-extrabold text-3xl sm:text-5xl tracking-tight text-white mb-4">
            Unfair Advantage, Predictable Cost
          </h2>
          <p className="text-slate-400 font-light text-lg">
            Choose your level of commitment. The cost is minor compared to the risk of staying exactly where you are today.
          </p>

          <div className="mt-8 inline-flex items-center p-1 rounded-xl bg-slate-900 border border-white/5">
            <button 
              onClick={() => setBillingCycle("monthly")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${billingCycle === "monthly" ? "bg-purple-600 text-white shadow-md" : "text-slate-500 hover:text-white"}`}
            >
              Monthly Billing
            </button>
            <button 
              onClick={() => setBillingCycle("yearly")}
              className={`px-4 py-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${billingCycle === "yearly" ? "bg-purple-600 text-white shadow-md" : "text-slate-500 hover:text-white"}`}
            >
              Yearly Save 25%
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto text-left items-stretch">
          
          {/* Plan 1 */}
          <div className="rounded-2xl border border-white/5 p-8 bg-slate-950/20 flex flex-col justify-between">
            <div>
              <span className="text-purple-400 text-xs font-semibold uppercase tracking-widest font-mono">Tier 01</span>
              <h3 className="font-display font-extrabold text-2xl text-white mt-1">Sovereign Builder</h3>
              <p className="text-slate-400 font-light text-sm mt-2">Perfect for solo hackers diving into action.</p>
              
              <div className="my-8 flex items-baseline">
                <span className="text-4xl font-display font-extrabold text-white">${billingCycle === "yearly" ? "19" : "29"}</span>
                <span className="text-slate-500 text-sm ml-2">/ month</span>
              </div>

              <ul className="space-y-4 border-t border-white/5 pt-6 text-sm text-slate-300">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Interactive user workspace dashboard</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Full access to 15+ Startup Playbooks</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>50 AI Mentor tokens per month</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Proof of Work Submission & XP Streaks</span>
                </li>
              </ul>
            </div>
            
            <button 
              onClick={onJoin}
              className="mt-8 w-full py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-white transition-all text-sm active:scale-95 cursor-pointer text-center"
            >
              Get Access
            </button>
          </div>

          {/* Plan 2: Elite Cohort (Featured) */}
          <div className="rounded-2xl border-2 border-purple-500 p-8 bg-slate-950/80 shadow-2xl shadow-purple-950/10 flex flex-col justify-between relative transform scale-100 lg:scale-[1.03]">
            <div className="absolute top-0 right-6 -translate-y-1/2 bg-purple-500 text-black px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest">
              Most Selected
            </div>
            
            <div>
              <span className="text-purple-300 text-xs font-semibold uppercase tracking-widest font-mono text-purple-400">Tier 02</span>
              <h3 className="font-display font-extrabold text-2xl text-white mt-1">Hardcore Builder Pro</h3>
              <p className="text-purple-200/70 font-light text-sm mt-2">For founders aiming to monetize & launch publicly.</p>
              
              <div className="my-8 flex items-baseline">
                <span className="text-4xl font-display font-extrabold text-white">${billingCycle === "yearly" ? "49" : "69"}</span>
                <span className="text-slate-400 text-sm ml-2">/ month</span>
              </div>

              <ul className="space-y-4 border-t border-white/10 pt-6 text-sm text-slate-200">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Unlimited AI Mentor & Idea Validators</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Automatic AI Project Review / Code Feedback</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Exclusive Invite to Founder Circles chats</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-purple-400 flex-shrink-0" />
                  <span>Stripe Marketplace selling capability</span>
                </li>
              </ul>
            </div>
            
            <button 
              onClick={onJoin}
              className="mt-8 w-full py-3 h-12 rounded-xl font-bold bg-purple-500 hover:bg-purple-600 text-black transition-all text-sm active:scale-95 shadow-lg shadow-purple-500/20 cursor-pointer text-center flex items-center justify-center space-x-2"
            >
              <span>Commit To Pro</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Plan 3 */}
          <div className="rounded-2xl border border-white/5 p-8 bg-slate-950/20 flex flex-col justify-between">
            <div>
              <span className="text-purple-400 text-xs font-semibold uppercase tracking-widest font-mono">Tier 03</span>
              <h3 className="font-display font-extrabold text-2xl text-white mt-1">Founders Cohort</h3>
              <p className="text-slate-400 font-light text-sm mt-2">A high-ticket guided sprint with real capital.</p>
              
              <div className="my-8 flex items-baseline">
                <span className="text-4xl font-display font-extrabold text-white">$199</span>
                <span className="text-slate-500 text-sm ml-2">/ quarterly sprinter</span>
              </div>

              <ul className="space-y-4 border-t border-white/5 pt-6 text-sm text-slate-300">
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Live 1-on-1 calls with 8-fig founders</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Custom roadmap audited by AI architecture</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Apply for $5,000 non-dilutive grant pool</span>
                </li>
                <li className="flex items-center space-x-2.5">
                  <Check className="w-4 h-4 text-teal-400 flex-shrink-0" />
                  <span>Guaranteed Product Hunt marketing package</span>
                </li>
              </ul>
            </div>
            
            <button 
              onClick={onJoin}
              className="mt-8 w-full py-3 rounded-xl font-bold bg-white/5 hover:bg-white/10 text-white transition-all text-sm active:scale-95 cursor-pointer text-center"
            >
              Apply to Cohort
            </button>
          </div>

        </div>
      </section>

      {/* Accordion FAQ Grid */}
      <section id="faq" className="max-w-4xl mx-auto px-6 py-20 border-t border-white/5">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-center text-white mb-10">Frequently Asked Questions</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="rounded-xl border border-white/5 bg-slate-950/20 overflow-hidden">
              <button 
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full p-5 text-left flex items-center justify-between hover:bg-white/2 transition-colors focus:outline-none cursor-pointer"
              >
                <span className="font-semibold text-slate-200">{faq.q}</span>
                <ChevronDown className={`w-5 h-5 text-slate-500 transition-transform ${openFaq === i ? 'rotate-180 text-purple-400' : ''}`} />
              </button>
              {openFaq === i && (
                <div className="px-5 pb-5 pt-1 text-slate-400 text-sm font-light leading-relaxed border-t border-white/5">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pre-footer Call to Action */}
      <section className="bg-gradient-to-t from-purple-950/20 to-transparent py-24 text-center px-6 border-t border-white/5">
        <h2 className="font-display font-extrabold text-3xl sm:text-5xl text-white mb-3 tracking-tight">Are you ready to launch in real life?</h2>
        <p className="text-slate-400 max-w-lg mx-auto mb-8 font-light">Join 12,000+ engineers, product masters, and startup founders executing their visions on Vidara. Stop consuming. Become.</p>
        <button 
          onClick={onJoin}
          className="px-8 py-4 rounded-xl font-bold bg-purple-500 hover:bg-purple-600 text-black transition-all shadow-xl shadow-purple-500/20 scale-100 hover:scale-[1.03] active:scale-[0.97] cursor-pointer inline-flex items-center space-x-2"
        >
          <span>Claim Your Workspace Spot</span>
          <ArrowRight className="w-5 h-5" />
        </button>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-center justify-between border-t border-white/5 text-xs text-slate-500">
        <div>© 2026 Vidara Inc. Forged for sovereign execution.</div>
        <div className="flex space-x-6 mt-4 sm:mt-0 font-mono">
          <a href="#" className="hover:text-slate-300">Privacy Policy</a>
          <a href="#" className="hover:text-slate-300">Terms of Service</a>
          <a href="#" className="hover:text-slate-300">Investor Pitch</a>
        </div>
      </footer>
    </div>
  );
}
