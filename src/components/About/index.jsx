import { Button, Container, Link, Stack, Typography, Box, Grid } from '@mui/material';
import { ArrowSquareOutIcon } from '@phosphor-icons/react';
import { ME as data } from '../../data/me';
import DetailItem from './components/DetailItem';
import LinksItem from './components/LinksItem';

const typographyProps = {
  variant: 'h6',
  sx: {
    fontWeight: 800
  }
};

const About = () => {
  const name = (data?.name || '').split(' ');

  return (
    <Container maxWidth="lg">
      <Stack sx={{ p: 3, py: 6 }} spacing={5}>
        {/* About Section */}
        <Stack direction="row" justifyContent="center" spacing={2} sx={{ width: '100%' }}>
          <Typography variant="h2" color="primary">
            About
          </Typography>
        </Stack>
        <Stack direction={{ xs: 'column', lg: 'row' }} justifyContent="center" spacing={3} sx={{ width: '100%' }}>
          {data?.photo && (
            <Box
              component="img"
              src={data.photo}
              alt="photo"
              width={96}
              height={96}
              sx={{ borderRadius: '50%', border: '2px solid #FFFFFF', flexShrink: 0 }}
            />
          )}
          <Stack spacing={3}>
            <Stack spacing={1}>
              <Typography {...typographyProps} variant="h4">
                Hello!
              </Typography>
              <Stack direction="row" columnGap={0.5} rowGap={0} flexWrap="wrap">
                <Typography {...typographyProps}>I'm</Typography>
                {name.map((name, index) => (
                  <Typography {...typographyProps} color="primary" key={index}>
                    {name}
                    {index === name.length - 1 && '.'}
                  </Typography>
                ))}
              </Stack>
              {(data.description || []).map((description, index) => (
                <Typography {...typographyProps} sx={{ whiteSpace: 'pre-line' }}>
                  {description}
                </Typography>
              ))}
            </Stack>
            {data.cv && (
              <Link href={data.cv} target="_blank" sx={{ width: 'fit-content' }}>
                <Button variant="outlined" size="large" endIcon={<ArrowSquareOutIcon />}>
                  <Typography variant="h6">Download My CV</Typography>
                </Button>
              </Link>
            )}
          </Stack>
        </Stack>

        {/* Details Section */}
        <Grid container spacing={5}>
          {data.details.map((detail, index) => (
            <Grid item size={{ xs: 12, md: 6 }} key={index}>
              <DetailItem {...detail} />
            </Grid>
          ))}
          <Grid item size={{ xs: 12 }}>
            <DetailItem name="Links">
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {data.links.map((link, index) => (
                  <LinksItem {...link} key={index} />
                ))}
              </Stack>
            </DetailItem>
          </Grid>
        </Grid>
      </Stack>
    </Container>
  );
};

export default About;
