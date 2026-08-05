import * as THREE from 'three';

let cached = null;

// Four hard luminance steps give planets a cel-shaded terminator instead of a
// smooth gradient. Shared across every planet so the texture is uploaded once.
export const getToonGradient = () => {
  if (cached) return cached;

  const steps = new Uint8Array([10, 64, 150, 255]);
  const texture = new THREE.DataTexture(steps, steps.length, 1, THREE.RedFormat);
  texture.minFilter = THREE.NearestFilter;
  texture.magFilter = THREE.NearestFilter;
  texture.generateMipmaps = false;
  texture.needsUpdate = true;

  cached = texture;
  return texture;
};
