import React, { useEffect, useRef, useState } from 'react';
import { useGLTF } from '@react-three/drei';
import axios from 'axios';
import { useUserContext } from '../../Context/useContext';

export function Clima(props) {
  const { nodes, materials } = useGLTF('/Clima-transformed.glb');
  const [onOff, setOnOff] = useState(false);
  const lightRef = useRef();

  const { devices, user } = useUserContext();

  useEffect(() => {
    const device = devices.find(device => device.nameDevice === 'Clima');
    setOnOff(device.status);

    return () => {

    };
  }, [devices]);
  const trigger = async () => {
    const body = JSON.stringify({
      nameUser: user.name,
      nameDevice: 'Clima',
      roleUser: user.role
    })
    const headers = {// Usando Bearer token para autorización
      'Content-Type': 'application/json'  // Tipo de contenido del cuerpo de la solicitud
    };
    await axios.post(`http://localhost:3000/api/v1/devices/trigger`, body, { headers })
      .then(data => {
        setOnOff(data.triggerDevice?.status);
      });
  }
  // Asegurarse de que la intensidad de la emisividad sea alta
  materials.On.emissiveIntensity = 4;  // Asegúrate de ajustar esto según sea necesario
  materials.On.toneMapped = false;     // Desactivar el mapeo de tonos para mantener el color brillante

  return (
    <group {...props} dispose={null}>
      <group position={[-6.113, 18.285, 3.88]} rotation={[0, 0, -Math.PI]} scale={[-0.19, -0.222, -23.169]} onClick={trigger}>
        <mesh castShadow receiveShadow geometry={nodes.Clima001.geometry} material={materials['Material.001']} />
        <mesh castShadow receiveShadow geometry={nodes.Clima001_1.geometry} material={onOff ? materials.On : materials.Off} />
        <mesh castShadow receiveShadow geometry={nodes.Clima001_2.geometry} material={materials.Off} />
        <mesh castShadow receiveShadow geometry={nodes.Clima001_3.geometry} material={materials['monitor body']} />
        <mesh castShadow receiveShadow geometry={nodes.Clima001_4.geometry} material={materials['Material.008']} />
      </group>
      <group position={[-12.521, 14.006, -13]} rotation={[0, -Math.PI / 2, 0]} scale={[1, 1.556, 1.275]}>
        <mesh castShadow receiveShadow geometry={nodes.Cubo_1.geometry} material={materials.Vidrio} />
        <mesh castShadow receiveShadow geometry={nodes.Cubo_2.geometry} material={materials.Metal} />
      </group>
      {/* Añadir PointLight */}
      <pointLight
        ref={lightRef}
        position={[-8, 18.285, 3.18]}
        color={0x00ff00}
        intensity={onOff ? 10 : 0}  // Intensidad de la luz
        distance={10}  // Ajusta la distancia según necesites
        decay={2}  // Ajusta la atenuación según necesites
        castShadow
      />
    </group>
  );
}

useGLTF.preload('/Clima-transformed.glb');
