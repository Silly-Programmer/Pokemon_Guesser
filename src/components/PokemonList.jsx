import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Type icons
const pokemonTypes = [
    { name: 'normal', icon: '⚪' },
    { name: 'fire', icon: '🔥' },
    { name: 'water', icon: '💧' },
    { name: 'grass', icon: '🌿' },
    { name: 'electric', icon: '⚡' },
    { name: 'ice', icon: '❄️' },
    { name: 'fighting', icon: '🥊' },
    { name: 'poison', icon: '☠️' },
    { name: 'ground', icon: '🌍' },
    { name: 'flying', icon: '🕊️' },
    { name: 'psychic', icon: '🔮' },
    { name: 'bug', icon: '🐛' },
    { name: 'rock', icon: '🪨' },
    { name: 'ghost', icon: '👻' },
    { name: 'dragon', icon: '🐉' },
    { name: 'dark', icon: '🌑' },
    { name: 'steel', icon: '⚙️' },
    { name: 'fairy', icon: '🧚' },
];

// Animation variants for each item
const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: (index) => ({
        opacity: 1,
        x: 0,
        transition: {
            delay: index * 0.02,
            duration: 0.3,
            ease: 'easeOut'
        }
    }),
};

export default function PokemonList() {
    const [pokemonList, setPokemonList] = useState([]);
    const [filteredPokemon, setFilteredPokemon] = useState([]);
    const [selectedLetter, setSelectedLetter] = useState('');
    const [generations, setGenerations] = useState([]);
    const [selectedGeneration, setSelectedGeneration] = useState('');
    const [selectedType, setSelectedType] = useState('');

    // Fetch all Pokémon
    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10000');
                const data = await res.json();
                setPokemonList(data.results);
                setFilteredPokemon(data.results);
            } catch (err) {
                console.error('Failed to fetch Pokémon list:', err);
            }
        };
        fetchPokemonList();
    }, []);

    // Fetch generations
    useEffect(() => {
        const fetchGenerations = async () => {
            try {
                const res = await fetch('https://pokeapi.co/api/v2/generation/');
                const data = await res.json();
                setGenerations(data.results);
            } catch (err) {
                console.error('Failed to fetch generations:', err);
            }
        };
        fetchGenerations();
    }, []);

    // Apply all filters
    useEffect(() => {
        const applyFilters = async () => {
            let filtered = [...pokemonList];

            if (selectedLetter) {
                filtered = filtered.filter(p => p.name.startsWith(selectedLetter.toLowerCase()));
            }

            if (selectedGeneration) {
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/generation/${selectedGeneration}`);
                    const data = await res.json();
                    const genNames = data.pokemon_species.map(p => p.name);
                    filtered = filtered.filter(p => genNames.includes(p.name));
                } catch (err) {
                    console.error('Failed to filter by generation:', err);
                }
            }

            if (selectedType) {
                try {
                    const res = await fetch(`https://pokeapi.co/api/v2/type/${selectedType}`);
                    const data = await res.json();
                    const typeNames = data.pokemon.map(p => p.pokemon.name);
                    filtered = filtered.filter(p => typeNames.includes(p.name));
                } catch (err) {
                    console.error('Failed to filter by type:', err);
                }
            }

            setFilteredPokemon(filtered);
        };

        applyFilters();
    }, [selectedLetter, selectedGeneration, selectedType, pokemonList]);

    return (
        <div className="pt-20 px-4 min-h-screen bg-gradient-to-b from-gray-900 to-indigo-950 text-white">
            <h1 className="text-3xl font-bold text-center mb-6">All Pokémon</h1>

            {/* Filters */}
            <div className="flex flex-col gap-4 mb-6">
                {/* Letter Filter */}
                <div className="flex flex-wrap justify-center gap-1">
                    {'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('').map(letter => (
                        <button
                            key={letter}
                            onClick={() => setSelectedLetter(prev => (prev === letter ? '' : letter))}
                            className={`px-3 py-1 rounded text-sm ${selectedLetter === letter
                                    ? 'bg-indigo-500 text-white'
                                    : 'bg-white/10 text-white hover:bg-white/20'
                                }`}
                        >
                            {letter}
                        </button>
                    ))}
                </div>

                {/* Generation Filter */}
                <div className="flex justify-center">
                    <select
                        value={selectedGeneration}
                        onChange={e => setSelectedGeneration(e.target.value)}
                        className="px-3 py-2 rounded-md bg-gray-800 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                        <option value="">All Generations</option>
                        {generations.map((gen, idx) => (
                            <option key={gen.name} value={gen.name}>
                                Generation {idx + 1}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Type Filter */}
                {/* Type Filter (Dropdown) */}
                <div className="flex justify-center">
                    <select
                        value={selectedType}
                        onChange={e => setSelectedType(e.target.value)}
                        className="px-3 py-2 rounded-md bg-gray-800 text-white border border-white/20 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
                    >
                        <option value="">All Types</option>
                        {pokemonTypes.map((type) => (
                            <option key={type.name} value={type.name}>
                                {type.icon} {type.name}
                            </option>
                        ))}
                    </select>
                </div>

            </div>

            {/* Pokémon Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {filteredPokemon.map((pokemon, index) => (
                    <motion.div
                        key={pokemon.name}
                        custom={index}
                        initial="hidden"
                        animate="visible"
                        variants={itemVariants}
                    >
                        <Link
                            to={`/pokemon/${pokemon.name}`}
                            className="bg-white/10 text-white hover:bg-white/20 p-2 rounded shadow text-center capitalize transition block"
                        >
                            {pokemon.name}
                        </Link>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}
