export interface User {
  id: string;
  name: string;
  email: string;
  plan: string;
}

export interface SocialStats {
  followers: number;
  engagement: number;
  reach: number;
  impressions: number;
  growth: number;
}

export interface Post {
  id: string;
  content: string;
  platform: 'twitter' | 'instagram' | 'linkedin' | 'facebook' | 'tiktok';
  schedule: Date;
  status: 'published' | 'scheduled' | 'draft' | 'failed';
  engagement?: {
    likes: number;
    shares: number;
    comments: number;
    clicks: number;
  };
}
