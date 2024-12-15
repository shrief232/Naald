import React, { useState } from 'react';
import { Box, Typography, Button, Stack, Dialog } from '@mui/material';
import { motion } from 'framer-motion';
import { useThemeToggle } from '../../components/hooks-form/ToggleProvider';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { $isAuthorized } from '../../Atoms/authAtom';
import logoLight from '../../assets/logo/logo_icon.png';
import logoDark from '../../assets/logo/logo_icon_dark.svg';


const WelcomePage = () => {
  const { mode } = useThemeToggle();
  const navigate = useNavigate();
  const [isAuth] = useRecoilState($isAuthorized);
  const [isDialogOpen, setDialogOpen] = useState(false);

  const handleOpenDialog = () => setDialogOpen(true);
  const handleCloseDialog = () => setDialogOpen(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 2 } },
    exit: { opacity: 0, transition: { duration: 1 } },
  };

  const logoVariants = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: { duration: 1.5, ease: 'easeOut' },
    },
  };

  const textVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 1, duration: 1.5, ease: 'easeOut' },
    },
  };

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: mode === 'dark' ? '#000' : '#fff',
        overflow: 'hidden',
      }}
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.img
          src={mode === 'dark' ? logoLight : logoDark}
          alt="Logo"
          variants={logoVariants}
          style={{ width: '850px', height: 'auto' }}
        />

        <motion.div variants={textVariants}>
          <Typography
            variant="h4"
            sx={{
              color: mode === 'dark' ? '#fff' : '#000',
              mt: 3,
              fontFamily: '"Playfair Display", serif',
              textAlign: 'center',
            }}
          >
            Welcome to Naald Artcraft
          </Typography>
        </motion.div>

        <Stack direction="row" spacing={2} justifyContent="center" mt={4}>
          <Button
            variant="contained"
            color="primary"
            onClick={
         
                () => navigate('/main/')
            
              }
            sx={{
              fontFamily: '"Roboto", sans-serif',
              px: 4,
              py: 1,
            }}
          >
           Let’s Go 
          </Button>

          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate('/')}
            sx={{
              fontFamily: '"Roboto", sans-serif',
              px: 4,
              py: 1,
            }}
          >
            Learn More
          </Button>
          
        </Stack>
      </motion.div>

      
      {/* <Dialog open={isDialogOpen} onClose={handleCloseDialog} fullWidth maxWidth="sm">
        <LoginDialog onClose={handleCloseDialog} />
      </Dialog> */}
    </Box>
  );
};

export default WelcomePage;
