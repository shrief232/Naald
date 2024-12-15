import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, Grid, Paper, Typography } from '@mui/material';
import axios from 'axios';
import api from '../../api';

const MapPreview = ({ latitude, longitude }) => {
    const [mapUrl, setMapUrl] = useState(null); 


    useEffect(() => {
      
        // Fetch map data
        api.get('/api/map/')
          .then(response => {
            setMapUrl(response.data.map_url);
          })
          .catch(error => {
            console.error('Failed to fetch map:', error);
          });
      }, []);
    



  return (
   
   <Paper>
      <Grid item xs={12} sm={8}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Location
            </Typography>
            {mapUrl ? (
              <img src={mapUrl} alt="User Location Map" style={{ width: '100%', height: 'auto' }} />
            ) : (
              <Typography>Loading map...</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>

      </Paper>  
  );
};

export default MapPreview;
