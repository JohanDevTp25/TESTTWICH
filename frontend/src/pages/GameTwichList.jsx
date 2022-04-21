import useGames from "../hooks/useGames";

const GameTwichList = ({ id, name, url }) => {
  const {  submitGame } = useGames();

  let img = url.split("{");
  let link = `${img[0]}200x300.jpg`;

  const handleSubmit = async () => {

    await submitGame({ id, name, link });
  };

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <img className="w-full" src={link} alt="videogame Image" />
      <div className="px-6 py-4">
        <div className="font-bold text-xs text-center">{name}</div>
      </div>
      <div className="px-2 pt-4 pb-2">
        <button
          className="bg-violet-600 w-full p-3 text-white uppercase block mt-1 text-center rounded-lg"
          type="button"
          onClick={handleSubmit}
        >
          Agregar
        </button>
      </div>
    </div>
  );
};

export default GameTwichList;
