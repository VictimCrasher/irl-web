import { useMemo } from 'react';
import { Stack, Typography } from '@mui/material';
import moment from 'moment';
import TimelineItemContent from './TimelineItemContent';
import { getDuration, renderImage } from './utils';

const EducationItem = (education) => {
  const startDate = education.startDate;
  const endDate = education.endDate === 'now' ? new Date() : education.endDate;
  const endDateLabel = education.endDate === 'now' ? 'Present' : moment(endDate).format('MMM YYYY');
  const duration = getDuration(startDate, endDate);

  const renderOppositeContent = useMemo(
    () => renderImage(education.icon, education.logo, education.institution),
    [education.icon, education.logo, education.institution]
  );

  return (
    <TimelineItemContent oppositeContent={renderOppositeContent}>
      <Stack spacing={1}>
        <Stack spacing={0.5}>
          <Typography variant="h6" fontWeight={800} color="primary" sx={{ lineHeight: 1 }}>
            {education.degree}
          </Typography>
          <Typography variant="subtitle1">
            {education.institution}&nbsp;&nbsp;·&nbsp;&nbsp;{education.major}
          </Typography>
          <Typography variant="subtitle2">
            GPA:&nbsp;{education.gpa}&nbsp;&nbsp;/&nbsp;&nbsp;{education.scale}
          </Typography>
          <Typography variant="subtitle2">
            {moment(startDate).format('MMM YYYY')}&nbsp;-&nbsp;{endDateLabel}&nbsp;&nbsp;·&nbsp;&nbsp;{duration}
          </Typography>
        </Stack>
        <ul>
          {education.description.map((description, index) => (
            <li style={{ marginLeft: '1rem' }} key={index}>
              {description}
            </li>
          ))}
        </ul>
      </Stack>
    </TimelineItemContent>
  );
};

export default EducationItem;
