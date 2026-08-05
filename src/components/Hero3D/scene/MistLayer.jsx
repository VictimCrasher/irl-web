import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../constants';
import { noiseGLSL } from './shaderChunks';

const vertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform float uSeed;
  uniform float uSpeed;
  uniform float uOpacity;
  uniform vec3 uColor;

  varying vec2 vUv;

  ${noiseGLSL}

  void main() {
    // Fade every edge so the quad never reads as a hard-edged plane.
    float edge =
      smoothstep(0.0, 0.34, vUv.x) * smoothstep(1.0, 0.66, vUv.x) *
      smoothstep(0.0, 0.42, vUv.y) * smoothstep(1.0, 0.58, vUv.y);

    vec3 p = vec3(vUv * vec2(3.2, 1.4), uSeed);
    float drift = uTime * uSpeed;
    float density = fbm(p + vec3(drift, drift * 0.22, 0.0));
    float wisps = fbm(p * 2.6 - vec3(drift * 1.6, 0.0, 0.0));

    float alpha = smoothstep(0.28, 0.86, density * 0.75 + wisps * 0.35);

    gl_FragColor = vec4(uColor, alpha * edge * uOpacity);
  }
`;

const MIST_LAYERS = [
  { position: [-4, -9, 6], scale: [46, 18, 1], opacity: 0.3, speed: 0.03, sway: 3.4, seed: 1.7 },
  { position: [6, -7.5, -4], scale: [54, 20, 1], opacity: 0.22, speed: 0.024, sway: 4.6, seed: 12.3 },
  { position: [-8, -4, -14], scale: [64, 24, 1], opacity: 0.16, speed: 0.018, sway: 6.0, seed: 27.1 },
  { position: [10, 1, -26], scale: [78, 30, 1], opacity: 0.1, speed: 0.013, sway: 7.5, seed: 41.9 },
];

const MistPlane = ({ position, scale, opacity, speed, sway, seed, octaves }) => {
  const meshRef = useRef();
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uSeed: { value: seed },
      uSpeed: { value: speed },
      uOpacity: { value: opacity },
      uColor: { value: new THREE.Color(COLORS.mist) },
    }),
    [seed, speed, opacity]
  );

  const defines = useMemo(() => ({ OCTAVES: String(octaves) }), [octaves]);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
    }

    if (meshRef.current) {
      meshRef.current.position.x = position[0] + Math.sin(t * speed * 1.6) * sway;
    }
  });

  return (
    <mesh ref={meshRef} position={position} scale={scale} frustumCulled={false}>
      <planeGeometry />
      <shaderMaterial
        key={octaves}
        ref={materialRef}
        uniforms={uniforms}
        defines={defines}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        side={THREE.DoubleSide}
        fog={false}
      />
    </mesh>
  );
};

const MistLayer = ({ layerCount = 4, octaves = 4 }) => (
  <group>
    {MIST_LAYERS.slice(0, layerCount).map((layer, i) => (
      <MistPlane key={i} {...layer} octaves={octaves} />
    ))}
  </group>
);

export default MistLayer;
