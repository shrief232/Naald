import React from 'react';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { motion } from 'framer-motion';
import hero from '../../assets/hero/hero.jpg';
import hero_image from '../../assets/hero/hero_image.png';
import hero2 from '../../assets/hero/hero2.jpg';

const HeroSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md')); 
  const isDarkMode = theme.palette.mode === 'dark'; 

  // Animation Variants
  const backgroundVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.5 } },
  };

  const textVariants = {
    hidden: { x: '-100vw', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', duration: 1.5, delay: 0.5 } },
  };

  const imageVariants = {
    hidden: { x: '100vw', opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { type: 'spring', duration: 1.5, delay: 0.5 } },
  };

  return (
    <motion.div
      variants={backgroundVariants}
      initial="hidden"
      animate="visible"
      style={{
        backgroundImage: `url(${isDarkMode ? hero : hero2})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: isMobile ? '60vh' : '45vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: isMobile ? '16px' : '32px',
        marginTop: '1px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <motion.div
        variants={textVariants}
        initial="hidden"
        animate="visible"
        style={{
          width: isMobile ? '100%' : '50%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '16px',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h1"
          sx={{
            color: isDarkMode ? '#fff' : '#000',
            fontFamily: 'Raleway',
            fontStyle: 'normal',
            fontDisplay: 'swap',
            fontWeight: '500',
            marginBottom: '8px',
            fontSize: isMobile ? '2rem' : '6rem',
          }}
        >
          Handcrafted Creations
        </Typography>
        <Typography
          variant="h6"
          sx={{
            fontSize: isMobile ? '1rem' : '1.5rem',
            color: isDarkMode ? '#fff' : '#000',
          }}
        >
          "Crafted Just for You"
        </Typography>
      </motion.div>

      {!isMobile && (
        <motion.div
          variants={imageVariants}
          initial="hidden"
          animate="visible"
          style={{
            width: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '16px',
          }}
        >
          <img
            src={hero_image}
            alt="Hero"
            style={{
              width: '100%',
              maxWidth: '380px',
              height: 'auto',
              marginTop: '6rem',
              zIndex:'2',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
};

export default HeroSection;
