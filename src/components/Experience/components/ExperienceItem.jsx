import { useMemo } from 'react';
import { Chip, Stack, Typography } from '@mui/material';
import moment from 'moment';
import TimelineItemContent from './TimelineItemContent';
import { getDuration, renderImage } from './utils';

const ExperienceItem = (experience) => {
  const startDate = experience.startDate;
  const endDate = experience.endDate === 'now' ? new Date() : experience.endDate;
  const endDateLabel = experience.endDate === 'now' ? 'Present' : moment(endDate).format('MMM YYYY');
  const duration = getDuration(startDate, endDate);

  const renderOppositeContent = useMemo(
    () => renderImage(experience.icon, experience.logo, experience.institution),
    [experience.icon, experience.logo, experience.institution]
  );

  return (
    <TimelineItemContent oppositeContent={renderOppositeContent}>
      <Stack spacing={1}>
        <Stack spacing={0.5}>
          <Typography variant="h6" fontWeight={800} color="primary" sx={{ lineHeight: 1 }}>
            {experience.position}
          </Typography>
          <Typography variant="subtitle1">
            {experience.institution}&nbsp;&nbsp;·&nbsp;&nbsp;{experience.location}
          </Typography>
          <Typography variant="subtitle2">
            {moment(startDate).format('MMM YYYY')}&nbsp;-&nbsp;{endDateLabel}&nbsp;&nbsp;·&nbsp;&nbsp;{duration}
          </Typography>
        </Stack>
        <ul>
          {experience.description.map((description, index) => (
            <li style={{ marginLeft: '1rem' }} key={index}>
              {description}
            </li>
          ))}
        </ul>
        <Stack direction="row" spacing={0.5} flexWrap="wrap">
          {experience.keyTechnologies.map((technology, index) => (
            <Chip key={index} label={technology} size='small' sx={{ width: 'fit-content' }} />
          ))}
        </Stack>
      </Stack>
    </TimelineItemContent>
  );
};

export default ExperienceItem;
