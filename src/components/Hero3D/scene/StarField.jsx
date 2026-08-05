import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const vertexShader = /* glsl */ `
  attribute float phase;
  attribute float size;
  attribute float brightness;
  attribute float speed;
  attribute vec3 tint;

  varying float vPhase;
  varying float vBrightness;
  varying float vSpeed;
  varying vec3 vTint;

  void main() {
    vPhase = phase;
    vBrightness = brightness;
    vSpeed = speed;
    vTint = tint;

    vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = size * (350.0 / -mvPosition.z);
    gl_Position = projectionMatrix * mvPosition;
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;

  varying float vPhase;
  varying float vBrightness;
  varying float vSpeed;
  varying vec3 vTint;

  void main() {
    float dist = length(gl_PointCoord - vec2(0.5));
    if (dist > 0.5) discard;

    // Sharpened sine so stars snap on and linger dim, like real scintillation.
    float wave = sin(uTime * vSpeed + vPhase) * 0.5 + 0.5;
    float twinkle = pow(wave, 2.2);
    float glow = 1.0 - dist * 2.0;

    vec3 color = mix(vTint, vec3(1.0), twinkle * 0.7);
    gl_FragColor = vec4(color, twinkle * vBrightness * glow);
  }
`;

const TINTS = [
  [0.78, 0.85, 1.0],
  [1.0, 0.95, 0.86],
  [1.0, 0.83, 0.72],
  [0.88, 0.94, 1.0],
  [1.0, 1.0, 1.0],
];

const StarField = ({ count = 420 }) => {
  const materialRef = useRef();

  const geometry = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const phases = new Float32Array(count);
    const sizes = new Float32Array(count);
    const brightnesses = new Float32Array(count);
    const speeds = new Float32Array(count);
    const tints = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      const r = 45 + Math.random() * 55;

      positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      positions[i * 3 + 2] = r * Math.cos(phi);

      phases[i] = Math.random() * Math.PI * 2;
      sizes[i] = 1.2 + Math.pow(Math.random(), 2.5) * 5.5;
      brightnesses[i] = 0.35 + Math.random() * 0.65;
      speeds[i] = 0.9 + Math.random() * 2.6;

      const tint = TINTS[Math.floor(Math.random() * TINTS.length)];
      tints[i * 3] = tint[0];
      tints[i * 3 + 1] = tint[1];
      tints[i * 3 + 2] = tint[2];
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geo.setAttribute('phase', new THREE.BufferAttribute(phases, 1));
    geo.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geo.setAttribute('brightness', new THREE.BufferAttribute(brightnesses, 1));
    geo.setAttribute('speed', new THREE.BufferAttribute(speeds, 1));
    geo.setAttribute('tint', new THREE.BufferAttribute(tints, 3));

    return geo;
  }, [count]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <points geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        ref={materialRef}
        uniforms={{ uTime: { value: 0 } }}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        fog={false}
      />
    </points>
  );
};

export default StarField;
