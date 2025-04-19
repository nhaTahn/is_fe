import React, { useState } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EssayDetailDialog from '../../components/EssayDetailDialog'

const DraftsPage: React.FC = () => {
  // Example data for the drafts
  const drafts = [
    {
      title: 'The increase in the production of consumer goods results in damage to the natural environment...',
      id: 1,
      band: 'draft'
    },
    {
      title: 'As well as making money, businesses also have social responsibilities...',
      id: 2,
    },
    // Add more drafts as needed
  ];

  const handleClick = (draft: any) => {
    // Logic to open the essay in detail, similar to viewing/editing
    setSelectedEssay(draft);
    setOpenDetailDialog(true);
  };

  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedEssay, setSelectedEssay] = useState<any>(null);

  // Function to open the dialog with essay details
//   const handleRowClick = (essay: any) => {
//     setSelectedEssay(essay);
//     setOpenDetailDialog(true);
//   };

  // Function to close the dialog
  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '90vh', borderLeftStyle: 'solid', borderTopStyle: 'solid', borderWidth: '2px', padding: 5 }}>
      {/* Main Content */}
      {/* <Box sx={{ flexGrow: 1, padding: '16px' }}> */}
        {/* <Typography variant="h4" sx={{ marginBottom: '24px' }}>Previous Essays</Typography> */}

        {/* Drafts List */}
       {/* Table to display drafts */}
       <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label="drafts table">
            <TableHead>
              <TableRow>
                <TableCell  sx={{ fontSize: "24px", fontWeight: "bold" }}>
                Previous Essays
                </TableCell>
                <TableCell align="center"></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {drafts.map((draft, index) => (
                <TableRow key={index} >
                  <TableCell component="th" scope="row" >{draft.title}</TableCell>
                  <TableCell align="center" sx={{ display: 'flex', justifyContent: 'center', gap: '8px' }}>
                    <Button onClick={() => handleClick(draft)} sx={{ marginRight: '10px', display: 'flex', alignItems: 'center', color: '#000', width: '20px'}}>
                      <VisibilityIcon sx={{ marginRight: '4px', height: '32px', width: '32px' }} />
                    
                    </Button>
                    <Button onClick={() => handleClick(draft)} sx={{ display: 'flex', alignItems: 'center', color: '#000', width: '20px'}}>
                      <EditIcon sx={{ marginRight: '4px' , height: '32px', width: '32px'}} />
                     
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

        <EssayDetailDialog
            open={openDetailDialog}
            onClose={handleCloseDetailDialog}
            essayDetails={selectedEssay}
            onRetake={() => console.log("Retake the essay")} // You can implement your own logic for retake
          />
      </Box>
    // </Box>
  );
};

export default DraftsPage;
