import React from "react";
import { Post } from "../../types";

interface RecentPostsProps {
  posts: Post[];
}

export const RecentPosts: React.FC<RecentPostsProps> = ({ posts }) => (
  <div className="bg-white rounded-2xl shadow-lg p-6 fade-in">
    <h3 className="text-xl font-bold text-gray-900 mb-6">📝 Posts Recentes</h3>
    <div className="space-y-4">
      {posts.map((post) => (
        <div key={post.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg hover:border-blue-300 transition-all duration-300 hover:shadow-md">
          <div className={`w-3 h-3 rounded-full mt-2 ${
            post.status === 'published' ? 'bg-green-500' :
            post.status === 'scheduled' ? 'bg-blue-500' :
            post.status === 'failed' ? 'bg-red-500' : 'bg-gray-400'
          }`}></div>
          <div className="flex-1 min-w-0">
            <p className="text-gray-800 font-medium truncate">{post.content}</p>
            <div className="flex items-center space-x-4 mt-2 text-sm text-gray-600 flex-wrap gap-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                post.platform === 'twitter' ? 'bg-blue-100 text-blue-800' :
                post.platform === 'instagram' ? 'bg-pink-100 text-pink-800' :
                post.platform === 'facebook' ? 'bg-blue-100 text-blue-800' :
                post.platform === 'linkedin' ? 'bg-blue-100 text-blue-800' : 'bg-purple-100 text-purple-800'
              }`}>
                {post.platform}
              </span>
              <span>{new Date(post.schedule).toLocaleDateString('pt-BR')}</span>
              {post.engagement && (
                <span className="flex items-center space-x-2">
                  <span className="flex items-center space-x-1">
                    <span>❤️</span>
                    <span>{post.engagement.likes}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>🔄</span>
                    <span>{post.engagement.shares}</span>
                  </span>
                  <span className="flex items-center space-x-1">
                    <span>💬</span>
                    <span>{post.engagement.comments}</span>
                  </span>
                </span>
              )}
            </div>
          </div>
          <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${
            post.status === 'published' ? 'bg-green-100 text-green-800' :
            post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' :
            post.status === 'failed' ? 'bg-red-100 text-red-800' : 'bg-gray-100 text-gray-800'
          }`}>
            {post.status}
          </span>
        </div>
      ))}
    </div>
  </div>
);
