import React, { useState, useEffect } from "react";
import { Box, Button, Typography, FormControl, Select, MenuItem } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";
import { uploadDataset } from "../../apis/train";
import { io } from 'socket.io-client';
import { AI_API_URL } from "../../apis/train";

interface TrainingStatusData {
  status: string;  
}

const TrainPage: React.FC = () => {
  const [model, setModel] = useState<string>("model-v1");
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [status, setStatus] = useState<string>('idle');

  useEffect(() => {
    const socket = io(AI_API_URL, {
      transports: ['websocket'],  // Ensure using WebSocket transport
    });

    // Listen for training_complete events
    socket.on('training_complete', (data: TrainingStatusData) => {
      setStatus(data.status);
    });

    return () => {
      socket.disconnect();  // Clean up on component unmount
    };
  }, []);

  const handleModelChange = (event: any) => {
    setModel(event.target.value as string);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFile(file);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError('No file selected');
      return;
    }

    try {
      // Call the uploadDataset function and wait for the response
      const responseMessage = await uploadDataset(file);
      setMessage(responseMessage);
      setError(null);
    } catch (err: any) {
      setError(err);
      setMessage(null);
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        height: "90vh",
        borderLeft: "solid 2px black",
        borderTop: "solid 2px black",
        backgroundColor: "#fff",
        justifyContent: "center",
        alignItems: "stretch",
        paddingTop: "5%"
      }}
    >
      <Box
        sx={{
          width: "70%",
          maxWidth: "900px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            width: "100%",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "40px",
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <Typography variant="h6" sx={{ fontWeight: 500 }}>
              Choose model:
            </Typography>
            <FormControl sx={{ minWidth: 150, background: "#f4f0ff", borderRadius: "8px" }}>
              <Select
                value={model}
                onChange={handleModelChange}
                displayEmpty
                IconComponent={ModelTrainingIcon}
                sx={{
                  borderRadius: "8px",
                  ".MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&:hover .MuiOutlinedInput-notchedOutline": { border: 0 },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": { border: 0 },
                }}
              >
                <MenuItem value="model-v1">model-v1</MenuItem>
                <MenuItem value="model-v2">model-v2</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* <Button
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              color: "#000",
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Upload dataset
          </Button> */}
          <div>
            {/* Visible file input */}
            <input
              type="file"
              id="file-input"
              onChange={handleFileChange}  // Trigger handleFileChange when a file is selected
            />
            
            {/* Button to trigger the file upload
            {file && (
              <button onClick={handleUpload}>
                Start Training
              </button>
            )} */}

            {/* Display messages */}
            {message && <p style={{ color: 'green' }}>{message}</p>}
            {error && <p style={{ color: 'red' }}>{error}</p>}
          </div>
        </Box>

        
        <Button
          className="button-submit-essay"
          variant="contained"
          color="success"
          sx={{
            background: "var(--colors-green, #34c759)",
            borderRadius: "100px",
            width: "250px",
            gap: "8px",
            height: "57px",
            marginTop: "50%",
          }}
          onClick={handleUpload}  // Trigger the function to upload and train
        >
          Train
        </Button>
        <h3>Training Status: {status}</h3>
        
        {/* {status === 'complete' && <p>Model training is complete!</p>} */}
      </Box>
    </Box>
  );
};

export default TrainPage;
