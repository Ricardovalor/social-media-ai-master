import React from "react";
import { SocialStats } from "../../types";

interface StatsGridProps {
  stats: SocialStats;
}

export const StatsGrid: React.FC<StatsGridProps> = ({ stats }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-2xl shadow-xl p-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-blue-100 text-sm font-medium">Seguidores</p>
          <p className="text-3xl font-bold mt-2">{stats.followers.toLocaleString()}</p>
        </div>
        <div className="text-2xl">👥</div>
      </div>
      <div className="mt-4 flex items-center text-blue-100 text-sm">
        <span className="text-green-300">↑ {stats.growth}%</span>
        <span className="ml-2">desde a última semana</span>
      </div>
    </div>

    <div className="bg-gradient-to-br from-green-500 to-green-600 text-white rounded-2xl shadow-xl p-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-green-100 text-sm font-medium">Engajamento</p>
          <p className="text-3xl font-bold mt-2">{stats.engagement}%</p>
        </div>
        <div className="text-2xl">📊</div>
      </div>
      <div className="mt-4 flex items-center text-green-100 text-sm">
        <span className="text-green-300">↑ 4.2%</span>
        <span className="ml-2">acima da média</span>
      </div>
    </div>

    <div className="bg-gradient-to-br from-purple-500 to-purple-600 text-white rounded-2xl shadow-xl p-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-purple-100 text-sm font-medium">Alcance</p>
          <p className="text-3xl font-bold mt-2">{stats.reach.toLocaleString()}</p>
        </div>
        <div className="text-2xl">👀</div>
      </div>
      <div className="mt-4 flex items-center text-purple-100 text-sm">
        <span className="text-green-300">↑ 8%</span>
        <span className="ml-2">crescimento orgânico</span>
      </div>
    </div>

    <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-2xl shadow-xl p-6 fade-in">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-orange-100 text-sm font-medium">Impressões</p>
          <p className="text-3xl font-bold mt-2">{stats.impressions.toLocaleString()}</p>
        </div>
        <div className="text-2xl">🔄</div>
      </div>
      <div className="mt-4 flex items-center text-orange-100 text-sm">
        <span className="text-green-300">↑ 15%</span>
        <span className="ml-2">mais visualizações</span>
      </div>
    </div>
  </div>
);
