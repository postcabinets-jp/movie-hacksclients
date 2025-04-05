import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Paper,
  Typography,
  Grid,
  Avatar,
  Button,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Divider,
  IconButton,
  TextField,
  LinearProgress,
  Chip,
} from '@mui/material';
import {
  Edit as EditIcon,
  PlayCircle as PlayCircleIcon,
  Bookmark as BookmarkIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { authApi } from '../../services/authService';
import { videoApi } from '../../services/videoService';

const MyPage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedUser, setEditedUser] = useState({});
  const [recentVideos, setRecentVideos] = useState([]);
  const [favoriteVideos, setFavoriteVideos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentUser = authApi.getCurrentUser();
    setUser(currentUser);
    setEditedUser(currentUser);
    fetchRecentVideos();
    fetchFavoriteVideos();
  }, []);

  const fetchRecentVideos = async () => {
    try {
      const response = await videoApi.getRecentVideos();
      setRecentVideos(response.data);
    } catch (error) {
      console.error('最近視聴した動画の取得エラー:', error);
    }
  };

  const fetchFavoriteVideos = async () => {
    try {
      const response = await videoApi.getFavoriteVideos();
      setFavoriteVideos(response.data);
    } catch (error) {
      console.error('お気に入り動画の取得エラー:', error);
    }
  };

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      // ユーザー情報の更新処理を実装
      setIsEditing(false);
    } catch (error) {
      console.error('更新エラー:', error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditedUser(user);
  };

  const handleChange = (e) => {
    setEditedUser({
      ...editedUser,
      [e.target.name]: e.target.value,
    });
  };

  const handleVideoClick = (videoId) => {
    navigate(`/videos/${videoId}`);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 2 }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                mx: 'auto',
                mb: 2,
                border: '4px solid #2196F3',
              }}
              src={user?.avatarUrl}
            />
            {isEditing ? (
              <>
                <TextField
                  fullWidth
                  label="名前"
                  name="name"
                  value={editedUser.name}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="メールアドレス"
                  name="email"
                  value={editedUser.email}
                  onChange={handleChange}
                  sx={{ mb: 2 }}
                />
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSave}
                    sx={{
                      background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                      boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    }}
                  >
                    保存
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    onClick={handleCancel}
                  >
                    キャンセル
                  </Button>
                </Box>
              </>
            ) : (
              <>
                <Typography variant="h5" gutterBottom>
                  {user?.name}
                </Typography>
                <Typography variant="body1" color="text.secondary" gutterBottom>
                  {user?.email}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={handleEdit}
                  sx={{ mt: 2 }}
                >
                  プロフィールを編集
                </Button>
              </>
            )}
          </Paper>

          <Paper sx={{ p: 3, mt: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>
              学習進捗
            </Typography>
            <Box sx={{ mb: 2 }}>
              <Typography variant="body2" gutterBottom>
                総視聴時間
              </Typography>
              <LinearProgress
                variant="determinate"
                value={75}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" color="text.secondary" align="right">
                75時間 / 100時間
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" gutterBottom>
                コース完了率
              </Typography>
              <LinearProgress
                variant="determinate"
                value={60}
                sx={{ height: 10, borderRadius: 5 }}
              />
              <Typography variant="body2" color="text.secondary" align="right">
                60%
              </Typography>
            </Box>
          </Paper>
        </Grid>

        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Tabs value={tabValue} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="最近視聴" />
              <Tab label="お気に入り" />
              <Tab label="学習履歴" />
            </Tabs>

            {tabValue === 0 && (
              <List>
                {recentVideos.map((video) => (
                  <React.Fragment key={video.id}>
                    <ListItem
                      button
                      onClick={() => handleVideoClick(video.id)}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <PlayCircleIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={video.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {video.category}
                            </Typography>
                            {` — 最終視聴: ${new Date(
                              video.lastWatched
                            ).toLocaleDateString()}`}
                          </>
                        }
                      />
                      <Chip
                        label={`${video.progress}%`}
                        color="primary"
                        size="small"
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}

            {tabValue === 1 && (
              <List>
                {favoriteVideos.map((video) => (
                  <React.Fragment key={video.id}>
                    <ListItem
                      button
                      onClick={() => handleVideoClick(video.id)}
                    >
                      <ListItemAvatar>
                        <Avatar>
                          <BookmarkIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={video.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {video.category}
                            </Typography>
                            {` — 追加日: ${new Date(
                              video.addedDate
                            ).toLocaleDateString()}`}
                          </>
                        }
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}

            {tabValue === 2 && (
              <List>
                {recentVideos.map((video) => (
                  <React.Fragment key={video.id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar>
                          <HistoryIcon />
                        </Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={video.title}
                        secondary={
                          <>
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.primary"
                            >
                              {video.category}
                            </Typography>
                            {` — 視聴時間: ${video.watchTime}分`}
                          </>
                        }
                      />
                      <Chip
                        label={`${video.progress}%`}
                        color="primary"
                        size="small"
                      />
                    </ListItem>
                    <Divider />
                  </React.Fragment>
                ))}
              </List>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default MyPage; 