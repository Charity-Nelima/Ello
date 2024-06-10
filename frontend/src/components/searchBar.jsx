import React, { useState } from 'react';
import axios from 'axios';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
  Grid,
} from '@mui/material';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(1, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  color: '#CFFAFA',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    [theme.breakpoints.up('sm')]: {
      width: '25ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

export default function SearchAppBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [book, setBook] = useState(null);
  const [readingList, setReadingList] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}`);
      if (response.data.docs && response.data.docs.length > 0) {
        const bookData = response.data.docs[0];
        const coverId = bookData.cover_i ? `https://covers.openlibrary.org/b/id/${bookData.cover_i}-L.jpg` : 'https://via.placeholder.com/150';
        setBook({
          title: bookData.title,
          author: bookData.author_name ? bookData.author_name.join(', ') : 'Unknown Author',
          description: bookData.first_sentence ? bookData.first_sentence : 'No description available.',
          image: coverId,
        });
      } else {
        setBook(null);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleAddToReadingList = () => {
    if (book) {
      setReadingList([...readingList, book]);
      setBook(null);
      setSearchQuery('');
    }
  };

  const handleRemoveFromReadingList = (index) => {
    const newReadingList = [...readingList];
    newReadingList.splice(index, 1);
    setReadingList(newReadingList);
  };

  return (
    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <AppBar
        position="static"
        sx={{
          width: {
            xs: '90%',
            sm: '90%',
            md: '65%',
          },
          backgroundColor: '#335C6E',
          margin: '1% auto',
          padding: '2%',
          borderRadius: '10px',
        }}
      >
        <Toolbar>
          <Search sx={{ width: '100%', padding: '0.8%' }}>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search title of the book…"
              inputProps={{ 'aria-label': 'search' }}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => { if (e.key === 'Enter') handleSearch(); }}
            />
          </Search>
          <Button
            variant="contained"
            color="secondary"
            onClick={handleSearch}
            sx={{ marginLeft: '10px', padding: '6px 16px' }}
          >
            Search
          </Button>
        </Toolbar>
      </AppBar>
      {book && (
        <Card sx={{ width: '65%', mt: 3 }}>
          <CardMedia
            component="img"
            height="140"
            image={book.image}
            alt={book.title}
          />
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {book.author}
            </Typography>
            <Typography variant="body2" color="textSecondary">
              {book.description}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              color="primary"
              onClick={handleAddToReadingList}
              sx={{ margin: '0 auto' }}
            >
              Add to Reading List
            </Button>
          </CardActions>
        </Card>
      )}
      {readingList.length > 0 && (
        <Box sx={{ mt: 4, width: '65%' }}>
          <Typography variant="h6">Reading List</Typography>
          <Grid container spacing={2}>
            {readingList.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card>
                  <CardMedia
                    component="img"
                    height="140"
                    image={book.image}
                    alt={book.title}
                  />
                  <CardContent>
                    <Typography variant="h6">{book.title}</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {book.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {book.description}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button
                      variant="contained"
                      color="secondary"
                      onClick={() => handleRemoveFromReadingList(index)}
                      sx={{ margin: '0 auto' }}
                    >
                      Remove
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>
      )}
    </Box>
  );
}
