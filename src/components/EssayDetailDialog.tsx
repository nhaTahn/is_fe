import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button, Box, Typography, IconButton } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { EssayDto } from '../dtos/EssayDto';

interface EssayDetailDialogProps {
  open: boolean;
  onClose: () => void;
  onRetake: () => void;
  essayDetails: EssayDto;
}

const EssayDetailDialog: React.FC<EssayDetailDialogProps> = ({ open, onClose, onRetake, essayDetails }) => {

  // If essayDetails is null, we return null (don't render the dialog)
  if (!essayDetails) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose} maxWidth="lg" fullWidth sx={{
      borderRadius: '16px',
      boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.2)",
      padding: 0,
      height: 'auto',
      width: "100%",
      // maxHeight: '80vh',
    }}>
      <Box sx={{
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "24px",
        alignItems: "flex-start",
        justifyContent: "flex-start",
        maxHeight: '100%',
        // minHeight: '60vh',
        minWidth: '50'
      }}>

        {/* Close Icon */}
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: '2%',
            top: '2%',
            color: "#000",
            height: '15px',
            width: '15px',
          }}
        >
          <CloseIcon />
        </IconButton>


        {/* Band */}
        <Typography variant="h6" sx={{
          fontWeight: 600,
          color: "#000",
          fontSize: '18px',
        }}>
          Question: {essayDetails.prompt}
        </Typography>

        {/* Essay Paragraphs */}
        <Typography variant="body1" sx={{
          color: "#000",
          fontSize: "20px",
          lineHeight: "1.5",
          opacity: 1,
          textAlign: "justify",
          whiteSpace: "pre-line", // Maintain line breaks
        }}>
          Essay: 
        </Typography>
        <Typography variant="body1" sx={{
          color: "#000",
          fontSize: "16px",
          lineHeight: "1.5",
          opacity: 0.7,
          textAlign: "justify",
          whiteSpace: "pre-line", // Maintain line breaks
        }}>
          {essayDetails.content}
        </Typography>

        {/* Action Buttons */}
        <DialogActions sx={{
          display: "flex",
          justifyContent: "flex-end",
          width: "100%",
          paddingTop: "16px",
          paddingBottom: "16px",
          // paddingRight: "10%"
        }}>
          <Button
            variant="outlined"
            onClick={onRetake}
            sx={{
              width: "15%",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "12px",
              color: "#000000",
              borderColor: "#000000",
              "&:hover": {
                backgroundColor: "#e3f2fd",
                borderColor: "#1565c0"
              }
            }}
          >
            Continue
          </Button>
          <Button
            variant="contained"
            onClick={onClose}
            sx={{
              width: "15%",
              borderRadius: "8px",
              textTransform: "none",
              fontSize: "14px",
              padding: "12px",
              marginRight: "1%",
              fontWeight: "bold",
              backgroundColor: "#000000",
              color: "#fff",
              "&:hover": {
                backgroundColor: "#333333"
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default EssayDetailDialog;
