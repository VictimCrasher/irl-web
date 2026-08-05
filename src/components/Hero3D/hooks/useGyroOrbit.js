import { useCallback, useEffect, useRef, useState } from 'react';
import { CAMERA_ORBIT } from '../constants';

const PHI_MIN = 0.35;
const PHI_MAX = Math.PI - 0.45;
const DEG = Math.PI / 180;

const THETA_GAIN = 1.15 * DEG;
const PHI_GAIN = 0.85 * DEG;
const THETA_CLAMP = 0.85;
const PHI_CLAMP = 0.4;

const needsPermission = () =>
  typeof DeviceOrientationEvent !== 'undefined' &&
  typeof DeviceOrientationEvent.requestPermission === 'function';

const isTouchDevice = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window;
};

const prefersReducedMotion = () => {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
};

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

const getScreenAngle = () => {
  if (typeof window === 'undefined') return 0;
  if (screen.orientation?.angle != null) return screen.orientation.angle;
  return window.orientation || 0;
};

/**
 * On phones, drive the shared orbitRef from device orientation.
 * Desktop / denied permission / reduced-motion → mode stays "drag".
 */
export const useGyroOrbit = (orbitRef) => {
  const touch = isTouchDevice();
  const [mode, setMode] = useState(() => {
    if (!touch || prefersReducedMotion()) return 'drag';
    return needsPermission() ? 'gyro-pending' : 'gyro';
  });
  const [permission, setPermission] = useState(() =>
    needsPermission() ? 'prompt' : 'granted'
  );

  const baseline = useRef(null);
  const smooth = useRef({ theta: CAMERA_ORBIT.theta, phi: CAMERA_ORBIT.phi });
  const orbitRefStable = useRef(orbitRef);
  orbitRefStable.current = orbitRef;

  const onOrientation = useCallback((event) => {
    const { beta, gamma } = event;
    const orbit = orbitRefStable.current?.current;
    if (beta == null || gamma == null || !orbit) return;

    if (!baseline.current) {
      baseline.current = { beta, gamma };
    }

    let dGamma = gamma - baseline.current.gamma;
    let dBeta = beta - baseline.current.beta;

    // In landscape, the phone axes swap relative to the screen.
    const angle = getScreenAngle();
    if (angle === 90 || angle === -90 || angle === 270) {
      const swap = dGamma;
      dGamma = dBeta * (angle === 90 || angle === -270 ? 1 : -1);
      dBeta = -swap;
    }

    const targetTheta = CAMERA_ORBIT.theta - clamp(dGamma * THETA_GAIN, -THETA_CLAMP, THETA_CLAMP);
    const targetPhi = clamp(
      CAMERA_ORBIT.phi - clamp(dBeta * PHI_GAIN, -PHI_CLAMP, PHI_CLAMP),
      PHI_MIN,
      PHI_MAX
    );

    smooth.current.theta += (targetTheta - smooth.current.theta) * 0.12;
    smooth.current.phi += (targetPhi - smooth.current.phi) * 0.12;

    orbit.theta = smooth.current.theta;
    orbit.phi = smooth.current.phi;
    orbit.dragging = true; // suppresses mouse parallax while gyro is live
  }, []);

  const startListening = useCallback(() => {
    baseline.current = null;
    window.addEventListener('deviceorientation', onOrientation, true);
    setMode('gyro');
    setPermission('granted');
  }, [onOrientation]);

  const enableGyro = useCallback(async () => {
    if (!touch || prefersReducedMotion()) {
      setMode('drag');
      return false;
    }

    try {
      if (needsPermission()) {
        const result = await DeviceOrientationEvent.requestPermission();
        if (result !== 'granted') {
          setPermission('denied');
          setMode('drag');
          return false;
        }
      }
      startListening();
      return true;
    } catch {
      setPermission('denied');
      setMode('drag');
      return false;
    }
  }, [touch, startListening]);

  // Android / open browsers: attach automatically. iOS waits for enableGyro().
  useEffect(() => {
    if (!touch || prefersReducedMotion()) {
      setMode('drag');
      return undefined;
    }

    if (needsPermission()) {
      setMode('gyro-pending');
      setPermission('prompt');
      return undefined;
    }

    startListening();
    return () => {
      window.removeEventListener('deviceorientation', onOrientation, true);
      if (orbitRefStable.current?.current) {
        orbitRefStable.current.current.dragging = false;
      }
    };
  }, [touch, startListening, onOrientation]);

  useEffect(
    () => () => {
      window.removeEventListener('deviceorientation', onOrientation, true);
    },
    [onOrientation]
  );

  return {
    mode,
    permission,
    enableGyro,
    isTouch: touch,
  };
};
