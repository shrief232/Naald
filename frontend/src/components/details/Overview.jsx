import React from 'react';
import { Box, Typography, Divider, Grid, Paper } from '@mui/material';
import Overview from './Overview';

const highlights = [
  'Free shipping on all orders above $50',
  '30-day return policy',
  'Available in multiple colors and sizes',
  '1-year warranty included',
];

const specifications = [
  { key: 'Material', value: '100% Cotton' },
  { key: 'Weight', value: '500g' },
  { key: 'Dimensions', value: '30x20x10 cm' },
  { key: 'Color', value: 'Black, Blue, Red' },
];

const ProductOverview = () => {
  return (
    <Paper sx={{ p: 3,  borderRadius: 2, mt: 3}}>
    <Typography variant="h6" gutterBottom>
      Overview
    </Typography>
        <Divider sx={{ mb: 2 }} />   
    <Box sx={{display:'flex', flexDirection:'row', alignItems:'center', justifyContent:'space-between' }}>
           {/* Highlights Section */}
     <Box>
        <Typography variant="h6" gutterBottom>
            Highlights
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <ul>
            {highlights.map((highlight, index) => (
            <li key={index}>
                <Typography variant="body1">{highlight}</Typography>
            </li>
            ))}
        </ul>
     </Box>

      {/* Specifications Section */}
     <Box>
        <Typography variant="h6" gutterBottom sx={{ mt: 4 }}>
            Specifications
        </Typography>
        <Divider sx={{ mb: 2 }} />
        <Grid container spacing={2}>
            {specifications.map((spec, index) => (
            <Grid item xs={6} key={index}>
                <Typography variant="body2" color="textSecondary">
                {spec.key}:
                </Typography>
                <Typography variant="body1">{spec.value}</Typography>
            </Grid>
            ))}
        </Grid>
     </Box>
    </Box>
    </Paper>
  );
};

export default ProductOverview;
