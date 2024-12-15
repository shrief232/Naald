import React, { useState } from 'react';
import { Dialog, DialogContent, Typography, Box, Button } from '@mui/material';
import PropTypes from 'prop-types';
import Logo from '../components/logo/Logo';
import AuthLogin from '../Auth/AuthLogin';
import RegisterPage from './RegisterPage';
import { useThemeToggle } from '../components/hooks-form/ToggleProvider';


const LoginDialog = ({ open, onClose }) => {
  const [isRegisterDialogOpen, setRegisterDialogOpen] = useState(false);
  const { mode} = useThemeToggle();
  

  const handleOpenRegisterDialog = () => {
    setRegisterDialogOpen(true);
    onClose(); 
  };

  const handleCloseRegisterDialog = () => {
    setRegisterDialogOpen(false);
  };

  const handleBackToLogin = () => {
    setRegisterDialogOpen(false);
    onClose(); 
    setTimeout(() => onClose(false), 0);
  };

  return (
    <>
      <Dialog
        open={open}
        onClose={onClose}
        maxWidth="sm"
        fullWidth
        aria-labelledby="login-dialog-title"
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
            <Logo fullwidth sx={{ pb: 2 }} />
            <Typography variant="h4" paragraph color={mode === 'dark' ? "#fff" : "#07100b"} fontWeight="bold">
              Sign in
            </Typography>
            <AuthLogin method="login" />
            <Button
              onClick={handleOpenRegisterDialog}
              variant="text"
              sx={{ mt: 2 }}
            >
              Don't have an account? Sign up
            </Button>
          </Box>
        </DialogContent>
      </Dialog>

      {/* Register Dialog */}
      <RegisterPage
        open={isRegisterDialogOpen}
        onClose={handleCloseRegisterDialog}
        onBackToLogin={handleBackToLogin}
      />
    </>
  );
};

LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default LoginDialog;
