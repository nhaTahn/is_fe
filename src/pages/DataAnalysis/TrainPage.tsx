import React, { useState } from "react";
import { Box, Button, Typography, FormControl, Select, MenuItem } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ModelTrainingIcon from "@mui/icons-material/ModelTraining";

const TrainPage: React.FC = () => {
  const [model, setModel] = useState<string>("model-v1");

  const handleModelChange = (event: any) => {
    setModel(event.target.value as string);
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

          <Button
            variant="text"
            startIcon={<AddCircleOutlineIcon />}
            sx={{
              color: "#000",
              textTransform: "none",
              fontSize: "16px",
            }}
          >
            Upload dataset
          </Button>
        </Box>

        <Button className='button-submit-essay' variant="contained" color="success"  sx={{ 
            background: "var(--colors-green, #34c759)",
            borderRadius: "100px",
            width: "250px",
            gap: "8px",
            height: "57px",
            marginTop: "50%"
           }}>
          Train
        </Button>
      </Box>
    </Box>
  );
};

export default TrainPage;
