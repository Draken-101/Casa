import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getData } from "./Data";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [devices, setDevices] = useState([]);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    getData(setDevices);

    const socket = new WebSocket('ws://localhost:8000');

    socket.addEventListener('open', () => {
      socket.send(JSON.stringify({ nameUser: 'CLIENT_CASA', role: 'CLIENT', type: 'CONNECTION', message: 'CONNECTION', status: true }));
      console.log('Conexión establecida');
    });
 
    socket.addEventListener('close', () => {
      console.log('Conexión cerrada');
    });

    socket.addEventListener('error', (error) => { 
      console.error('Error en la conexión WebSocket:', error);
    });

    socket.addEventListener('message', (message) => {
      console.log(message.data);
      try {
        const updateDevice = JSON.parse(message.data);
        setDevices((prevDevices) => 
          prevDevices.map((device) => {
            if (device.nameDevice === updateDevice.nameDevice) {
              return { ...device, status: updateDevice.status };
            }
            return device;
          })
        );
      } catch (error) {
        console.error('Error parsing WebSocket message:', error);
      }
    });


    return () => {
      socket.close();
    };
  }, []);

  const value = useMemo(() => ({
    devices,
    setDevices,
    isAuthenticated,
    setIsAuthenticated,
    user,
    setUser,
  }), [
    devices,
    isAuthenticated,
    user
  ]);

  return (
    <UserContext.Provider value={value}>
      {children}
    </UserContext.Provider>
  );
}

export function useUserContext() {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('No hay datos');
  }
  return context;
}
