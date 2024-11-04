// Routes
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Components
import NavBar  from './components/Navbar';
import Home from './pages/Home';
import MyPokemon from './pages/MyPokemon';
import Battle from './pages/Battle';
import Profile from './pages/Profile';
import PokemonCatcher from './pages/PokemonCatcher';

function App() {
  return (
    <Router>
      <NavBar />
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/PokemonCatcher" element={<PokemonCatcher />} />
        <Route path="/MyPokemon" element={<MyPokemon />} />
        <Route path="/battle" element={<Battle />} />
        <Route path="/Profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}

export default App;