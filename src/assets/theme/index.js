import { createTheme } from '@mui/material/styles';

// Custom color palette based on Figma design
const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#FB6956', // Orange accent color
      light: '#FF8A7A',
      dark: '#E55A4A',
      contrastText: '#FFFFFF'
    },
    secondary: {
      main: '#1B2538', // Dark navy background
      light: '#2A3A4F',
      dark: '#0F1A2A',
      contrastText: '#FFFFFF'
    },
    background: {
      default: '#1B2538', // Dark navy background
      paper: '#1B2538' // Same as default for consistency
    },
    text: {
      primary: '#FFFFFF', // White text
      secondary: '#F2F2F2' // Light gray for secondary text
    },
    // Custom colors for specific use cases
    custom: {
      hero: '#FB6956', // Orange accent
      dark: '#1B2538', // Dark navy
      light: '#F2F2F2', // Light gray
      notActive: '#f2f2f280' // Semi-transparent light gray
    }
  },
  typography: {
    fontFamily: '"Plus Jakarta Sans", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
      lineHeight: 1.2
    },
    h5: {
      fontWeight: 500,
      fontSize: '1.5rem',
      lineHeight: 1.4
    }
  },
  components: {
    // Custom component overrides
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: '8px',
          fontWeight: 600
        },
        contained: {
          backgroundColor: '#FB6956',
          color: '#FFFFFF',
          '&:hover': {
            backgroundColor: '#E55A4A'
          }
        },
        outlined: {
          borderColor: '#FFFFFF',
          color: '#FFFFFF',
          '&:hover': {
            borderColor: '#FB6956',
            backgroundColor: 'rgba(251, 105, 86, 0.1)'
          }
        }
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: ({ ownerState }) => {
          if (ownerState.color) return { color: ownerState.color };
          return { color: '#FFFFFF' };
        }
      }
    }
  }
});

export default theme;
