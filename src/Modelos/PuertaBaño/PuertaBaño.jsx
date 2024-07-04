import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useUserContext } from '../../Context/useContext';
import axios from 'axios';

export function PuertaBaño(props) {
  const { nodes, materials } = useGLTF('/Puerta-transformed.glb');
  const [doorOpen, setDoorOpen] = useState(false);
  const doorRef = useRef();

  const { devices, user } = useUserContext();

  useEffect(() => {
    devices.map(device => {
        if (device.name == 'Puerta-Cuarto-Baño') {
          setDoorOpen(device.status);
        }
    })
    return () => {

    };
}, [devices]);
  const trigger = async () => {
    const body = JSON.stringify({
      nameUser: user.name,
      name: 'Puerta-Cuarto-Baño'
    })
    const headers = {
      'token': `${user.token}`,  // Usando Bearer token para autorización
      'Content-Type': 'application/json'  // Tipo de contenido del cuerpo de la solicitud
    };
    await axios.post(`http://localhost:3000/api/v1/devices/trigger`, body, { headers })
      .then(data => {
        setDoorOpen(data.triggerDevice.status);
      });
  }
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
