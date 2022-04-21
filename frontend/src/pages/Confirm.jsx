import React, { useEffect, useState } from 'react'
import {useParams, Link} from 'react-router-dom'
import axios from 'axios'
import Alert from '../components/Alert'
import clienteAxios from '../config/clienteAxios'

const Confirm = () => {

  const params = useParams();
  const {token} = params

  const [alert, setAlert] = useState({})
  const [confirmed, setConfirmed] = useState(false)

  useEffect(() => {
    return () => {
      confirmarCuenta()
    }
  }, [])
  
   
  const confirmarCuenta = async () => {
    try {
      const url = `/users/confirm/${token}`
      const {data} = await clienteAxios(url)
      setAlert({
        msg: data.msg,
        error: false
      })
      setConfirmed(true)
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
      Confirma tu cuenta y agrega nuevos{" "}
      <span className="text-indigo-800">juegos</span>
    </h1>
    <div className='mt-20 md:mt-5 shadow-lg px-5 py-10 rounded-xl bg-white'>
      {msg && <Alert alerta={alert}/>}
      {confirmed && (
          <Link className="block text-center my-5 text-slate-500 uppercase text-sm" to="/">
          Proceso culminado. Incia Sesion</Link>
      )}
    </div>
    </>
  )
}

export default Confirm