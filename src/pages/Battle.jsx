import { useState, useEffect } from "react";
import Button from '../components/Button';
import CreateRandonTeam from "../components/CreateRadomTeam";
import CardStatus from '../components/CardStatus';

// Função de dano
function DamageControl(attack, defense) {
  let damage = attack - (defense/2);
  if(damage <= 0){
    damage =1;
    return damage;
  }else
  return damage;
}

// Função principal
function Battle() {
  const [myPokemonTeam, setMyPokemonTeam] = useState([]);
  const [opponentTeam, setOpponentTeam] = useState([]);
  const [log, setLog] = useState([]);

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

  // recupera itens do localStorage 
  useEffect(() => {
    const savedTeam = JSON.parse(localStorage.getItem('myPokemonTeam')) || [];
    setMyPokemonTeam(savedTeam);
  }, []);

  useEffect(() => {
    const savedOpponentTeam = JSON.parse(localStorage.getItem('opponentPokemonTeam')) || [];
    setOpponentTeam(savedOpponentTeam);

  }, []);


  function combat(pokemon1, pokemon2) {

    if (myPokemonTeam.length === 0) {
      console.log("Todos os seus pokemons morreram!");
    } else if (opponentTeam.length === 0) {
      console.log("Todos os pokemons do adversário morreram!");
    } else {
      console.log("O combate continua!");


      let name1 = pokemon1[0].name;
      let name2 = pokemon2[0].name;

      let hp1 = pokemon1[0].stats[0].base_stat;
      let hp2 = pokemon2[0].stats[0].base_stat;

      const attack1 = pokemon1[0].stats[1].base_stat;
      const attack2 = pokemon2[0].stats[1].base_stat;

      const defense1 = pokemon1[0].stats[2].base_stat;
      const defense2 = pokemon2[0].stats[2].base_stat;

      combatLogs.push(`${name1}, Vs ${name2}`);


      let turn = 1;
      while (hp1 > 0 && hp2 > 0 && turn < 20) {
        combatLogs.push(`----- Turno -----`);
        

        // pokemon 1 ataca o  pokemon 2
        let damage = DamageControl(attack1, defense2);
        combatLogs.push(`${name2} recebeu: ${damage} de dano`);
        hp2 = hp2 - damage;
        if(hp2 <=0){
          hp2 = 0;
        }
        combatLogs.push(`${name2} Vida atual: ${hp2}`);

        // pokemon 2 ataca o o pokemon 1
        if(hp2 > 0){
          let damage2 = DamageControl(attack2, defense1);
          combatLogs.push(`${name1} recebeu: ${damage2} de dano`);
          hp1 = hp1 - damage2;
          if(hp1 <=0){
            hp1 = 0;
          }
          combatLogs.push(`${name1} Vida atual: ${hp1}`);
        }

        turn++
      }

      setLog(prevLogs => [...prevLogs, ...combatLogs]);

      // resultado do combate
      if (hp1 <= 0) {

        let myPokemonTeam = JSON.parse(localStorage.getItem('myPokemonTeam')) || [];
        myPokemonTeam.shift();
        localStorage.setItem('myPokemonTeam', JSON.stringify(myPokemonTeam));
        setMyPokemonTeam(myPokemonTeam)

        // atualizar a vida no localstorage e no Mypokemon

        let opponentPokemonTeam = JSON.parse(localStorage.getItem('opponentPokemonTeam')) || [];
        // remove o anterior
        localStorage.removeItem('opponentPokemonTeam')

        //atualiza a vida no objeto
        opponentPokemonTeam[0].stats[0].base_stat = hp2;

        // seta de novo o novo objeto
        localStorage.setItem('opponentPokemonTeam', JSON.stringify(opponentPokemonTeam));
        setOpponentTeam(opponentPokemonTeam);

        let newLogs = [` Ganhou ${name2}`];
        setLog(prevLogs =>[...prevLogs, ...newLogs])
      }

      else {

        // removo o pokemon que perdeu da lista
        let opponentPokemonTeam = JSON.parse(localStorage.getItem('opponentPokemonTeam')) || [];
        opponentPokemonTeam.shift();
        localStorage.setItem('opponentPokemonTeam', JSON.stringify(opponentPokemonTeam));
        setOpponentTeam(opponentPokemonTeam);

        // atualizar a vida no localstorage e no Mypokemon

        let myPokemonTeam = JSON.parse(localStorage.getItem('myPokemonTeam')) || [];
        // remove o anterior
        localStorage.removeItem('myPokemonTeam')

        //atualiza a vida no objeto
        myPokemonTeam[0].stats[0].base_stat = hp1;

        // seta de novo o novo objeto
        localStorage.setItem('myPokemonTeam', JSON.stringify(myPokemonTeam));
        setMyPokemonTeam(myPokemonTeam);

        let newLogs = [` Ganhou ${name1}`];
        setLog(prevLogs =>[...prevLogs, ...newLogs])
      }


    }

    return;
  }

  return (
    <div>
      <Button
        buttonName="batalhe com um time"
        href=""
        onclick={handleGenerateTeam}
      />
      <Button
        buttonName="batalha"
        href=""
        onclick={() => combat(myPokemonTeam, opponentTeam)}
      />

      {/*Mostra os Logs do combate*/}

      <div>
        {log.map((logItem, index) => (
          <p key={index}>{logItem}</p>
        ))}
      </div>

      <h2>Meu Time</h2>
      <div className="flex flex-wrap">
        {myPokemonTeam.map((pokemon) => {
          const types = pokemon.types ? pokemon.types.map((type) => type.type.name) : [];
          return (
            <div key={pokemon.id} className="w-[230px] h-[460px] p-2">
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
            <div key={pokemon.id} className="w-[230px] h-[460px] p-2">
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
