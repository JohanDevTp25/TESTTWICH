import React from 'react'
import { Link } from 'react-router-dom'
import useAuth from '../hooks/useAuth'
import useGames from '../hooks/useGames'

const Sidebar = () => {

  const {auth} = useAuth()
  const {setbuscador} = useGames()

  const {nombre} = auth.msg

  return (
    <aside className='md:w-80 lg:w-96 px-5 py-10'>
        <p className='text-xl font-bold'>Hola: {nombre}</p>
        <Link to="twich-Games" onClick={() => setbuscador('')} className='bg-violet-600 w-full p-3 text-white uppercase block mt-5 text-center rounded-lg'>Añadir Juegos</Link>
    </aside>
  )
}

export default Sidebar