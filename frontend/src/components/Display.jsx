

import React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import image1 from '../assets/image1.webp';
import image2 from '../assets/image2.webp';
import image3 from '../assets/image3.webp';
import image4 from '../assets/image4.webp';
import image5 from '../assets/image5.webp';
import image6 from '../assets/image6.webp';

const cardData = [
  { image: image1, title: 'Goat Matata', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { image: image2, title: 'The lazy hen', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { image: image3, title: 'The Grinch', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { image: image4, title: 'The old granny', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { image: image5, title: 'Magic dragons', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
  { image: image6, title: 'Fairy tale', description: 'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica' },
];

export default function Cardd() {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
      {cardData.map((data, index) => (
        <Card key={index} sx={{ maxWidth: 350, margin: 5 }}>
          <CardMedia
            sx={{ height: 250, width: 350 }}
            image={data.image}
            title={data.title}
          />
          <CardContent style={{ textAlign: 'center', fontSize:'16px' }}>
            <Typography gutterBottom variant="h5" component="div"  style={{color:'#4AA088', fontWeight:'bold'}}>
              {data.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {data.description}
            </Typography>
          </CardContent>
          <CardActions style={{ justifyContent: 'center' }}>
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
              margin:'2%',
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
      ))}
    </div>
  );
}
