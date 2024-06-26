import React, { useState } from 'react';
import { useGLTF } from '@react-three/drei';
import { RigidBody, MeshCollider } from '@react-three/rapier';

export function PuertaCuarto(props) {
  const { nodes, materials } = useGLTF('/Puerta-transformed.glb');
  const [doorOpen, setDoorOpen] = useState(false);

  const initialDoorPosition = {
    x: -9.761,
    y: 13.853,
    z: -11.613,
    rotation: [0, 0, 0],
  };

  const openDoorPosition = {
    x: -8.561,
    y: 13.853,
    z: -12.75,
    rotation: [0, 1.5, 0],
  };

  const [doorPosition, setDoorPosition] = useState(initialDoorPosition);

  const handleDoorClick = () => {
    setDoorOpen(!doorOpen);
    if (!doorOpen) {
      setDoorPosition(openDoorPosition);
    } else {
      setDoorPosition(initialDoorPosition);
    }
  };

  return (
    <RigidBody type="static">
      <MeshCollider type="trimesh" position={[doorPosition.x, doorPosition.y, doorPosition.z]} rotation={doorPosition.rotation}>
        <group {...props} >
          <mesh
            geometry={nodes.Cubo_1.geometry}
            material={materials.Vidrio}
            onClick={handleDoorClick}
          />
          <mesh
            geometry={nodes.Cubo_2.geometry}
            material={materials.Metal}
          />
        </group>
      </MeshCollider>
    </RigidBody>
  );
}

// Precargar el modelo glTF para optimización
useGLTF.preload('/Puerta-transformed.glb');
