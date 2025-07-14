import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [pokemon, setPokemon] = useState(null);
    const [guess, setGuess] = useState('');
    const [result, setResult] = useState('');

    const getRandomPokemon = async () => {
        const randomId = Math.floor(Math.random() * 898) + 1;
        try {
            const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomId}`);
            setPokemon(res.data);
            setGuess('');
            setResult('');
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        getRandomPokemon();
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (guess.trim().toLowerCase() === pokemon.name.toLowerCase()) {
            setResult(`🎉 Correct! It’s ${pokemon.name}`);
        } else {
            setResult(`❌ Wrong! It was ${pokemon.name}`);
        }
    };

    return (
        <div style={{
            width: '100vw',
            height: '100vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: '#f5f5f5',
        }}>
            <div style={{
                textAlign: 'center',
                backgroundColor: 'white',
                padding: '2rem',
                borderRadius: '10px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            }}>
                <h1 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'black' }}>Who's That Pokémon?</h1>

                {pokemon && (
                    <img 
                        src={pokemon.sprites.other['official-artwork'].front_default} 
                        alt="Who's that Pokémon?" 
                        width={300}
                        style={{
                            filter: result ? 'none' : 'brightness(0)',
                            transition: 'filter 0.3s ease',
                            userSelect: 'none',
                            pointerEvents: 'none', // prevent drag cheat
                            marginBottom: '1rem'
                        }}
                        draggable={false}
                    />
                )}

                <form onSubmit={handleSubmit} style={{ marginBottom: '1rem' }}>
                    <input 
                        type="text" 
                        value={guess} 
                        onChange={(e) => setGuess(e.target.value)} 
                        placeholder="Enter Pokémon name"
                        style={{
                            padding: '0.5rem',
                            fontSize: '1rem',
                            borderRadius: '5px',
                            border: '1px solid #ccc',
                            width: '200px',
                            backgroundColor: 'white',
                            color:'black'
                        }}
                    />
                    <button 
                        type="submit" 
                        style={{
                            padding: '0.5rem 1rem',
                            fontSize: '1rem',
                            marginLeft: '0.5rem',
                            backgroundColor: '#4f46e5',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer'
                        }}
                    >
                        Guess
                    </button>
                </form>

                {result && (
                    <div>
                        <p style={{ marginBottom: '1rem' }}>{result}</p>
                        <button 
                            onClick={getRandomPokemon}
                            style={{
                                padding: '0.5rem 1rem',
                                fontSize: '1rem',
                                backgroundColor: '#10b981',
                                color: 'white',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer'
                            }}
                        >
                            Play Again
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default App;
