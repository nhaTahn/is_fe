import React from 'react';
import { Dialog, DialogActions, DialogTitle, Button, IconButton, Box, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';

interface ConfirmDialogProps {
  open: boolean;
  onClose: () => void;
  onSubmit: () => void;
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({ open, onClose, onSubmit }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ padding: 3, overflow: 'hidden' }}>
      <Box sx={{
        background: "#ffffff",
        borderRadius: "16px",
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: "1px",
        padding: "24px",
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        maxHeight: '400px', // Set maximum height to avoid overflow
      }}>
        {/* Header Section with Close Button */}
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}>
          {/* Icon */}
          <Box sx={{
            background: "#ffea9f",
            borderRadius: "50%",
            borderWidth: "2px",
            width: "56px",
            height: "56px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Typography sx={{ fontSize: "32px", fontWeight: 600 }}>🤨</Typography>
          </Box>
          
          {/* Text */}
          <Typography sx={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#000000",
            textAlign: "center",
            width: "auto"
          }}>
            Are you sure you want to submit?
          </Typography>
          
          {/* Close Button */}
          <IconButton
            edge="end"
            color="inherit"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 25,
              top: 10,
              height: '15px',
              width: '15px',
              color: "#000"
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>

        {/* Action Buttons */}
        <DialogActions sx={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          justifyContent: "center",
          width: "100%",
        }}>
          {/* Cancel Button */}
          <Button
            variant="outlined"
            onClick={onClose}
            sx={{
              padding: '10px 20px',
              background: "#ffffff",
              borderColor: "#1976d2",
              color: "#1976d2",
              fontWeight: 600,
              textTransform: "none",
              borderRadius: "30px",
              "&:hover": {
                backgroundColor: "#e3f2fd",
                borderColor: "#1565c0"
              }
            }}
          >
            Cancel
          </Button>
          
          {/* Submit Button */}
          <Button
            variant="contained"
            onClick={onSubmit}
            sx={{
              padding: '10px 20px',
              backgroundColor: "#000000",
              borderRadius: "30px",
              fontWeight: 600,
              textTransform: "none",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#333333"
              }
            }}
          >
            Submit
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default ConfirmDialog;
