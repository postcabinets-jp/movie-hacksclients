import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
} from '@mui/material';
import {
  PlayArrow as PlayArrowIcon,
  CheckCircle as CheckCircleIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // モックデータを使用
    const mockHistory = [
      {
        id: 1,
        videoId: 1,
        title: 'React入門',
        category: 'プログラミング',
        watchTime: 2700,
        totalTime: 3600,
        progress: 75,
        completed: false,
        lastWatched: '2024-04-06T13:50:00Z'
      },
      {
        id: 2,
        videoId: 2,
        title: 'UIデザインの基礎',
        category: 'デザイン',
        watchTime: 1080,
        totalTime: 3600,
        progress: 30,
        completed: false,
        lastWatched: '2024-04-06T14:30:00Z'
      }
    ];

    setHistory(mockHistory);
    setLoading(false);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;

    return [
      hours > 0 ? hours : null,
      minutes.toString().padStart(2, '0'),
      remainingSeconds.toString().padStart(2, '0')
    ].filter(Boolean).join(':');
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('ja-JP', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        視聴履歴
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>タイトル</TableCell>
              <TableCell>カテゴリー</TableCell>
              <TableCell>視聴時間</TableCell>
              <TableCell>進捗</TableCell>
              <TableCell>最終視聴日時</TableCell>
              <TableCell>アクション</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {history.map((record) => (
              <TableRow key={record.id}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    {record.title}
                    {record.completed && (
                      <Tooltip title="完了">
                        <CheckCircleIcon color="success" sx={{ ml: 1 }} />
                      </Tooltip>
                    )}
                  </Box>
                </TableCell>
                <TableCell>
                  <Chip label={record.category} size="small" />
                </TableCell>
                <TableCell>
                  {formatTime(record.watchTime)} / {formatTime(record.totalTime)}
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LinearProgress
                      variant="determinate"
                      value={record.progress}
                      sx={{ width: 100, mr: 1 }}
                    />
                    <Typography variant="body2" color="text.secondary">
                      {record.progress}%
                    </Typography>
                  </Box>
                </TableCell>
                <TableCell>{formatDate(record.lastWatched)}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/video/${record.videoId}`)}
                  >
                    <PlayArrowIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default History; 