import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Button,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { PlayArrow as PlayArrowIcon } from '@mui/icons-material';

const CurrentCourses = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // モックデータを使用
    const mockCourses = [
      {
        id: 1,
        title: 'React入門',
        description: 'Reactの基礎を学ぶ',
        thumbnail: 'https://placehold.co/600x400/2196F3/white?text=React',
        progress: 75,
        totalVideos: 10,
        completedVideos: 7,
        category: 'プログラミング',
        lastWatched: '2024-04-06T13:50:00Z'
      },
      {
        id: 2,
        title: 'UIデザインの基礎',
        description: 'UIデザインの基本原則',
        thumbnail: 'https://placehold.co/600x400/4CAF50/white?text=UI+Design',
        progress: 30,
        totalVideos: 8,
        completedVideos: 2,
        category: 'デザイン',
        lastWatched: '2024-04-06T14:30:00Z'
      }
    ];

    setCourses(mockCourses);
    setLoading(false);
  }, []);

  if (loading) {
    return <LinearProgress />;
  }

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        受講中の講座
      </Typography>
      <Grid container spacing={3}>
        {courses.map((course) => (
          <Grid item xs={12} sm={6} md={4} key={course.id}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={course.thumbnail}
                alt={course.title}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {course.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {course.description}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Chip
                    label={course.category}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {course.completedVideos}/{course.totalVideos} 完了
                  </Typography>
                </Box>
                <LinearProgress
                  variant="determinate"
                  value={course.progress}
                  sx={{ mb: 2 }}
                />
                <Button
                  variant="contained"
                  startIcon={<PlayArrowIcon />}
                  fullWidth
                  onClick={() => navigate(`/video/${course.id}`)}
                >
                  続きから視聴
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CurrentCourses; 