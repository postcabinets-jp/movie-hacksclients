// モックユーザーデータ
const mockUser = {
  id: '1',
  name: 'テストユーザー',
  email: 'test@example.com',
  avatar: 'https://example.com/avatar.jpg',
};

export const authApi = {
  // ログイン
  login: async (email, password) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (email === 'test@example.com' && password === 'password') {
          localStorage.setItem('isAuthenticated', 'true');
          resolve(mockUser);
        } else {
          throw new Error('メールアドレスまたはパスワードが正しくありません');
        }
      }, 500);
    });
  },

  // ログアウト
  logout: () => {
    localStorage.removeItem('isAuthenticated');
  },

  // 認証状態を確認
  isAuthenticated: () => {
    return localStorage.getItem('isAuthenticated') === 'true';
  },

  // 現在のユーザーを取得
  getCurrentUser: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (authApi.isAuthenticated()) {
          resolve(mockUser);
        } else {
          resolve(null);
        }
      }, 500);
    });
  },
}; 