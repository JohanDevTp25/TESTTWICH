import {Link, useNavigate} from 'react-router-dom'
import useGames from '../hooks/useGames'


const Header = () => {

  const navigate = useNavigate()

  const {buscador, setbuscador, handleChange} = useGames()

  const logout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  return (
    <header className='px-4 py-5 bg-white border-b'>
        <div className='md:flex md:justify-between'>
            <h2 className='text-4xl text-violet-600 font-black text-center'>TwichApp</h2>
            <input type="search" placeholder='Buscar Juego' className='rounded-lg lg:w-96 block p-2 border' value={buscador} onChange={handleChange} />
            <div className='flex items-center gap-4'>
                <Link to="/games" onClick={() => setbuscador('')} className='font-bold uppercase'>Tus Juegos</Link>
                <button type='button' className='text-white text-sm bg-violet-600 p-3 rounded-md uppercase font-bold' onClick={logout}>Cerrar Sesion</button>
            </div>
        </div>
    </header>
  )
}

export default Header