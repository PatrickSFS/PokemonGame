// Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import NavBar  from './components/Navbar';
import FooterComponent from './components/Footer';
import Home from './pages/Home';
import MyPokemon from './pages/MyPokemon';
import Battle from './pages/Battle';
import Profile from './pages/Profile';
import PokemonCatcher from './pages/PokemonCatcher';
import { ApiProvider } from './services/ApiContext';

function App() {
  return (
    <ApiProvider>
        <Router >
          <NavBar />
          <Routes>
          <Route path="/Home" element={<Home />} />
            <Route path="/PokemonCatcher" element={<PokemonCatcher />} />
            <Route path="/MyPokemon" element={<MyPokemon />} />
            <Route path="/Battle" element={<Battle />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
          <FooterComponent />
        </Router>
      </ApiProvider>
  );
}

export default App;