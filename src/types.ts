/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface UserProfile {
  id: string;
  username: string;
  name: string;
  email: string;
  photoUrl: string;
  bio: string;
  skills: string[];
  interests: string[];
  skillLevel: "Beginner" | "Intermediate" | "Hardcore Builder";
  currentGoals: string[];
  streak: number;
  xp: number;
  level: number;
  executionScore: number; // 0-100, calculation of submitted tasks vs total
  achievements: Achievement[];
  publicPortfolio: PortfolioProject[];
  activityHistory: ActivityLog[];
  socialLinks: {
    twitter?: string;
    github?: string;
    linkedin?: string;
  };
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  unlockedAt: string;
  icon: string; // name of Lucide icon
  xpReward: number;
}

export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  link: string;
  createdAt: string;
  xpGained: number;
  score: number; // 1-10 execution code score
  aiFeedback?: string;
  aiSuggestedBadge?: string;
  likes: number;
  comments: ProjectComment[];
}

export interface ProjectComment {
  id: string;
  authorName: string;
  authorPhoto: string;
  text: string;
  createdAt: string;
}

export interface ActivityLog {
  id: string;
  type: "task_completed" | "goal_created" | "streak_milestone" | "community_post" | "ai_validation" | "cohort_joined";
  description: string;
  timestamp: string;
  xpEarned: number;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  category: "Startup Growth" | "Technical Building" | "Product Design" | "Scale Mechanics";
  difficulty: "Beginner" | "Moderate" | "Hardcore";
  xpReward: number;
  type: "video" | "pdf" | "notion-note";
  duration: string;
  contentMarkdown: string;
  isCompleted?: boolean;
  lessons: LessonDetail[];
}

export interface LessonDetail {
  id: string;
  title: string;
  duration: string;
  isCompleted?: boolean;
}

export interface ExecutionTask {
  id: string;
  title: string;
  category: "Daily Check-in" | "Weekly Mission" | "Core Milestone";
  isCompleted: boolean;
  proofRequired: boolean;
  xpReward: number;
  dueDate: string;
}

export interface CommunitySpace {
  id: string;
  name: string;
  description: string;
  icon: string;
  type: "founder_circle" | "building_topic" | "general_discussion";
}

export interface CommunityPost {
  id: string;
  spaceId: string;
  authorName: string;
  authorUsername: string;
  authorAvatar: string;
  title: string;
  body: string;
  createdAt: string;
  likes: number;
  commentsCount: number;
  reactions: Record<string, number>;
  comments: ProjectComment[];
}

export interface LeaderboardUser {
  rank: number;
  username: string;
  name: string;
  photoUrl: string;
  xp: number;
  level: number;
  executionScore: number;
}

export interface Cohort {
  id: string;
  title: string;
  description: string;
  price: number;
  startDate: string;
  durationWeeks: number;
  enrolledUsers: number;
  instructorName: string;
  instructorAvatar: string;
  tags: string[];
}

export interface MarketplaceAsset {
  id: string;
  title: string;
  description: string;
  price: number;
  author: string;
  type: "Template" | "Ebook" | "Boilerplate" | "Consultation";
  salesCount: number;
  downloadUrl: string;
}
