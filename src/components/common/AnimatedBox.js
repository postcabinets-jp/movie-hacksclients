import React from 'react';
import { Box } from '@mui/material';
import { motion } from 'framer-motion';

const AnimatedBox = ({
  children,
  initial = { opacity: 0, y: 20 },
  animate = { opacity: 1, y: 0 },
  exit = { opacity: 0, y: -20 },
  transition = { duration: 0.3 },
  ...props
}) => {
  return (
    <Box
      component={motion.div}
      initial={initial}
      animate={animate}
      exit={exit}
      transition={transition}
      {...props}
    >
      {children}
    </Box>
  );
};

export default AnimatedBox; 