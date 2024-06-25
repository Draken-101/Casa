import { OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

export function Box() {
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 5 });
    useFrame(({ clock }) => {
        setRotation({ x: rotation.x + .01, y: rotation.y + 0.01, z: rotation.z })
        const a = clock.getElapsedTime()
        console.log(a)
    })

    return (
        <>
            <OrbitControls />
            <ambientLight intensity={0.5} />
            <mesh rotation={[rotation.x, rotation.y, rotation.z]} position={[Math.cos(rotation.x * 3), Math.sin(rotation.y * 3), 0]}>
                <boxGeometry />
                <meshStandardMaterial color={'#4ca7b5'} />
            </mesh>
            <pointLight position={[Math.cos(rotation.x * 3) * 5, Math.sin(rotation.y * 3) * 5, 0]} intensity={1} color={'#ffffff'} />


            <mesh  position={[Math.cos(rotation.x * 3), Math.sin(rotation.y * 3), 0]}>
                <coneGeometry args={[.5, 1, 32]} computeVertexNormals={true} />
                <meshStandardMaterial />
            </mesh>
        </>
    )
}
