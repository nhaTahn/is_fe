import React, { useState, useEffect } from 'react';
import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EssayDetailDialog from '../../components/EssayDetailDialog'
import { EssayDto } from '../../dtos/EssayDto';
import { getEssayDrafts } from '../../apis/essay/essayApi';

const DraftsPage: React.FC = () => {
  // Example data for the drafts
  // const drafts = [
  //   {
  //     title: 'The increase in the production of consumer goods results in damage to the natural environment...',
  //     id: 1,
  //     band: 'draft'
  //   },
  //   {
  //     title: 'As well as making money, businesses also have social responsibilities...',
  //     id: 2,
  //   },

  // ];

  const [drafts, setDrafts] = useState<EssayDto[]>([]);
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedEssay, setSelectedEssay] = useState<EssayDto>({
        id: '',
        promptId: '',
        prompt: '',
        content: '',
        band: 0,
        timeTaken: 0,
        updatedAt: '',
        status: ''
  });
  

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const data = await getEssayDrafts();
        setDrafts(data);
      } catch (err: any) {
        console.error('Error fetching drafts:', err);
        // setError('Failed to load drafts.');
      }
    };

    fetchDrafts();
  }, []);

  const handleClick = (draft: EssayDto) => {
    // Logic to open the essay in detail, similar to viewing/editing
    setSelectedEssay(draft);
    setOpenDetailDialog(true);
  };



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
                <TableRow key={index}>
                  <TableCell component="th" scope="row">
                    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="bold"
                        noWrap
                        sx={{ maxWidth: 1000 }}
                      >
                        {draft.prompt}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        noWrap
                        sx={{ maxWidth: 1000 }}
                      >
                        {draft.content}
                      </Typography>
                    </Box>
                  </TableCell>

                  <TableCell align="center" sx={{ display: 'flex', justifyContent: 'right', gap: '8px' }}>
                    {/* <Button onClick={() => handleClick(draft)} sx={{ color: '#000', maxWidth: '50px', padding: 0 }}>
                      <VisibilityIcon sx={{ height: '50px', width: '32px' }} />
                    </Button> */}
                    <Button onClick={() => handleClick(draft)} sx={{ color: '#000', maxWidth: '50px', padding: 0 }}>
                      <EditIcon sx={{ height: '50px', width: '32px' }} />
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
