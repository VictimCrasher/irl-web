import { Stack, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Stack component="footer" direction="row" justifyContent="center" alignItems="center" gap={2} sx={{ width: '100%', p: 2 }}>
      <Typography variant="body1" color="text.secondary">
        Made with ❤️ by Achmad Firdaus Adinegoro in {new Date().getFullYear()}.
      </Typography>
    </Stack>
  );
};

export default Footer;
