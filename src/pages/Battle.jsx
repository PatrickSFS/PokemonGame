import { useState, useEffect } from "react";
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

  function combat() {
    if (!selectedMyPokemon || !selectedOpponentPokemon) {
      alert("Selecione um Pokémon de cada time antes de iniciar o combate!");
      return;
    }

    let name1 = selectedMyPokemon.name;
    let name2 = selectedOpponentPokemon.name;
    let hp2 = selectedOpponentPokemon.stats[0].base_stat;
    const attack1 = selectedMyPokemon.stats[1].base_stat;
    const defense2 = selectedOpponentPokemon.stats[2].base_stat;
    const id2 = selectedOpponentPokemon.id;

    // Pokémon do jogador ataca o Pokémon oponente
    let damage = DamageControl(attack1, defense2);
    combatLogs.push(`${name2} recebeu: ${damage} de dano do ${name1}`);
    hp2 -= damage;

    // Atualiza o HP do Pokémon oponente no localStorage
    selectedOpponentPokemon.stats[0].base_stat = hp2;
    localStorage.setItem('opponentPokemonTeam', JSON.stringify(opponentTeam));

    if (hp2 <= 0) {
      combatLogs.push(`${name2} foi derrotado!`);

      // Atualiza a equipe do oponente removendo o Pokémon derrotado
      const updatedTeam = opponentTeam.filter(pokemon => pokemon.id !== id2);
      setOpponentTeam(updatedTeam);
      localStorage.setItem('opponentPokemonTeam', JSON.stringify(updatedTeam));
    }

    // Atualiza os logs no estado
    setLog([...log, ...combatLogs]);

    // Só realiza o contra-ataque se o Pokémon do jogador estiver selecionado
    if (selectedMyPokemon) {
      counterAttack();
      setSelectedOpponentPokemon(null);
      setSelectedMyPokemon(null);
    }
  }


  // função de IA para o contra attack
  function counterAttack() {
    // Verifica se há Pokémon suficientes para o contra-ataque
    if (myPokemonTeam.length === 0 || opponentTeam.length === 0) {
      return;
    }

    // Seleciona um Pokémon aleatório do time do jogador para sofrer o contra-ataque
    const randomMyPokemonIndex = Math.floor(Math.random() * myPokemonTeam.length);
    const targetedPokemon = myPokemonTeam[randomMyPokemonIndex];

    // Define atributos para o cálculo do dano do contra-ataque
    const attack2 = selectedOpponentPokemon.stats[1].base_stat;
    const defense1 = targetedPokemon.stats[2].base_stat;
    let hp1 = targetedPokemon.stats[0].base_stat;

    // Calcula o dano sofrido pelo Pokémon do jogador
    let counterDamage = DamageControl(attack2, defense1);
    combatLogs.push(`${targetedPokemon.name} recebeu: ${counterDamage} de dano do ${selectedOpponentPokemon.name}`);
    hp1 -= counterDamage;

    // Atualiza o HP do Pokémon do jogador no localStorage
    targetedPokemon.stats[0].base_stat = hp1;
    localStorage.setItem('myPokemonTeam', JSON.stringify(myPokemonTeam));

    if (hp1 <= 0) {
      combatLogs.push(`${targetedPokemon.name} foi derrotado!`);

      // Atualiza a equipe do jogador removendo o Pokémon derrotado
      const updatedTeam = myPokemonTeam.filter(pokemon => pokemon.id !== targetedPokemon.id);
      setMyPokemonTeam(updatedTeam);
      localStorage.setItem('myPokemonTeam', JSON.stringify(updatedTeam));
    }

    // Atualiza os logs no estado com o contra-ataque
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
    <div className="container flex flex-col min-h-screen bg-gradient-to-b from-neutral-900 to-zinc-900 text-white">

      {/* Side Section with Buttons and Log */}
      <div className="absolute flex flex-col items-start p-4 space-y-4 bg-neutral-800 rounded-md shadow-lg w-[290px]">
        <button onClick={handleGenerateTeam} className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700">
          Gerar time oponente
        </button>

        <button onClick={combat} className="bg-red-500 text-white p-2 rounded-md hover:bg-red-700">
          Batalhar
        </button>

        <button onClick={() => setIsLogExpanded(!isLogExpanded)} className="bg-yellow-500 text-white p-2 rounded-md hover:bg-yellow-700">
          Log de Batalha
        </button>
        <Collapse isOpened={isLogExpanded}>
          <div className="overflow-auto bg-neutral-700 rounded-lg p-2 max-h-80 w-[85%]">
            {log.map((logItem, index) => (
              <p key={index} className="text-gray-100 text-sm mb-1">{logItem}</p>
            ))}
          </div>
        </Collapse>
      </div>

      {/* Meu Time */}
      <div className="flex items-center mx-[20vw] pt-4">
        {myPokemonTeam.map((pokemon, index) => {
          const types = pokemon.types ? pokemon.types.map((type) => type.type.name) : [];
          return (
            <div
              key={pokemon.id}
              className={`relative w-[230px] h-[440px] cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-110 -ml-20 ${selectedMyPokemon?.id === pokemon.id ? "scale-110" : ''}`}
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

      {/* Time do Oponente */}
      <div className="flex items-center mx-[20vw] pb-5">
        {opponentTeam.map((pokemon, index) => {
          const types = pokemon.types ? pokemon.types.map((type) => type.type.name) : [];
          return (
            <div
              key={pokemon.id}
              className={`relative w-[230px] h-[440px] cursor-pointer transition-transform duration-300 hover:z-10 hover:scale-110 -ml-20 ${selectedOpponentPokemon?.id === pokemon.id ? "scale-110" : ''}`}
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
