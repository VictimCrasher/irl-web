import React from 'react';
import { SectionWrapper } from '../../assets/components/SectionWrapper';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Masonry } from '@mui/lab';
import { FEATURED_PROJECTS } from '../../data/portfolio';
import PortfolioCard from './components/PortfolioCard';
import './Portfolio.scss';

const Portfolio = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.down('md'));

  // Responsive columns for masonry
  const getColumns = () => {
    if (isMobile) return 1;
    if (isTablet) return 2;
    return 3;
  };

  return (
    <SectionWrapper maxWidth="lg" id="portfolio" title="Portfolio">
      <Box
        className="portfolio-container"
        sx={{
          '& .MuiMasonry-root': {
            display: 'flex',
            marginLeft: '-16px',
            width: 'auto',
          },
          '& .MuiMasonry-item': {
            paddingLeft: '16px',
            backgroundClip: 'padding-box',
          },
        }}
      >
        <Masonry columns={getColumns()} spacing={2}>
          {FEATURED_PROJECTS.map((project, index) => (
            <PortfolioCard key={index} project={project} />
          ))}
        </Masonry>
      </Box>
    </SectionWrapper>
  );
};

export default Portfolio;
