import React, { useState, useMemo } from 'react';
import { SectionWrapper } from '../../assets/components/SectionWrapper';
import { useTheme, useMediaQuery, Stack, Box, ToggleButtonGroup, ToggleButton } from '@mui/material';
import { Masonry } from '@mui/lab';
import { FEATURED_PROJECTS, PROJECT_TYPES } from '../../data/portfolio';
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

  const [selectedType, setSelectedType] = useState('all');

  const handleTypeChange = (event, type) => {
    setSelectedType(type);
  };

  const filteredProjects = useMemo(() => {
    return FEATURED_PROJECTS.filter((project) => (selectedType === 'all' ? true : project.type === selectedType));
  }, [selectedType]);

  return (
    <SectionWrapper maxWidth="lg" id="portfolio" title="Portfolio">
      <Box
        className="portfolio-container"
        sx={{
          '& .MuiMasonry-root': {
            display: 'flex',
            marginLeft: '-16px',
            width: 'auto'
          },
          '& .MuiMasonry-item': {
            paddingLeft: '16px',
            backgroundClip: 'padding-box'
          }
        }}
      >
        {/* Filters */}
        <Stack justifyContent="center" alignItems="center" spacing={2}>
          <ToggleButtonGroup
            orientation={isMobile ? 'vertical' : 'horizontal'}
            fullWidth={isMobile}
            exclusive
            size="small"
            value={selectedType}
            onChange={handleTypeChange}
          >
            <ToggleButton value="all">All</ToggleButton>
            {PROJECT_TYPES.map((type) => (
              <ToggleButton value={type}>{type}</ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Stack>
        <Stack sx={{ mt: 2 }}>
          <Masonry columns={getColumns()} spacing={2}>
            {filteredProjects.map((project, index) => (
              <PortfolioCard key={index} project={project} />
            ))}
          </Masonry>
        </Stack>
      </Box>
    </SectionWrapper>
  );
};

export default Portfolio;
