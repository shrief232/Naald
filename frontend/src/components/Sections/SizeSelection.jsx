import React, { useState } from 'react';
import { ButtonGroup, Button, Typography, Box, Link } from '@mui/material';

const SizeSelection = () => {
  const [selectedSize, setSelectedSize] = useState('M');

  const handleSizeChange = (size) => {
    setSelectedSize(size);
  };

  const sizes = ['M', 'L', 'XL', '2XL', '3XL'];

  return (
    <Box sx={{ mt: 5  }}>
      <Typography variant="body2" color="text.secondary">Size</Typography>
      
      <ButtonGroup variant="outlined" sx={{ mt: 1 }}>
        {sizes.map((size) => (
          <Button
            key={size}
            onClick={() => handleSizeChange(size)}
            variant={selectedSize === size ? 'contained' : 'outlined'}
          >
            {size} cm
          </Button>
        ))}
      </ButtonGroup>
    </Box>
  );
};

export default SizeSelection;
