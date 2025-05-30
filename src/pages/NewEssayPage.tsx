import React, { useState, useEffect } from 'react';
import { Box, Button, Typography, TextField,Grid } from '@mui/material';
import { AccessTime, Refresh } from '@mui/icons-material'; // For the timer icon
import ConfirmDialog from '../components/ConfirmDialog';
import SuccessDialog from '../components/SuccessDialog';
import Timer from '../components/Utils/Timer';
import '../styles/NewEssay.css';
import EssayInput from '../components/Utils/EssayInput'
import WordCount from '../components/Utils/WordCount'
import { getRandomPrompt } from '../apis/prompt/promptApi';
import SaveDraftDialog from '../components/SaveDraftDialog';
import { PromptDto } from '../dtos/QuestionDto';
import { submitEssay } from '../apis/essay/essayApi';
import { predictBandScore } from '../apis/essay/essayApi';

const EssayPage: React.FC = () => {
  const [time, setTime] = useState(0); // Time in seconds
  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);
  const [saveDraft, setSaveDraft] = useState(false);
  // const [prompt, setPrompt] = useState<string>('');
  const [bandScore, setBand] = useState(0.0);

  const [currentPrompt, setCurrentPrompt] = useState<PromptDto>({
    id: '',
    prompt: ''
  });

  const handleClickOpen = () => {
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false); 
  };

  const handleClickSaveDraft = () => {
    setSaveDraft(true);
  };

  const handleCloseSaveDraft = () => {
    setSaveDraft(false);
  };

  const handleSaveDraft = async () => {
    try {
      const message = await submitEssay({
        content: essay,
        promptId: currentPrompt.id,
        timeTaken: time,
        status: 'draft',
        band: 0.0
      });
      console.log('Draft created:', message);
      // Optionally show a snackbar/toast
    } catch (err) {
      console.error('Error saving draft:', err);
    }
  };
  

  const handleConfirmClose = () => {
    setConfirm(false); 
  };

  const handleSubmit =  async () => {
    try {
      const response = await predictBandScore({
        essay: essay,
        prompt: currentPrompt.prompt
      });

      setBand(response);

      const message = await submitEssay({
        content: essay,
        promptId: currentPrompt.id,
        timeTaken: time,
        status: 'grading',
        band: response
      });

      console.log('Submit success');

      setConfirm(true);
      handleClose();
    } catch (error) {
      console.error('Error  draft:', error);
    }

    console.log(bandScore);
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

  useEffect(() => {
    const fetchPrompt = async () => {
      try {
        const response = await getRandomPrompt();
        setCurrentPrompt(response);
      } catch (error) {
        console.error('Failed to fetch prompt:', error);
        setCurrentPrompt({ id: '', prompt: 'Unable to load prompt.' });
      }
    };
  
    fetchPrompt();
  }, []);

  const handleEssayChange = (value: string) => {
    setEssay(value);
  };

  const handleRefresh = () => {
    setEssay(""); // Reset the essay input
    setTime(0); // Reset the timer
    const fetchPrompt = async () => {
      try {
        const response = await getRandomPrompt();
        setCurrentPrompt(response);
      } catch (error) {
        console.error('Failed to fetch prompt:', error);
        setCurrentPrompt({ id: '', prompt: 'Unable to load prompt.' });
      }
    };
  
    fetchPrompt();
  };

  return (
    <Box sx={{
      display: 'flex', 
      flexDirection: 'row', 
      height: '100%', 
      borderLeftStyle: 'solid', 
      borderTopStyle: 'solid', 
      borderWidth: '2px', 
      maxWidth: '100%'
      }}>
      {/* Main Content */}
      <Box sx={{
        flexGrow: 1,
        padding: '20px',
        backgroundColor: '#fff',
        display: 'flex',
        flexDirection: 'column',
        // alignItems: 'center',
        paddingBottom: '10px',
        maxWidth: '100%'
      }}>
        
        {/* Essay Prompt */}
        <Grid container spacing={5}>
          <Grid size={11}>    
            <Box sx={{
                width: "100%",
                padding: '10px',
                border: "1px solid black",
                borderRadius: 1,
              }}>
              <Typography sx={{ display: "flex", textAlign: 'left', marginBottom: '8px' }}>
                {currentPrompt.prompt}
              </Typography>
            </Box>
          </Grid>
          <Grid size={1}>
            <Refresh sx={{ cursor: "pointer" }} onClick={handleRefresh} />
          </Grid>
        </Grid>

        <Timer time={time} />

        {/* Essay Input Area */}
        <EssayInput essay={essay} onChange={handleEssayChange} />

        {/* Word count */}
        <WordCount count={wordCount} />

        {/* Submit Button */}
        <Box sx={{ alignSelf: 'center', marginTop: '16px' }}>
          <Button 
            className='button-submit-essay' 
            variant="contained" 
            color="success" 
            onClick={handleClickOpen} 
            sx={{ 
              background: "var(--colors-green, #34c759)",
              borderRadius: "100px",
              width: "200px",
              gap: "8px",
              height: "57px"
            }}
          >
            Submit
          </Button>
          <Button 
            className='button-submit-essay' 
            variant="contained" 
            color="warning" 
            onClick={handleClickSaveDraft} 
            sx={{ 
              background: "orange",
              borderRadius: "100px",
              width: "200px",
              gap: "8px",
              height: "57px"
            }}
          >
            Save Draft
          </Button>
        </Box>

      </Box>

      <SaveDraftDialog open={saveDraft} onClose={handleCloseSaveDraft} onSaveDraft={handleSaveDraft} />
      <ConfirmDialog open={open} onClose={handleClose} onSubmit={handleSubmit} />
      <SuccessDialog open={confirm} onClose={handleConfirmClose} onNavigate={handleNavigate} />
    </Box>
  );
};

export default EssayPage;
