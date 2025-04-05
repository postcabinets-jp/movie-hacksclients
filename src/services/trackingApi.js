export const trackingApi = {
  // 視聴履歴を記録
  trackView: async (videoId, userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`視聴履歴を記録: ビデオID=${videoId}, ユーザーID=${userId}`);
        resolve({ success: true });
      }, 500);
    });
  },

  // 視聴進捗を記録
  trackProgress: async (videoId, userId, progress) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log(`視聴進捗を記録: ビデオID=${videoId}, ユーザーID=${userId}, 進捗=${progress}%`);
        resolve({ success: true });
      }, 500);
    });
  },

  // 視聴履歴を取得
  getViewHistory: async (userId) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            videoId: '1',
            title: 'React入門',
            lastWatched: '2024-04-05T10:00:00',
            progress: 75,
          },
          {
            videoId: '2',
            title: 'Material-UI入門',
            lastWatched: '2024-04-04T15:30:00',
            progress: 100,
          },
        ]);
      }, 500);
    });
  },
}; 