import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function PuertaBaño(props) {
  const { nodes, materials } = useGLTF('/Puerta-transformed.glb');
  const [doorOpen, setDoorOpen] = useState(false);
  const doorRef = useRef();

  const initialDoorPosition = new THREE.Vector3(10.561, 13.853, 4.7);
  const openDoorPosition = new THREE.Vector3(11.7, 13.853, 5.4);
  const initialRotation = new THREE.Euler(0, -(Math.PI / 2), 0);
  const openRotation = new THREE.Euler(0, 0, 0);
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

    // Update the position, rotation, and scale directly on the mesh
    if (doorRef.current) {
      doorRef.current.position.copy(doorPosition.current);
      doorRef.current.rotation.copy(doorRotation.current);
      doorRef.current.scale.copy(doorScale.current);
    }
  });

  const handleDoorClick = () => {
    setDoorOpen(!doorOpen);
  };

  return (
    <group {...props} onClick={handleDoorClick}>
      <group ref={doorRef} position={doorPosition.current} rotation={doorRotation.current} scale={doorScale.current}>
        <mesh castShadow receiveShadow geometry={nodes.Cubo_1.geometry} material={materials.Vidrio} />
        <mesh castShadow receiveShadow geometry={nodes.Cubo_2.geometry} material={materials.Metal} />
      </group>
    </group>
  );
}

// Precargar el modelo glTF para optimización
useGLTF.preload('/Puerta-transformed.glb');
