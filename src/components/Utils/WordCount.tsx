import React from 'react';
import { Typography,Box } from '@mui/material';

interface WordCountProps {
  count: number;
}

const WordCount: React.FC<WordCountProps> = ({ count }) => {
  return (
    <Box sx={{ 
      width: "1350px",
      marginBottom: "2%",
      borderStyle: "solid",
      borderWidth: "1px",
      padding: "1%"
    }}>

      <Typography >
        {count} words
      </Typography>
    </Box>
  );
};

export default WordCount;
