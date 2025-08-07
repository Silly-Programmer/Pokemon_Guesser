import React, { useState } from 'react';
import axios from 'axios';
import { Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Pokedex = () => {
  const [search, setSearch] = useState('');
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState(null);

  const fetchPokemon = async () => {
    try {
      const res = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${search.toLowerCase()}`
      );
      setPokemon(res.data);
      setError(null);
    } catch (err) {
      setPokemon(null);
      setError('Pokémon not found');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search.trim() !== '') fetchPokemon();
  };

  return (
    <div className="pt-20 min-h-screen bg-gradient-to-b from-gray-900 to-indigo-950 text-white px-4 py-8 overflow-x-hidden">
      <motion.h2
        className="text-4xl font-bold text-center mb-6 drop-shadow-[0_1px_15px_rgba(255,255,255,0.25)]"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Pokédex
      </motion.h2>

      <motion.form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row items-center w-full max-w-md gap-4 mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
      >
        <input
          type="text"
          placeholder="Search Pokémon by name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full sm:flex-1 px-4 py-2 rounded-md bg-white text-black shadow-md focus:outline-none focus:ring-2 focus:ring-indigo-500 transition duration-200"
        />
        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md flex items-center gap-2 shadow-md transition duration-200"
        >
          <Search size={18} /> Search
        </button>
      </motion.form>

      {error && (
        <motion.p
          className="text-center text-red-400 mt-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {error}
        </motion.p>
      )}

      {pokemon && (
        <motion.div
          className="w-full max-w-md bg-white text-black rounded-xl shadow-lg p-6 mt-8 mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="text-center">
            <img
              src={pokemon.sprites.other['official-artwork'].front_default}
              alt={pokemon.name}
              className="w-40 h-40 object-contain mx-auto drop-shadow-[0_2px_10px_rgba(0,0,0,0.4)]"
            />
            <h3 className="text-2xl font-bold capitalize mt-4">{pokemon.name}</h3>
            <p className="text-gray-600">Weight: {pokemon.weight}</p>
            <p className="text-gray-600">
              Type: {pokemon.types.map((t) => t.type.name).join(', ')}
            </p>
          </div>

          <div className="mt-4 max-h-40 overflow-y-auto">
            <h4 className="text-xl font-semibold mb-2">Moves:</h4>
            <ul className="list-disc pl-5 text-sm space-y-1">
              {pokemon.moves.map((moveObj, index) => (
                <li key={index}>{moveObj.move.name}</li>
              ))}
            </ul>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default Pokedex;
