import React, { useState, useEffect } from "react";
import { UserProfile, CommunitySpace, CommunityPost, LeaderboardUser } from "../types";
import { 
  MessageSquare, Users, Sparkles, MessageCircle, Heart, Award, ArrowUp, Send, HelpCircle, Trophy, Crown
} from "lucide-react";

interface CommunityProps {
  user: UserProfile;
}

export default function Community({ user }: CommunityProps) {
  const [activeSpaceId, setActiveSpaceId] = useState<string>("sp_1");
  const [activeTab, setActiveTab] = useState<"forum" | "leaderboard" | "chat">("forum");
  
  // New post states
  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostBody, setNewPostBody] = useState("");
  
  // Real-time Chat States
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; author: string; avatar: string; text: string; time: string }>>([
    { id: "cm_1", author: "Sophia Martinez", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80", text: "Has anyone successfully validated a Figma builder SaaS with cold emails? Struggling with target metrics response.", time: "10:30" },
    { id: "cm_2", author: "Marcus Aurelius Chen", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", text: "Sophia yes, send exactly 2 sentences and link them to a custom loom of 1 screen. Do not detail specs. Keep it extreme.", time: "10:32" },
    { id: "cm_3", author: "Alexander Pope", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", text: "Agreed. If the loom has under 40% watch rates, change the value prop text.", time: "10:34" }
  ]);

  // Topic Spaces List
  const spaces: CommunitySpace[] = [
    { id: "sp_1", name: "founder-circles", description: "Private peer chats of builders shipping MVPs past $1k MRR benchmarks.", icon: "Crown", type: "founder_circle" },
    { id: "sp_2", name: "build-in-public", description: "Share raw screen links, proof-of-work, and gather community upvotes.", icon: "Compass", type: "building_topic" },
    { id: "sp_3", name: "tech-building", description: "Debugging help, cache tuning, Node server configs, and fast API proxies.", icon: "Code", type: "building_topic" }
  ];

  // Forums Threads List
  const [posts, setPosts] = useState<CommunityPost[]>([
    {
      id: "pst_1",
      spaceId: "sp_1",
      authorName: "Marcus Aurelius Chen",
      authorUsername: "chen_saas",
      authorAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
      title: "How I grew my database helper from zero to $3,200 MRR in public",
      body: "I spent 3 days setting up 12 radical customer interviews before writing code. I asked what Figma blockers designers faced on high-octane teams. Then I built an index config file in a public GitHub repo, linked developers on Twitter, and embedded a Stripe checkout. Shipped and validated in 24 hours.",
      createdAt: "3 hours ago",
      likes: 38,
      commentsCount: 3,
      reactions: { "🔥": 8, "🚀": 14 },
      comments: [
        { id: "c_1", authorName: "Sophia Martinez", authorPhoto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80", text: "This is pure gold. Doing client interviews tonight.", createdAt: "2 hours ago" }
      ]
    },
    {
      id: "pst_2",
      spaceId: "sp_2",
      authorName: "Sophia Martinez",
      authorUsername: "sophia_active",
      authorAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80",
      title: "Proof of Work: Deployed Aesthetify CSS helper to Production!",
      body: "Just committed the final responsive bento grids and radial blur configs to my server repo. The Gemini mentor recommended moving API keys backend side to harden security protocols. Check it out at aesthetify.vidara.io and submit feedback!",
      createdAt: "1 day ago",
      likes: 22,
      commentsCount: 1,
      reactions: { "🚀": 9, "💡": 4 },
      comments: []
    }
  ]);

  // Selected post comments drawer states
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [newCommentText, setNewCommentText] = useState("");

  // Leaderboard data mock
  const leaderboard: LeaderboardUser[] = [
    { rank: 1, name: "Marcus Aurelius Chen", username: "chen_saas", photoUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80", xp: 5450, level: 8, executionScore: 94 },
    { rank: 2, name: "Sophia Martinez", username: "sophia_active", photoUrl: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80", xp: 4200, level: 7, executionScore: 89 },
    { rank: 3, name: "Zayn Malik Roy", username: "z_master", photoUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80", xp: 3600, level: 6, executionScore: 84 },
    { rank: 4, name: "Creative Build Master (You)", username: user.username, photoUrl: user.photoUrl, xp: user.xp, level: user.level, executionScore: user.executionScore }
  ];

  // Upvote project posts
  const handleLikePost = (postId: string) => {
    setPosts(posts.map((p) => p.id === postId ? { ...p, likes: p.likes + 1 } : p));
  };

  // Compose dynamic posts
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostTitle.trim() || !newPostBody.trim()) return;

    const addedPost: CommunityPost = {
      id: "pst_" + Math.random().toString(36).substr(2, 9),
      spaceId: activeSpaceId,
      authorName: user.name,
      authorUsername: user.username,
      authorAvatar: user.photoUrl,
      title: newPostTitle,
      body: newPostBody,
      createdAt: "Just now",
      likes: 1,
      commentsCount: 0,
      reactions: { "🚀": 1 },
      comments: []
    };

    setPosts([addedPost, ...posts]);
    setNewPostTitle("");
    setNewPostBody("");
    alert("🚀 Post published to the community feed!");
  };

  // Add Comment on specific thread
  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim() || !selectedPostId) return;

    setPosts(posts.map((p) => {
      if (p.id === selectedPostId) {
        return {
          ...p,
          commentsCount: p.commentsCount + 1,
          comments: [
            ...p.comments,
            {
              id: "c_" + Math.random().toString(36).substr(2, 9),
              authorName: user.name,
              authorPhoto: user.photoUrl,
              text: newCommentText,
              createdAt: "Just now"
            }
          ]
        };
      }
      return p;
    }));

    setNewCommentText("");
  };

  // Settle real-time simulator chats
  const handleSendChatMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim()) return;

    const newMsg = {
      id: "cm_" + Math.random().toString(36).substr(2, 9),
      author: user.name,
      avatar: user.photoUrl,
      text: chatInput,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setChatMessages([...chatMessages, newMsg]);
    setChatInput("");
  };

  // Periodically mock streaming chat responses to feel Discord community energy
  useEffect(() => {
    const mockInterval = setInterval(() => {
      if (activeTab === "chat") {
        const potentialAuthors = [
          { name: "SaaS Dev Alpha", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80" },
          { name: "Justin Bieber", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80" }
        ];
        const texts = [
          "Just completed my landing page! Ready to trigger marketing outreach sequences.",
          "Gemini mentor critique score was 8.8/10. Recommending index routes consolidation.",
          "Who wants to audit my Stripe payload caching tonight?",
          "Launched on Product Hunt and caught 4 paying users. Incremented +350 XP!"
        ];

        const rollAuthor = potentialAuthors[Math.floor(Math.random() * potentialAuthors.length)];
        const rollText = texts[Math.floor(Math.random() * texts.length)];

        setChatMessages((prev) => [
          ...prev,
          {
            id: "mock_cm_" + Math.random().toString(36).substr(2, 9),
            author: rollAuthor.name,
            avatar: rollAuthor.avatar,
            text: rollText,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
          }
        ]);
      }
    }, 12000);

    return () => clearInterval(mockInterval);
  }, [activeTab]);

  const activeSpace = spaces.find((s) => s.id === activeSpaceId) || spaces[0];
  const activePosts = posts.filter((p) => p.spaceId === activeSpaceId);
  const selectedPostForComments = posts.find((p) => p.id === selectedPostId);

  return (
    <div className="space-y-8 max-w-7xl mx-auto">
      
      {/* Community Headers */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-display font-extrabold text-white tracking-tight">Builder Network</h1>
          <p className="text-sm text-slate-400 mt-1">Sovereign peer channels trading growth loops, codebases, and capital metrics.</p>
        </div>

        {/* Channels layout tabs */}
        <div className="inline-flex p-1 rounded-xl bg-slate-900 border border-white/5 self-start shrink-0">
          <button 
            onClick={() => setActiveTab("forum")}
            className={`px-4.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${activeTab === "forum" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Discussion Forums
          </button>
          <button 
            onClick={() => setActiveTab("chat")}
            className={`px-4.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${activeTab === "chat" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Discord Live Chat
          </button>
          <button 
            onClick={() => setActiveTab("leaderboard")}
            className={`px-4.5 py-2 rounded-lg text-xs font-semibold cursor-pointer transition-all ${activeTab === "leaderboard" ? "bg-purple-600 text-white" : "text-slate-500 hover:text-white"}`}
          >
            Gamified Ranks
          </button>
        </div>
      </div>

      {activeTab === "forum" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Forum Channel Rooms side rail */}
          <div className="glass p-4 rounded-2xl border border-white/5 lg:col-span-1 space-y-1">
            <span className="text-[10px] uppercase font-mono tracking-wider px-2 block mb-3 text-slate-500">Topic Groups</span>
            
            {spaces.map((sp) => {
              const isActive = activeSpaceId === sp.id;
              return (
                <button
                  key={sp.id}
                  onClick={() => {
                    setActiveSpaceId(sp.id);
                    setSelectedPostId(null);
                  }}
                  className={`w-full p-3 rounded-xl text-left border text-xs font-semibold block cursor-pointer transition-all ${
                    isActive 
                      ? "bg-purple-600/15 border-purple-500/30 text-white" 
                      : "bg-transparent border-transparent text-slate-400 hover:text-white hover:bg-white/2"
                  }`}
                >
                  <span className="text-purple-400 font-mono font-bold mr-1 hover:text-purple-300">#</span>
                  <span>{sp.name}</span>
                </button>
              );
            })}
          </div>

          {/* Main Forums listings */}
          <div className="lg:col-span-3 space-y-6">
            
            {/* Active space header info */}
            <div className="p-4 rounded-xl bg-slate-950 border border-white/5 text-xs text-slate-400 font-light flex justify-between items-center">
              <span>🚀 Channel: <strong className="font-semibold text-white font-mono">#{activeSpace.name}</strong> • {activeSpace.description}</span>
              <span className="text-purple-400 font-mono text-[10px]">Active</span>
            </div>

            {/* Selected post detail comment thread */}
            {selectedPostForComments ? (
              <div className="p-6 rounded-2xl glass border-2 border-purple-500/30 space-y-6">
                
                {/* Back button */}
                <button 
                  onClick={() => setSelectedPostId(null)}
                  className="px-3.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white font-mono text-[10px] uppercase tracking-wide cursor-pointer"
                >
                  ← Close Thread
                </button>

                {/* Original Post */}
                <div className="space-y-3.5">
                  <div className="flex items-center space-x-3">
                    <img src={selectedPostForComments.authorAvatar} alt="" className="w-9 h-9 rounded-full object-cover" />
                    <div>
                      <h4 className="font-bold text-xs text-white leading-tight">{selectedPostForComments.authorName}</h4>
                      <p className="text-[9px] text-slate-500 font-mono">@{selectedPostForComments.authorUsername}</p>
                    </div>
                  </div>

                  <h3 className="font-display font-extrabold text-lg text-white leading-tight">{selectedPostForComments.title}</h3>
                  <p className="text-xs text-slate-300 font-light leading-relaxed whitespace-pre-wrap">{selectedPostForComments.body}</p>
                </div>

                {/* Comments checklist */}
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h4 className="font-bold text-xs text-white font-mono uppercase tracking-widest flex items-center space-x-2">
                    <MessageCircle className="w-4 h-4 text-purple-400" />
                    <span>Peer Reviews ({selectedPostForComments.comments.length})</span>
                  </h4>

                  <div className="space-y-3">
                    {selectedPostForComments.comments.map((comment) => (
                      <div key={comment.id} className="p-3 bg-slate-900 border border-white/5 rounded-xl text-xs font-light">
                        <div className="flex items-center space-x-2.5 mb-2">
                          <img src={comment.authorPhoto} className="w-5.5 h-5.5 rounded-full object-cover" />
                          <span className="font-bold text-[11px] text-slate-200">{comment.authorName}</span>
                          <span className="text-[10px] text-slate-500 font-mono ml-auto">{comment.createdAt}</span>
                        </div>
                        <p className="text-slate-350 leading-relaxed">{comment.text}</p>
                      </div>
                    ))}
                  </div>

                  {/* Comment compose form */}
                  <form onSubmit={handleAddComment} className="flex gap-2.5 pt-4 border-t border-white/5">
                    <input 
                      type="text" 
                      value={newCommentText}
                      onChange={(e) => setNewCommentText(e.target.value)}
                      placeholder="Offer actionable constructive developer critique or code tips..."
                      className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-4 py-2.5 text-xs focus:border-purple-500/50 outline-none text-slate-200"
                      required
                    />
                    <button 
                      type="submit"
                      className="px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold transition-all flex items-center space-x-1.5 cursor-pointer active:scale-95"
                    >
                      <span>Post Review</span>
                    </button>
                  </form>
                </div>

              </div>
            ) : (
              // Normal listings
              <div className="space-y-4">
                {activePosts.map((post) => (
                  <div key={post.id} className="p-6 rounded-2xl glass border border-white/6 hover:border-white/12 transition-all space-y-4">
                    <div className="flex justify-between items-start">
                      <div className="flex items-center space-x-3.5">
                        <img 
                          src={post.authorAvatar} 
                          alt="" 
                          className="w-8.5 h-8.5 rounded-full object-cover border border-purple-500/20"
                        />
                        <div>
                          <h4 className="font-bold text-xs text-white leading-tight">{post.authorName}</h4>
                          <span className="text-[9px] text-slate-550 font-mono">@{post.authorUsername} • {post.createdAt}</span>
                        </div>
                      </div>

                      {/* Upvote score button */}
                      <button 
                        onClick={() => handleLikePost(post.id)}
                        className="px-3 py-1.5 rounded-lg border border-white/5 bg-slate-900 hover:border-purple-500/15 flex items-center space-x-1.5 text-slate-400 hover:text-purple-400 text-xs font-semibold cursor-pointer select-none transition-colors"
                      >
                        <ArrowUp className="w-4.5 h-4.5 text-purple-400" />
                        <span>{post.likes}</span>
                      </button>
                    </div>

                    <div className="space-y-2 cursor-pointer" onClick={() => setSelectedPostId(post.id)}>
                      <h3 className="font-display font-extrabold text-base text-white hover:text-purple-400 transition-colors leading-snug">{post.title}</h3>
                      <p className="text-xs text-slate-350 font-light leading-relaxed line-clamp-3">{post.body}</p>
                    </div>

                    {/* Reactions & Comments bottom */}
                    <div className="pt-3 border-t border-white/4 flex items-center gap-4 text-xs font-mono text-slate-500">
                      <button onClick={() => setSelectedPostId(post.id)} className="hover:text-white transition-colors flex items-center space-x-1 font-sans cursor-pointer">
                        <MessageSquare className="w-4 h-4 text-slate-500" />
                        <span>({post.commentsCount}) peer reviews</span>
                      </button>

                      {/* Reactions loops */}
                      <div className="flex items-center space-x-2 ml-auto select-none">
                        {Object.entries(post.reactions || {}).map(([emoji, count]) => (
                          <span key={emoji} className="px-2 py-0.5 rounded bg-white/3 border border-white/5 text-[11px]">{emoji} {count}</span>
                        ))}
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            )}

            {/* Compose New thread post card form */}
            {!selectedPostId && (
              <div className="glass p-6 rounded-2xl border border-white/5">
                <div className="flex items-center space-x-2 text-purple-400 mb-4">
                  <Sparkles className="w-4.5 h-4.5" />
                  <h4 className="font-display font-bold text-sm text-white">Ask or share in # {activeSpace.name}</h4>
                </div>

                <form onSubmit={handleCreatePost} className="space-y-4">
                  <input 
                    type="text" 
                    value={newPostTitle}
                    onChange={(e) => setNewPostTitle(e.target.value)}
                    placeholder="Punchy clear title (e.g., Cold emails generated zero conversions help!)"
                    className="w-full px-4 py-2.5 bg-slate-900 border border-white/5 rounded-xl text-xs focus:border-purple-500/50 outline-none text-slate-200"
                    required
                  />
                  <textarea 
                    value={newPostBody}
                    onChange={(e) => setNewPostBody(e.target.value)}
                    placeholder="Provide depth. Show links, proof of work metrics, or describe detailed codebases parameters..."
                    className="w-full h-24 p-3 bg-slate-900 border border-white/5 rounded-xl text-xs focus:border-purple-500/50 outline-none text-slate-200 resize-none font-light leading-relaxed"
                    required
                  />
                  <div className="flex justify-end">
                    <button 
                      type="submit"
                      className="px-6 py-2.5 rounded-xl bg-white text-black hover:bg-slate-200 font-bold text-xs transition-all active:scale-95 cursor-pointer"
                    >
                      Publish Thread
                    </button>
                  </div>
                </form>
              </div>
            )}

          </div>

        </div>
      )}

      {/* activeTab === chat Discord Simulator */}
      {activeTab === "chat" && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          
          {/* Chats sidemenu */}
          <div className="glass p-4 rounded-xl border border-white/5 lg:col-span-1 space-y-1 text-xs">
            <span className="text-[10px] uppercase font-mono tracking-wider font-bold text-slate-500 px-2 block mb-3">Live channels</span>
            <button className="w-full p-2.5 text-left rounded bg-purple-500/10 text-slate-200 flex items-center space-x-2 border border-purple-500/20">
              <span className="text-purple-400 font-bold font-mono text-sm">#</span>
              <span className="font-semibold">announcements</span>
            </button>
            <button className="w-full p-2.5 text-left rounded text-slate-500 flex items-center space-x-2">
              <span className="font-bold font-mono text-sm leading-none">#</span>
              <span>general-deck</span>
            </button>
            <button className="w-full p-2.5 text-left rounded text-slate-500 flex items-center space-x-2">
              <span className="font-bold font-mono text-sm leading-none">#</span>
              <span>night-builders</span>
            </button>
          </div>

          {/* Active Chats screen */}
          <div className="glass p-6 rounded-2xl border border-white/5 lg:col-span-3 flex flex-col justify-between h-[450px]">
            <div className="flex items-center space-x-2.5 pb-2.5 border-b border-white/5 text-slate-400 text-xs">
              <Users className="w-4 h-4 text-purple-400" />
              <span>General stream channel chat ({chatMessages.length + 32} builders online)</span>
            </div>

            {/* Chat Body Scroll */}
            <div className="flex-1 my-4 overflow-y-auto space-y-3 pr-1 text-[11px]">
              {chatMessages.map((msg) => (
                <div key={msg.id} className="flex gap-3 text-left">
                  <img src={msg.avatar} className="w-6.5 h-6.5 rounded-full object-cover shrink-0 mt-0.5" />
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-extrabold text-slate-200">{msg.author}</span>
                      <span className="text-[8px] text-slate-500 font-mono">{msg.time}</span>
                    </div>
                    <p className="text-slate-350 font-light leading-relaxed mt-0.5">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* compose box */}
            <form onSubmit={handleSendChatMessage} className="flex gap-2.5 pt-3 border-t border-white/5">
              <input 
                type="text" 
                value={chatInput}
                onChange={(e) => setChatInput(e.target.value)}
                placeholder="Log chat to #announcements stream..."
                className="flex-1 bg-slate-950 border border-white/5 rounded-xl px-4 py-2 text-xs focus:border-purple-500/50 outline-none text-slate-200"
              />
              <button 
                type="submit"
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-mono font-bold text-xs"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

        </div>
      )}

      {/* Gamified Leaderboard activeTab === leaderboard */}
      {activeTab === "leaderboard" && (
        <div className="max-w-4xl mx-auto glass p-6 rounded-2xl border border-white/5 space-y-6">
          <div className="text-center max-w-lg mx-auto mb-8">
            <Trophy className="w-10 h-10 text-amber-500 mx-auto mb-2 animate-bounce" />
            <h3 className="font-display font-black text-xl text-white">The Sovereign Ranks</h3>
            <p className="text-xs text-slate-400 mt-1">Sovereign builders ranked by total XP points and daily check-in validation score consistency.</p>
          </div>

          <div className="space-y-3">
            {leaderboard.map((usr, i) => {
              const isFirst = usr.rank === 1;
              const isUserSelf = usr.username === user.username;

              return (
                <div 
                  key={usr.username} 
                  className={`p-4 rounded-xl border flex items-center justify-between transition-colors ${
                    isUserSelf 
                      ? "bg-purple-600/10 border-purple-500" 
                      : "bg-slate-900 border-white/5 hover:border-white/10"
                  }`}
                >
                  <div className="flex items-center space-x-4 min-w-0">
                    <div className="w-6 font-mono font-black text-sm text-center">
                      {isFirst ? (
                        <Crown className="w-5 h-5 text-amber-500 mx-auto" />
                      ) : (
                        <span>#{usr.rank}</span>
                      )}
                    </div>

                    <img src={usr.photoUrl} alt="" className="w-9 h-9 rounded-full object-cover border border-white/5 shrink-0" />
                    
                    <div className="min-w-0">
                      <h4 className="font-extrabold text-xs text-white truncate">{usr.name} {isUserSelf && "(You)"}</h4>
                      <p className="text-[10px] text-slate-400 font-mono">@{usr.username} • Level {usr.level}</p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-6 shrink-0 font-mono text-xs text-right">
                    <div>
                      <div className="font-black text-white">{usr.executionScore}%</div>
                      <div className="text-[8px] text-slate-500 uppercase">Exec Ratio</div>
                    </div>
                    <div>
                      <div className="font-black text-purple-400">{usr.xp} XP</div>
                      <div className="text-[8px] text-slate-500 uppercase">Total Points</div>
                    </div>
                  </div>

                </div>
              );
            })}
          </div>

          <div className="p-4 bg-purple-500/5 rounded-xl border border-purple-500/10 text-xs text-slate-400 leading-normal font-light">
            💡 <strong>Rank Incentives:</strong> Finishing in the Top 3 of the sovereign ranks by the end of the quarterly cohort unlocks entry into the **$5,000 builder prize pool funding grant** dynamically analyzed by the AI Council. Keep consistent streaks logs to advance!
          </div>

        </div>
      )}

    </div>
  );
}
