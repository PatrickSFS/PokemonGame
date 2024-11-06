import { useEffect, useState } from 'react';
import CardComponent from '../components/Card';

function MyPokemon() {
  const [myPokemonTeam, setMyPokemonTeam] = useState([]);

  useEffect(() => {
    // Carregar o time salvo no localStorage
    const savedTeam = JSON.parse(localStorage.getItem('myPokemonTeam')) || [];
    setMyPokemonTeam(savedTeam);
  }, []);

  return (
    <div className='container min-h-[90vh]'>
      <h2 className="text-center">Meu Time Pokémon</h2>

      {myPokemonTeam.length === 0 ? (
        <p className="text-center">Você ainda não selecionou um time.</p>
      ) : (
        <div className="grid grid-cols-5 gap-4">
          {myPokemonTeam.map(pokemon => (
            <CardComponent
              key={pokemon.id}
              src={pokemon.sprites.front_default}
              name={pokemon.name}
              id={pokemon.id}
              types={pokemon.types.map(typeInfo => typeInfo.type.name).join(', ')}
              abilities={pokemon.abilities.map(abilityInfo => abilityInfo.ability.name).join(', ')}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyPokemon;
