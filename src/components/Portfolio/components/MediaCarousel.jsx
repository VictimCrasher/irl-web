import React, { useState } from 'react';
import Slider from 'react-slick';
import { Box, IconButton, useTheme } from '@mui/material';
import { CaretLeftIcon, CaretRightIcon } from '@phosphor-icons/react';
import ImageLazy from '../../../assets/components/ImageLazy';
import IframeLazy from '../../../assets/components/IframeLazy';
import ImageModal from './ImageModal';

// Import slick carousel styles
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const buttonStyle = {
  position: 'absolute',
  top: '50%',
  transform: 'translateY(-50%)',
  zIndex: 10,
  backgroundColor: 'rgba(0, 0, 0, 0.5)',
  color: 'white',
  '&:hover': {
    backgroundColor: 'rgba(0, 0, 0, 1)'
  }
};

const MediaCarousel = ({ media = [] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalImage, setModalImage] = useState('');
  const [modalAlt, setModalAlt] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [iframeInteractionEnabled, setIframeInteractionEnabled] = useState(false);

  const theme = useTheme();

  const handleImageClick = (imageUrl, alt) => {
    // Don't open modal if user was dragging
    if (isDragging) return;

    setModalImage(imageUrl);
    setModalAlt(alt);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
    setModalImage('');
    setModalAlt('');
  };

  const handleMouseDown = (e) => {
    setDragStart({ x: e.clientX, y: e.clientY });
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (dragStart.x !== 0 || dragStart.y !== 0) {
      const deltaX = Math.abs(e.clientX - dragStart.x);
      const deltaY = Math.abs(e.clientY - dragStart.y);

      // If moved more than 5px, consider it a drag
      if (deltaX > 5 || deltaY > 5) {
        setIsDragging(true);
      }
    }
  };

  const handleMouseUp = () => {
    // Reset dragging state after a short delay
    setTimeout(() => {
      setIsDragging(false);
      setDragStart({ x: 0, y: 0 });
    }, 100);
  };

  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    setDragStart({ x: touch.clientX, y: touch.clientY });
    setIsDragging(false);
  };

  const handleTouchMove = (e) => {
    if (dragStart.x !== 0 || dragStart.y !== 0) {
      const touch = e.touches[0];
      const deltaX = Math.abs(touch.clientX - dragStart.x);
      const deltaY = Math.abs(touch.clientY - dragStart.y);

      // If moved more than 10px, consider it a drag (higher threshold for touch)
      if (deltaX > 10 || deltaY > 10) {
        setIsDragging(true);
      }
    }
  };

  const handleTouchEnd = () => {
    // Reset dragging state after a short delay
    setTimeout(() => {
      setIsDragging(false);
      setDragStart({ x: 0, y: 0 });
    }, 100);
  };

  const handleDoubleClick = () => {
    // Enable iframe interaction on double click
    setIframeInteractionEnabled(true);
  };

  // Custom arrow components
  const CustomPrevArrow = ({ onClick }) => (
    <IconButton
      onClick={() => {
        setIframeInteractionEnabled(false);
        onClick();
      }}
      sx={{ left: 16, ...buttonStyle }}
    >
      <CaretLeftIcon size={20} />
    </IconButton>
  );

  const CustomNextArrow = ({ onClick }) => (
    <IconButton
      onClick={() => {
        setIframeInteractionEnabled(false);
        onClick();
      }}
      sx={{ right: 16, ...buttonStyle }}
    >
      <CaretRightIcon size={20} />
    </IconButton>
  );

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    dotsClass: 'slick-dots slick-dots-custom',
    customPaging: (i) => <button onClick={() => setIframeInteractionEnabled(false)}>{i}</button>,
    beforeChange: () => {
      // Set dragging state when carousel starts changing
      setIsDragging(true);
      // Disable iframe interaction when changing slides
      setIframeInteractionEnabled(false);
    },
    afterChange: () => {
      // Reset dragging state after carousel change completes
      setTimeout(() => {
        setIsDragging(false);
      }, 200);
    }
  };

  if (media.length === 0) {
    return null;
  }

  if (media.length === 1) {
    const item = media[0];
    return (
      <>
        <Box
          sx={{
            position: 'relative',
            width: '100%',
            height: 300,
            borderRadius: 2,
            overflow: 'hidden',
            cursor: item.type === 'image' ? 'pointer' : 'default',
            px: 1,
            pt: 1
          }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onClick={() => {
            if (item.type === 'image') {
              handleImageClick(item.url, 'Portfolio image');
            }
          }}
        >
          {item.type === 'image' ? (
            <ImageLazy
              src={item.url}
              alt="Portfolio image"
              style={{
                width: '100%',
                height: '100%',
                borderRadius: '8px',
                backgroundColor: theme.palette.secondary.dark
              }}
              imageStyle={{ objectFit: 'contain' }}
            />
          ) : (
            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
              <IframeLazy
                src={item.url}
                title="Portfolio video"
                style={{
                  width: '100%',
                  height: '100%',
                  borderRadius: 2
                }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                showPlayIcon={true}
              />
              {/* Transparent overlay for carousel dragging */}
              {!iframeInteractionEnabled && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: 1,
                    cursor: 'grab',
                    '&:active': {
                      cursor: 'grabbing'
                    }
                  }}
                  onMouseDown={handleMouseDown}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                  onDoubleClick={handleDoubleClick}
                />
              )}
              {/* Double-click hint */}
              {!iframeInteractionEnabled && (
                <Box
                  sx={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8,
                    backgroundColor: 'rgba(0, 0, 0, 0.7)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: 1,
                    fontSize: '12px',
                    zIndex: 2,
                    pointerEvents: 'none'
                  }}
                >
                  Double-click to interact
                </Box>
              )}
            </Box>
          )}
        </Box>
        <ImageModal open={modalOpen} onClose={handleModalClose} imageUrl={modalImage} alt={modalAlt} />
      </>
    );
  }

  return (
    <>
      <Box className="media-carousel" sx={{ position: 'relative', width: '100%' }}>
        <Slider {...settings}>
          {media.map((item, index) => (
            <Box key={index} sx={{ padding: '0 4px', pt: '8px' }}>
              <Box
                sx={{
                  position: 'relative',
                  width: '100%',
                  height: 270,
                  borderRadius: 2,
                  overflow: 'hidden',
                  cursor: item.type === 'image' ? 'pointer' : 'default'
                }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onClick={() => {
                  if (item.type === 'image') {
                    handleImageClick(item.url, 'Portfolio image');
                  }
                }}
              >
                {item.type === 'image' ? (
                  <>
                    <ImageLazy
                      src={item.url}
                      alt="Portfolio image"
                      style={{ width: '100%', height: '100%', backgroundColor: theme.palette.secondary.dark }}
                      imageStyle={{ objectFit: 'contain' }}
                    />
                  </>
                ) : (
                  <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                    <IframeLazy
                      src={item.url}
                      title="Portfolio video"
                      style={{
                        width: '100%',
                        height: '100%'
                      }}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      showPlayIcon={true}
                    />
                    {/* Transparent overlay for carousel dragging */}
                    {!iframeInteractionEnabled && (
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          zIndex: 1,
                          cursor: 'grab',
                          '&:active': {
                            cursor: 'grabbing'
                          }
                        }}
                        onMouseDown={handleMouseDown}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onTouchStart={handleTouchStart}
                        onTouchMove={handleTouchMove}
                        onTouchEnd={handleTouchEnd}
                        onDoubleClick={handleDoubleClick}
                      />
                    )}
                    {/* Double-click hint */}
                    {!iframeInteractionEnabled && (
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 8,
                          right: 8,
                          backgroundColor: 'rgba(0, 0, 0, 0.7)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: 1,
                          fontSize: '12px',
                          zIndex: 2,
                          pointerEvents: 'none'
                        }}
                      >
                        Double-click to interact
                      </Box>
                    )}
                  </Box>
                )}
              </Box>
            </Box>
          ))}
        </Slider>
      </Box>

      <ImageModal open={modalOpen} onClose={handleModalClose} imageUrl={modalImage} alt={modalAlt} />
    </>
  );
};

export default MediaCarousel;
