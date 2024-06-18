import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Favorites() {
  const [favoriteIds, setFavoriteIds] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
    setFavoriteIds(storedFavorites);
  }, []);

  useEffect(() => {
    const fetchFavorites = async () => {
      setLoading(true);
      try {
        const favoritesData = await Promise.all(
          favoriteIds.map(async (id) => {
            const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
        );
        setFavorites(favoritesData);
      } catch (error) {
        console.error('Error fetching favorite shows:', error);
      }
      setLoading(false);
    };

    if (favoriteIds.length > 0) {
      fetchFavorites();
    } else {
      setLoading(false);
    }
  }, [favoriteIds]);

  if (loading) {
    return <div>Loading favorites...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Favorites</h1>

      {favorites.length === 0 ? (
        <p>You don't have any favorite shows yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map(show => (
            <Link to={`/show/${show.id}`} key={show.id} className="bg-gray-500 overflow-hidden rounded-lg">
              <img
                src={show.image}
                alt={show.title || 'Podcast Image'}
                onError={(e) => e.target.src = 'placeholder-image-url'}
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
          ))}
        </div>
      )}
    </div>
  );
}

export default Favorites;
