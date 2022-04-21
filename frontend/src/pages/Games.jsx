import Alert from "../components/Alert";
import useGames from "../hooks/useGames";
import GamesList from "./GamesList";


const Games = () => {
  const { alerta, games, buscador } = useGames();

  const {msg} = alerta
  
  return (
    <>
      <h1 className="text-4xl font-black">{games.length ? "Esta es tu biblioteca de juegos" : "Agrega nuevos juegos a tu vida" }</h1>
      
       {msg && <Alert alerta={alerta} />}

      <div className="grid grid-cols-6 gap-6 mt-10">
        {games.length ? (
          games.map((game) => (
            <GamesList key={game._id} game={game}/>
          ))
        ): <h2>Aqui se vera tu lista</h2>}
      </div>
    </>
  );
};

export default Games;
