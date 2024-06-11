import React from 'react';
import Button from '@mui/material/Button';

const SearchButton = () => {
  return (
    <Button
      variant="contained"
      sx={{
        width: {
          xs: '150px',
          sm: '150px',
          md: '150px',
        },
        backgroundColor: '#53C2C2',
        color: 'white',
        borderRadius: '50px',
        padding: '2%',
        margin: '2%',
        textTransform: 'none',
        '&:hover': {
          backgroundColor: '#4AA088',
        },
      }}
    >
      
    </Button>
  );
};

export default SearchButton;
