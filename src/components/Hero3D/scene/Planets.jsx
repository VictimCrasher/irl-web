import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Outlines } from '@react-three/drei';
import * as THREE from 'three';
import { COLORS, PLANETS } from '../constants';
import OrbitRing from './OrbitRing';
import { getToonGradient } from './toonGradient';

const PlanetRing = ({ size, color, gradient }) => (
  <mesh rotation={[Math.PI / 2 + 0.25, 0, 0]}>
    <ringGeometry args={[size * 1.7, size * 2.5, 64]} />
    <meshToonMaterial
      color={color}
      gradientMap={gradient}
      transparent
      opacity={0.6}
      side={THREE.DoubleSide}
      depthWrite={false}
    />
  </mesh>
);

const Planet = ({ radius, size, speed, color, emissive, hasRing, angleOffset, outlines }) => {
  const orbitRef = useRef();
  const spinRef = useRef();
  const gradient = getToonGradient();

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const angle = t * speed + angleOffset;

    if (orbitRef.current) {
      orbitRef.current.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
    }

    if (spinRef.current) {
      spinRef.current.rotation.y = t * speed * 3;
    }
  });

  return (
    <group ref={orbitRef}>
      <mesh ref={spinRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshToonMaterial color={color} gradientMap={gradient} emissive={emissive} />
        {outlines && (
          <Outlines thickness={size * 0.07} color={COLORS.outline} transparent opacity={0.85} />
        )}
      </mesh>
      {hasRing && <PlanetRing size={size} color={color} gradient={gradient} />}
    </group>
  );
};

const Planets = ({ outlines = true }) => (
  <group>
    {PLANETS.map((planet, i) => (
      <OrbitRing key={`orbit-${i}`} radius={planet.radius} />
    ))}
    {PLANETS.map((planet, i) => (
      <Planet
        key={`planet-${i}`}
        {...planet}
        outlines={outlines}
        angleOffset={(i * Math.PI * 2) / PLANETS.length}
      />
    ))}
  </group>
);

export default Planets;
