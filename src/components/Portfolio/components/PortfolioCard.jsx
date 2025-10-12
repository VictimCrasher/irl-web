import React from 'react';
import { Card, CardContent, Typography, Box, Chip, Stack, IconButton, useTheme, useMediaQuery, Link } from '@mui/material';
import { ArrowSquareOutIcon, CalendarIcon, UserIcon } from '@phosphor-icons/react';
import MediaCarousel from './MediaCarousel';

const PortfolioCard = ({ project }) => {
  const theme = useTheme();

  return (
    <Card
      className="portfolio-card"
      sx={{
        height: 'fit-content',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.15)'
        }
      }}
    >
      {/* Media Carousel */}
      <MediaCarousel media={project.media} />

      <CardContent sx={{ p: 3 }}>
        {/* Header */}
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="flex-start" spacing={1}>
            <Typography variant="h6" color="primary">{project.title}</Typography>
            {project.link && (
              <Link href={project.link} target="_blank">
                <IconButton
                  size="small"
                  sx={{
                    color: 'primary.main',
                    '&:hover': {
                      backgroundColor: 'primary.main',
                      color: 'white'
                    }
                  }}
                >
                  <ArrowSquareOutIcon size={24} />
                </IconButton>
              </Link>
            )}
          </Stack>
        </Box>

        {/* Project Info */}
        <Stack spacing={1.5} sx={{ mb: 2 }}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <CalendarIcon size={16} color={theme.palette.text.secondary} />
            <Typography variant="body2" color="text.secondary">
              {project.year}
            </Typography>
            <Box
              sx={{
                width: 4,
                height: 4,
                borderRadius: '50%',
                backgroundColor: 'text.secondary'
              }}
            />
            <Typography variant="body2" color="text.secondary">
              {project.type}
            </Typography>
          </Stack>

          <Stack direction="row" alignItems="flex-start" spacing={1}>
            <UserIcon size={16} color={theme.palette.text.secondary} style={{ marginTop: 2 }} />
            <Typography variant="body2" color="text.secondary" sx={{ flex: 1 }}>
              {project.role}
            </Typography>
          </Stack>
        </Stack>

        {/* Description */}
        <Typography
          variant="body2"
          sx={{
            mb: 2,
            lineHeight: 1.6,
            color: 'text.primary',
            whiteSpace: 'pre-line'
          }}
        >
          {project.description}
        </Typography>

        {/* Technologies */}
        <Stack direction="row" gap={0.5} flexWrap="wrap">
          {project.keyTechnologies.map((tech, index) => (
            <Chip key={index} label={tech} size="small" variant="outlined" color="primary" sx={{ width: 'fit-content' }} />
          ))}
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PortfolioCard;
