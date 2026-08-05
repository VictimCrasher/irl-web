import React, { Suspense, lazy, useCallback, useEffect, useRef, useState } from 'react';
import './Hero3D.scss';
import { Stack, Typography, Button } from '@mui/material';
import { useSceneQuality } from './hooks/useSceneQuality';
import { CAMERA_ORBIT } from './constants';

const SolarSystemScene = lazy(() => import('./scene/SolarSystemScene'));

const PHI_MIN = 0.35;
const PHI_MAX = Math.PI - 0.45;
const DRAG_SENSITIVITY = 0.005;
const HINT_AUTO_HIDE_MS = 7000;

const isInteractiveTarget = (target) => Boolean(target?.closest?.('button, a, input, textarea, [role="button"]'));

const Hero3D = () => {
  const quality = useSceneQuality();
  const orbitRef = useRef({
    theta: CAMERA_ORBIT.theta,
    phi: CAMERA_ORBIT.phi,
    radius: CAMERA_ORBIT.radius,
    dragging: false
  });
  const dragState = useRef({ active: false, lastX: 0, lastY: 0 });
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    const onWindowUp = () => {
      if (!dragState.current.active) return;
      dragState.current.active = false;
      orbitRef.current.dragging = false;
      setDragging(false);
    };

    window.addEventListener('pointerup', onWindowUp);
    window.addEventListener('pointercancel', onWindowUp);
    return () => {
      window.removeEventListener('pointerup', onWindowUp);
      window.removeEventListener('pointercancel', onWindowUp);
    };
  }, []);

  const onScroll = () => {
    window.scrollTo({
      top: window.innerHeight - 65,
      behavior: 'smooth'
    });
  };

  const onPointerDown = (event) => {
    if (event.button !== 0 || isInteractiveTarget(event.target)) return;

    dragState.current = {
      active: true,
      lastX: event.clientX,
      lastY: event.clientY
    };
    orbitRef.current.dragging = true;
    setDragging(true);

    event.currentTarget.setPointerCapture?.(event.pointerId);
  };

  const onPointerMove = (event) => {
    if (!dragState.current.active) return;

    event.preventDefault();

    const dx = event.clientX - dragState.current.lastX;
    const dy = event.clientY - dragState.current.lastY;
    dragState.current.lastX = event.clientX;
    dragState.current.lastY = event.clientY;

    orbitRef.current.theta -= dx * DRAG_SENSITIVITY;
    orbitRef.current.phi = Math.min(PHI_MAX, Math.max(PHI_MIN, orbitRef.current.phi + dy * DRAG_SENSITIVITY));
  };

  const endDrag = (event) => {
    if (!dragState.current.active) return;

    dragState.current.active = false;
    orbitRef.current.dragging = false;
    setDragging(false);

    if (event?.currentTarget?.hasPointerCapture?.(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <Stack
      spacing={6}
      id="hero"
      className={`hero${dragging ? ' hero--dragging' : ''}`}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endDrag}
      onPointerCancel={endDrag}
    >
      <div className="spaces" id="spaces">
        <Suspense fallback={<div className="spaces-fallback" />}>
          <SolarSystemScene quality={quality} orbitRef={orbitRef} />
        </Suspense>
      </div>

      <div className="orbit-hint" aria-hidden="true">
        <span className="orbit-hint__icon" />
        Click &amp; drag to explore
      </div>

      <Stack direction="row" spacing={2} flexWrap="wrap" justifyContent="center" alignItems="center">
        <Typography variant="h1" className="hero-title">
          Achmad
        </Typography>
        <Typography variant="h1" color="primary" className="hero-title">
          Firdaus
        </Typography>
        <Typography variant="h1" className="hero-title">
          Adinegoro
        </Typography>
      </Stack>
      <Typography variant="h5" textAlign="center" className="hero-subtitle">
        Frontend Developer • AI Developer • Graphic Designer • Freelancer
      </Typography>
      <Button variant="contained" color="primary" size="large" sx={{ fontSize: '1.2rem', color: 'secondary.main' }} onClick={onScroll}>
        Learn More
      </Button>
    </Stack>
  );
};

export default Hero3D;
