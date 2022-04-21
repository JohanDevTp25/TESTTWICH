import { useState } from "react"
import { Link } from "react-router-dom"
import Alert from "../components/Alert"
import clienteAxios from "../config/clienteAxios"

const SignUp = () => {

  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repPass, setRepPass] = useState('')
  const [alert, setAlert] = useState({})


  const handleSubmit = async (e) => {
    e.preventDefault()

    if ([nombre, email, password, repPass].includes('')) {
      setAlert({
        msg: 'Todos los campos son obigatiorios',
        error: true
      })
      return
    }

    if( password !== repPass){
      setAlert({
        msg: 'Los passwords no son iguales',
        error: true
      })
      return
    }

    if (password.length < 6) {
      setAlert({
        msg: 'Agrega minimo 6 caracteres',
        error: true
      })
      return
    }

    setAlert({})

    try {
      const {data} = await clienteAxios.post( `/users`, {
        nombre,
        email, 
        password
      })

      setAlert({
        msg: data.msg,
        error: false
      })

      setNombre('')
      setPassword('')
      setEmail('')
      setRepPass('')
    } catch (error) {
      
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
        Crea tu cuenta y administra tus {" "}
        <span className="text-indigo-800">juegos</span>
      </h1>
      {msg && <Alert alerta={alert} />}
      <form className="my-10 bg-white shadow rounded-lg px-10 py-10" onSubmit={handleSubmit}>
      <div className="my-5">
          <label
            className="text-gray-600 uppercase block text-xl font-bold"
            htmlFor="nombre"
          >
            Nombre Usuario
          </label>
          <input
            type="text"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name=""
            id="nombre"
            placeholder="Tu nombre"
            value={nombre}
            onChange={e => setNombre(e.target.value)}
          />
        </div>
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
            onChange={e => setPassword(e.target.value)}
          />
        </div>
        <div className="my-5">
          <label
            className="text-gray-600 uppercase block text-xl font-bold"
            htmlFor="password2"
          >
           Repetir Password
          </label>
          <input
            type="password"
            className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
            name=""
            id="password2"
            placeholder="Repetir Tu Password"
            value={repPass}
            onChange={e => setRepPass(e.target.value)}
          />
        </div>
        <input
          type="submit"
          value="Crear Cuenta"
          className="bg-violet-700 w-full py-3 text-white uppercase font-bold rounded-md hover:cursor-pointer hover:bg-indigo-500 transition-colors mb-5"
        />
        
      </form>
      <nav className="lg:flex lg:justify-between">
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
        ya tienes una cuenta? Incia Sesion</Link>
        <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/reset-pass">
        Olvide mi password</Link>
      </nav>
    </>
  )
}

export default SignUp