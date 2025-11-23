// Tipos globais da aplicação

export interface User {
  id: string;
  name: string;
  email: string;
}

export interface SocialMediaAccount {
  platform: 'facebook' | 'twitter' | 'instagram' | 'linkedin';
  username: string;
  connected: boolean;
}

export interface AnalyticsData {
  impressions: number;
  engagements: number;
  reach: number;
  followers: number;
}
