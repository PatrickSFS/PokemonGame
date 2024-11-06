import axios from "axios";

function getRandomPokemons(count, min, max) {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(Math.floor(Math.random() * (max - min + 1)) + min);
  }
  return Array.from(ids);
}

async function CreateRandonTeam() {
  try {
    const randomIds = getRandomPokemons(5, 1, 1025);
    const requests = randomIds.map(id => axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`));
    const responses = await Promise.all(requests);

    const pokemonsData = responses.map(response => response.data);
    localStorage.setItem('opponentPokemonTeam', JSON.stringify(pokemonsData));
    return pokemonsData;  // Retorna o time para uso externo
  } catch (e) {
    console.error('Erro ao buscar dados:', e);
    throw e;
  }
}

export default CreateRandonTeam;