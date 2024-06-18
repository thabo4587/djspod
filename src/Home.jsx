import React, { useEffect, useState } from 'react';

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
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        {shows.map(show => (
          <div key={show.id} className="bg-gray-500  overflow-hidden">
            <img className="w-full h-48 object-cover" src={show.image} alt={show.title} />
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{show.title}</h2>
              <p className="text-white-500 text-sm mb-1">Seasons: {show.seasons}</p>
              <p className="text-white-500 text-sm mb-1">Updated: {new Date(show.updated).toLocaleDateString()}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ShowHome;
//              <p className="text-gray-700 text-base mb-2">{show.description}</p>