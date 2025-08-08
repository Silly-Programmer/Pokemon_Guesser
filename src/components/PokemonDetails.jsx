import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

// Type icon mapping
const typeIcons = {
  normal: '⚪', fire: '🔥', water: '💧', grass: '🌿', electric: '⚡',
  ice: '❄️', fighting: '🥊', poison: '☠️', ground: '🌍', flying: '🕊️',
  psychic: '🔮', bug: '🐛', rock: '🪨', ghost: '👻', dragon: '🐉',
  dark: '🌑', steel: '⚙️', fairy: '🧚'
};

function PokemonDetail() {
  const { name } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`);
        setPokemon(res.data);
        setError('');
      } catch (err) {
        setError('Failed to fetch Pokémon data.');
      }
    };

    if (name) fetchPokemon();
  }, [name]);

  if (error)
    return <p className="text-center text-red-500 mt-8">{error}</p>;

  if (!pokemon)
    return <p className="text-center mt-8 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-950 text-white p-6">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl">
        <div className="flex flex-col items-center">
          <img
            src={pokemon.sprites.other?.['official-artwork']?.front_default || ''}
            alt={pokemon.name}
            className="w-48 h-48 object-contain"
            onError={e => e.target.style.display = 'none'}
          />
          <h1 className="text-4xl font-bold capitalize mt-4">{pokemon.name}</h1>
          <p className="text-gray-300 mt-1">Weight: {pokemon.weight}</p>
          <p className="text-gray-300 mt-1">
            Type:&nbsp;
            {pokemon.types.map((t, i) => (
              <span key={i} className="capitalize">
                {typeIcons[t.type.name] || ''} {t.type.name}{i < pokemon.types.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        </div>

        {/* Stats */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Stats</h2>
          <ul className="space-y-1">
            {pokemon.stats.map((s, i) => (
              <li key={i}>
                <span className="capitalize">{s.stat.name}</span>: {s.base_stat}
              </li>
            ))}
          </ul>
        </div>

        {/* Moves */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Moves</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 max-h-40 overflow-y-auto text-sm">
            {pokemon.moves.map((m, i) => (
              <div key={i} className="capitalize">{m.move.name}</div>
            ))}
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <Link
            to="/pokemonlist"
            className="inline-block bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded transition"
          >
            ← Back to Pokedex
          </Link>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
