import { useAppStore } from '../store/useAppStore';

export const usePosts = () => {
  const { 
    posts, 
    scheduledPosts, 
    addPost, 
    updatePost, 
    deletePost, 
    getPostsByStatus, 
    getUpcomingPosts 
  } = useAppStore();

  return {
    posts,
    scheduledPosts,
    addPost,
    updatePost,
    deletePost,
    getPostsByStatus,
    getUpcomingPosts,
    publishedPosts: getPostsByStatus('published'),
    draftPosts: getPostsByStatus('draft'),
    upcomingPosts: getUpcomingPosts()
  };
};
