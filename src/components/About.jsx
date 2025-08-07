import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="pt-20 min-h-screen bg-gray-950 text-white px-4">
      <motion.div
        className="flex flex-col items-center justify-center w-full min-h-[calc(100vh-80px)] px-4 py-10"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1
          className="text-4xl font-bold mb-4 text-center bg-gradient-to-r from-yellow-300 to-yellow-500 bg-clip-text text-transparent drop-shadow-[0_2px_10px_rgba(255,255,0,0.3)]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          About PokéGuessr
        </motion.h1>

        <motion.p
          className="text-lg max-w-2xl text-center leading-relaxed text-gray-300 drop-shadow-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          PokéGuessr is a fun and interactive app that lets you explore Pokémon from all generations. You can search by name,
          learn about their stats, abilities, and more. This project is built using React, Tailwind CSS, and the PokéAPI.
        </motion.p>
      </motion.div>
    </div>
  );
}
