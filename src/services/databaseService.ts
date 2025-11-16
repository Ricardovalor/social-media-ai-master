import { openDB, DBSchema, IDBPDatabase } from 'idb';

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
  media?: string[];
  hashtags?: string[];
}

interface AnalyticsData {
  date: string;
  engagement: number;
  reach: number;
  impressions: number;
  clicks: number;
  conversions?: number;
}

interface SocialMediaDB extends DBSchema {
  posts: {
    key: string;
    value: Post;
    indexes: {
      'by-platform': string;
      'by-schedule': Date;
      'by-status': string;
    };
  };
  analytics: {
    key: string;
    value: AnalyticsData;
    indexes: {
      'by-date': string;
    };
  };
  settings: {
    key: string;
    value: {
      id: string;
      data: any;
    };
  };
}

class DatabaseService {
  private db: IDBPDatabase<SocialMediaDB> | null = null;

  async initialize(): Promise<IDBPDatabase<SocialMediaDB>> {
    if (this.db) return this.db;

    this.db = await openDB<SocialMediaDB>('SocialMediaAI', 2, {
      upgrade(db, oldVersion, newVersion, transaction) {
        // Create posts store
        if (!db.objectStoreNames.contains('posts')) {
          const postsStore = db.createObjectStore('posts', { keyPath: 'id' });
          postsStore.createIndex('by-platform', 'platform');
          postsStore.createIndex('by-schedule', 'schedule');
          postsStore.createIndex('by-status', 'status');
        }

        // Create analytics store
        if (!db.objectStoreNames.contains('analytics')) {
          const analyticsStore = db.createObjectStore('analytics', { keyPath: 'date' });
          analyticsStore.createIndex('by-date', 'date');
        }

        // Create settings store
        if (!db.objectStoreNames.contains('settings')) {
          db.createObjectStore('settings', { keyPath: 'id' });
        }
      },
    });

    return this.db;
  }

  // Posts operations
  async savePost(post: Post): Promise<void> {
    const db = await this.initialize();
    await db.put('posts', post);
  }

  async getPosts(): Promise<Post[]> {
    const db = await this.initialize();
    return db.getAll('posts');
  }

  async getPostsByStatus(status: string): Promise<Post[]> {
    const db = await this.initialize();
    return db.getAllFromIndex('posts', 'by-status', status);
  }

  async deletePost(id: string): Promise<void> {
    const db = await this.initialize();
    await db.delete('posts', id);
  }

  // Analytics operations
  async saveAnalytics(data: AnalyticsData): Promise<void> {
    const db = await this.initialize();
    await db.put('analytics', data);
  }

  async getAnalytics(dateRange: { start: string; end: string }): Promise<AnalyticsData[]> {
    const db = await this.initialize();
    const allData = await db.getAll('analytics');
    return allData.filter(
      data => data.date >= dateRange.start && data.date <= dateRange.end
    );
  }

  // Settings operations
  async saveSettings(key: string, data: any): Promise<void> {
    const db = await this.initialize();
    await db.put('settings', { id: key, data });
  }

  async getSettings(key: string): Promise<any> {
    const db = await this.initialize();
    const result = await db.get('settings', key);
    return result?.data;
  }
}

export const databaseService = new DatabaseService();
