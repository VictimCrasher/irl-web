import { SectionWrapper } from '../../assets/components/SectionWrapper';
import { Stack, Typography, useMediaQuery } from '@mui/material';
import { CONTACT } from '../../data/contact';
import { useTheme } from '@mui/material/styles';
import LinksItem from '../About/components/LinksItem';
import bg from '../../data/images/0017.png';

const Contact = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <SectionWrapper
      id="contact"
      title="Contact"
      maxWidth={false}
      sx={{
        height: '80vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        backgroundImage: `url(${bg})`,
        backgroundSize: 'cover',
        backgroundPosition: isDesktop ? 'center' : 'bottom',
        position: 'relative'
      }}
    >
      <Stack alignItems="center" sx={{ width: '100%' }} spacing={2}>
        <Typography variant="h6" sx={{ lineHeight: 1 }}>
          I'm always open to new opportunities and collaborations!
        </Typography>
        <Typography variant="h6" sx={{ lineHeight: 1 }}>
          Feel free to contact me via:
        </Typography>
      </Stack>
      <Stack direction="row" gap={2} flexWrap="wrap" justifyContent="center" alignItems="center" sx={{ width: '100%' }}>
        {CONTACT.map((link, index) => (
          <LinksItem {...link} key={index} />
        ))}
      </Stack>
      <Stack sx={{ position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)' }}>
        <Typography variant="body1" sx={{ lineHeight: 1, fontStyle: 'italic', opacity: 0.5 }}>
          I drew this background btw
        </Typography>
      </Stack>
    </SectionWrapper>
  );
};

export default Contact;
