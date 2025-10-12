import React from 'react';
import { Dialog, DialogContent, IconButton, Box, useTheme, useMediaQuery } from '@mui/material';
import { XIcon } from '@phosphor-icons/react';
import ImageLazy from '../../../assets/components/ImageLazy';

const ImageModal = ({ open, onClose, imageUrl, alt = 'Portfolio image' }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      fullWidth
      fullScreen={isMobile}
      className="image-modal"
      slotProps={{
        paper: {
          backgroundColor: theme.palette.secondary.dark,
          backdropFilter: 'blur(10px)',
          boxShadow: 'none',
          margin: isMobile ? 0 : 2,
          height: isMobile ? '100vh' : '90vh',
          width: isMobile ? '100vw' : '90vw',
          borderRadius: 2
        }
      }}
    >
      <DialogContent
        sx={{
          position: 'relative',
          padding: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: isMobile ? '100vh' : '90vh',
          borderRadius: 2
        }}
      >
        {/* Close button */}
        <IconButton
          onClick={onClose}
          sx={{
            position: 'absolute',
            top: 16,
            right: 16,
            zIndex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.2)'
            }
          }}
        >
          <XIcon size={24} />
        </IconButton>

        {/* Image */}
        <ImageLazy
          src={imageUrl}
          alt={alt}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            borderRadius: 8
          }}
          imageStyle={{ objectFit: 'contain' }}
          width="100%"
          height="100%"
        />
      </DialogContent>
    </Dialog>
  );
};

export default ImageModal;
