import CardStatus from '../components/CardStatus';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Skeleton from '@mui/material/Skeleton';
import Alert from '@mui/material/Alert';
import CheckIcon from '@mui/icons-material/Check';

function PokemonCatcher() {
  const [data, setData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  // Load team from localStorage and update whenever selectedTeam changes
  useEffect(() => {
    const storedTeam = JSON.parse(localStorage.getItem('myPokemonTeam')) || [];
    setSelectedTeam(storedTeam);

    const fetchData = async () => {
      try {
        const randomIds = getRandomPokemons(10, 1, 1025);
        const requests = randomIds.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
        const responses = await Promise.all(requests);
        const pokemonsData = responses.map(response => response.data);
        setData(pokemonsData);
      } catch (e) {
        console.error('Erro ao buscar dados:', e);
        setError('Não foi possível carregar os dados.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    localStorage.setItem('myPokemonTeam', JSON.stringify(selectedTeam));
  }, [selectedTeam]);

  // Function to generate random Pokémon IDs
  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function getRandomPokemons(count, min, max) {
    const ids = new Set();
    while (ids.size < count) {
      ids.add(getRandomInt(min, max));
    }
    return Array.from(ids);
  }

  const toggleSelectPokemon = (pokemon) => {
    setSelectedTeam((prevTeam) => {
      if (prevTeam.find(p => p.id === pokemon.id)) {
        return prevTeam.filter(p => p.id !== pokemon.id);
      } else if (prevTeam.length < 5) {
        return [...prevTeam, pokemon];
      } else {
        return prevTeam;
      }
    });
  };

  const saveTeam = () => {
    setShowAlert(true);
    setTimeout(() => setShowAlert(false), 3000); // O alerta desaparecerá após 3 segundos
  };

  if (error) return <p>{error}</p>;

  return (
    <div className="container min-h-screen bg-gradient-to-b from-neutral-900 to-zinc-900 text-white pb-8">
<div className='text-center py-6'>
  <h2 className="text-2xl font-bold text-white mb-2">Monte seu time!</h2>
  <h3 className="text-lg text-gray-400 mb-4">Escolha até 5 pokémons</h3>
  <p className="text-xl text-green-500 mb-4">Selecionados: {selectedTeam.length} / 5</p>

  {selectedTeam.length < 5 && (
    <p className="text-sm text-gray-300 mb-4">Selecione mais Pokémon para completar seu time!</p>
  )}

  {selectedTeam.length === 5 && (
    <button
      onClick={saveTeam}
      className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
    >
      Salvar meu time
    </button>
  )}
</div>

      <div className='grid grid-cols-5 gap-4 w-[80%] m-auto'>
        {loading ? (
          Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="rounded-lg w-[235px]">
              <Skeleton variant="rectangular" width={210} height={118} />
              <Skeleton width="60%" />
              <Skeleton width="80%" />
            </div>
          ))
        ) : (
          data.map(pokemon => {
            const types = pokemon.types.map(typeInfo => typeInfo.type.name).join(', ');
            const isSelected = selectedTeam.find(p => p.id === pokemon.id);

            return (
              <div
                key={pokemon.id}
                onClick={() => toggleSelectPokemon(pokemon)}
                className={`cursor-pointer ${isSelected ? 'bg-green-500' : 'bg-transparent'} rounded-lg w-[235px]`}
              >
                <CardStatus
                  src={pokemon.sprites.front_default}
                  name={pokemon.name}
                  id={pokemon.id}
                  types={types}
                  hp={pokemon.stats[0].base_stat || 0}
                  attack={pokemon.stats[1].base_stat || 0}
                  defense={pokemon.stats[2].base_stat || 0}
                  specialAttack={pokemon.stats[3].base_stat || 0}
                  specialDefense={pokemon.stats[4].base_stat || 0}
                  speed={pokemon.stats[5].base_stat || 0}
                />
              </div>
            );
          })
        )}
      </div>

      {showAlert && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 w-full max-w-xs">
          <Alert icon={<CheckIcon fontSize="inherit" />} severity="success">
            Time salvo com sucesso!
          </Alert>
        </div>
      )}
    </div>
  );
}

export default PokemonCatcher;
