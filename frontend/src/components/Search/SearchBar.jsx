import * as React from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useState } from 'react';

export default function SearchBar() {
  const [isFocused, setIsFocused] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log('Search query:', searchQuery);
  };

  return (
    <TextField
    value={searchQuery}
    onChange={handleSearchChange}
    onFocus={() => setIsFocused(true)}
    onBlur={() => setIsFocused(false)}
    placeholder="Search..."
    fullWidth
    variant="outlined"
    InputProps={{
      startAdornment: (
        <InputAdornment position="start">
          <IconButton onClick={handleSearchSubmit}>
            <SearchIcon />
          </IconButton>
        </InputAdornment>
      ),
    }}
    sx={{
      height: '100%',
      '& .MuiOutlinedInput-root': {
        height: '100%', 
        borderRadius: '30px', 
      },
    }}
  />
  );
}
