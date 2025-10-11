import { Stack, Typography } from '@mui/material';

const DetailItem = ({ name, value, children }) => {
  const renderValue = () => {
    if (children) return children;

    return <Typography variant="body1" sx={{ width: 'fit-content' }}>{value}</Typography>;
  };

  return (
    <Stack spacing={2} width="100%">
      <Typography variant="h5" fontWeight={800}>
        {name}
      </Typography>
      {renderValue()}
    </Stack>
  );
};

export default DetailItem;
