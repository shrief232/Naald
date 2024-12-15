import React from 'react';
import { Paper, Box, Typography, Divider, Link } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import RotateLeftIcon from '@mui/icons-material/RotateLeft';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';

const SellerInfo = () => {
  return (
    <Paper elevation={2}  sx={{ p: 2 }}>
      {/* Seller Details */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Typography variant="body2" color="textSecondary">
          Sold by&nbsp;
        </Typography>
        <Link href="#" color="primary" underline="hover">
          W.R INDUSTRY
        </Link>
      </Box>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <StarIcon fontSize="small" sx={{ color: '#ffb400' }} />
        <Typography variant="body2" color="textSecondary">
          &nbsp;3.4&nbsp;&nbsp;|&nbsp;&nbsp;63% Positive Ratings
        </Typography>
      </Box>

      <Divider sx={{ my: 1 }} />

      {/* Additional Information */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box>
          <Typography variant="body2" color="textSecondary">
            Partner Since
          </Typography>
          <Typography variant="subtitle2" color="textPrimary">
            3+ Years
          </Typography>
        </Box>

        <Box>
          <Typography variant="body2" color="textSecondary">
            Item as Described
          </Typography>
          <Typography variant="subtitle2" color="primary">
            70%
          </Typography>
        </Box>
      </Box>

      <Typography variant="caption" color="textSecondary">
        Low Return Seller
      </Typography>

      <Divider sx={{ my: 1 }} />

      {/* Features */}
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <RotateLeftIcon fontSize="small" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          FREE RETURNS
        </Typography>
      </Box>

      <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
        Get free returns on eligible items
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <LocalShippingIcon fontSize="small" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          TRUSTED SHIPPING
        </Typography>
      </Box>

      <Typography variant="caption" color="textSecondary" sx={{ mb: 2, display: 'block' }}>
        Free shipping when you spend EGP 200 and above on express items
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <VerifiedUserIcon fontSize="small" />
        <Typography variant="body2" sx={{ ml: 1 }}>
          SECURE SHOPPING
        </Typography>
      </Box>

      <Typography variant="caption" color="textSecondary" sx={{ mb: 1, display: 'block' }}>
        Your data is always protected
      </Typography>

      <Divider sx={{ my: 2 }} />

      {/* Advertisement */}
      <Box>
        <img
          src="https://via.placeholder.com/150x50"
          alt="Naald discount"
          style={{ width: '100%', marginBottom: '8px' }}
        />
        <Link href="#" underline="hover" color="primary">
          Shop Naald
        </Link>
      </Box>
    </Paper>
  );
};

export default SellerInfo;
