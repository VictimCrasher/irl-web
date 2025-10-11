import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from '@mui/material';
import { ImageIcon } from '@phosphor-icons/react';

const ImageLazy = ({ 
  src, 
  alt, 
  className = "",
  style = {},
  onLoad,
  onError,
  threshold = 0.1,
  rootMargin = "50px",
  skeletonVariant = "rectangular",
  skeletonAnimation = "wave",
  width,
  height,
  ...props 
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef(null);
  const observerRef = useRef(null);

  useEffect(() => {
    const img = imgRef.current;
    
    if (!img) return;

    // Create intersection observer
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            // Stop observing once image is in view
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
    observerRef.current.observe(img);

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
      ref={imgRef}
      className={`lazy-image-container ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
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
          }}
        />
      )}

      {/* Actual image */}
      {isInView && (
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width || '100%',
            height: height || '100%',
            objectFit: 'cover',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.3s ease',
          }}
        />
      )}

      {/* Error state */}
      {hasError && (
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: width || '100%',
            height: height || '100%',
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
          <ImageIcon size={32} weight="light" style={{ marginBottom: '8px', opacity: 0.5 }} />
          <span>Failed to load image</span>
        </div>
      )}
    </div>
  );
};

export default ImageLazy;
