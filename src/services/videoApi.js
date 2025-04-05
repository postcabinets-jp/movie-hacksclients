// モックデータ
const mockVideos = [
  {
    id: '1',
    title: 'React入門',
    description: 'Reactの基本的な使い方を学びます',
    url: 'https://example.com/video1.mp4',
    thumbnail: 'https://example.com/thumbnail1.jpg',
    category: 'プログラミング',
    duration: '30:00',
    views: 1000,
    uploadDate: '2024-01-01',
  },
  {
    id: '2',
    title: 'Material-UI入門',
    description: 'Material-UIの基本的な使い方を学びます',
    url: 'https://example.com/video2.mp4',
    thumbnail: 'https://example.com/thumbnail2.jpg',
    category: 'UI/UX',
    duration: '45:00',
    views: 800,
    uploadDate: '2024-01-15',
  },
];

export const videoApi = {
  // ビデオ一覧を取得
  getVideos: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockVideos);
      }, 500);
    });
  },

  // 特定のビデオを取得
  getVideo: async (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const video = mockVideos.find((v) => v.id === id);
        resolve(video);
      }, 500);
    });
  },

  // ビデオを検索
  searchVideos: async (query) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const results = mockVideos.filter(
          (video) =>
            video.title.toLowerCase().includes(query.toLowerCase()) ||
            video.description.toLowerCase().includes(query.toLowerCase())
        );
        resolve(results);
      }, 500);
    });
  },
}; 