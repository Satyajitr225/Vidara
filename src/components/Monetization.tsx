import { useState } from "react";
import { UserProfile, Cohort, MarketplaceAsset } from "../types";
import { 
  Zap, Award, Users, ArrowRight, Download, CreditCard, Share2, Clipboard, Heart, Search, Check
} from "lucide-react";

interface MonetizationProps {
  user: UserProfile;
}

export default function Monetization({ user }: MonetizationProps) {
  const [copiedReferral, setCopiedReferral] = useState(false);
  const [selectedTag, setSelectedTag] = useState<string>("All");

  const cohorts: Cohort[] = [
    {
      id: "ch_1",
      title: "Hardcore SaaS Sprint (Cohort 04)",
      description: "Launch, market, and validate an active subscription-based software platform with 1-on-1 calls with 8-fig builders.",
      price: 199,
      startDate: "June 15, 2026",
      durationWeeks: 6,
      enrolledUsers: 48,
      instructorName: "Marcus Aurelius Chen",
      instructorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      tags: ["SaaS", "Validation", "Node"]
    },
    {
      id: "ch_2",
      title: "Sovereign UI Mechanics",
      description: "Pragmatic product design course mastering extreme typography, high-contrast layouts, and motion routes.",
      price: 129,
      startDate: "July 01, 2026",
      durationWeeks: 4,
      enrolledUsers: 32,
      instructorName: "Sophia Martinez",
      instructorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      tags: ["UI/UX", "Tailwind", "Motion"]
    }
  ];

  const marketplaceItems: MarketplaceAsset[] = [
    {
      id: "m_1",
      title: "Linear-smooth Tailwind Boilerplate",
      description: "A gorgeous, pre-configured framework using radial glow, glass utilities, and micro-interactions.",
      price: 29,
      author: "Sophia Martinez",
      type: "Template",
      salesCount: 142,
      downloadUrl: "#"
    },
    {
      id: "m_2",
      title: "Google GenAI SDK Proxy Wrapper",
      description: "Complete Express middleware proxy boilerplate ensuring server-side API key protection and cache headers.",
      price: 49,
      author: "Vidara Architecture HQ",
      type: "Boilerplate",
      salesCount: 88,
      downloadUrl: "#"
    },
    {
      id: "m_3",
      title: "Unfair Customer Interview Playbook",
      description: "Ditch tutorial hell. 12 copy-paste cold outreach emails and exact interview questionnaire templates.",
      price: 15,
      author: "Marcus Aurelius Chen",
      type: "Ebook",
      salesCount: 224,
      downloadUrl: "#"
    }
  ];

  const handleCopyReferral = () => {
    const link = `https://vidara.io/launch?ref=${user.username || "builder_pro"}`;
    navigator.clipboard.writeText(link);
    setCopiedReferral(true);
    setTimeout(() => setCopiedReferral(false), 2000);
  };

  const handleSpotEnroll = (cohortTitle: string) => {
    alert(`💳 Stripe payment gateway telemetry initialized for "${cohortTitle}"!\nA transaction packet has been routed dynamically.`);
  };

  const handlePurchaseAsset = (assetTitle: string) => {
    alert(`📥 Purchase telemetry routed to Stripe for asset: "${assetTitle}"!\nYour digital payload link will be cached.`);
  };

  const tags = ["All", "Template", "Boilerplate", "Ebook"];

  const filteredAssets = selectedTag === "All" 
    ? marketplaceItems 
    : marketplaceItems.filter(item => item.type === selectedTag);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Monetization Titles */}
      <div>
        <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">Market & Cohorts</h1>
        <p className="text-sm text-slate-400 mt-1">Acquire premium boilerplates, register for active guided cohorts, and use direct referrals.</p>
      </div>

      {/* Segment 1: Premium Cohorts */}
      <div className="space-y-6">
        <div>
          <h3 className="font-display font-bold text-lg text-white">Active Quarterly Cohorts</h3>
          <p className="text-xs text-slate-400">High-ticket guided sprints with real validation grants and cash back loops.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {cohorts.map((cohort) => (
            <div key={cohort.id} className="glass p-6 rounded-2xl border border-white/5 flex flex-col justify-between h-full relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/5 blur-3xl -z-10 rounded-full" />
              
              <div>
                <div className="flex justify-between items-start">
                  <div className="flex flex-wrap gap-1.5">
                    {cohort.tags.map((tg) => (
                      <span key={tg} className="px-2 py-0.5 rounded bg-purple-500/10 border border-purple-500/15 font-mono text-[9px] text-purple-300">{tg}</span>
                    ))}
                  </div>
                  <span className="text-xs font-mono font-black text-white">${cohort.price} Spot</span>
                </div>

                <h4 className="font-display font-extrabold text-lg text-white mt-4 leading-tight">{cohort.title}</h4>
                <p className="text-xs text-slate-400 font-light leading-relaxed mt-2.5">{cohort.description}</p>
              </div>

              {/* Instructor metadata info */}
              <div className="mt-6 pt-5 border-t border-white/5 flex flex-col sm:flex-row gap-4 items-center justify-between text-xs font-mono">
                <div className="flex items-center space-x-3 text-left">
                  <img src={cohort.instructorAvatar} alt="" className="w-8 h-8 rounded-full object-cover" />
                  <div>
                    <span className="block text-slate-200 font-bold leading-none">{cohort.instructorName}</span>
                    <span className="text-[9px] text-slate-500 font-mono mt-1 block">Lead Sprinter</span>
                  </div>
                </div>

                <div className="text-right text-slate-400 text-[11px]">
                  <span>Starts: {cohort.startDate}</span><br />
                  <span className="text-xs font-semibold text-purple-400">({cohort.enrolledUsers}/50 slots locked)</span>
                </div>
              </div>

              <button
                onClick={() => handleSpotEnroll(cohort.title)}
                className="w-full mt-6 py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-black text-xs uppercase tracking-wider transition-all flex items-center justify-center space-x-1.5 active:scale-95 cursor-pointer shadow-lg shadow-purple-600/10"
              >
                <span>Settle Checkout Slot</span>
                <ArrowRight className="w-4 h-4" />
              </button>

            </div>
          ))}
        </div>
      </div>

      {/* Segment 2: Code Boilerplate & Asset Marketplace */}
      <div className="space-y-6 pt-6 border-t border-white/5">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h3 className="font-display font-bold text-lg text-white">Sovereign Asset Vaults</h3>
            <p className="text-xs text-slate-400">Trade pre-configured design packages or raw backend SDK proxy codes.</p>
          </div>

          {/* Filters tags links */}
          <div className="flex flex-wrap gap-1.5 bg-slate-900 border border-white/5 rounded-xl p-1 self-start">
            {tags.map((tg) => (
              <button
                key={tg}
                onClick={() => setSelectedTag(tg)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                  selectedTag === tg 
                    ? "bg-purple-600 text-white shadow-md" 
                    : "text-slate-500 hover:text-white"
                }`}
              >
                {tg}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {filteredAssets.map((asset) => (
            <div key={asset.id} className="p-5 rounded-2xl glass border border-white/5 flex flex-col justify-between h-full hover:border-white/10 transition-colors text-left">
              <div>
                <div className="flex justify-between items-center text-[10px] uppercase font-mono tracking-wider">
                  <span className="text-purple-400">{asset.type}</span>
                  <span className="text-slate-500">{asset.salesCount} sold</span>
                </div>

                <h4 className="font-bold text-sm text-slate-100 mt-3 leading-tight">{asset.title}</h4>
                <p className="text-[11px] text-slate-400 font-light mt-2 leading-relaxed">{asset.description}</p>
              </div>

              <div className="mt-6 pt-4 border-t border-white/4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-mono text-slate-500 block">By: {asset.author}</span>
                  <span className="font-mono text-xs font-black text-white">${asset.price} USD</span>
                </div>

                <button
                  onClick={() => handlePurchaseAsset(asset.title)}
                  className="p-2.5 rounded-xl bg-white text-black hover:bg-slate-200 text-xs font-bold font-mono active:scale-95 transition-all cursor-pointer flex items-center justify-center space-x-1"
                >
                  <Download className="w-4 h-4" />
                  <span>Buy</span>
                </button>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Segment 3: Referrals & Affiliates */}
      <div className="glass p-6 rounded-2xl border border-white/5 relative overflow-hidden flex flex-col md:flex-row md:items-center justify-between mt-8">
        <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/5 blur-3xl -z-10 rounded-full" />
        
        <div className="space-y-1 text-left max-w-lg mb-6 md:mb-0">
          <div className="flex items-center space-x-2 text-purple-400">
            <Share2 className="w-5 h-5" />
            <h4 className="font-display font-bold text-lg text-white">Referral Ledger Commissions</h4>
          </div>
          <p className="text-xs text-slate-400 font-light leading-relaxed">
            Invite fellow ambitious builders to Vidara. For every builder that launches their active workspace, we credit <strong className="text-purple-400 font-semibold">$10 onto your subscription wallet</strong> and instantly reward you with <strong className="text-purple-400 font-semibold">+200 XP booster points</strong>.
          </p>
        </div>

        {/* Action Link copies */}
        <div className="flex gap-2.5 self-start md:self-center shrink-0">
          <button
            onClick={handleCopyReferral}
            className="px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-950 border border-white/6 hover:border-purple-500/20 text-xs font-mono font-bold font-semibold transition-all flex items-center space-x-2 active:scale-95 cursor-pointer text-slate-300"
          >
            {copiedReferral ? (
              <>
                <Check className="w-4 h-4 text-emerald-400" />
                <span>Copied Code</span>
              </>
            ) : (
              <>
                <Clipboard className="w-4 h-4 text-slate-400" />
                <span>Copy Invite link</span>
              </>
            )}
          </button>
        </div>

      </div>

    </div>
  );
}
