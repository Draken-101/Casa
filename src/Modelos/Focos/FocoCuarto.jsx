import React, { useEffect, useRef, useState } from 'react';
import { useFrame } from "@react-three/fiber";
import { a, useSpring } from '@react-spring/three';
import { useUserContext } from '../../Context/useContext';
import axios from 'axios';

export function FocoCuarto() {
    const { devices, user } = useUserContext();
    const lightRef = useRef();
    const [hovered, setHovered] = useState(false);
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        const device = devices.find(device => device.name === 'Foco-Cuarto-1');
        setIsOn(device.status);
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
            name: 'Foco-Cuarto-1'
        })
        const headers = {
            'token': `${user.token}`,  // Usando Bearer token para autorización
            'Content-Type': 'application/json'  // Tipo de contenido del cuerpo de la solicitud
        };
        await axios.post(`http://localhost:3000/api/v1/devices/trigger`, body, { headers })
            .then(data => {
                setIsOn(data.triggerDevice.status)
            });
    }

    return (
        <>
            <a.mesh
                position={[2, 20, 0]}
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
                position={[2, 20, 0]}
                color={'white'}
                intensity={lightIntensity}
                castShadow
            />
        </>
    );
}