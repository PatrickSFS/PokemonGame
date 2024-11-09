import { useState, useEffect } from "react";
import Button from '../components/Button';
import CreateRandonTeam from "../components/CreateRadomTeam";
import CardStatus from '../components/CardStatus';
import { Collapse } from 'react-collapse';

// Função de dano
function DamageControl(attack, defense) {
  let damage = attack - (defense / 2);
  return damage > 0 ? damage : 1;
}

// Função principal
function Battle() {
  const [myPokemonTeam, setMyPokemonTeam] = useState([]);
  const [opponentTeam, setOpponentTeam] = useState([]);
  const [log, setLog] = useState([]);
  const [isLogExpanded, setIsLogExpanded] = useState(false);
  const [selectedMyPokemon, setSelectedMyPokemon] = useState(null);
  const [selectedOpponentPokemon, setSelectedOpponentPokemon] = useState(null);

  let combatLogs = [];

  const handleGenerateTeam = async () => {
    try {
      const team = await CreateRandonTeam();
      setOpponentTeam(team);
      localStorage.setItem('opponentPokemonTeam', JSON.stringify(team));
    } catch (error) {
      console.error("Erro ao gerar o time do oponente", error);
    }
  };

  // Recupera itens do localStorage
  useEffect(() => {
    const savedTeam = JSON.parse(localStorage.getItem('myPokemonTeam')) || [];
    setMyPokemonTeam(savedTeam);
  }, []);

  useEffect(() => {
    const savedOpponentTeam = JSON.parse(localStorage.getItem('opponentPokemonTeam')) || [];
    setOpponentTeam(savedOpponentTeam);
  }, []);

  // Função de combate usando os Pokémon selecionados
  function combat() {
    if (!selectedMyPokemon || !selectedOpponentPokemon) {
      alert("Selecione um Pokémon de cada time!");
      return;
    }

    let name1 = selectedMyPokemon.name;
    let name2 = selectedOpponentPokemon.name;
    let hp2 = selectedOpponentPokemon.stats[0].base_stat;
    const attack1 = selectedMyPokemon.stats[1].base_stat;
    const defense2 = selectedOpponentPokemon.stats[2].base_stat;
    const id2 = selectedOpponentPokemon.id;

    // Pokémon 1 ataca o Pokémon 2
    let damage = DamageControl(attack1, defense2);
    combatLogs.push(`${name2} recebeu: ${damage} de dano`);
    hp2 -= damage;

    if (hp2 <= 0) {
      combatLogs.push(`${name2} foi derrotado!`);

      // Atualizar equipe removendo o Pokémon derrotado
      const Data = JSON.parse(localStorage.getItem('opponentPokemonTeam')) || [];
      const updatedTeam = Data.filter(pokemon => pokemon.id !== id2);
      setOpponentTeam(updatedTeam);
      localStorage.setItem('opponentPokemonTeam', JSON.stringify(updatedTeam));
    }

    // Atualiza os logs no estado
    setLog([...log, ...combatLogs]);
  }

  // Função para selecionar Pokémon
  const selectMyPokemon = (pokemon) => {
    setSelectedMyPokemon(pokemon);
  };

  const selectOpponentPokemon = (pokemon) => {
    setSelectedOpponentPokemon(pokemon);
  };

  return (
    <div className="container min-h-screen bg-gradient-to-b from-neutral-900 to-zinc-900 text-white pb-8">
      <Button
        buttonName="Gerar time oponente"
        onclick={handleGenerateTeam}
      />
      <Button
        buttonName="Batalhar"
        onclick={combat}
      />

      {/* Logs de combate com rolagem e expansão */}
      <div className="mt-4">
        <Button
          buttonName={isLogExpanded ? 'Fechar Logs' : 'Abrir Logs'}
          onclick={() => setIsLogExpanded(!isLogExpanded)}
        />
        <Collapse isOpened={isLogExpanded}>
          <div className="overflow-auto bg-gray-700 rounded-lg p-2 max-h-80 w-[25%]">
            {log.map((logItem, index) => (
              <p key={index} className="text-white text-sm mb-1 text-left">{logItem}</p>
            ))}
          </div>
        </Collapse>
      </div>

      <h2>Meu Time</h2>
      <div className="flex flex-wrap">
        {myPokemonTeam.map((pokemon) => {
          const types = pokemon.types ? pokemon.types.map((type) => type.type.name) : [];
          return (
            <div
              key={pokemon.id}
              className={`w-[230px] h-[460px] p-2 cursor-pointer ${selectedMyPokemon?.id === pokemon.id ? 'border-4 border-blue-500' : ''}`}
              onClick={() => selectMyPokemon(pokemon)}
            >
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
        })}
      </div>

      <h2>Time do Oponente</h2>
      <div className="flex flex-wrap">
        {opponentTeam.map((pokemon) => {
          const types = pokemon.types ? pokemon.types.map((type) => type.type.name) : [];
          return (
            <div
              key={pokemon.id}
              className={`w-[230px] h-[460px] p-2 cursor-pointer ${selectedOpponentPokemon?.id === pokemon.id ? 'border-4 border-red-500' : ''}`}
              onClick={() => selectOpponentPokemon(pokemon)}
            >
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
        })}
      </div>
    </div>
  );
}

export default Battle;
