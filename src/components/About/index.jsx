import { Button, Link, Stack, Typography } from '@mui/material';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';

const About = () => {
  return (
    <Stack sx={{ p: 3 }} spacing={2}>
      <Stack direction="row" justifyContent="center" spacing={2} sx={{ width: '100%' }}>
        <Typography variant="h2" color="primary">
          About
        </Typography>
      </Stack>
      <Typography variant="subtitle1">
        Results-oriented technology professional with proven versatility across web development, machine learning, and graphic design.
        Consistently delivers high-quality work on time, demonstrating a strong ability to quickly master new technologies and domains.
      </Typography>
      <Link href="https://drive.google.com/file/d/1tsTrCFCu2cqLzAEs2qYgPnHDY774Qhdr/view?usp=sharing" target="_blank">
        <Button variant="outlined" size="large" endIcon={<ArrowSquareOutIcon />}>
          Download CV
        </Button>
      </Link>
    </Stack>
  );
};

export default About;
