import { HEADER_DATA, navTypographyProps, titleTypographyProps } from '../../data/header-data';
import { Stack, Container, useMediaQuery, IconButton, Box, Drawer, Typography, Fade } from '@mui/material';
import theme from '../../assets/theme';
import './Header.scss';
import { ListIcon, XCircleIcon } from '@phosphor-icons/react';
import { useState, useEffect, useRef } from 'react';

const Header = () => {
  const [showHeader, setShowHeader] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const observerRef = useRef(null);

  const scrollListener = () => {
    setShowHeader(window.scrollY > window.innerHeight * 0.5);
  };

  // Intersection Observer for active section tracking
  useEffect(() => {
    const sections = HEADER_DATA.menus.map((menu) => document.getElementById(menu.id)).filter(Boolean);

    if (sections.length === 0) return;

    const observerOptions = {
      root: null,
      rootMargin: '-20% 0px -70% 0px', // Trigger when section is 20% from top
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((section) => {
      observerRef.current.observe(section);
    });

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, []);

  // Only show header if scroll is > 50dvh
  useEffect(() => {
    window.addEventListener('scroll', scrollListener);
    return () => {
      window.removeEventListener('scroll', scrollListener);
    };
  }, []);

  const handleMenuClick = (id) => {
    // scroll to the id
    const element = document.getElementById(id);
    if (element) {
      // scroll to element - 65px from top
      window.scrollTo({
        top: element.offsetTop - 65,
        behavior: 'smooth'
      });
    }
  };

  const renderDesktopMenu = () => {
    return (
      <Stack direction="row" spacing={2}>
        {HEADER_DATA.menus.map((menu) => (
          <Typography
            key={menu.id}
            {...navTypographyProps}
            onClick={() => handleMenuClick(menu.id)}
            className={`menu-item ${activeSection === menu.id ? 'active' : ''}`}
          >
            {menu.name}
          </Typography>
        ))}
      </Stack>
    );
  };

  const renderMobileMenu = () => {
    return (
      <>
        <IconButton color="white" onClick={() => setIsOpen(true)}>
          <ListIcon size={24} />
        </IconButton>

        <Drawer id="mobile-menu" anchor="bottom" open={isOpen} slots={{ transition: Fade }} onClose={() => setIsOpen(false)}>
          <IconButton className="close-button" color="white" onClick={() => setIsOpen(false)}>
            <XCircleIcon size={32} />
          </IconButton>
          <Stack direction="column" spacing={2} sx={{ p: 3 }}>
            {HEADER_DATA.menus.map((menu) => (
              <Typography
                key={menu.id}
                {...navTypographyProps}
                variant="h4"
                onClick={() => {
                  handleMenuClick(menu.id);
                  setIsOpen(false);
                }}
                className={`menu-item ${activeSection === menu.id ? 'active' : ''}`}
              >
                {menu.name}
              </Typography>
            ))}
          </Stack>
        </Drawer>
      </>
    );
  };

  return (
    <Box className={`header ${showHeader ? 'show' : ''}`}>
      <Container maxWidth="lg">
        <Stack direction="row" justifyContent="space-between" alignItems="center">
          {HEADER_DATA.title}

          {isDesktop && renderDesktopMenu()}
          {!isDesktop && renderMobileMenu()}
        </Stack>
      </Container>
    </Box>
  );
};

export default Header;
