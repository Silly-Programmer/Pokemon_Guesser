import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <div className="pt-20 min-h-screen bg-gray-950 text-white px-4 overflow-hidden">
      <motion.div
        className="flex flex-col items-center justify-center w-full h-[calc(100vh-80px)]"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1
          className="text-4xl font-bold mb-4 text-center drop-shadow-[0_2px_10px_rgba(255,255,255,0.3)]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1 }}
        >
          Welcome to the{' '}
          <span className="bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(255,234,138,0.8)]">
            Pokémon
          </span>{' '}
          World!
        </motion.h1>

        <motion.p
          className="text-lg text-center text-gray-300 mb-6 drop-shadow-[0_1px_6px_rgba(255,255,255,0.1)]"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1 }}
        >
          Try searching for a Pokémon using the Pokédex.
        </motion.p>

        {/* Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
        >
          <Link
            to="/pokemonlist"
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          >
            Explore Pokédex
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
