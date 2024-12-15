import React from 'react';
import { Dialog, DialogContent, Typography, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Logo from '../components/logo/Logo';
import AuthRegister from '../Auth/AuthRegister';

const RegisterPage = ({ open, onClose, onBackToLogin }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      aria-labelledby="register-dialog-title"
    >
      <DialogContent sx={{ textAlign: 'center', bgcolor: 'transparent' }}>
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            padding: '1rem',
          }}
        >
          <Logo fullwidth sx={{ pb: 1 }} />
          <Typography variant="h4" paragraph color="#a28369" fontWeight="bold">
            Sign up
          </Typography>
          <AuthRegister method="register" />
          <Button
            onClick={onBackToLogin}
            variant="text"
            sx={{ mt: 2 }}
          >
            Already have an account? Back to Login
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

RegisterPage.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBackToLogin: PropTypes.func.isRequired, 
};

export default RegisterPage;
