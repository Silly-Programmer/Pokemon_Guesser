import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

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

  if (error) return <p className="text-center text-red-500 mt-8">{error}</p>;

  if (!pokemon) return <p className="text-center mt-8 text-white">Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-indigo-950 text-white p-8">
      <div className="max-w-3xl mx-auto bg-white/10 backdrop-blur-lg p-8 rounded-xl shadow-lg">
        <div className="flex flex-col items-center">
          <img
            src={pokemon.sprites.other['official-artwork'].front_default}
            alt={pokemon.name}
            className="w-48 h-48"
          />
          <h1 className="text-4xl font-bold capitalize mt-4">{pokemon.name}</h1>
          <p className="text-gray-300 mt-2">Weight: {pokemon.weight}</p>
          <p className="text-gray-300">
            Type: {pokemon.types.map(t => t.type.name).join(', ')}
          </p>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Stats</h2>
          <ul className="space-y-1">
            {pokemon.stats.map((statObj, i) => (
              <li key={i}>
                {statObj.stat.name}: {statObj.base_stat}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-6">
          <h2 className="text-2xl font-semibold mb-2">Moves</h2>
          <div className="grid grid-cols-2 gap-2 max-h-40 overflow-y-auto text-sm">
            {pokemon.moves.map((m, i) => (
              <div key={i}>{m.move.name}</div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonDetail;
