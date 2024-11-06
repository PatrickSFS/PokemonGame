import { createContext, useState, useEffect } from 'react';
import axios from 'axios';

// Criando o contexto
export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 

// Função para gerar números aleatórios sem duplicatas
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Função para gerar uma lista de IDs aleatórios sem duplicatas
function getRandomPokemons(count, min, max) {
  const ids = new Set();
  while (ids.size < count) {
    ids.add(getRandomInt(min, max));
  }
  return Array.from(ids);
}

  // primeira requisição
  useEffect(() => {
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

  return (
    <ApiContext.Provider value={{ data, loading, error }}>
      {children}
    </ApiContext.Provider>
  );
};
