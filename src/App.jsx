import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import Pokedex from './components/Pokedex';
import PokemonGuess from './components/PokemonGuess';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pokedex" element={<Pokedex />} />
          <Route path="/about" element={<About />} />
          <Route path="/pokemonguess" element={<PokemonGuess />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;