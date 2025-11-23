import { useState, useEffect } from 'react';

export interface Post {
  id: string;
  content: string;
  scheduledFor?: string;
  status: 'draft' | 'scheduled' | 'published';
}

export const usePosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [scheduledPosts, setScheduledPosts] = useState<Post[]>([]);

  // Carregar dados iniciais
  useEffect(() => {
    const initialPosts: Post[] = [
      {
        id: '1',
        content: 'Bem-vindo à plataforma de mídia social! 🚀',
        status: 'published'
      },
      {
        id: '2',
        content: 'Dicas para engajar no Instagram 📱',
        scheduledFor: new Date(Date.now() + 86400000).toISOString(),
        status: 'scheduled'
      }
    ];

    const initialScheduled: Post[] = [
      {
        id: '3',
        content: 'Como monetizar seu TikTok 💰',
        scheduledFor: new Date(Date.now() + 172800000).toISOString(),
        status: 'scheduled'
      }
    ];

    setPosts(initialPosts);
    setScheduledPosts(initialScheduled);
  }, []);

  const addPost = (post: Post) => {
    setPosts(prev => [...prev, post]);
  };

  const updatePost = (id: string, updatedPost: Partial<Post>) => {
    setPosts(prev => prev.map(post =>
      post.id === id ? { ...post, ...updatedPost } : post
    ));
  };

  const deletePost = (id: string) => {
    setPosts(prev => prev.filter(post => post.id !== id));
  };

  const schedulePost = (post: Post) => {
    setScheduledPosts(prev => [...prev, { ...post, status: 'scheduled' }]);
  };

  return {
    posts,
    scheduledPosts,
    addPost,
    updatePost,
    deletePost,
    schedulePost,
  };
};
