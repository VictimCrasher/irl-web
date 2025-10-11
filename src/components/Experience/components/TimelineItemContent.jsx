import { TimelineItem, TimelineSeparator, TimelineDot, TimelineConnector, TimelineContent, TimelineOppositeContent } from '@mui/lab';

const TimelineItemContent = ({ oppositeContent, children }) => (
  <TimelineItem>
    {oppositeContent && <TimelineOppositeContent>{oppositeContent}</TimelineOppositeContent>}
    <TimelineSeparator>
      <TimelineDot variant="outlined" />
      <TimelineConnector />
    </TimelineSeparator>
    <TimelineContent sx={{ pb: 4 }}>{children}</TimelineContent>
  </TimelineItem>
);

export default TimelineItemContent;