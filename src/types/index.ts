export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  avatar?: string;
  socialAccounts?: SocialAccount[];
}

export interface SocialAccount {
  platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin' | 'tiktok';
  username: string;
  accessToken?: string;
  isConnected: boolean;
  followers?: number;
  lastSync?: Date;
}

export interface Post {
  id: string;
  content: string;
  platform: 'twitter' | 'instagram' | 'facebook' | 'linkedin' | 'tiktok';
  schedule: Date;
  status: 'draft' | 'scheduled' | 'published' | 'failed';
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
  media?: string[];
  hashtags?: string[];
}

export interface SocialStats {
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
  growth: number;
  likes?: number;
  shares?: number;
  comments?: number;
}

export interface AIConfig {
  openaiApiKey: string;
  model: string;
  temperature: number;
  maxTokens: number;
  autoGenerate: boolean;
  brandVoice: string;
}

export interface AppSettings {
  theme: 'light' | 'dark';
  notifications: boolean;
  autoSave: boolean;
  language: string;
  timezone: string;
}

export interface AnalyticsData {
  date: string;
  engagement: number;
  reach: number;
  impressions: number;
  clicks: number;
  conversions?: number;
}
