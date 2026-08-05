import { useEffect, useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_ORBIT, SUN_POSITION } from '../constants';

const LOOK_AT = new THREE.Vector3(...SUN_POSITION);
const LERP_FACTOR = 0.08;
const PARALLAX_STRENGTH = 0.35;

const sphericalToCartesian = (theta, phi, radius, out) => {
  const sinPhi = Math.sin(phi);
  out.set(
    LOOK_AT.x + radius * sinPhi * Math.sin(theta),
    LOOK_AT.y + radius * Math.cos(phi),
    LOOK_AT.z + radius * sinPhi * Math.cos(theta)
  );
};

const CameraController = ({ orbitRef, parallax = true }) => {
  const { camera, pointer } = useThree();
  const currentPos = useRef(new THREE.Vector3(0, 4, 20));
  const targetPos = useRef(new THREE.Vector3(0, 4, 20));
  const scratch = useRef(new THREE.Vector3());

  useEffect(() => {
    if (!orbitRef.current) return;

    orbitRef.current.theta ??= CAMERA_ORBIT.theta;
    orbitRef.current.phi ??= CAMERA_ORBIT.phi;
    orbitRef.current.radius ??= CAMERA_ORBIT.radius;
  }, [orbitRef]);

  useFrame(() => {
    const orbit = orbitRef.current;
    if (!orbit) return;

    sphericalToCartesian(orbit.theta, orbit.phi, orbit.radius, targetPos.current);

    // Soft mouse parallax only when not dragging.
    if (parallax && !orbit.dragging) {
      scratch.current.set(pointer.x * PARALLAX_STRENGTH, pointer.y * PARALLAX_STRENGTH * 0.4, 0);
      targetPos.current.add(scratch.current);
    }

    currentPos.current.lerp(targetPos.current, LERP_FACTOR);
    camera.position.copy(currentPos.current);
    camera.lookAt(LOOK_AT);
  });

  return null;
};

export default CameraController;
