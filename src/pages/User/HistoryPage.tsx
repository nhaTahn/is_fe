import React, { useState, useEffect} from 'react';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import EssayDetailDialog from '../../components/EssayDetailDialog'
import { getEssayHistory } from '../../apis/essay/essayApi';
import { EssayDto } from '../../dtos/EssayDto';

function formatDateTime(isoString: string): string {
  const date = new Date(isoString);

  // Get hours and minutes, convert to local time if needed
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  // Get day, month (0-based), year
  const day = date.getDate();
  const month = date.getMonth() + 1; // months are zero-indexed
  const year = date.getFullYear();

  return `${hours}:${minutes} - ${day}/${month}/${year}`;
}

function formatSecondsToMMSS(totalSeconds: number): string {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  // Pad with leading zeros if needed
  const mm = minutes.toString().padStart(2, '0');
  const ss = seconds.toString().padStart(2, '0');

  return `${mm}:${ss}`;
}


const HistoryPage: React.FC = () => {
  // Example data for the essays
  const [histories, setHistories] = useState<EssayDto[]>([])

  const essays = [
    {
      title: 'The increase in the production of consumer goods results in damage to the natural environment...',
      band: '5.5',
      time: '42:44',
      date: '11:00 - 26/3/2025',
      paragraph1: 'Interviews form the basic criteria for most large companies...',
      paragraph2: 'It is believed by some experts that the traditional approach..., It is believed by some experts that the traditional approach...,It is believed by some experts that the traditional approach...,It is believed by some experts that the traditional approach...,It is believed by some experts that the traditional approach...It is believed by some experts that the traditional approach...It is believed by some experts that the traditional approach...It is believed by some experts that the traditional approach...It is believed by some experts that the traditional approach...It is believed by some experts that the traditional approach...It is believed by some experts that the traditional approach...It is believed by some experts that the traditional approach...',
    },
    {
      title: 'As well as making money, businesses also have social responsibilities...',
      band: '6.5',
      time: '45:17',
      date: '07:23 - 25/3/2025',
      paragraph1: 'The increase in the production of consumer goods results in damage...',
      paragraph2: 'The rise in the demand for consumer goods...',
    },
    {
      title: 'As well as making money, businesses also have social responsibilities...',
      band: '6.5',
      time: '45:17',
      date: '07:23 - 25/3/2025',
      paragraph1: 'The increase in the production of consumer goods results in damage...',
      paragraph2: 'The rise in the demand for consumer goods...',
    },
    {
      title: 'As well as making money, businesses also have social responsibilities...',
      band: '10.5',
      time: '45:17',
      date: '07:23 - 25/3/2025',
      paragraph1: 'The increase in the production of consumer goods results in damage...',
      paragraph2: 'The rise in the demand for consumer goods...',
    },
    // Add more essays as needed
  ];
  
  const [openDetailDialog, setOpenDetailDialog] = useState(false);
  const [selectedEssay, setSelectedEssay] = useState<any>(null);

  useEffect(() => {
    const fetchDrafts = async () => {
      try {
        const data = await getEssayHistory();
        setHistories(data);
      } catch (err: any) {
        console.error('Error fetching drafts:', err);
        // setError('Failed to load drafts.');
      }
    };

    fetchDrafts();
  }, []);

  // Function to open the dialog with essay details
  const handleRowClick = (essay: any) => {
    setSelectedEssay(essay);
    setOpenDetailDialog(true);
  };

  // Function to close the dialog
  const handleCloseDetailDialog = () => {
    setOpenDetailDialog(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'row', height: '90vh', borderLeftStyle: 'solid', borderTopStyle: 'solid', borderWidth: '2px', padding: 5 }}>
      {/* Sidebar & Header */}

        {/* Main Content */}
            {/* Table to display previous essays */}
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 800 }} aria-label="previous essays table">
              <TableHead >
                <TableRow>
                  <TableCell sx={{ fontSize: '24px', fontWeight: 'bold' }}>Previous Essays</TableCell>
                  <TableCell align="right" sx={{ fontSize: '24px', fontWeight: 'bold' }}>Band</TableCell>
                  <TableCell align="right" sx={{ fontSize: '24px', fontWeight: 'bold' }}>Time</TableCell>
                  <TableCell align="right" sx={{ fontSize: '24px', fontWeight: 'bold' }}>Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {histories.map((essay, index) => (
                 <TableRow key={index}   onClick={() => handleRowClick(essay)}  sx={{ backgroundColor: index % 2 === 0 ? '#f4f4f4' : '#ffffff' }}>
                 <TableCell component="th" scope="row" sx={{ fontSize: '16px' }}>
                   {essay.prompt}
                 </TableCell>
                 <TableCell align="right" sx={{ fontSize: '16px' }}>
                   {essay.band}
                 </TableCell>
                 <TableCell align="right" sx={{ fontSize: '16px' }}>
                   {formatSecondsToMMSS(essay.timeTaken)}
                 </TableCell>
                 <TableCell align="right" sx={{ fontSize: '16px' }}>
                   {formatDateTime(essay.updatedAt)}
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
  );
};

export default HistoryPage;
