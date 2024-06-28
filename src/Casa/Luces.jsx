import React, { useRef, useState } from 'react';
import { useFrame } from "@react-three/fiber";
import { a, useSpring } from '@react-spring/three';
import * as THREE from 'three';

export function Luz({ position }) {
    const lightRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [isOn, setIsOn] = useState(false);

    const { scaleSpring, colorEmissive, lightIntensity } = useSpring({
        scaleSpring: hovered ? 0.5 : 0.3,
        colorEmissive:  isOn ? hovered ? '#2e2e2e' : '#ffffff' : hovered ? '#ffffff' : '#2e2e2e' ,
        lightIntensity: isOn ? 150 : 0,
        config: { mass: 2, tension: 300, friction: 30 }
    });

    useFrame(({ clock }) => {
        if (lightRef.current) {
            lightRef.current.intensity = lightIntensity.get();
            const pulseFactor = 1 + Math.sin(clock.elapsedTime * 4) * 0.05;
            const currentScale = scaleSpring.get() * pulseFactor;
            lightRef.current.scale.set(currentScale, currentScale, currentScale);
        }
    });

    return (
        <>
            <a.mesh
                position={position}
                onClick={() => setIsOn(!isOn)}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={scaleSpring}
            >
                <sphereGeometry args={[0.5, 32, 32]} />
                <a.meshStandardMaterial 
                    color={hovered ? 'white' : 'gray'} 
                    emissive={colorEmissive}
                    emissiveIntensity={2}
                />
            </a.mesh>
            <a.pointLight
                ref={lightRef}
                position={position}
                color={'white'}
                intensity={lightIntensity}
                distance={100}
                decay={2}
                castShadow
            />
        </>
    );
}