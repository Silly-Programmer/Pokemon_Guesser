import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function PokemonGuess() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');
  const [generation, setGeneration] = useState(1);
  const [speciesList, setSpeciesList] = useState([]);

  useEffect(() => {
    const fetchGenerationSpecies = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/generation/${generation}`);
        const species = res.data.pokemon_species.map(s => s.name);
        setSpeciesList(species);
      } catch (err) {
        console.error('Error fetching generation data:', err);
      }
    };
    fetchGenerationSpecies();
  }, [generation]);

  const getRandomPokemon = async () => {
    if (speciesList.length === 0) return;

    const randomIndex = Math.floor(Math.random() * speciesList.length);
    const randomName = speciesList[randomIndex];

    try {
      const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomName}`);
      setPokemon(res.data);
      setGuess('');
      setResult('');
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (speciesList.length > 0) {
      getRandomPokemon();
    }
  }, [speciesList]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!pokemon) return;

    if (guess.trim().toLowerCase() === pokemon.name.toLowerCase()) {
      setResult(`🎉 Correct! It’s ${pokemon.name}`);
    } else {
      setResult(`❌ Wrong! It was ${pokemon.name}`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-900 to-indigo-950 p-4">
      <motion.div
        className="bg-white/10 backdrop-blur-md shadow-xl rounded-xl p-8 w-full max-w-md text-center space-y-4 text-white"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-3xl font-bold drop-shadow-[0_1px_15px_rgba(255,255,255,0.25)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          Who's That Pokémon?
        </motion.h1>

        <div>
          <label htmlFor="generation-select" className="mr-2 font-medium">
            Choose Generation:
          </label>
          <select
            id="generation-select"
            value={generation}
            onChange={(e) => setGeneration(parseInt(e.target.value))}
            className="p-2 rounded border border-gray-600 bg-slate-800 text-white focus:outline-none"
          >
            {[...Array(8)].map((_, i) => (
              <option key={i + 1} value={i + 1}>
                Generation {i + 1}
              </option>
            ))}
          </select>
        </div>

        {pokemon && (
          <motion.img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt="Who's that Pokémon?"
            className={`w-64 mx-auto transition duration-300 ${result ? '' : 'brightness-0'}`}
            draggable={false}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          />
        )}

        <form onSubmit={handleSubmit} className="flex justify-center gap-2">
          <input
            type="text"
            value={guess}
            onChange={(e) => setGuess(e.target.value)}
            placeholder="Enter Pokémon name"
            className="p-2 rounded-md w-full max-w-[180px] bg-slate-800 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
          />
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 shadow-md transition"
          >
            Guess
          </button>
        </form>

        {result && (
          <motion.div
            className="space-y-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <p className="text-lg font-medium">{result}</p>
            <button
              onClick={getRandomPokemon}
              className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 shadow-md transition"
            >
              Play Again
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}

export default PokemonGuess;
