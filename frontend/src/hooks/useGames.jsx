import {useContext} from 'react'
import GamesContext from '../context/GamesProvider'

const useGames = () => {
    return useContext(GamesContext)
}

export default useGames