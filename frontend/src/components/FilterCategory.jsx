import React, { useState } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  TextField,
  Typography
} from '@mui/material';

const Filter = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [book, setBook] = useState(null);
  const [readingList, setReadingList] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://openlibrary.org/search.json?q=${searchQuery}`);
      if (response.data.docs && response.data.docs.length > 0) {
        const bookData = response.data.docs[0];
        setBook({
          title: bookData.title,
          author: bookData.author_name ? bookData.author_name.join(', ') : 'Unknown Author'
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

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: 3 }}>
      <TextField
        label="Search for a book"
        variant="outlined"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2, width: '300px' }}
      />
      <Button variant="contained" onClick={handleSearch} sx={{ mb: 3 }}>
        Search
      </Button>
      {book && (
        <Card sx={{ width: '300px', mb: 2 }}>
          <CardContent>
            <Typography variant="h6">{book.title}</Typography>
            <Typography variant="body2" color="textSecondary">
              {book.author}
            </Typography>
          </CardContent>
          <CardActions>
            <Button variant="contained" color="primary" onClick={handleAddToReadingList} sx={{ margin: '0 auto' }}>
              Add to Reading List
            </Button>
          </CardActions>
        </Card>
      )}
      {readingList.length > 0 && (
        <Box sx={{ mt: 4, width: '300px' }}>
          <Typography variant="h6">Reading List</Typography>
          {readingList.map((book, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">{book.title}</Typography>
                <Typography variant="body2" color="textSecondary">
                  {book.author}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
};

export default Filter;
