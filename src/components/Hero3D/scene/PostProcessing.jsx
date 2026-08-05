import { Bloom, EffectComposer, Vignette } from '@react-three/postprocessing';

const PostProcessing = ({ enabled = true, multisampling = 4 }) => {
  if (!enabled) return null;

  return (
    <EffectComposer multisampling={multisampling}>
      <Bloom
        luminanceThreshold={0.25}
        luminanceSmoothing={0.85}
        intensity={1.8}
        mipmapBlur
        radius={0.75}
      />
      <Vignette eskil={false} offset={0.15} darkness={0.55} />
    </EffectComposer>
  );
};

export default PostProcessing;
