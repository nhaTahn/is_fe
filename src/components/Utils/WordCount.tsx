import React from 'react';
import { Typography,Box } from '@mui/material';

interface WordCountProps {
  count: number;
}

const WordCount: React.FC<WordCountProps> = ({ count }) => {
  console.log(count)
  return (
    <Box sx={{ 
      width: '100%',
      marginBottom: "10px",
      // borderStyle: "solid",
      // borderWidth: "1px",
      // padding: "1%"
    }}>
      <Typography variant="body2" color="textSecondary">
        {count} word{count > 1 && 's'}
      </Typography>
    </Box>
  );
};

export default WordCount;
