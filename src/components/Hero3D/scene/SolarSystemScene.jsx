import { useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { COLORS, SUN_POSITION, SYSTEM_TILT } from '../constants';
import Sun from './Sun';
import Planets from './Planets';
import StarField from './StarField';
import MistLayer from './MistLayer';
import Nebula from './Nebula';
import CameraController from './CameraController';
import SystemSpin from './SystemSpin';
import PostProcessing from './PostProcessing';

const SceneContent = ({ quality, orbitRef }) => (
  <>
    <color attach="background" args={[COLORS.skyDark]} />
    <fogExp2 attach="fog" args={[COLORS.skyDark, 0.012]} />

    <Nebula octaves={quality.nebulaOctaves} />
    <StarField count={quality.starCount} />
    <MistLayer layerCount={quality.mistLayers} octaves={quality.nebulaOctaves} />

    <ambientLight intensity={0.05} />
    <hemisphereLight color="#2a4a7a" groundColor="#050b18" intensity={0.16} />

    <CameraController orbitRef={orbitRef} parallax={quality.parallax} />

    <group position={SUN_POSITION} rotation={[SYSTEM_TILT, 0, 0]}>
      <SystemSpin enabled={quality.autoOrbit}>
        <Sun />
        <Planets outlines={quality.outlines} />
      </SystemSpin>
    </group>

    <PostProcessing
      enabled={quality.postProcessing}
      multisampling={quality.dprCap >= 2 ? 4 : 0}
    />
  </>
);

const SolarSystemScene = ({ quality, orbitRef }) => {
  const [frameLoop, setFrameLoop] = useState('always');

  useEffect(() => {
    const handleVisibility = () => {
      setFrameLoop(document.hidden ? 'never' : 'always');
    };

    document.addEventListener('visibilitychange', handleVisibility);
    return () => document.removeEventListener('visibilitychange', handleVisibility);
  }, []);

  return (
    <Canvas
      className="spaces-canvas"
      dpr={[1, quality.dprCap]}
      frameloop={frameLoop}
      camera={{ position: [0, 4, 20], fov: 55, near: 0.1, far: 400 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'high-performance' }}
    >
      <SceneContent quality={quality} orbitRef={orbitRef} />
    </Canvas>
  );
};

export default SolarSystemScene;
