import React, { useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { Luz } from '../Casa/Luces';

export function Porton(props) {
  const { nodes, materials } = useGLTF('/Porton-transformed.glb');
  const [doorOpen, setDoorOpen] = useState(false);
  const doorRef = useRef();

  const initialDoorPosition = new THREE.Vector3(-3.777, 8.021, -26.492);
  const openDoorPosition = new THREE.Vector3(-3.777, 8, -28);
  const initialRotation = new THREE.Euler(0, 0, 0);
  const openRotation = new THREE.Euler(Math.PI / 2, 0, 0);
  const initialScale = new THREE.Vector3(6.45, 1, 0.103);
  const openScale = new THREE.Vector3(23.159, 4.5, 23.159);

  const doorPosition = useRef(initialDoorPosition.clone());
  const doorRotation = useRef(initialRotation.clone());
  const doorScale = useRef(initialScale.clone());

  useFrame(() => {
    const targetPosition = doorOpen ? openDoorPosition : initialDoorPosition;
    const targetRotation = doorOpen ? openRotation : initialRotation;
    // Smooth interpolation to the target position, rotation, and scale
    doorPosition.current.lerp(targetPosition, 0.05);
    doorRotation.current.x = THREE.MathUtils.lerp(doorRotation.current.x, targetRotation.x, 0.01);
    doorRotation.current.y = THREE.MathUtils.lerp(doorRotation.current.y, targetRotation.y, 0.01);
    doorRotation.current.z = THREE.MathUtils.lerp(doorRotation.current.z, targetRotation.z, 0.01);

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

  const focos = [[-3.777, 7.8, -27.5], [-3.777, 8.5, -18]];

  return (
    <group {...props} dispose={null}>
      <group onClick={handleDoorClick}>
        <group ref={doorRef} position={doorPosition.current} rotation={doorRotation.current} scale={doorScale.current}>
          <mesh castShadow receiveShadow geometry={nodes.Plane004.geometry} material={materials['Material.007']} />
          <mesh castShadow geometry={nodes.Plane004_1.geometry} material={materials.Vidrio} />
        </group>
      </group>

      {/* Adding the small glowing balls */}
      {focos.map((position, index) => (
        <Luz key={index} position={position} />
      ))}
    </group>
  );
}

// Precargar el modelo glTF para optimización
useGLTF.preload('/Porton-transformed.glb');
