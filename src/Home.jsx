import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const ShowHome = () => {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://podcast-api.netlify.app/shows')
      .then(response => response.json())
      .then(data => {
        if (Array.isArray(data)) {
          setShows(data);
        } else {
          setShows([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
        setShows([]);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Shows</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {shows.map(show => (
          <div key={show.id} className="bg-gray-500 overflow-hidden rounded-lg">
            <img className="w-full h-48 object-cover" src={show.image} alt={show.title} />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2 text-white">{show.title}</h2>
              <p className="text-gray-300 text-sm mb-1">Seasons: {show.seasons.length}</p>
              <p className="text-gray-300 text-sm">
                Updated: {new Date(show.updated).toLocaleDateString()}
              </p>
              <Link to={`/show/${show.id}`} className="mt-4 block px-4 py-2 bg-blue-500 text-white rounded-lg text-center">
                View Details
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowHome;
