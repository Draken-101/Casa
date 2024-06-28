import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody } from '@react-three/rapier';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PuertaCuarto(props) {
  const { nodes, materials } = useGLTF('/Puerta-transformed.glb');
  const [doorOpen, setDoorOpen] = useState(false);
  const doorRef = useRef();

  const initialDoorPosition = new THREE.Vector3(-9.761, 13.853, -11.613);
  const openDoorPosition = new THREE.Vector3(-9, 13.853, -12.75);
  const initialRotation = new THREE.Euler(0, 0, 0);
  const openRotation = new THREE.Euler(0, Math.PI / 2, 0);
  const initialScale = new THREE.Vector3(0.899, 1.554, 1.984);
  const openScale = new THREE.Vector3(1.984, 1.554, 0.899);

  const doorPosition = useRef(initialDoorPosition.clone());
  const doorRotation = useRef(initialRotation.clone());
  const doorScale = useRef(initialScale.clone());

  useFrame(() => {
    const targetPosition = doorOpen ? openDoorPosition : initialDoorPosition;
    const targetRotation = doorOpen ? openRotation : initialRotation;
    const targetScale = doorOpen ? openScale : initialScale;

    // Smooth interpolation to the target position, rotation, and scale
    doorPosition.current.lerp(targetPosition, 0.05);
    doorRotation.current.y = THREE.MathUtils.lerp(doorRotation.current.y, targetRotation.y, 0.05);
    doorScale.current.lerp(targetScale, 0.05);

    if (doorRef.current) {
      doorRef.current.setNextKinematicTranslation(doorPosition.current);
      doorRef.current.setNextKinematicRotation(new THREE.Quaternion().setFromEuler(doorRotation.current));
    }
  });

  const handleDoorClick = () => {
    setDoorOpen(!doorOpen);
  };

  return (
    <group {...props} onClick={handleDoorClick}>
      <RigidBody type="kinematicPosition" ref={doorRef} colliders="cuboid" position={doorPosition.current} rotation={doorRotation.current}>
        <group scale={doorScale.current}>
          <mesh castShadow receiveShadow geometry={nodes.Cubo_1.geometry} material={materials.Vidrio} />
          <mesh castShadow receiveShadow geometry={nodes.Cubo_2.geometry} material={materials.Metal} />
        </group>
      </RigidBody>
    </group>
  );
}

useGLTF.preload('/Puerta-transformed.glb');