import { useEffect, useState } from 'react';
import CardStatus from '../components/CardStatus';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../components/Button';

function MyPokemon() {
  const [myPokemonTeam, setMyPokemonTeam] = useState([]);
  const navigate = useNavigate();
 
  const handleSubmit = (path) => {
    navigate(path);
  };

  useEffect(() => {
    const savedTeam = JSON.parse(localStorage.getItem('myPokemonTeam')) || [];
    setMyPokemonTeam(savedTeam);
  }, []);
  
  return (
    <div className='min-h-[90vh]'>
      <h2 className="text-center mt-3">Meu Time Pokémon</h2>

      <div className="container flex flex-wrap gap-4 justify-center my-4">
        {myPokemonTeam.length === 0 ? (
          <p className="text-center">Você ainda não selecionou um time.</p>
        ) : (
          myPokemonTeam.map((pokemon) => {
            const types = pokemon.types ? pokemon.types.map((type) => type.type.name) : [];

            return (
              <div key={pokemon.id} className='flex w-[230px] h-[460px] p-2'>
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
              </div>
            );
          })
        )}
      </div>

      <div className="text-center mt-2">
        <h2>Comece a batalhar!</h2>
        <div onClick={() => handleSubmit("/Battle")} className="inline-block">
          <ButtonComponent buttonName="batalhe" />
        </div>

      </div>
    </div>
  );
}

export default MyPokemon;
