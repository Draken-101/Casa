import { useFrame } from "@react-three/fiber";
import { useState } from "react";
import { OrbitControls } from "@react-three/drei";


export function MyAnimatedBox() {
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 5 });
    useFrame(({ clock }) => {
        setRotation({ x: rotation.x + .01, y: rotation.y + .01, z: rotation.z - .01 })
        let a = clock.getElapsedTime()
        console.log(a)
    })
    return (
        <>
            <OrbitControls/>
            <mesh position={[Math.cos(rotation.x * 3), Math.sin(rotation.y * 3 ), 0]} rotation={[0,0,0]} >
                <boxGeometry />
                <meshStandardMaterial color={'purple'} />
            </mesh>
        </>
    )
}