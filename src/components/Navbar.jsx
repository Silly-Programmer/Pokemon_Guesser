import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/pokemonlist', label: 'PokemonList'},
    { path: '/pokemonguess', label: 'PokemonGuesser'},
    { path: '/about', label: 'About' },
    
  ];

  return (
    <nav className="bg-gray-900 text-white fixed top-0 w-full z-50 shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <div className="text-xl font-bold">PokéGuessr</div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} aria-label="Toggle menu">
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex gap-6">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              className={`hover:text-indigo-400 ${
                location.pathname === link.path ? 'text-indigo-400' : ''
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-gray-800 px-4 pb-4">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              onClick={() => setIsOpen(false)}
              className={`block py-2 ${
                location.pathname === link.path ? 'text-indigo-400' : ''
              } hover:text-indigo-400`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;