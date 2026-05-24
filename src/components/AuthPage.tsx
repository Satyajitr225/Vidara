import React, { useState } from "react";
import { UserProfile } from "../types";
import {
  Sparkles,
  Check,
  ArrowRight,
  ArrowLeft,
  Shield,
} from "lucide-react";

import { signupUser, loginUser } from "../api/auth";

interface AuthPageProps {
  onAuthSuccess: (user: UserProfile) => void;
  onBackToLanding: () => void;
}

export default function AuthPage({
  onAuthSuccess,
  onBackToLanding,
}: AuthPageProps) {
  const [step, setStep] = useState<
    "login" | "signup" | "interests" | "skill"
  >("signup");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);

  const [selectedLevel, setSelectedLevel] = useState<
    "Beginner" | "Intermediate" | "Hardcore Builder"
  >("Intermediate");

  const [bio, setBio] = useState("");

  const interestsOptions = [
    "SaaS Building",
    "Solopreneurship",
    "Fullstack Coding",
    "UX/UI Product Design",
    "Growth Hacking",
    "AI Engineering",
    "No-Code Prototyping",
    "Copywriting",
    "Community Building",
  ];

  const handleToggleInterest = (interest: string) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(
        selectedInterests.filter((i) => i !== interest)
      );
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  // LOGIN
  const handleLoginSubmit = async (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please provide credentials.");
      return;
    }

    try {
      const data = await loginUser({
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      const loggedInUser: UserProfile = {
        id: data.user.id,
        username: username || "builder",
        name: data.user.name,
        email: data.user.email,
        photoUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",
        bio: "Vidara Builder",
        skills: [],
        interests: [],
        skillLevel: "Intermediate",
        currentGoals: [],
        streak: 1,
        xp: 100,
        level: 1,
        executionScore: 0,
        achievements: [],
        publicPortfolio: [],
        activityHistory: [],
        socialLinks: {},
      };

      onAuthSuccess(loggedInUser);
    } catch (error) {
      console.error(error);
      alert("Login failed");
    }
  };

  // SIGNUP
  const handleSignupSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    if (!email || !password || !name || !username) {
      alert("Please fill in all the fields.");
      return;
    }

    setStep("interests");
  };

  // FINISH ONBOARDING
  const handleFinishOnboarding = async () => {
    try {
      const data = await signupUser({
        name,
        email,
        password,
      });

      localStorage.setItem("token", data.token);

      const finalProfile: UserProfile = {
        id: data.user.id,
        username:
          username.toLowerCase().replace(/\s+/g, "_"),

        name: data.user.name,
        email: data.user.email,

        photoUrl:
          "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80",

        bio:
          bio ||
          `Focused on ${selectedInterests
            .slice(0, 3)
            .join(", ")}`,

        skills: selectedInterests.slice(0, 4),

        interests: selectedInterests,

        skillLevel: selectedLevel,

        currentGoals: ["Launch first MVP"],

        streak: 1,
        xp: 150,
        level: 1,
        executionScore: 0,

        achievements: [],
        publicPortfolio: [],
        activityHistory: [],
        socialLinks: {},
      };

      onAuthSuccess(finalProfile);
    } catch (error) {
      console.error(error);
      alert("Signup failed");
    }
  };

  return (
    <div className="min-h-screen text-slate-100 flex items-center justify-center custom-gradient-bg px-6 relative py-12">
      <div
        className="absolute top-8 left-8 flex items-center space-x-2.5 cursor-pointer hover:opacity-80 transition-opacity"
        onClick={onBackToLanding}
      >
        <div className="w-8 h-8 rounded-lg bg-purple-600 flex items-center justify-center font-display font-extrabold text-sm">
          V
        </div>

        <span className="font-display font-medium text-sm text-slate-300">
          Vidara HQ
        </span>
      </div>

      <div className="w-full max-w-md glass p-8 rounded-2xl border border-white/10 shadow-2xl relative">
        <div className="absolute top-0 right-0 w-32 h-32 bg-purple-600/10 blur-2xl -z-10 rounded-full" />

        {/* LOGIN */}
        {step === "login" && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-black text-white">
                Welcome Back
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Resume your building sprint.
              </p>
            </div>

            <form
              onSubmit={handleLoginSubmit}
              className="space-y-4"
            >
              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Email"
                className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-xl"
                required
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-xl"
                required
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
              >
                Login
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              New here?{" "}
              <button
                onClick={() => setStep("signup")}
                className="text-purple-400"
              >
                Create Account
              </button>
            </div>
          </div>
        )}

        {/* SIGNUP */}
        {step === "signup" && (
          <div>
            <div className="text-center mb-6">
              <h2 className="text-2xl font-display font-black text-white">
                Join Vidara
              </h2>

              <p className="text-xs text-slate-400 mt-1">
                Create your builder account.
              </p>
            </div>

            <form
              onSubmit={handleSignupSubmit}
              className="space-y-4"
            >
              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Full Name"
                className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-xl"
                required
              />

              <input
                type="text"
                value={username}
                onChange={(e) =>
                  setUsername(e.target.value)
                }
                placeholder="Username"
                className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-xl"
                required
              />

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Email"
                className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-xl"
                required
              />

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Password"
                className="w-full px-4 py-3 bg-slate-900 border border-white/5 rounded-xl"
                required
              />

              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold"
              >
                Continue
              </button>
            </form>

            <div className="mt-6 text-center text-xs text-slate-500">
              Already have an account?{" "}
              <button
                onClick={() => setStep("login")}
                className="text-purple-400"
              >
                Sign In
              </button>
            </div>
          </div>
        )}

        {/* INTERESTS */}
        {step === "interests" && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Select Interests
            </h2>

            <div className="flex flex-wrap gap-2">
              {interestsOptions.map((opt) => {
                const isSelected =
                  selectedInterests.includes(opt);

                return (
                  <button
                    key={opt}
                    onClick={() =>
                      handleToggleInterest(opt)
                    }
                    className={`px-3 py-2 rounded-xl border ${
                      isSelected
                        ? "bg-purple-600"
                        : "bg-slate-900"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={() => setStep("signup")}
              >
                Back
              </button>

              <button
                onClick={() => setStep("skill")}
              >
                Next
              </button>
            </div>
          </div>
        )}

        {/* SKILL */}
        {step === "skill" && (
          <div>
            <h2 className="text-xl font-bold mb-4">
              Complete Setup
            </h2>

            <textarea
              value={bio}
              onChange={(e) =>
                setBio(e.target.value)
              }
              placeholder="Your bio..."
              className="w-full h-24 p-3 bg-slate-900 border border-white/5 rounded-xl"
            />

            <button
              onClick={handleFinishOnboarding}
              className="w-full mt-6 py-3 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-bold"
            >
              Finish Setup
            </button>
          </div>
        )}

        <div className="mt-8 pt-4 border-t border-white/5 flex items-center justify-center space-x-2 text-[10px] text-slate-500">
          <Shield className="w-3 h-3 text-slate-600" />

          <span>
            Secured via JWT authentication
          </span>
        </div>
      </div>
    </div>
  );
}