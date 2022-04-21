import { useState, useEffect } from "react";
import useGames from "../hooks/useGames"
import clienteAxios from "../config/clienteAxios";
import GameTwichList from "./GameTwichList";
import Alert from "../components/Alert";


const TwichGames = () => {
  const token = localStorage.getItem("token");

  const {alerta, twichGames, settwichGames} = useGames()
  

  const {msg} = alerta


  return (
    <>
    {msg && <Alert alerta={alerta} />}
    <div className="grid grid-cols-6 gap-6">
      { twichGames.map( game => 
         <GameTwichList
            key={game.id}
            id={game.id}
            name={game.name}
            url={game.box_art_url}
        />
      )}
    </div>
    </>
  );
};

export default TwichGames;
