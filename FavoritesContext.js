import React, { createContext, useState, useContext } from 'react';

// Create the Favorites Context
const FavoritesContext = createContext();

// Create the custom hook to use the Favorites context
export const useFavorites = () => useContext(FavoritesContext);

// Create the Favorites Provider
export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  // Add a movie to favorites
  const addToFavorites = (movie) => {
    setFavorites([...favorites, movie]);
  };

  // Remove a movie from favorites
  const removeFromFavorites = (movieId) => {
    setFavorites(favorites.filter(movie => movie.id !== movieId));
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};
