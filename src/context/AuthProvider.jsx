import { useState, useEffect, createContext } from "react";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const autenticarUsuario = async () => {
      const token = localStorage.getItem("x-token");
      if (!token) {
        setCargando(false);
        return;
      }
      try {
        const { data } = await clienteAxios("/usuarios/perfiles");
        setAuth({ ...data.usuario });
      } catch (error) {}
      setCargando(false);
    };
    autenticarUsuario();
  }, []);

  const cerrarSesionAuth = () => {
    setAuth({});
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ setAuth, auth, cargando, cerrarSesionAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
