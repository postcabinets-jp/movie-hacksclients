import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';

const ResponsiveContainer = ({ children, maxWidth = 'lg', ...props }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        width: '100%',
        maxWidth: {
          xs: '100%',
          sm: '600px',
          md: '960px',
          lg: '1280px',
          xl: '1920px',
        }[maxWidth],
        mx: 'auto',
        px: isMobile ? 2 : isTablet ? 3 : 4,
        ...props.sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default ResponsiveContainer; 