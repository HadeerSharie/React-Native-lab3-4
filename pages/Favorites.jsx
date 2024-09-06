import React from 'react';
import { View, Text, Image, ScrollView, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useFavorites } from '../FavoritesContext';

function Favorites({ navigation }) {
  const { favorites, removeFromFavorites } = useFavorites();

  const handleRemoveFromFavorites = (movieId) => {
    removeFromFavorites(movieId);
    Alert.alert('Removed from Favorites', 'The movie has been removed from your favorites.');
  };

  return (
    <ScrollView style={styles.container}>
      {favorites.length > 0 ? (
        favorites.map(movie => (
          <View style={styles.movie} key={movie.id}>
            <Image 
              source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
              style={styles.movieImage} 
            />
            <Text style={styles.movieTitle}>{movie.title}</Text>
            <TouchableOpacity 
              style={styles.movieButton} 
              onPress={() => handleRemoveFromFavorites(movie.id)}
            >
              <Text style={styles.movieButtonText}>Remove from Favorites</Text>
            </TouchableOpacity>
          </View>
        ))
      ) : (
        <Text style={styles.emptyMessage}>No favorites added yet.</Text>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  movie: {
    marginBottom: 15,
  },
  movieImage: {
    width: '100%',
    height: 200,
  },
  movieTitle: {
    fontWeight: 'bold',
    marginVertical: 10,
  },
  movieButton: {
    backgroundColor: '#ff5555',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  movieButtonText: {
    color: '#fff',
  },
  emptyMessage: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 18,
  },
});

export default Favorites;



// import React, { createContext, useState, useContext } from 'react';

// const FavoritesContext = createContext();

// export const FavoritesProvider = ({ children }) => {
//     const [favorites, setFavorites] = useState([]);

//     const addToFavorites = (movie) => {
//         setFavorites(prevFavorites => {
//             if (!prevFavorites.some(fav => fav.id === movie.id)) {
//                 return [...prevFavorites, movie];
//             }
//             return prevFavorites;
//         });
//     };

//     const removeFromFavorites = (movieId) => {
//         setFavorites(prevFavorites => prevFavorites.filter(movie => movie.id !== movieId));
//     };

//     return (
//         <FavoritesContext.Provider value={{ favorites, addToFavorites, removeFromFavorites }}>
//             {children}
//         </FavoritesContext.Provider>
//     );
// };

// export const useFavorites = () => useContext(FavoritesContext);
