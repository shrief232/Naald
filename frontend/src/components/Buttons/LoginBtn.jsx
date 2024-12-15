import React, { useState } from 'react';
import { IconButton, Typography } from '@mui/material';
import { Icon } from '@iconify/react';
import LoginDialog from '../../Join/LoginPage';

const LoginBtn = () => {
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  return (
    <>
      
      <IconButton color="inherit" onClick={handleOpenDialog}>
          <Icon icon="tdesign:user-filled" width="24" height="24" />
          <Typography>Login</Typography>
      </IconButton>
      
     
      <LoginDialog open={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
};

export default LoginBtn;
