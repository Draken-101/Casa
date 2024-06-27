import * as THREE from "three"
import * as RAPIER from "@dimforge/rapier3d-compat"
import { useRef, useState } from "react"
import { useFrame } from "@react-three/fiber"
import { useKeyboardControls } from "@react-three/drei"
import { CapsuleCollider, RigidBody, useRapier } from "@react-three/rapier"

const SPEED = 10
const direction = new THREE.Vector3()
const frontVector = new THREE.Vector3()
const sideVector = new THREE.Vector3()
const rotation = new THREE.Vector3()

export function Player() {
  const ref = useRef()
  const rapier = useRapier()
  const [, get] = useKeyboardControls()
  const [isGrounded, setIsGrounded] = useState(false);
  const [canJump, setCanJump] = useState(true); // Estado para permitir un salto
  useFrame((state) => {

    if (ref.current) {
      const { forward, backward, left, right, jump } = get();
      const velocity = ref.current.linvel();
      // update camera
      state.camera.position.set(ref.current.translation().x, ref.current.translation().y+ 1, ref.current.translation().z)
      // movement
      frontVector.set(0, 0, backward - forward)
      sideVector.set(left - right, 0, 0)
      direction.subVectors(frontVector, sideVector).normalize().multiplyScalar(SPEED).applyEuler(state.camera.rotation)
      ref.current.setLinvel({ x: direction.x, y: velocity.y, z: direction.z })
      // jumping
      const world = rapier.world;
      const rayOrigin = ref.current.translation();
      const rayDirection = { x: 0, y: -1, z: 0 };
      const ray = new RAPIER.Ray(rayOrigin, rayDirection);
      const hit = world.castRay(ray, 3, true);

      const grounded = hit && hit.collider;
      setIsGrounded(grounded);

      // Lógica de salto
      if (jump && canJump && grounded) {
        ref.current.setLinvel({ x: velocity.x, y: 7.5, z: velocity.z });
        setCanJump(false); // Deshabilitar salto hasta que aterrice
      }

      // Restablecer la capacidad de saltar si no se mantiene presionado el botón de salto
      if (!jump && !canJump && grounded) {
        setCanJump(true);
      }
    };
  })
  return (
    <>
      <RigidBody ref={ref} colliders={false} mass={1} type="dynamic" position={[0, 3, -40]} enabledRotations={[false, false, false]}>
        <CapsuleCollider args={[2, 0.5]} />
      </RigidBody>
    </>
  )
}
