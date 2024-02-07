

import React from 'react';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import SearchIcon from '@mui/icons-material/Search';
import filters from "../../assets/filters.svg"



const SearchBar = () => {
  return (
    <TextField
      variant="outlined"
      placeholder="Pesquisar no drive"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <SearchIcon />
          </InputAdornment>
        ),
        endAdornment: (
            <InputAdornment position="end">
                <button>
                <img src={filters} alt="" />
            </button>
            </InputAdornment>
          ),
        sx: {
          fontWeight: 30,
          borderRadius: 25, 
          height: 50,
          width: 500,
          backgroundColor: 'rgba(255, 255, 255, 0.5)', 
        },
      }}
    />

    
  );
};

export default SearchBar;
