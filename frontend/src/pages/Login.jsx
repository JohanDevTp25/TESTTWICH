import { useState } from "react";
import { Link } from "react-router-dom";
import Alerta from "../components/Alert";
import clienteAxios from "../config/clienteAxios";
import useAuth from "../hooks/useAuth";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [alert, setAlert] = useState({});

  const { setAuth, autenticarUsuario } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if ([email, password].includes("")) {
      setAlert({
        msg: "Todos los campos son obligatios",
        error: true,
      });
      return;
    }

    try {
      const url = `/users/login`;
      const { data } = await clienteAxios.post(url, {
        email,
        password,
      });
      localStorage.setItem("token", data.token);
      setAuth(data);
      await autenticarUsuario()
      setAlert({});
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };

  const { msg } = alert;

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl">
        {" "}
        Inicia sesion y administra tus{" "}
        <span className="text-indigo-800">juegos</span>
      </h1>
      {msg && <Alerta alerta={alert} />}
      <form
        className="my-10 bg-white shadow rounded-lg px-10 py-10"
        onSubmit={handleSubmit}
      >
        <div className="my-5">
          <label
            className="text-gray-600 uppercase block text-xl font-bold"
            htmlFor="email"
          >
            Email
          </label>
          <input
            type="email"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name=""
            id="email"
            placeholder="Email de registro"
            value={email}
            onChange={(e) => setemail(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="text-gray-600 uppercase block text-xl font-bold"
            htmlFor="password"
          >
            Password
          </label>
          <input
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name=""
            id="password"
            placeholder="Tu Password"
            value={password}
            onChange={(e) => setpassword(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Inciar Sesion"
          className="bg-violet-700 w-full py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-indigo-500 transition-colors mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/signup"
        >
          No tienes una cuenta? Registrate
        </Link>
        <Link
          className="block text-center my-5 text-slate-500 uppercase text-sm"
          to="/reset-pass"
        >
          Olvide mi password
        </Link>
      </nav>
    </>
  );
};

export default Login;
