import { useMemo } from 'react';
import * as THREE from 'three';
import { Line } from '@react-three/drei';
import { COLORS } from '../constants';

const ORBIT_SEGMENTS = 128;

const OrbitRing = ({ radius, color = COLORS.orbit }) => {
  const points = useMemo(() => {
    const pts = [];
    for (let i = 0; i <= ORBIT_SEGMENTS; i++) {
      const angle = (i / ORBIT_SEGMENTS) * Math.PI * 2;
      pts.push(new THREE.Vector3(Math.cos(angle) * radius, 0, Math.sin(angle) * radius));
    }
    return pts;
  }, [radius]);

  return (
    <group>
      <Line points={points} color={color} transparent opacity={0.35} lineWidth={1} />
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[radius - 0.06, radius + 0.06, ORBIT_SEGMENTS]} />
        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.07}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
};

export default OrbitRing;
