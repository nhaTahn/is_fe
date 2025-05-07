import React from 'react';
import { Dialog, DialogActions, Button, IconButton, Box, Typography } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { Link } from "react-router-dom"; // For navigation
interface SuccessDialogProps {
  open: boolean;
  onClose: () => void;
  onNavigate: () => void;
}

const SuccessDialog: React.FC<SuccessDialogProps> = ({ open, onClose, onNavigate }) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth sx={{ padding: 3 }}>
      <Box sx={{
        background: "#ffffff",
        borderRadius: "16px",
        borderStyle: "solid",
        borderColor: "rgba(0, 0, 0, 0.1)",
        borderWidth: "1px",
        padding: "32px",
        display: "flex",
        flexDirection: "column",
        gap: "40px",
        alignItems: "center",
        justifyContent: "center",
        position: "relative",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)"
      }}>
        {/* Icon Section */}
        <Box sx={{
          display: "flex",
          flexDirection: "row",
          gap: "24px",
          alignItems: "center",
          justifyContent: "center",
          width: "100%"
        }}>
          {/* Emoji Icon */}
          <Box sx={{
            background: "#ffea9f",
            borderRadius: "60px",
            borderWidth: "2.86px",
            width: "106px",
            height: "106px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            position: "relative"
          }}>
            <Typography sx={{ fontSize: "45px", fontWeight: 600 }}>🎉</Typography>
          </Box>
          
          {/* Message Text */}
          <Box sx={{
            display: "flex",
            flexDirection: "column",
            gap: "20px",
            alignItems: "flex-start",
            justifyContent: "center",
            textAlign: "center"
          }}>
            <Typography sx={{
              color: "#000000",
              fontFamily: "Inter-SemiBold",
              fontSize: "24px",
              fontWeight: 600,
            }}>
              Your answer has been submitted!
            </Typography>
            {/* <Typography sx={{
              color: "#000000",
              fontFamily: "Inter-SemiBold",
              fontSize: "20px",
              fontWeight: 400,
            }}>
              Your score will be notified via email!
            </Typography> */}
          </Box>
        </Box>

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

        {/* Action Button */}
        <DialogActions sx={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          justifyContent: "center",
          width: "100%",
        }}>
          <Button
            variant="contained"
            component={Link}
            to="/history"
            onClick={onNavigate}
            sx={{
              padding: '14px 20px',
              backgroundColor: "#000000",
              borderRadius: "30px",
              fontWeight: 600,
              textTransform: "none",
              color: "#ffffff",
              width: "248px",
              "&:hover": {
                backgroundColor: "#333333"
              }
            }}
          >
            Nice!
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
};

export default SuccessDialog;
