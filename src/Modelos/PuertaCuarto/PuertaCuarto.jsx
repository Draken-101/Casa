import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import axios from 'axios';
import { useUserContext } from '../../Context/useContext';

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


  const { devices, user } = useUserContext();

  useEffect(() => {
    const device = devices.find(device => device.nameDevice === 'Puerta-Cuarto-Entrada');
    setDoorOpen(device?.status);
    return () => {

    };
  }, [devices]);
  const trigger = async () => {
    const body = JSON.stringify({
      nameUser: user.name,
      nameDevice: 'Foco-Cuarto-1',
      roleUser: user.role
    })
    const headers = {  // Usando Bearer token para autorización
      'Content-Type': 'application/json'  // Tipo de contenido del cuerpo de la solicitud
    };
    await axios.post(`http://localhost:3000/api/v1/devices/trigger`, body, { headers })
  }
  return (
    <group {...props} onClick={trigger}>
      <group ref={doorRef} position={doorPosition.current} rotation={doorRotation.current} scale={doorScale.current}>
        <mesh castShadow receiveShadow geometry={nodes.Cubo_1.geometry} material={materials.Vidrio} />
        <mesh castShadow receiveShadow geometry={nodes.Cubo_2.geometry} material={materials.Metal} />
      </group>
    </group>
  );
}

// Precargar el modelo glTF para optimización
useGLTF.preload('/Puerta-transformed.glb');
