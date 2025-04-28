import React, { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Grid,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// … your visitorData and topTopicData here …
// Data for different months (Sample Data)
const visitorData = {
  March: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        label: 'Visitors Analytics - March 2025',
        data: [250, 300, 200, 400, 350, 380, 410, 300, 250, 280, 290, 320],
        backgroundColor: '#3b82f6', // Blue color
      },
    ],
  },
  April: {
    labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
    datasets: [
      {
        label: 'Visitors Analytics - April 2025',
        data: [270, 310, 220, 420, 360, 390, 420, 310, 260, 290, 300, 330],
        backgroundColor: '#34c759', // Green color
      },
    ],
  },
  // Add more months here
};


// Sample data for the Topic Grading chart
const topTopicData = {
  labels: ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4'],
  datasets: [
    {
      data: [15, 30, 10, 25], // Example submission count
    },
  ],
};
const Dashboard: React.FC = () => {
  const [plot, setPlot] = useState<'visitors' | 'topic'>('visitors');
  const [selectedMonth, setSelectedMonth] = useState<'March' | 'April'>('March');

  const handlePlotChange = (e: SelectChangeEvent) => setPlot(e.target.value as any);
  const handleMonthChange = (e: SelectChangeEvent) => setSelectedMonth(e.target.value as any);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        // p: 4,
        backgroundColor: '#f0f2f5',
        borderLeft: '2px solid #ccc',
        borderTop: '2px solid #ccc',
        height: '90vh',
      }}
    >
      <Card sx={{ width: '100%', boxShadow: 1, borderRadius: 2 }}>
        <CardHeader
          title={
            <Typography variant="h4" sx={{ fontWeight: 500 }}>
              Dashboard
            </Typography>
          }
          action={
            <Box sx={{ display: 'flex', gap: 2 }}>
              <FormControl size="small" sx={{ minWidth: 500 }}>
                <Select value={plot} onChange={handlePlotChange}>
                  <MenuItem value="visitors">Visitors Analytics</MenuItem>
                  <MenuItem value="topic">Topic grading</MenuItem>
                </Select>
              </FormControl>
              {plot === 'visitors' && (
                <FormControl size="small" sx={{ minWidth: 120 }}>
                  <InputLabel>Month</InputLabel>
                  <Select value={selectedMonth} label="Month" onChange={handleMonthChange}>
                    <MenuItem value="March">March 2025</MenuItem>
                    <MenuItem value="April">April 2025</MenuItem>
                  </Select>
                </FormControl>
              )}
            </Box>
          }
          sx={{
            backgroundColor: '#f5f5f5',
            borderBottom: '1px solid #ddd',
            '& .MuiCardHeader-action': { alignSelf: 'center', mr: 2 },
          }}
        />

        <CardContent sx={{ p: 3 }}>
          {plot === 'visitors' ? (
            <Bar
              data={visitorData[selectedMonth]}
              options={{
                responsive: true,
                plugins: { title: { display: false } },
                scales: { y: { beginAtZero: true, ticks: { stepSize: 100 } } },
              }}
            />
          ) : (
            <>
              {/* Header row */}
              <Grid container spacing={2} sx={{ mb: 1, pl: 1 }}>
                {['Topic', 'Submitted', 'Avg. Band', 'Avg. Time'].map((h) => (
                  <Grid size={3} key={h}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                      {h}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              {/* Data rows */}
              <Box sx={{ bgcolor: '#fff', borderRadius: 1 }}>
                {topTopicData.labels.map((topic, i) => (
                  <Grid
                    container
                    spacing={2}
                    key={topic}
                    sx={{
                      alignItems: 'center',
                      py: 1.5,
                      px: 1,
                      '&:nth-of-type(odd)': { backgroundColor: '#fafafa' },
                    }}
                  >
                    <Grid size={3}>
                      <Typography>{topic}</Typography>
                    </Grid>
                    <Grid size={3}>
                      <Typography>{topTopicData.datasets[0].data[i]}</Typography>
                    </Grid>
                    <Grid size={3}>
                      <Typography>{(8 + i * 0.5).toFixed(1)}</Typography>
                    </Grid>
                    <Grid size={3}>
                      <Typography>{(12 + i).toFixed(1)}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Dashboard;
