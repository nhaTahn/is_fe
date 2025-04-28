import React, { useState, useEffect } from 'react';
import {
  Box,
  Button,
  Typography,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,    // ← new
} from '@mui/material';
import { AccessTime, Refresh } from '@mui/icons-material';
import ConfirmDialog from '../../components/ConfirmDialog';
import SuccessDialog from '../../components/SuccessDialog';
import Timer from '../../components/Utils/Timer';
import '../../styles/NewEssay.css';
import EssayInput from '../../components/Utils/EssayInput';
import WordCount from '../../components/Utils/WordCount';


const TestModel: React.FC = () => {
  const [time, setTime] = useState(0);
  const [essay, setEssay] = useState('');
  const [wordCount, setWordCount] = useState(0);
  const [open, setOpen] = useState(false);
  const [confirm, setConfirm] = useState(false);

  // ← new: model selection state
  const [model, setModel] = useState<'model-v1' | 'model-v2'>('model-v1');
  const handleModelChange = (e: SelectChangeEvent<'model-v1' | 'model-v2'>) => {
    setModel(e.target.value as 'model-v1' | 'model-v2');
  };

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleConfirmClose = () => setConfirm(false);
  const handleSubmit = () => {
    setConfirm(true);
    handleClose();
  };
  const handleNavigate = () => {};

  const countWords = (text: string): number => {
    const words = text.trim().match(/\b\w+\b/g);
    return words ? words.length : 0;
  };

  useEffect(() => {
    const interval = setInterval(() => setTime(t => t + 1), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setWordCount(countWords(essay));
  }, [essay]);

  
  const handleEssayChange = (value: string) => {
       setEssay(value);
   };

  const handleRefresh = () => {
    setEssay('');
    setTime(0);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        height: '90vh',
        borderLeft: '2px solid #ccc',
        borderTop: '2px solid #ccc',
      }}
    >
      {/* Main Content */}
      <Box
        sx={{
          flexGrow: 2,
          p: '5%',
          backgroundColor: '#fff',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          position: 'relative',         // ← allow inner absolute positioning if needed
        }}
      >
        {/* Prompt & Refresh */}
        <Grid container spacing={0} >
          <Grid size={11}>
            <Box className="frame">
              <Typography
                variant="h6"
                sx={{ textAlign: 'justify', mb: 2 }}
              >
                Some people think that a huge amount of time and money is spent on the protection of wild animals,
                and that this money could be better spent on the human population. To what extent do you agree or disagree?
              </Typography>
            </Box>
          </Grid>
          <Grid size={1}>
            <Refresh
              sx={{ cursor: 'pointer',marginLeft: "110%" }}
              onClick={handleRefresh}
            />
          </Grid>
        </Grid>

        <Timer time={time} />

        <EssayInput essay={essay} onChange={handleEssayChange} />
        <WordCount count={wordCount} />

        {/* ← New: Model dropbox, right-aligned */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'flex-end',
            mb: 2,
          }}
        >
          <FormControl size="small" sx={{ minWidth: 140 }}>
            <InputLabel id="model-select-label">Model</InputLabel>
            <Select
              labelId="model-select-label"
              value={model}
              label="Model"
              onChange={handleModelChange}
            >
              <MenuItem value="model-v1">model-v1</MenuItem>
              <MenuItem value="model-v2">model-v2</MenuItem>
            </Select>
          </FormControl>
        </Box>

        {/* Submit Button */}
        <Button
          className="button-submit-essay"
          variant="contained"
          color="success"
          onClick={handleClickOpen}
          sx={{
            background: 'var(--colors-green, #34c759)',
            borderRadius: '100px',
            width: '250px',
            gap: '8px',
            height: '57px',
          }}
        >
          Submit
        </Button>
      </Box>

      <ConfirmDialog
        open={open}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <SuccessDialog
        open={confirm}
        onClose={handleConfirmClose}
        onNavigate={handleNavigate}
      />
    </Box>
  );
};

export default TestModel;
