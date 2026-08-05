import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { COLORS } from '../constants';
import { noiseGLSL } from './shaderChunks';

const vertexShader = /* glsl */ `
  varying vec3 vDir;

  void main() {
    vDir = normalize(position);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  uniform float uTime;
  uniform vec3 uBase;
  uniform vec3 uNebulaA;
  uniform vec3 uNebulaB;
  uniform vec3 uNova;

  varying vec3 vDir;

  ${noiseGLSL}

  float nova(vec3 dir, vec3 center, float corePower, float haloPower, float coreGain, float haloGain) {
    float d = max(dot(dir, center), 0.0);
    return pow(d, corePower) * coreGain + pow(d, haloPower) * haloGain;
  }

  void main() {
    vec3 dir = normalize(vDir);
    float drift = uTime * 0.01;

    float broad = fbm(dir * 2.1 + vec3(drift, drift * 0.4, 0.0));
    float detail = fbm(dir * 5.4 - vec3(0.0, drift * 0.8, drift * 0.6));
    float cloud = smoothstep(0.32, 0.92, broad * 0.75 + detail * 0.35);

    vec3 color = uBase;
    color = mix(color, uNebulaA, cloud * 0.8);
    color = mix(color, uNebulaB, pow(cloud, 2.6) * 0.65);

    vec3 novaDirA = normalize(vec3(-0.55, 0.42, -0.72));
    float pulseA = 0.72 + 0.28 * sin(uTime * 0.55);
    float rays = pow(max(dot(dir, novaDirA), 0.0), 34.0) * fbm(dir * 8.0 + drift * 4.0) * 0.9;
    color += uNova * (nova(dir, novaDirA, 240.0, 20.0, 1.9, 0.5) + rays) * pulseA;

    vec3 novaDirB = normalize(vec3(0.78, 0.18, -0.6));
    float pulseB = 0.6 + 0.4 * sin(uTime * 0.85 + 1.7);
    color += uNova * nova(dir, novaDirB, 320.0, 28.0, 1.1, 0.22) * pulseB;

    gl_FragColor = vec4(color, 1.0);
  }
`;

const Nebula = ({ octaves = 5 }) => {
  const materialRef = useRef();

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uBase: { value: new THREE.Color(COLORS.skyDark) },
      uNebulaA: { value: new THREE.Color(COLORS.nebulaA) },
      uNebulaB: { value: new THREE.Color(COLORS.nebulaB) },
      uNova: { value: new THREE.Color(COLORS.nova) },
    }),
    []
  );

  const defines = useMemo(() => ({ OCTAVES: String(octaves) }), [octaves]);

  useFrame(({ clock }) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = clock.getElapsedTime();
    }
  });

  return (
    <mesh renderOrder={-1000} frustumCulled={false}>
      <sphereGeometry args={[160, 32, 32]} />
      <shaderMaterial
        key={octaves}
        ref={materialRef}
        uniforms={uniforms}
        defines={defines}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        side={THREE.BackSide}
        depthWrite={false}
        depthTest={false}
        fog={false}
      />
    </mesh>
  );
};

export default Nebula;
