import React, { useEffect, useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import {
  Box,
  Paper,
  Typography,
  IconButton,
  Slider,
  Grid,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  VolumeUp as VolumeUpIcon,
  VolumeOff as VolumeOffIcon,
  Fullscreen as FullscreenIcon,
  FullscreenExit as FullscreenExitIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { videoApi, trackingApi } from '../../services';
import screenfull from 'screenfull';

const PROGRESS_SAVE_INTERVAL = 10000; // 10秒ごとに進捗を保存

const VideoPlayer = ({ videoId, videoUrl, title }) => {
  const [playing, setPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [muted, setMuted] = useState(false);
  const [played, setPlayed] = useState(0);
  const [duration, setDuration] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [error, setError] = useState(null);
  const [quality, setQuality] = useState('auto');
  const [settingsAnchorEl, setSettingsAnchorEl] = useState(null);
  const playerRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    // 視聴開始を記録
    const recordStart = async () => {
      try {
        await trackingApi.recordViewStart(videoId);
      } catch (error) {
        console.error('視聴開始の記録に失敗しました:', error);
        setError('視聴記録の保存に失敗しました');
      }
    };

    // 視聴位置を取得
    const fetchWatchPosition = async () => {
      try {
        const position = await videoApi.getWatchPosition(videoId);
        if (position && playerRef.current) {
          playerRef.current.seekTo(position);
        }
      } catch (error) {
        console.error('視聴位置の取得に失敗しました:', error);
        setError('視聴位置の取得に失敗しました');
      }
    };

    recordStart();
    fetchWatchPosition();

    // 定期的に視聴進捗を保存
    const progressInterval = setInterval(() => {
      if (played > 0) {
        videoApi.saveWatchPosition(videoId, played).catch(error => {
          console.error('視聴位置の保存に失敗しました:', error);
          setError('視聴位置の保存に失敗しました');
        });
      }
    }, PROGRESS_SAVE_INTERVAL);

    // フルスクリーン変更イベントのリスナー
    const handleFullscreenChange = () => {
      setIsFullscreen(screenfull.isFullscreen);
    };

    if (screenfull.isEnabled) {
      screenfull.on('change', handleFullscreenChange);
    }

    return () => {
      clearInterval(progressInterval);
      if (screenfull.isEnabled) {
        screenfull.off('change', handleFullscreenChange);
      }
      // 視聴位置を保存
      if (played > 0) {
        videoApi.saveWatchPosition(videoId, played);
      }
    };
  }, [videoId, played]);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleProgress = (state) => {
    if (!seeking) {
      setPlayed(state.played);
    }
  };

  const handleDuration = (duration) => {
    setDuration(duration);
  };

  const handleSeekChange = (event, newValue) => {
    setPlayed(newValue);
  };

  const handleSeekMouseDown = () => {
    setSeeking(true);
  };

  const handleSeekMouseUp = (event, newValue) => {
    setSeeking(false);
    playerRef.current.seekTo(newValue);
  };

  const handleFullscreen = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle(containerRef.current);
    }
  };

  const handleSettingsClick = (event) => {
    setSettingsAnchorEl(event.currentTarget);
  };

  const handleSettingsClose = () => {
    setSettingsAnchorEl(null);
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    handleSettingsClose();
  };

  const handleError = (error) => {
    console.error('動画再生エラー:', error);
    setError('動画の再生中にエラーが発生しました');
  };

  const formatTime = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = date.getUTCMinutes();
    const ss = date.getUTCSeconds();
    if (hh) {
      return `${hh}:${mm.toString().padStart(2, '0')}:${ss.toString().padStart(2, '0')}`;
    }
    return `${mm}:${ss.toString().padStart(2, '0')}`;
  };

  return (
    <Paper elevation={3} sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>

      <Box
        ref={containerRef}
        position="relative"
        paddingTop="56.25%"
        sx={{
          '&:hover .player-controls': {
            opacity: 1,
          },
        }}
      >
        <ReactPlayer
          ref={playerRef}
          url={videoUrl}
          playing={playing}
          volume={volume}
          muted={muted}
          onProgress={handleProgress}
          onDuration={handleDuration}
          width="100%"
          height="100%"
          style={{ position: 'absolute', top: 0, left: 0 }}
          onError={handleError}
          onEnded={() => {
            trackingApi.recordViewComplete(videoId).catch(error => {
              console.error('視聴完了の記録に失敗しました:', error);
              setError('視聴記録の保存に失敗しました');
            });
          }}
          config={{
            file: {
              attributes: {
                controlsList: 'nodownload', // ダウンロードを無効化
              },
              quality: quality,
            },
          }}
        />

        <Box
          className="player-controls"
          sx={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            bgcolor: 'rgba(0, 0, 0, 0.7)',
            p: 1,
            opacity: 0,
            transition: 'opacity 0.3s',
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <IconButton onClick={handlePlayPause} sx={{ color: 'white' }}>
                {playing ? <PauseIcon /> : <PlayIcon />}
              </IconButton>
            </Grid>

            <Grid item xs>
              <Slider
                value={played}
                onChange={handleSeekChange}
                onMouseDown={handleSeekMouseDown}
                onMouseUp={handleSeekMouseUp}
                min={0}
                max={1}
                step={0.01}
                sx={{ color: 'white' }}
              />
            </Grid>

            <Grid item>
              <Typography variant="body2" sx={{ color: 'white' }}>
                {formatTime(duration * played)} / {formatTime(duration)}
              </Typography>
            </Grid>

            <Grid item>
              <IconButton onClick={handleMute} sx={{ color: 'white' }}>
                {muted ? <VolumeOffIcon /> : <VolumeUpIcon />}
              </IconButton>
            </Grid>

            <Grid item>
              <Slider
                value={volume}
                onChange={handleVolumeChange}
                min={0}
                max={1}
                step={0.1}
                sx={{ width: 100, color: 'white' }}
              />
            </Grid>

            <Grid item>
              <IconButton onClick={handleSettingsClick} sx={{ color: 'white' }}>
                <SettingsIcon />
              </IconButton>
            </Grid>

            <Grid item>
              <IconButton onClick={handleFullscreen} sx={{ color: 'white' }}>
                {isFullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
              </IconButton>
            </Grid>
          </Grid>
        </Box>
      </Box>

      <Menu
        anchorEl={settingsAnchorEl}
        open={Boolean(settingsAnchorEl)}
        onClose={handleSettingsClose}
      >
        <MenuItem disabled>画質設定</MenuItem>
        <MenuItem
          selected={quality === 'auto'}
          onClick={() => handleQualityChange('auto')}
        >
          自動
        </MenuItem>
        <MenuItem
          selected={quality === 'high'}
          onClick={() => handleQualityChange('high')}
        >
          高画質
        </MenuItem>
        <MenuItem
          selected={quality === 'medium'}
          onClick={() => handleQualityChange('medium')}
        >
          中画質
        </MenuItem>
        <MenuItem
          selected={quality === 'low'}
          onClick={() => handleQualityChange('low')}
        >
          低画質
        </MenuItem>
      </Menu>

      <Snackbar
        open={Boolean(error)}
        autoHideDuration={6000}
        onClose={() => setError(null)}
      >
        <Alert onClose={() => setError(null)} severity="error">
          {error}
        </Alert>
      </Snackbar>
    </Paper>
  );
};

export default VideoPlayer; 