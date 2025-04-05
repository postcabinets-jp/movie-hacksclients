import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const trackingService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
trackingService.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const trackingApi = {
  // 視聴イベントの記録
  recordEvent: async (videoId, eventType, data = {}) => {
    try {
      const response = await trackingService.post('/tracking/events', {
        videoId,
        eventType,
        ...data,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 視聴時間の記録
  recordWatchTime: async (videoId, watchTime) => {
    try {
      const response = await trackingService.post('/tracking/watch-time', {
        videoId,
        watchTime,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 視聴進捗の記録
  recordProgress: async (videoId, progress) => {
    try {
      const response = await trackingService.post('/tracking/progress', {
        videoId,
        progress,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 視聴履歴の取得
  getWatchHistory: async (params = {}) => {
    try {
      const response = await trackingService.get('/tracking/history', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 視聴統計の取得
  getWatchStats: async (videoId) => {
    try {
      const response = await trackingService.get(`/tracking/stats/${videoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 学習進捗の取得
  getLearningProgress: async () => {
    try {
      const response = await trackingService.get('/tracking/progress');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 視聴メモの保存
  saveWatchNote: async (videoId, note) => {
    try {
      const response = await trackingService.post('/tracking/notes', {
        videoId,
        note,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 視聴メモの取得
  getWatchNotes: async (videoId) => {
    try {
      const response = await trackingService.get(`/tracking/notes/${videoId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 視聴メモの更新
  updateWatchNote: async (noteId, note) => {
    try {
      const response = await trackingService.put(`/tracking/notes/${noteId}`, {
        note,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 視聴メモの削除
  deleteWatchNote: async (noteId) => {
    try {
      const response = await trackingService.delete(`/tracking/notes/${noteId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}; 