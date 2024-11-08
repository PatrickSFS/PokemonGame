import CardStatus from '../components/CardStatus';
import { useEffect, useState } from 'react';
import axios from 'axios';

function PokemonCatcher() {
  const [data, setData] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    alert('Time salvo com sucesso!');
  };

  if (loading) return <p>Carregando...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="container min-h-screen bg-gradient-to-b from-neutral-900 to-zinc-900 text-white pb-8">
      <div className='text-center'>
        <h2>Monte seu time!</h2>
        <h2>Escolha até 5 pokémons</h2>
        <p>Selecionados: {selectedTeam.length} / 5</p>
      </div>

      <div className='grid grid-cols-5 gap-4'>
        {data.map(pokemon => {
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
        })}
      </div>

      {selectedTeam.length < 5 && (
        <div className="text-center mt-4">
          <p>Selecione mais Pokémon para completar seu time!</p>
        </div>
      )}

      {selectedTeam.length === 5 && (
        <div className="text-center mt-4">
          <button
            onClick={saveTeam}
            className="bg-green-500 text-white p-2 rounded"
          >
            Salvar meu time
          </button>
        </div>
      )}
    </div>
  );
}

export default PokemonCatcher;
