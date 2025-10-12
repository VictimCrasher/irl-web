import { Stack, Typography } from '@mui/material';

export const titleTypographyProps = {
  variant: 'h6',
  fontWeight: 800
};

export const navTypographyProps = {
  variant: 'span',
  fontWeight: 700
};

export const HEADER_DATA = {
  title: (onClick) => (
    <Stack direction="row" columnGap={0.5} rowGap={0} flexWrap="wrap" id="title" onClick={onClick}>
      <Typography {...titleTypographyProps}>Achmad</Typography>
      <Typography {...titleTypographyProps} color="primary">
        Firdaus
      </Typography>
      <Typography {...titleTypographyProps}>Adinegoro</Typography>
    </Stack>
  ),
  menus: [
    {
      name: 'About',
      id: 'about'
    },
    {
      name: 'Experience',
      id: 'experience'
    },
    {
      name: 'Skills',
      id: 'skills'
    },
    {
      name: 'Portfolio',
      id: 'portfolio'
    },
    {
      name: 'Contact',
      id: 'contact'
    }
  ]
};
