import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getData } from "./Data";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [devices, setDevices] = useState([]);
  const [user, setUser] = useState({});
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    getData(setDevices);
  }, []);

  const value = useMemo(() => ({
    devices, setDevices,
    isAuthenticated, setIsAuthenticated,
    user, setUser
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
