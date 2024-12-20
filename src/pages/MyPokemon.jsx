import { useEffect, useState } from 'react';
import CardStatus from '../components/CardStatus';
import { useNavigate } from 'react-router-dom';
import Skeleton from '@mui/material/Skeleton';

function MyPokemon() {
  const [myPokemonTeam, setMyPokemonTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (path) => {
    navigate(path);
  };

  const handleDeletePokemon = (id) => {
    const updatedTeam = myPokemonTeam.filter(pokemon => pokemon.id !== id);
    setMyPokemonTeam(updatedTeam);
    localStorage.setItem('myPokemonTeam', JSON.stringify(updatedTeam));
  };

  useEffect(() => {
    const savedTeam = JSON.parse(localStorage.getItem('myPokemonTeam')) || [];
    setTimeout(() => {
      setMyPokemonTeam(savedTeam);
      setIsLoading(false); 
    }, 1000);
  }, []);

  return (
    <div className="container min-h-screen bg-gradient-to-b from-neutral-900 to-zinc-900 text-white pb-8">
      <h2 className="text-center pt-4 text-2xl font-semibold">Meu Time Pokémon</h2>

      <div className="container flex flex-wrap gap-4 justify-center my-4">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-lg w-[235px]">
              <Skeleton variant="rectangular" width={240} height={118} />
              <Skeleton width="60%" />
              <Skeleton width="40%" />
            </div>
          ))
        ) : myPokemonTeam.length === 0 ? (
          <p className="text-center text-xl">Você ainda não selecionou um time.</p>
        ) : (
          myPokemonTeam.map((pokemon) => {
            const types = pokemon.types ? pokemon.types.map((type) => type.type.name) : [];

            return (
              <div key={pokemon.id} className="relative">
                <CardStatus
                  src={pokemon.sprites.front_default}
                  name={pokemon.name}
                  id={pokemon.id}
                  types={types.join(', ')}
                  hp={pokemon.stats[0].base_stat || 0}
                  attack={pokemon.stats[1].base_stat || 0}
                  defense={pokemon.stats[2].base_stat || 0}
                  specialAttack={pokemon.stats[3].base_stat || 0}
                  specialDefense={pokemon.stats[4].base_stat || 0}
                  speed={pokemon.stats[5].base_stat || 0}
                />
                {/* Delete Button */}
                <button
                  onClick={() => handleDeletePokemon(pokemon.id)}
                  className="absolute w-[30px] top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-700"
                >
                  X
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="text-center mt-4">
        <h2 className="text-2xl font-semibold">Comece a batalhar!</h2>
        <div onClick={() => handleSubmit("/Battle")} className="inline-block mt-3">
          <button
            className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
          >
            Batalhe
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyPokemon;
