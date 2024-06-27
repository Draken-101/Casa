import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

const positions = [
  new THREE.Vector3(20, 40, -5),
  new THREE.Vector3(-10, 30, 15),
  new THREE.Vector3(0, 20, -30),
];

const rotations = [
  new THREE.Euler(1.5, 2.5, -1.5),
  new THREE.Euler(-0.5, 1.0, 0),
  new THREE.Euler(0, -1.5, 1.5),
];

export function Player() {
  const cameraRef = useRef();
  const currentTarget = useRef(0); // Índice de la posición actual

  const cameraPosition = useRef(positions[0].clone()); // Inicialmente la primera posición
  const cameraRotation = useRef(rotations[0].clone()); // Inicialmente la primera rotación

  useFrame(() => {
    const targetPosition = positions[currentTarget.current];
    const targetRotation = rotations[currentTarget.current];

    // Interpolación suave hacia la posición y rotación objetivo
    cameraPosition.current.lerp(targetPosition, 0.05);
    cameraRotation.current.y = THREE.MathUtils.lerp(cameraRotation.current.y, targetRotation.y, 0.05);

    if (cameraRef.current) {
      cameraRef.current.position.copy(cameraPosition.current);
      cameraRef.current.rotation.copy(cameraRotation.current);
    }
  });

  const changeCameraPosition = () => {
    currentTarget.current = (currentTarget.current + 1) % positions.length;
  };

  return (
    <>
      {/* Configuración de la cámara */}
      <PerspectiveCamera ref={cameraRef} makeDefault position={positions[0]} rotation={rotations[0]} />

      {/* Botón 3D para cambiar la posición de la cámara */}
      {/* <mesh position={[0, 20, -10]} onClick={changeCameraPosition}>
        <boxGeometry args={[5, 2, 1]} />
        <meshBasicMaterial color="blue" />
      </mesh> */}
    </>
  );
}
