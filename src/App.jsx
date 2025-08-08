import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Pokedex from './components/Pokedex';
import PokemonGuess from './components/PokemonGuess';
import PokemonList from './components/PokemonList';
import PokemonDetails from './components/PokemonDetails';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/pokemonguess" element={<PokemonGuess />} />
          <Route path="/pokemonlist" element={<PokemonList />} />
          <Route path="/pokemon/:name" element={<PokemonDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;