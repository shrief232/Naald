import React, { useState, useEffect } from 'react';
import { Drawer, Button, FormControl, InputLabel, Select, MenuItem, Slider } from '@mui/material';
import axios from 'axios';

const DrawerFilter = ({ onFilterChange }) => {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);

  useEffect(() => {
    axios.get('/api/core/categories/')
      .then(response => setCategories(response.data))
      .catch(error => console.log(error));
  }, []);

  const toggleDrawer = (open) => () => {
    setOpen(open);
  };

  const handleCategoryChange = (event) => {
    setSelectedCategory(event.target.value);
    onFilterChange({ category: event.target.value, priceRange });
  };

  const handlePriceChange = (event, newValue) => {
    setPriceRange(newValue);
    onFilterChange({ category: selectedCategory, priceRange: newValue });
  };

  return (
    <>
      <Button onClick={toggleDrawer(true)}>Open Filters</Button>
      <Drawer anchor="right" open={open} onClose={toggleDrawer(false)}>
        <div style={{ width: 250, padding: 20 }}>
          <h3>Filter Options</h3>

          {/* Category Select */}
          <FormControl fullWidth>
            <InputLabel>Category</InputLabel>
            <Select
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              {categories.map((category) => (
                <MenuItem key={category.id} value={category.title}>
                  {category.title}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {/* Price Slider */}
          <Slider
            value={priceRange}
            onChange={handlePriceChange}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            step={50}
          />
        </div>
      </Drawer>
    </>
  );
};

export default DrawerFilter;
