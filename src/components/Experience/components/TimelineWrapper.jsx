import { Timeline } from '@mui/lab';

const TimelineWrapper = ({ children }) => (
  <Timeline
    orientation="vertical"
    sx={{
      px: 0,
      [`& .MuiTimelineOppositeContent-root`]: {
        display: 'flex',
        justifyContent: 'flex-end',
        flexBasis: '200px',
        flexGrow: 0,
        '@media (max-width: 768px)': {
          display: 'none'
        }
      }
    }}
  >
    {children}
  </Timeline>
);

export default TimelineWrapper;