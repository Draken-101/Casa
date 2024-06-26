import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { useRef, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { useKeyboardControls } from "@react-three/drei";
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier";

const SPEED = 5;
const JUMP_FORCE = 10;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

export function Player() {
  const ref = useRef();
  const rapier = useRapier();
  const [, get] = useKeyboardControls();
  const [isGrounded, setIsGrounded] = useState(false);
  const [canJump, setCanJump] = useState(true); // Estado para permitir un salto

  useFrame((state) => {
    const { forward, backward, left, right, jump } = get();

    if (ref.current) {
      const velocity = ref.current.linvel();

      // Update camera position
      state.camera.position.set(
        ref.current.translation().x,
        ref.current.translation().y + 5, // Ajustar altura de la cámara
        ref.current.translation().z
      );

      // Movimiento
      frontVector.set(0, 0, backward - forward);
      sideVector.set(left - right, 0, 0);
      direction
        .subVectors(frontVector, sideVector)
        .normalize()
        .multiplyScalar(SPEED)
        .applyEuler(state.camera.rotation);

      // Establecer la velocidad solo si no está saltando
      if (!canJump) {
        ref.current.setLinvel({
          x: direction.x,
          y: velocity.y,
          z: direction.z,
        });
      }

      // Raycasting para verificar si el jugador está en el suelo
      const world = rapier.world;
      const rayOrigin = ref.current.translation();
      const rayDirection = { x: 0, y: -1, z: 0 };
      const ray = new RAPIER.Ray(rayOrigin, rayDirection);
      const hit = world.castRay(ray, 5, true);

      const grounded = hit && hit.collider;
      setIsGrounded(grounded);

      // Lógica de salto
      if (jump && canJump && grounded) {
        ref.current.setLinvel({ x: velocity.x, y: JUMP_FORCE, z: velocity.z });
        setCanJump(false); // Deshabilitar salto
      }
    }
  });

  useEffect(() => {
    // Restablecer el estado de salto después de un tiempo para permitir otro salto
    const resetJump = setTimeout(() => {
      setCanJump(true);
    }, 500);

    return () => clearTimeout(resetJump);
  }, [canJump]);

  useEffect(() => {
    // Asegurar que el movimiento se actualice continuamente incluso después de detenerse
    const interval = setInterval(() => {
      if (ref.current) {
        const velocity = ref.current.linvel();
        ref.current.setLinvel({
          x: velocity.x,
          y: velocity.y,
          z: velocity.z,
        });
      }
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <RigidBody
      ref={ref}
      colliders={false}
      mass={1}
      type="dynamic"
      position={[0, 5, -40]} // Posición inicial ajustada según tu escena
      enabledRotations={[false, false, false]}
    >
      <CapsuleCollider args={[5, 0.5]} />
    </RigidBody>
  );
}
