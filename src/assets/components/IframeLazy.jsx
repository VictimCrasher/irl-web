import React, { useState, useRef, useEffect } from 'react';
import { Skeleton, Box } from '@mui/material';
import { Play } from '@phosphor-icons/react';

const IframeLazy = ({ 
  src, 
  title = "Embedded content",
  className = "",
  style = {},
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = "50px",
  skeletonVariant = "rectangular",
  skeletonAnimation = "wave",
  width = "100%",
  height = "100%",
  allowFullScreen = true,
  allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture",
  showPlayIcon = true,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    
    if (!iframe) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Stop observing once iframe is in view
            observerRef.current?.unobserve(entry.target);
          }
        });
      },
      {
        threshold,
        rootMargin,
      }
    );

    // Start observing
    observerRef.current.observe(iframe);

    // Cleanup
    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [threshold, rootMargin]);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div 
      ref={iframeRef}
      className={`lazy-iframe-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#000',
        ...style
      }}
      {...props}
    >
      {/* Skeleton loading state */}
      {!isLoaded && !hasError && (
        <Skeleton
          variant={skeletonVariant}
          animation={skeletonAnimation}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            zIndex: 1,
          }}
        />
      )}

      {/* Play icon overlay */}
      {!isLoaded && !hasError && showPlayIcon && (
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            borderRadius: '50%',
            width: 60,
            height: 60,
            color: 'white',
            transition: 'all 0.3s ease',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.9)',
              transform: 'translate(-50%, -50%) scale(1.1)',
            },
          }}
        >
          <Play size={24} weight="fill" />
        </Box>
      )}

      {/* Actual iframe */}
      {isInView && (
        <iframe
          src={src}
          title={title}
          onLoad={handleLoad}
          onError={handleError}
          allowFullScreen={allowFullScreen}
          allow={allow}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width,
            height: height,
            border: 'none',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f8f8f8',
            color: '#666',
            fontSize: '14px',
            border: '2px dashed #ddd',
          }}
        >
          <Play size={32} weight="light" style={{ marginBottom: '8px', opacity: 0.5 }} />
          <span>Failed to load video</span>
        </Box>
      )}
    </div>
  );
};

export default IframeLazy;
