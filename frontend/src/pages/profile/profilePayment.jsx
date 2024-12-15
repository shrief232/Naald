import { Box, Button, Card, Paper, Typography } from '@mui/material'
import React from 'react'
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { Icon } from '@iconify/react';


export default function ProfilePayment() {
  return (
    <Box sx={{ width: "100%", padding: 1 }}>
      <Card sx={{ padding: 2, marginBottom: 3, borderRadius:'15px' }}>
          <Typography variant="h6" gutterBottom>
            Payment Details
          </Typography>
          <Typography variant="body2">
            Card Number: **** **** **** 2365
          </Typography>
          <Box display="flex" alignItems="center" justifyContent='space-around' gap={1} mt={5}>
            <Icon icon="logos:mastercard" width="80" height="50" />
            <Icon icon="logos:visa" width="80" height="50" /> 
          </Box>
          <Box display="flex" alignItems="center" gap={1} mt={1}>
        
          </Box>
        </Card>
        <Card sx={{ padding: 3, borderRadius:'15px' }}>
          <Typography variant="h6" gutterBottom>
            Success Premium Subscription
          </Typography>
          <Typography variant="body2">
            1 month Premium free
          </Typography>
          <Typography variant="body2">
            2 months for a successful start
          </Typography>
          <Button variant="contained" fullWidth sx={{mt:8, borderRadius:'5px'}}>
            Subscribe
          </Button>
        </Card>
    </Box>
  )
}
