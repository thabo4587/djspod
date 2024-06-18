import React, { useContext, useEffect, useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { FavoriteContext } from './FavoriteContext';

const ShowDetails = ({ shows }) => {
  const { id } = useParams();
  const { favorites, addFavorite, removeFavorite } = useContext(FavoriteContext);
  const [show, setShow] = useState(null);
  const [currentSeason, setCurrentSeason] = useState(null);
  const [loading, setLoading] = useState(true);
  const audioRefs = useRef({});
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const fetchShow = async () => {
      try {
        const selectedShow = shows.find(show => show.id === id);
        if (selectedShow) {
          setShow(selectedShow);
          setIsFavorite(favorites.some(fav => fav.id === id));
          setLoading(false);
        } else {
          const response = await fetch(`https://podcast-api.netlify.app/id/${id}`);
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const data = await response.json();
          setShow(data);
          setIsFavorite(favorites.some(fav => fav.id === id));
          setLoading(false);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchShow();
  }, [id, favorites, shows]);

  const handleSeasonSelect = (season) => {
    setCurrentSeason(season);
  };

  const toggleFavorite = () => {
    if (isFavorite) {
      removeFavorite(id);
    } else {
      addFavorite(show);
    }
    setIsFavorite(!isFavorite);
  };

  const playAudio = (episodeId) => {
    audioRefs.current[episodeId].play();
  };

  const pauseAudio = (episodeId) => {
    audioRefs.current[episodeId].pause();
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!show) {
    return <div>Show not found</div>;
  }

  return (
    <div className="play-podcast">
      <h1 className="text-3xl font-bold mb-4">{show.title}</h1>
      <img src={show.image} alt={show.title} className="rounded-lg mb-4" />
      <p className="mb-4">{show.description}</p>

      <button
        onClick={toggleFavorite}
        className={`mt-4 px-4 py-2 rounded ${
          isFavorite ? 'bg-red-500 text-white' : 'bg-green-500 text-white'
        }`}
      >
        {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
      </button>

      {currentSeason ? (
        <div className="season-detail">
          <h2 className="text-2xl font-semibold mb-2">{currentSeason.title}</h2>
          <img src={currentSeason.image} alt={currentSeason.title} className="rounded-lg mb-4" />
          <h3 className="text-xl font-semibold mb-2">Episodes</h3>
          {currentSeason.episodes.map(episode => (
            <div key={episode.id} className="episode mb-4">
              <h4 className="text-lg font-semibold mb-2">{episode.title}</h4>
              <audio ref={el => (audioRefs.current[episode.id] = el)} className="mb-2">
                <source src={episode.file} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
              <div className="flex space-x-2">
                <button
                  onClick={() => playAudio(episode.id)}
                  className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded"
                >
                  Play
                </button>
                <button
                  onClick={() => pauseAudio(episode.id)}
                  className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded"
                >
                  Pause
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>
          <h2 className="text-2xl font-semibold mt-8">Seasons</h2>
          {show.seasons.map(season => (
            <div
              key={season.id}
              className="season mb-4 cursor-pointer"
              onClick={() => handleSeasonSelect(season)}
            >
              <h3 className="text-xl font-semibold mb-2">{season.title}</h3>
              <img src={season.image} alt={season.title} className="rounded-lg mb-2" />
              <p className="mb-2">Episodes: {season.episodes.length}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ShowDetails;
