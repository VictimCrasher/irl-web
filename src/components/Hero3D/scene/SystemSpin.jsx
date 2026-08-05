import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';

const SPIN_SPEED = 0.015;

// Sits inside the tilted system group so the spin stays within the orbital
// plane rather than wobbling it.
const SystemSpin = ({ enabled = true, children }) => {
  const ref = useRef();

  useFrame((_, delta) => {
    if (!enabled || !ref.current) return;
    ref.current.rotation.y += SPIN_SPEED * delta;
  });

  return <group ref={ref}>{children}</group>;
};

export default SystemSpin;
