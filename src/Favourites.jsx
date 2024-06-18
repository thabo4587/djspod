import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoriteContext } from './FavoriteContext';

const Favorites = ({ shows }) => {
  const { favorites } = useContext(FavoriteContext);

  if (favorites.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-4">Favorites</h1>
        <p>You don't have any favorite shows yet.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Favorites</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {favorites.map(favorite => {
          const show = shows.find(show => show.id === favorite.id);
          if (!show) return null; // Handle case where show is not found
          return (
            <Link to={`/show/${show.id}`} key={show.id} className="bg-gray-500 overflow-hidden rounded-lg">
              <img
                src={show.image}
                alt={show.title || 'Podcast Image'}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-bold mb-2 text-white">{show.title}</h2>
                <p className="text-gray-300 text-sm mb-1">Seasons: {show.seasons.length}</p>
                <p className="text-gray-300 text-sm">
                  Updated: {new Date(show.updated).toLocaleDateString()}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default Favorites;
