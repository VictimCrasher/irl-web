import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../constants';

const GLOW_SHELLS = [
  { scale: 2.8, speed: 1.6, phase: 0, opacity: 0.2 },
  { scale: 4.2, speed: 1.25, phase: Math.PI * 0.5, opacity: 0.13 },
  { scale: 6.0, speed: 0.95, phase: Math.PI, opacity: 0.08 },
  { scale: 8.5, speed: 0.7, phase: Math.PI * 1.5, opacity: 0.045 },
];

const Sun = () => {
  const shellRefs = useRef([]);
  const coreRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (coreRef.current) {
      const pulse = (Math.sin(t * 2.4) + 1) / 2;
      coreRef.current.material.emissiveIntensity = 2.5 + pulse * 1.8;
    }

    shellRefs.current.forEach((shell, i) => {
      if (!shell) return;
      const { speed, phase, scale: baseScale, opacity: maxOpacity } = GLOW_SHELLS[i];
      const pulse = (Math.sin(t * speed + phase) + 1) / 2;
      const s = baseScale * (0.82 + pulse * 0.18);
      shell.scale.set(s, s, s);
      shell.material.opacity = maxOpacity * (0.35 + pulse * 0.65);
    });
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[2.2, 64, 64]} />
        <meshStandardMaterial
          color={COLORS.sun}
          emissive={COLORS.sun}
          emissiveIntensity={2.5}
          roughness={0.4}
          metalness={0.1}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.4, 32, 32]} />
        <meshBasicMaterial color={COLORS.sunCore} transparent opacity={0.6} depthWrite={false} />
      </mesh>

      {GLOW_SHELLS.map((shell, i) => (
        <mesh
          key={i}
          ref={(el) => (shellRefs.current[i] = el)}
          scale={[shell.scale, shell.scale, shell.scale]}
        >
          <sphereGeometry args={[1, 32, 32]} />
          <meshBasicMaterial
            color={COLORS.sun}
            transparent
            opacity={shell.opacity}
            depthWrite={false}
            side={THREE.BackSide}
          />
        </mesh>
      ))}

      {/* decay 0 keeps the cel terminator consistent out to the furthest orbit */}
      <pointLight color={COLORS.sun} intensity={2.6} decay={0} />
      <pointLight color={COLORS.sunCore} intensity={5} distance={26} decay={2} />
    </group>
  );
};

export default Sun;
