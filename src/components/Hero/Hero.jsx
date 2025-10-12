import React from 'react';
import './Hero.scss';
import Spaces from './Spaces';
import { Stack, Typography, Button } from '@mui/material';

const Hero = () => {
  const onScroll = () => {
    window.scrollTo({
      top: window.innerHeight - 65,
      behavior: 'smooth'
    });
  };

  return (
    <Stack spacing={6} id="hero" className="hero">
      <Spaces />
      <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" alignItems="center">
        <Typography variant="h1" className="hero-title">
          Achmad
        </Typography>
        <Typography variant="h1" color="primary" className="hero-title">
          Firdaus
        </Typography>
        <Typography variant="h1" className="hero-title">
          Adinegoro
        </Typography>
      </Stack>
      <Typography variant="h5" textAlign="center">
        Frontend Developer • AI Developer • Graphic Designer • Freelancer
      </Typography>
      <Button variant="contained" color="primary" size="large" sx={{ fontSize: '1.2rem', color: 'secondary.main' }} onClick={onScroll}>
        Learn More
      </Button>
    </Stack>
  );
};

export default Hero;
