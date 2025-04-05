import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Button,
  IconButton,
  Chip,
  LinearProgress,
  Divider,
} from '@mui/material';
import {
  Bookmark as BookmarkIcon,
  BookmarkBorder as BookmarkBorderIcon,
  ThumbUp as ThumbUpIcon,
} from '@mui/icons-material';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';

const VideoPage = () => {
  const { id } = useParams();
  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isFavorite, setIsFavorite] = useState(false);
  const [progress, setProgress] = useState(0);

  const fetchVideo = async () => {
    try {
      // モックデータを使用
      const mockVideo = {
        id: parseInt(id),
        title: id === '1' ? 'React入門' : 'UIデザインの基礎',
        description: id === '1' ? 'Reactの基礎を学ぶ' : 'UIデザインの基本原則',
        url: 'https://www.example.com/sample.mp4', // ダミーURL
        thumbnail: `https://placehold.co/600x400/${id === '1' ? '2196F3' : '4CAF50'}/white?text=${id === '1' ? 'React' : 'UI+Design'}`,
        duration: 3600,
        category: id === '1' ? 'プログラミング' : 'デザイン',
        tags: id === '1' ? ['JavaScript', 'React'] : ['デザイン', 'UI/UX'],
        instructor: 'サンプル講師',
        lastPosition: id === '1' ? 2700 : 1080,
      };
      setVideo(mockVideo);
      setProgress(id === '1' ? 75 : 30);
    } catch (error) {
      console.error('動画データの取得に失敗しました:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      // モックデータを使用
      setIsFavorite(id === '1');
    } catch (error) {
      console.error('お気に入り状態の取得に失敗しました:', error);
    }
  };

  useEffect(() => {
    fetchVideo();
    checkFavoriteStatus();
  }, [id]);

  const handleFavoriteToggle = async () => {
    try {
      setIsFavorite(!isFavorite);
      // APIコール（実装時に追加）
    } catch (error) {
      console.error('お気に入り操作に失敗しました:', error);
    }
  };

  const handleProgressUpdate = (newProgress) => {
    setProgress(newProgress);
    // APIコール（実装時に追加）
  };

  if (loading) {
    return <LinearProgress />;
  }

  if (!video) {
    return (
      <Typography variant="h6" color="error">
        動画が見つかりません
      </Typography>
    );
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 2, mb: 2 }}>
            <Typography variant="h5" gutterBottom>
              {video.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Chip label={video.category} sx={{ mr: 1 }} />
              {video.tags.map((tag) => (
                <Chip key={tag} label={tag} variant="outlined" sx={{ mr: 1 }} />
              ))}
              <Box sx={{ flexGrow: 1 }} />
              <IconButton onClick={handleFavoriteToggle} color="primary">
                {isFavorite ? <BookmarkIcon /> : <BookmarkBorderIcon />}
              </IconButton>
              <IconButton color="primary">
                <ThumbUpIcon />
              </IconButton>
            </Box>
            <VideoPlayer
              videoId={video.id}
              videoUrl={video.url}
              title={video.title}
              startPosition={video.lastPosition}
              onProgress={handleProgressUpdate}
            />
          </Paper>
        </Grid>
        <Grid item xs={12}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              講座の進捗
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <LinearProgress
                variant="determinate"
                value={progress}
                sx={{ flexGrow: 1, mr: 2 }}
              />
              <Typography variant="body2" color="text.secondary">
                {progress}%
              </Typography>
            </Box>
            <Divider sx={{ my: 2 }} />
            <Typography variant="h6" gutterBottom>
              講座の説明
            </Typography>
            <Typography variant="body1" paragraph>
              {video.description}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              講師: {video.instructor}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default VideoPage; 