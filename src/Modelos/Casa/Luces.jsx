import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from "@react-three/fiber";
import { a, useSpring } from '@react-spring/three';

export function Luz({ data }) {
    const lightRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        setIsOn(data.status);
        return () => {
            
        };
    }, [data.status]);

    const { scaleSpring, colorEmissive, lightIntensity } = useSpring({
        scaleSpring: hovered ? 0.5 : 0.3,
        colorEmissive:  isOn ? hovered ? '#2e2e2e' : '#ffffff' : hovered ? '#ffffff' : '#2e2e2e' ,
        lightIntensity: isOn ? 150 : 0,
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
                position={data.position}
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
                position={data.position}
                color={'white'}
                intensity={lightIntensity}
                distance={100}
                decay={2}
                castShadow
            />
        </>
    );
}