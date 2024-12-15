import React, { useState } from 'react';
import { ToggleButtonGroup, ToggleButton, Typography, Box } from '@mui/material';

const ColorSelection = () => {
  const [selectedColor, setSelectedColor] = useState('black');

  const handleColorChange = (event, newColor) => {
    if (newColor) {
      setSelectedColor(newColor);
    }
  };

  return (
    <Box sx={{ mt: 5 }}>
      <Typography variant="body2" color="text.secondary">Color</Typography>
      <ToggleButtonGroup
        value={selectedColor}
        exclusive
        onChange={handleColorChange}
        aria-label="color selection"
        sx={{ mt: 1 }}
      >
        <ToggleButton value="black" aria-label="black color">
          Black
        </ToggleButton>
        <ToggleButton value="white" aria-label="white color">
          White
        </ToggleButton>
        <ToggleButton value="blue" aria-label="blue color">
          Blue
        </ToggleButton>
        <ToggleButton value="red" aria-label="red color">
          Red
        </ToggleButton>
      </ToggleButtonGroup>
    </Box>
  );
};

export default ColorSelection;
