import React, { Suspense } from 'react';
import { Box, CircularProgress } from '@mui/material';

const LazyLoad = ({ children, fallback }) => {
  return (
    <Suspense
      fallback={
        fallback || (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              minHeight: '200px',
            }}
          >
            <CircularProgress />
          </Box>
        )
      }
    >
      {children}
    </Suspense>
  );
};

export default LazyLoad; 