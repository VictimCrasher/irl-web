import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { CaretUpIcon } from '@phosphor-icons/react';
import { useState, useEffect } from 'react';
import './ScrollToTop.scss';

const ScrollToTop = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [showButton, setShowButton] = useState(false);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollListener = () => {
    setShowButton(window.scrollY > window.innerHeight * 0.5);
  };

  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  return (
    <Button
      variant="contained"
      size="large"
      color="primary"
      className={`scroll-to-top ${showButton ? 'show' : ''}`}
      onClick={handleScrollToTop}
    >
      <CaretUpIcon color="white" size={isDesktop ? 32 : 24} />
    </Button>
  );
};

export default ScrollToTop;
