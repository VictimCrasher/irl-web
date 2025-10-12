import { Container, Stack, Typography } from '@mui/material';

export const SectionWrapper = ({ children, stackProps, title, ...props }) => (
  <Container maxWidth="lg" component="section" {...props}>
    <Stack sx={{ p: 3, py: 6 }} spacing={5} {...stackProps}>
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ width: '100%' }}>
        <Typography variant="h2" color="primary">
          {title}
        </Typography>
      </Stack>
      {children}
    </Stack>
  </Container>
);

export default SectionWrapper;
