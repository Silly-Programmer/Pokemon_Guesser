import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';

function PokemonGuess() {
  const [pokemon, setPokemon] = useState(null);
  const [guess, setGuess] = useState('');
  const [result, setResult] = useState('');
  const [generation, setGeneration] = useState(1);
  const [speciesList, setSpeciesList] = useState([]);
  const [wrongAttempts, setWrongAttempts] = useState(0);

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
      setWrongAttempts(0);
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
      const newAttempts = wrongAttempts + 1;
      setWrongAttempts(newAttempts);

      if (newAttempts >= 4) {
        setResult(`❌ Wrong! The answer was ${pokemon.name}`);
      } else {
        setResult(`❌ Try again! Hint ${newAttempts} unlocked below 👇`);
      }
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
            className={`w-64 mx-auto transition duration-300 ${result &&
                (guess.trim().toLowerCase() === pokemon.name.toLowerCase() || wrongAttempts >= 4)
                ? ''
                : 'brightness-0'
              }`}
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

            {/* Hints based on wrongAttempts */}
            <div className="text-sm text-indigo-200 space-y-1">
              {wrongAttempts >= 1 && (
                <p>
                  🧪 Type(s): {pokemon.types.map(t => t.type.name).join(', ')}
                </p>
              )}
              {wrongAttempts >= 2 && (
                <p>🔤 First Letter: {pokemon.name.charAt(0).toUpperCase()}</p>
              )}
              {wrongAttempts >= 3 && (
                <p>📏 Height: {pokemon.height} | ⚖️ Weight: {pokemon.weight}</p>
              )}
            </div>

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
