import clienteAxios from "../config/clienteAxios"
import { useState } from "react";
import { Link } from "react-router-dom";
import Alert from "../components/Alert";

const ResetPass = () => {
  const [email, setEmail] = useState('')
  const [alert, setAlert] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()

    if(email === '' || email.length < 6){
      setAlert({
        msg: 'El email es obligatorio',
        error: true
      })
      return
    }

    try {
      const {data} = await clienteAxios.post(`/users/reset-pass`, {
        email
      })
      setAlert({
        msg: data.msg,
        error: false
      })
    } catch (error) {
      console.log(error);
      setAlert({
        msg: error.response.data.msg,
        error: true
      })
    }
  }

  const {msg} = alert

  return (
    <>
      <h1 className="text-violet-600 font-black text-6xl">
        {" "}
        Recupera tu acceso y no pierdas tus {" "}
        <span className="text-indigo-800">juegos</span>
      </h1>
      {msg && <Alert alerta={alert}/>}
      <form className="my-10 bg-white shadow rounded-lg px-10 py-10" onSubmit={handleSubmit}>
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
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Enviar Instrucciones"
          className="bg-violet-700 w-full py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-indigo-500 transition-colors mb-5"
        />
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
        ya tienes una cuenta? Incia Sesion</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/signup">
        No tienes una cuenta? Registrate</Link>
      </nav>
    </>
  )
}

export default ResetPass