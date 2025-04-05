import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';
import Layout from './components/Layout/Layout';
import Login from './containers/Login/Login';
import Search from './containers/Search/Search';
import VideoPage from './containers/VideoPage/VideoPage';
import MyPage from './containers/MyPage/MyPage';
import CurrentCourses from './containers/CurrentCourses/CurrentCourses';
import History from './containers/History/History';

const PrivateRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('token');
  return isAuthenticated ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          <Route index element={<CurrentCourses />} />
          <Route path="search" element={<Search />} />
          <Route path="current-courses" element={<CurrentCourses />} />
          <Route path="video/:id" element={<VideoPage />} />
          <Route path="mypage" element={<MyPage />} />
          <Route path="history" element={<History />} />
          <Route path="recent" element={<History />} />
          <Route path="favorites" element={<History />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
};

export default App; 