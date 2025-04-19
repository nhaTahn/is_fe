import React from 'react';
import { Box, Typography } from '@mui/material';
import { AccessTime } from '@mui/icons-material'; // Timer icon

interface TimerProps {
  time: number;
}

const Timer: React.FC<TimerProps> = ({ time }) => {
  const formatTime = (timeInSeconds: number) => {
    const hours = String(Math.floor(timeInSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor((timeInSeconds % 3600) / 60)).padStart(2, '0');
    const seconds = String(timeInSeconds % 60).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };

  return (
    <Box sx={{ display: 'flex', alignItems: 'flex-start', marginRight: '90%', marginY: '1%' }}>
      <AccessTime sx={{ marginRight: '5%' }} />
      <Typography variant="body1">{formatTime(time)}</Typography>
    </Box>
  );
};

export default Timer;
