'use client';

import { useState, useEffect } from 'react';

export interface Metrics {
  followers: number;
  engagement: number;
  views: number;
  revenue: number;
  likes: number;
  shares: number;
}

export function useMetrics() {
  const [metrics, setMetrics] = useState<Metrics>({
    followers: 12457,
    engagement: 8.7,
    views: 8432,
    revenue: 3245,
    likes: 2156,
    shares: 324
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => ({
        followers: prev.followers + Math.floor(Math.random() * 10),
        engagement: Math.min(20, prev.engagement + (Math.random() * 0.1 - 0.05)),
        views: prev.views + Math.floor(Math.random() * 25),
        revenue: prev.revenue + Math.floor(Math.random() * 5),
        likes: prev.likes + Math.floor(Math.random() * 8),
        shares: prev.shares + Math.floor(Math.random() * 3)
      }));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return metrics;
}
