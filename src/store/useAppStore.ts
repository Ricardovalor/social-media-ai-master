import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  avatar?: string;
}

interface Post {
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
}

interface AppState {
  user: User;
  posts: Post[];
  setUser: (user: User) => void;
  addPost: (post: Omit<Post, 'id'>) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      user: {
        id: '1',
        name: 'Ricardo Silva',
        email: 'ricardo@empresa.com',
        plan: 'pro',
        avatar: ''
      },
      posts: [
        {
          id: '1',
          content: '🚀 Lançando nossa nova plataforma de Social Media AI!',
          platform: 'twitter',
          schedule: new Date(),
          status: 'published',
          engagement: { likes: 42, shares: 12, comments: 8, clicks: 56 }
        }
      ],
      setUser: (user) => set({ user }),
      addPost: (newPost) => set((state) => {
        const post: Post = {
          ...newPost,
          id: Date.now().toString()
        };
        return { posts: [post, ...state.posts] };
      }),
    }),
    {
      name: 'social-media-ai-store'
    }
  )
);
