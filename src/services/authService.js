import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api';

const authService = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const authApi = {
  // ログイン
  login: async (credentials) => {
    try {
      const response = await authService.post('/auth/login', credentials);
      const { token, username } = response.data;
      
      // トークンをローカルストレージに保存
      localStorage.setItem('token', token);
      localStorage.setItem('username', username);
      
      return response.data;
    } catch (error) {
      console.error('ログインエラー:', error);
      throw error;
    }
  },
  
  // ログアウト
  logout: () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    window.location.href = '/login';
  },
  
  // 現在のユーザー情報を取得
  getCurrentUser: () => {
    const username = localStorage.getItem('username');
    return username || null;
  },
  
  // 認証状態をチェック
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  },
  
  // トークンを取得
  getToken: () => {
    return localStorage.getItem('token');
  },
  
  // パスワードリセットリクエスト
  requestPasswordReset: async (email) => {
    try {
      await authService.post('/auth/reset-password-request', { email });
      return true;
    } catch (error) {
      throw error;
    }
  },
  
  // パスワードリセット
  resetPassword: async (token, newPassword) => {
    try {
      await authService.post('/auth/reset-password', { token, newPassword });
      return true;
    } catch (error) {
      throw error;
    }
  },
  
  // パスワード変更
  changePassword: async (currentPassword, newPassword) => {
    try {
      await authService.post('/auth/change-password', {
        currentPassword,
        newPassword,
      });
      return true;
    } catch (error) {
      throw error;
    }
  },
  
  // プロフィール更新
  updateProfile: async (profileData) => {
    try {
      const response = await authService.put('/auth/profile', profileData);
      const { user } = response.data;
      localStorage.setItem('username', JSON.stringify(user));
      return user;
    } catch (error) {
      throw error;
    }
  },
  
  // アカウント削除
  deleteAccount: async () => {
    try {
      await authService.delete('/auth/account');
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      return true;
    } catch (error) {
      throw error;
    }
  },
}; 