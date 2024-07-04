import * as THREE from "three";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { PerspectiveCamera } from "@react-three/drei";

const positions = [
  new THREE.Vector3(20, 40, -5),
  new THREE.Vector3(-22, 40, 12),
  new THREE.Vector3(-5, 5, -50),
];

const rotations = [
  new THREE.Euler(1.5, 2.5, -1.5),
  new THREE.Euler(1.9,3.8,-4.2),
  new THREE.Euler(0, 3.2, 0),
];

export function Player({position}) {
  const cameraRef = useRef();
  const currentTarget = useRef(0); // Índice de la posición actual

  const cameraPosition = useRef(positions[0].clone()); // Inicialmente la primera posición
  const cameraRotation = useRef(rotations[0].clone()); // Inicialmente la primera rotación

  useFrame(() => {
    const targetPosition = positions[position];
    const targetRotation = rotations[position];

    // Interpolación suave hacia la posición y rotación objetivo
    cameraPosition.current.lerp(targetPosition, 0.05);
    cameraRotation.current.x = THREE.MathUtils.lerp(cameraRotation.current.x, targetRotation.x, 0.05);
    cameraRotation.current.y = THREE.MathUtils.lerp(cameraRotation.current.y, targetRotation.y, 0.1);
    cameraRotation.current.z = THREE.MathUtils.lerp(cameraRotation.current.z, targetRotation.z, 0.08);

    if (cameraRef.current) {
      cameraRef.current.position.copy(cameraPosition.current);
      cameraRef.current.rotation.copy(cameraRotation.current);
    }
  });

  return (
    <>
      <PerspectiveCamera ref={cameraRef} makeDefault position={positions[0]} rotation={rotations[0]} />
    </>
  );
}
