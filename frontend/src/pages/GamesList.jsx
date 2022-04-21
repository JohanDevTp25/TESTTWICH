import { useState } from "react";
import useGames from "../hooks/useGames";

const GamesList = ({ game }) => {
  const { _id, myGame, imagen } = game;
  const { editGame, deleteGame } = useGames();

  const [edit, setedit] = useState(false);
  const [name, setname] = useState('')

  const activeEdit = () => {
    setedit(true);
  };

  const handleSubmit = async e => {
    e.preventDefault()

    try {
      await editGame(_id, name, imagen)
      setedit(false)
    } catch (error) {
      console.log(error);
    }

  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={imagen} alt="videogame Image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xs text-center">{myGame}</div>
      </div>
      <div className="px-2 pt-4 pb-2">
        {edit ? (
             <form
             className="my-1 bg-white shadow rounded-lg px-2 py-2"
             onSubmit={handleSubmit}
           >
             <div className="my-5">
               <label
                 className=" text-center text-gray-600 uppercase block text-xl font-bold"
                 htmlFor="name"
               >
                 Nuevo Nombre
               </label>
               <input
                 type="name"
                 className="w-full mt-3 p-3 border rounded-xl bg-gray-50"
                 name=""
                 id="name"
                 placeholder={myGame}
                 value={name}
                 onChange={(e) => setname(e.target.value)}
               />
             </div>
             <input
               type="submit"
               value="Editar Juego"
               className="bg-violet-700 w-full py-3 text-white font-bold rounded-md hover:cursor-pointer hover:bg-indigo-500 transition-colors mb-5"
             />
             <p className="font-bold text-xs text-center hover:cursor-pointer" onClick={() => setedit(false)}>cancelar</p>
           </form>

        ) : (
          <button
            className="bg-violet-600 w-full p-3 text-white uppercase block mt-5 text-center rounded-lg"
            onClick={activeEdit}
          >
            Editar
          </button>
        )}

        <button
          className="bg-orange-600 w-full p-3 text-white uppercase block mt-5 text-center rounded-lg"
          onClick={() => deleteGame(_id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  );
};

export default GamesList;
