import { useState, useEffect } from "react";
import { UserProfile, ActivityLog } from "./types";

import LandingPage from "./components/LandingPage";
import AuthPage from "./components/AuthPage";
import Sidebar from "./components/Sidebar";
import Dashboard from "./components/Dashboard";
import Learning from "./components/Learning";
import Execution from "./components/Execution";
import AIAssistance from "./components/AIAssistance";
import Community from "./components/Community";
import Monetization from "./components/Monetization";
import AdminPanel from "./components/AdminPanel";

import {
  Bell,
} from "lucide-react";

export default function App() {

  const [user, setUser] = useState<UserProfile | null>(null);

  const [viewState, setViewState] = useState<
    "landing" | "auth" | "workspace"
  >("landing");

  const [activeTab, setActiveTab] =
    useState<string>("dashboard");

  const [notifications, setNotifications] =
    useState<
      Array<{
        id: string;
        text: string;
        time: string;
        read: boolean;
      }>
    >([
      {
        id: "n_1",
        text: "Welcome to Vidara.",
        time: "Now",
        read: false,
      },
    ]);

  const [showNotificationDropdown, setShowNotificationDropdown] =
    useState(false);

  // SESSION RESTORE
  useEffect(() => {
    const cachedUser =
      localStorage.getItem("vidara_session_profile");

    if (cachedUser) {
      try {
        const parsed = JSON.parse(cachedUser);

        setUser(parsed);

        setViewState("workspace");
      } catch {
        localStorage.removeItem(
          "vidara_session_profile"
        );
      }
    }
  }, []);

  // AUTH SUCCESS
  const handleAuthSuccess = (
    newProfile: UserProfile
  ) => {
    setUser(newProfile);

    localStorage.setItem(
      "vidara_session_profile",
      JSON.stringify(newProfile)
    );

    setViewState("workspace");
  };

  // UPDATE USER
  const handleUpdateUser = (
    updatedProfile: UserProfile
  ) => {
    setUser(updatedProfile);

    localStorage.setItem(
      "vidara_session_profile",
      JSON.stringify(updatedProfile)
    );
  };

  // TASK HISTORY
  const handleAddTaskHistory = (
    newHistoryLog: ActivityLog
  ) => {
    if (!user) return;

    const newNotif = {
      id:
        "n_" +
        Math.random()
          .toString(36)
          .substr(2, 9),

      text: `+${newHistoryLog.xpEarned} XP earned`,
      time: "Now",
      read: false,
    };

    setNotifications([
      newNotif,
      ...notifications,
    ]);

    handleUpdateUser({
      ...user,
      xp: user.xp + newHistoryLog.xpEarned,
      activityHistory: [
        newHistoryLog,
        ...user.activityHistory,
      ],
    });
  };

  // LOGOUT
  const handleLogout = () => {
    setUser(null);

    localStorage.removeItem(
      "vidara_session_profile"
    );

    localStorage.removeItem("token");

    setViewState("landing");

    setActiveTab("dashboard");
  };

  // MARK NOTIFICATION READ
  const handleMarkNotificationsRead = () => {
    setNotifications(
      notifications.map((n) => ({
        ...n,
        read: true,
      }))
    );

    setShowNotificationDropdown(false);
  };

  // REAL ADMIN CHECK
  const isAdmin =
    user?.email === "satyajitr225@gmail.com";

  // BLOCK NON ADMINS
  useEffect(() => {
    if (
      activeTab === "admin" &&
      !isAdmin
    ) {
      setActiveTab("dashboard");
    }
  }, [activeTab, isAdmin]);

  return (
    <div className="min-h-screen bg-[#030206] text-slate-100 font-sans overflow-x-hidden">

      {/* LANDING */}
      {viewState === "landing" && (
        <LandingPage
          onJoin={() =>
            setViewState("auth")
          }
        />
      )}

      {/* AUTH */}
      {viewState === "auth" && (
        <AuthPage
          onAuthSuccess={
            handleAuthSuccess
          }
          onBackToLanding={() =>
            setViewState("landing")
          }
        />
      )}

      {/* WORKSPACE */}
      {viewState === "workspace" &&
        user && (
          <div className="flex h-screen overflow-hidden custom-gradient-bg">

            {/* SIDEBAR */}
            <Sidebar
              user={user}
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              onLogout={handleLogout}
              isAdmin={isAdmin}
            />

            {/* MAIN */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">

              {/* HEADER */}
              <header className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-slate-950/20 backdrop-blur-md">

                <div className="flex items-center space-x-2">
                  <span className="text-xs text-slate-500 font-mono">
                    Current room:
                  </span>

                  <span className="p-1 px-2.5 rounded bg-purple-500/10 border border-purple-500/15 text-[11px] text-purple-300 font-mono uppercase">
                    {activeTab}
                  </span>
                </div>

                {/* RIGHT */}
                <div className="flex items-center space-x-4">

                  {/* NOTIFICATIONS */}
                  <div className="relative">
                    <button
                      onClick={() =>
                        setShowNotificationDropdown(
                          !showNotificationDropdown
                        )
                      }
                      className="p-2 rounded-xl border border-white/5 hover:bg-white/5"
                    >
                      <Bell className="w-4 h-4" />
                    </button>

                    {showNotificationDropdown && (
                      <div className="absolute right-0 mt-3 w-80 glass p-4 rounded-xl border border-white/10 shadow-2xl z-50">

                        <div className="flex justify-between items-center mb-3">
                          <span className="text-xs font-bold">
                            Notifications
                          </span>

                          <button
                            onClick={
                              handleMarkNotificationsRead
                            }
                            className="text-xs text-purple-400"
                          >
                            Mark all read
                          </button>
                        </div>

                        <div className="space-y-2">
                          {notifications.map(
                            (notif) => (
                              <div
                                key={notif.id}
                                className="p-2 rounded-lg bg-white/5 text-xs"
                              >
                                <p>
                                  {notif.text}
                                </p>

                                <span className="text-[10px] text-slate-500">
                                  {notif.time}
                                </span>
                              </div>
                            )
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* PROFILE */}
                  <div className="flex items-center space-x-2">
                    <img
                      src={user.photoUrl}
                      alt={user.name}
                      className="w-8 h-8 rounded-full"
                    />

                    <div>
                      <p className="text-xs font-bold">
                        {user.name}
                      </p>

                      <p className="text-[10px] text-emerald-400">
                        Level {user.level}
                      </p>
                    </div>
                  </div>

                </div>
              </header>

              {/* BODY */}
              <main className="flex-1 overflow-y-auto p-8">

                {activeTab ===
                  "dashboard" && (
                  <Dashboard
                    user={user}
                    onUpdateUser={
                      handleUpdateUser
                    }
                    onAddTaskHistory={
                      handleAddTaskHistory
                    }
                  />
                )}

                {activeTab ===
                  "learning" && (
                  <Learning
                    user={user}
                    onUpdateUser={
                      handleUpdateUser
                    }
                    onAddTaskHistory={
                      handleAddTaskHistory
                    }
                  />
                )}

                {activeTab ===
                  "execution" && (
                  <Execution
                    user={user}
                    onUpdateUser={
                      handleUpdateUser
                    }
                    onAddTaskHistory={
                      handleAddTaskHistory
                    }
                  />
                )}

                {activeTab ===
                  "ai-assistant" && (
                  <AIAssistance
                    user={user}
                  />
                )}

                {activeTab ===
                  "community" && (
                  <Community
                    user={user}
                  />
                )}

                {activeTab ===
                  "monetization" && (
                  <Monetization
                    user={user}
                  />
                )}

                {/* ADMIN LOCK */}
                {activeTab ===
                  "admin" &&
                  isAdmin && (
                    <AdminPanel
                      user={user}
                    />
                  )}

              </main>
            </div>
          </div>
        )}
    </div>
  );
}