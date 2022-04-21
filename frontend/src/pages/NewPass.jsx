import { useEffect, useState } from "react";
import Alert from "../components/Alert";
import { Link, useParams } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";


const NewPass = () => {
  const params = useParams();
  const { token } = params;

  const [password, setpassword] = useState('')
  const [alert, setAlert] = useState({});
  const [confirmed, setConfirmed] = useState(false);
  const [passModified, setpassModified] = useState(false)

  useEffect(() => {
    return () => {
      confirmarToken();
    };
  }, []);

  const confirmarToken = async () => {
    try {
      const url = `/users/reset-pass/${token}`;
     await clienteAxios(url);
      setConfirmed(true);
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
  };


  const handleSubmit = async(e) => {
    e.preventDefault()

    if(password.length < 6){
      setAlert({
        msg: 'El password debe ser superior a 6 caractares',
        error: true,
      });
      return
    }

    try {
      const url = `/users/reset-pass/${token}`;
     const {data} = await clienteAxios.post(url, {
       password
     });
     setAlert({
      msg: data.msg,
      error: false,
    });
    setpassModified(true)
    } catch (error) {
      setAlert({
        msg: error.response.data.msg,
        error: true,
      });
    }
    
  }

  const { msg } = alert;

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl">
        {" "}
        Restablece tu password y no pierdas acceso a tus{" "}
        <span className="text-indigo-800">juegos</span>
      </h1>
      {msg && <Alert alerta={alert} />}
      {confirmed && (
        <form className="my-10 bg-white shadow rounded-lg px-10 py-10" onSubmit={handleSubmit}>
          <div className="my-5">
            <label
              className="text-gray-600 uppercase block text-xl font-bold"
              htmlFor="password"
            >
              Nuevo Password
            </label>
            <input
              type="password"
              className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
              name=""
              id="password"
              placeholder="Escribe Tu Nuevo Password"
              value={password}
              onChange={e => setpassword(e.target.value)}
            />
          </div>
          <input
            type="submit"
            value="Guardar Nuevo Password"
            className="bg-violet-700 w-full py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-indigo-500 transition-colors mb-5"
          />
        </form>
      )}
      {passModified && (
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
          Proceso culminado. Incia Sesion</Link>
      )}
    </>
  );
};

export default NewPass;
