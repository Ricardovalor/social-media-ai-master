import React, { useState } from 'react';
import { Post } from '../../types';

interface SchedulePostProps {
  onPostScheduled: (post: Post) => void;
}

export const SchedulePost: React.FC<SchedulePostProps> = ({ onPostScheduled }) => {
  const [content, setContent] = useState('');
  const [platform, setPlatform] = useState<'twitter' | 'instagram' | 'linkedin' | 'facebook'>('twitter');
  const [scheduleDate, setScheduleDate] = useState('');
  const [scheduleTime, setScheduleTime] = useState('12:00');

  const handleSchedule = () => {
    if (!content.trim() || !scheduleDate) return;

    const newPost: Post = {
      id: Date.now().toString(),
      content,
      platform,
      schedule: new Date(`${scheduleDate}T${scheduleTime}`),
      status: 'scheduled',
      engagement: { likes: 0, shares: 0, comments: 0, clicks: 0 }
    };

    onPostScheduled(newPost);
    
    // Reset form
    setContent('');
    setScheduleDate('');
    setScheduleTime('12:00');
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 fade-in">
      <h3 className="text-xl font-bold text-gray-900 mb-6">📅 Agendar Post</h3>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">🌐 Plataforma</label>
          <select
            value={platform}
            onChange={(e) => setPlatform(e.target.value as any)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="twitter">Twitter</option>
            <option value="instagram">Instagram</option>
            <option value="linkedin">LinkedIn</option>
            <option value="facebook">Facebook</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">💬 Conteúdo</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Digite o conteúdo do post..."
            rows={4}
            className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">📅 Data</label>
            <input
              type="date"
              value={scheduleDate}
              onChange={(e) => setScheduleDate(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">⏰ Hora</label>
            <input
              type="time"
              value={scheduleTime}
              onChange={(e) => setScheduleTime(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
        </div>

        <button
          onClick={handleSchedule}
          disabled={!content.trim() || !scheduleDate}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-green-700 hover:to-blue-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          📅 Agendar Post
        </button>
      </div>
    </div>
  );
};
