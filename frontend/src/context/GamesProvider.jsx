import { useState, useEffect, createContext } from "react";
import { useLocation } from "react-router-dom";
import clienteAxios from "../config/clienteAxios";
import useAuth from '../hooks/useAuth'


const GamesContext = createContext();

const GamesProvider = ({ children }) => {

  const location = useLocation()
  const {auth} = useAuth()

  const [copyTwich, setcopyTwich] = useState([])
  const [copyGames, setcopyGames] = useState([])
  const [twichGames, settwichGames] = useState([]);
  const [games, setgames] = useState([]);
  const [alerta, setalerta] = useState([]);
  const [buscador, setbuscador] = useState("");

  useEffect(() => {
    return () => {
      get100();
    };
  }, []);

  useEffect(() => {
    return () => {
      listGames();
    };
  }, [auth]);


  const mostrarAlerta = (alerta) => {
    setalerta(alerta);
    setTimeout(() => {
      setalerta({});
    }, 2000);
  };

  const handleChange = e => {
    setbuscador(e.target.value)
    handleSearch(e.target.value)
  }

  const handleSearch = (buscador) => {
    if (location.pathname === '/games') {
      const search = copyGames.filter((game) => {
        if (game.myGame.toString().toLowerCase().includes(buscador.toLowerCase())) {
          return game
        }
      } );
      setgames(search);
    }else{
      const search = copyTwich.filter((game) => {
        if (game.name.toString().toLowerCase().includes(buscador.toLowerCase())) {
          return game
        }
      } );
      settwichGames(search);
    }
  };

  const get100 = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await clienteAxios("/games/twich-games", config);
      settwichGames(data.data);
      setcopyTwich(data.data)
    } catch (error) {
      console.log(error);
    }
  };

  const listGames = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios("/games", config);
      setgames(data);
      setcopyGames(data)
    } catch (error) {
      console.log(error);
    }
  };

  const submitGame = async (game) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.post(
        "/games",
        {
          game: game.id,
          myGame: game.name,
          imagen: game.link,
        },
        config
      );
      setgames([...games, data]);

      mostrarAlerta({
        msg: "Juego Agregado a tu lista",
        error: false,
      });
    } catch (error) {
      mostrarAlerta({
        msg: error.response.data.msg,
        error: true,
      });
      console.log(error);
    }
  };

  const editGame = async (id, name, imagen) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.put(
        `/games/${id}`,
        {
          myGame: name,
          imagen: imagen,
        },
        config
      );

      const updatedGames = games.map((gameState) =>
        gameState._id === data._id ? data : gameState
      );

      setgames(updatedGames);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteGame = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await clienteAxios.delete(`/games/${id}`, config);

      mostrarAlerta({
        msg: data.msg,
        error: false,
      });

      await listGames();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <GamesContext.Provider
      value={{
        twichGames,
        games,
        alerta,
        buscador,
        mostrarAlerta,
        setbuscador,
        submitGame,
        editGame,
        deleteGame,
        settwichGames,
        handleChange
      }}
    >
      {children}
    </GamesContext.Provider>
  );
};

export { GamesProvider };

export default GamesContext;
