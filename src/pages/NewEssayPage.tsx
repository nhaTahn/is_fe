import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField,Grid } from '@mui/material';
import { AccessTime, Refresh } from '@mui/icons-material'; // For the timer icon
import ConfirmDialog from '../components/ConfirmDialog';
import SuccessDialog from '../components/SuccessDialog';
import Timer from '../components/Utils/Timer';
import '../styles/NewEssay.css';
import EssayInput from '../components/Utils/EssayInput'
import WordCount from '../components/Utils/WordCount'

const EssayPage: React.FC = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  const handleClickOpen = () => {
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false); 
  };

  const handleConfirmClose = () => {
    setConfirm(false); 
  };

  const handleSubmit = () => {
    setConfirm(true);
    handleClose();
  };

  const handleNavigate =() => {

  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => prevTime + 1); // Increment timer by 1 second
    }, 1000);

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  useEffect(() => {
    // Update word count whenever essay content changes
    setWordCount(essay.split(/\s+/).filter(Boolean).length);
  }, [essay]);

  const handleEssayChange = (value: string) => {
    setEssay(value);
  };

  const handleRefresh = () => {
    setEssay(""); // Reset the essay input
    setTime(0); // Reset the timer
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '90vh', borderLeftStyle: 'solid', borderTopStyle: 'solid', borderWidth: '2px' }}>
      {/* Main Content */}
       <Box sx={{ flexGrow: 2, padding: '5%', backgroundColor: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', paddingBottom: '10px' }}>
        
        {/* Essay Prompt */}
        <Grid container spacing={0}>
          <Grid size={11}>    
            <Box className="frame">
              <Typography variant="h6" sx={{ display: "flex", textAlign: 'justify', marginBottom: '16px' }}>
                Some people think that a huge amount of time and money is spent on the protection of wild animals,
                and that this money could be better spent on the human population. To what extent do you agree or disagree
                with this opinion?
              </Typography>
            </Box>
          </Grid>
          <Grid size={1}>
              <Refresh sx={{ marginLeft: "110%", cursor: "pointer",}} onClick={handleRefresh}/>
          </Grid>
        </Grid>

        <Timer time={time} />

        <EssayInput essay={essay} onChange={handleEssayChange} />
        {/* Word count */}
        <WordCount count={wordCount} />

        {/* Submit Button */}
       
        <Button className='button-submit-essay' variant="contained" color="success" onClick={handleClickOpen} sx={{ 
            background: "var(--colors-green, #34c759)",
            borderRadius: "100px",
            width: "250px",
            gap: "8px",
            height: "57px"
           }}>
          Submit
        </Button>
      </Box>
        <ConfirmDialog open={open} onClose={handleClose} onSubmit={handleSubmit} />
        <SuccessDialog open={confirm} onClose={handleConfirmClose} onNavigate={handleNavigate} />
    </Box>
  );
};

export default EssayPage;
