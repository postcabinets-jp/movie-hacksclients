import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api';

const videoService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// リクエストインターセプター
videoService.interceptors.request.use(
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

export const videoApi = {
  // 動画一覧の取得
  getVideos: async (params = {}) => {
    try {
      const response = await videoService.get('/videos', { params });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 動画の詳細取得
  getVideo: async (id) => {
    try {
      const response = await videoService.get(`/videos/${id}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // お気に入り動画の取得
  getFavoriteVideos: async () => {
    try {
      const response = await videoService.get('/videos/favorites');
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // お気に入りに追加
  addToFavorites: async (videoId) => {
    try {
      const response = await videoService.post(`/videos/${videoId}/favorite`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // お気に入りから削除
  removeFromFavorites: async (videoId) => {
    try {
      const response = await videoService.delete(`/videos/${videoId}/favorite`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 動画の検索
  searchVideos: async (query, filters = {}) => {
    try {
      const response = await videoService.get('/videos/search', {
        params: { query, ...filters },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 動画の視聴開始を記録
  recordViewStart: async (videoId) => {
    try {
      const response = await videoService.post(`/videos/${videoId}/view-start`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 動画の視聴完了を記録
  recordViewComplete: async (videoId) => {
    try {
      const response = await videoService.post(`/videos/${videoId}/view-complete`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 視聴位置の保存
  saveWatchPosition: async (videoId, position) => {
    try {
      const response = await videoService.post(`/videos/${videoId}/position`, {
        position,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
  
  // 視聴位置の取得
  getWatchPosition: async (videoId) => {
    try {
      const response = await videoService.get(`/videos/${videoId}/position`);
      return response.data;
    } catch (error) {
      throw error;
    }
  },
}; 