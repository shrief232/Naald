import React from 'react';
import { IconButton, ListItemIcon, MenuItem, Typography } from '@mui/material';
import {useThemeToggle}  from '../hooks-form/ToggleProvider';
import { LightMode, DarkMode } from '@mui/icons-material'; // Material icons

const ToggleButton = () => {
  const { mode, setMode } = useThemeToggle();

  const handleToggle = () => {
    setMode((prevMode) => (prevMode === 'dark' ? 'light' : 'dark'));
  };

  return (
    <MenuItem onClick={handleToggle}>
      <ListItemIcon >
        <IconButton
          edge="end"
          color="inherit"
          aria-label="toggle theme"
          
        >
          {mode === 'dark' ? <LightMode fontSize='small' sx={{ml:'-6px'}} /> : <DarkMode fontSize='small' sx={{ml:'-6px'}}/>}
          
        </IconButton>
      </ListItemIcon>
    Mood
    </MenuItem>
  );
};

export default ToggleButton;
