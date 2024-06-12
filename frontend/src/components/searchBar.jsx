import React, { useState, useEffect } from 'react';
import { ApolloProvider, useLazyQuery } from '@apollo/client';
import client from '../apolloClient';
import { GET_BOOKS } from '../queries';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import image1 from '../assets/image1.webp';
import image2 from '../assets/image2.webp';
import image3 from '../assets/image3.webp';
import image4 from '../assets/image4.webp';
import image5 from '../assets/image5.webp';
import image6 from '../assets/image6.webp';
import image7 from '../assets/image7.webp';
import image8 from '../assets/image8.webp';
import image9 from '../assets/image6.webp';
import image10 from '../assets/image10.webp';

import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
  Grid,
  CardMedia
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

function SearchAppBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [book, setBook] = useState(null);
  const [readingList, setReadingList] = useState([]);
  console.log('readingList', readingList)

  const [getBooks, { data, loading, error }] = useLazyQuery(GET_BOOKS);

  console.log('data', data)
  const handleSearch = async () => {
    const response = await getBooks();
    console.log("Response", response)
    console.log('search')
  };

  const handleAddToReadingList = () => {
    if (book) {
      setReadingList([...readingList, book]);
      setBook(null);
      setSearchQuery('');
    }
  };
  const customImages = {

    "/assets/image1.webp": image1,
    "/assets/image2.webp": image2,
    "/assets/image3.webp": image3,
    "/assets/image4.webp": image4,
    "/assets/image5.webp": image5,
    "/assets/image6.webp": image6,
    "/assets/image7.webp": image7,
    "/assets/image8.webp": image8,
    "/assets/image9.webp": image9,
    "/assets/image10.webp": image10,
  }
  console.log('customImages', customImages["/assets/image1.webp"])
  const handleRemoveFromReadingList = (index) => {
    const newReadingList = [...readingList];
    newReadingList.splice(index, 1);
    setReadingList(newReadingList);
  };

  useEffect(() => {
    if (data && data.books) {
      const bookData = data.books.find(b => b.title.toLowerCase().includes(searchQuery.toLowerCase()));
      if (bookData) {
        setBook({
          title: bookData.title,
          author: bookData.author,
          coverId: bookData.coverPhotoURL,
        });
      } else {
        setBook(null);
      }
    } else {
      setBook(null);
    }
  }, [data, searchQuery]);

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
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </Search>
          <Button
            variant="contained"
            onClick={handleSearch}
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
            Search
          </Button>
        </Toolbar>
      </AppBar>
      {book && (
        <Card sx={{ width: '65%', mt: 3 }}>
          <CardContent>
            <Typography variant="h6" color="#335C6E" sx={{ padding: 0.1 }}>
              {book.title}
            </Typography>
            <Typography variant="body2" color="#4AA088" sx={{ padding: 1 }}>
              {book.author}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              variant="contained"
              onClick={handleAddToReadingList}
              sx={{
                width: {
                  xs: '250px',
                  sm: '250px',
                  md: '250px',
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
              Add To Reading List
            </Button>
          </CardActions>
        </Card>
      )}
      {readingList.length > 0 && (
        <Box sx={{ mt: 4, width: '65%' }}>
          <Typography
            variant="h6"
            style={{ color: '#4AA088', fontWeight: 'bold', textAlign: 'center', padding: 15 }}
          >
            Reading List
          </Typography>
          <Grid container spacing={2}>
            {readingList.map((book, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                <Card>
                  {book.coverId && (
                    <CardMedia
                      component="img"
                      sx={{ height: 350, width: '100%' }}
                      image={ customImages[book.coverId]}
                      alt={book.title}
                    />
                  )}
                  <CardContent style={{ textAlign: 'center', fontSize: '16px' }}>
                    <Typography
                      gutterBottom
                      variant="h5"
                      component="div"
                      style={{ color: '#4AA088', fontWeight: 'bold' }}
                    >
                      {book.title}
                    </Typography>
                    <Typography variant="body1" color="textSecondary">
                      {book.author}
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                      {book.description}
                    </Typography>
                  </CardContent>
                  <CardActions style={{ justifyContent: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={() => handleRemoveFromReadingList(index)}
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
                      Remove Book
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

export default function App() {
  return (
    <ApolloProvider client={client}>
      <SearchAppBar />
    </ApolloProvider>
  );
}