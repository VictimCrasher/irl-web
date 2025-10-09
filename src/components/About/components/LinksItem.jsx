import { Button, Stack, Link, Typography } from '@mui/material';

const LinksItem = ({ icon, name, url }) => {
  return (
    <Link href={url} target="_blank">
      <Button variant="outlined" sx={{ width: '125px', height: '125px' }}>
        <Stack spacing={2} alignItems="center">
          {icon}
          <Typography variant="body1">{name}</Typography>
        </Stack>
      </Button>
    </Link>
  );
};

export default LinksItem;
