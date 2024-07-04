import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from "@react-three/fiber";
import { a, useSpring } from '@react-spring/three';
import { useUserContext } from '../../Context/useContext';
import axios from 'axios';

export function FocoPorton2() {
    const { devices, user } = useUserContext();
    const lightRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        const device = devices.find(device => device.name === 'Foco-Porton-2');
        setIsOn(device.status);
        return () => {

        };
    }, [devices]);

    const { scaleSpring, colorEmissive, lightIntensity } = useSpring({
        scaleSpring: hovered ? 0.5 : 0.3,
        colorEmissive: isOn ? hovered ? '#2e2e2e' : '#ffffff' : hovered ? '#ffffff' : '#2e2e2e',
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

    const trigger = async () => {
        const body = JSON.stringify({
            nameUser: user.name,
            role:user.role,
            name: 'Foco-Porton-2'
        })
        const headers = {
            'token': `${user.token}`,  
            'Content-Type': 'application/json'
        };
        await axios.post(`http://localhost:3000/api/v1/devices/trigger`, body, { headers })
            .then(data => {
                setIsOn(data.triggerDevice.status)
            });
    }

    return (
        <>
            <a.mesh
                position={[-3.777, 8.5, -18]}
                onClick={trigger}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
                scale={scaleSpring}
            >
                <sphereGeometry args={[1, 32, 32]} />
                <a.meshStandardMaterial
                    color={hovered ? 'white' : 'gray'}
                    emissive={colorEmissive}
                />
            </a.mesh>
            <a.pointLight
                ref={lightRef}
                position={[-3.777, 8.5, -18]}
                color={'white'}
                intensity={lightIntensity}
                castShadow
            />
        </>
    );
}