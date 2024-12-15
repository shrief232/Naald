import React, { useState, useEffect } from 'react';
import { IconButton, Tooltip } from '@mui/material';
import { Icon } from '@iconify/react';

const ScrollToTopButton = () => {
  const [visible, setVisible] = useState(false);

  const handleScroll = () => {
    if (window.scrollY > 300) { // Adjust the threshold as needed
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <Tooltip title="Scroll to top">
      <IconButton
        onClick={handleClick}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          backgroundColor: 'gray',
          color: 'white',
          '&:hover': {
            backgroundColor: 'primary.dark',
          },
          display: visible ? 'inline-flex' : 'none', // Show or hide based on visibility
        }}
      >
        <Icon icon='solar:alt-arrow-up-line-duotone'/>
      </IconButton>
    </Tooltip>
  );
};

export default ScrollToTopButton;
