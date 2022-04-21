import { useState, useEffect, createContext } from "react";
import { useNavigate } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";

const AuthContext = createContext();
const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const [cargando, setcargando] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    return () => {
      autenticarUsuario();
    };
  }, []);

  const autenticarUsuario = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      setcargando(false);
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      const { data } = await clienteAxios("/users/profile", config);
      setAuth(data);

      navigate("/games");
      
    } catch (error) {
      setAuth({});
    }

    setcargando(false);
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        cargando,
        setAuth,
        autenticarUsuario,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { AuthProvider };

export default AuthContext;
