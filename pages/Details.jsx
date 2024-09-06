import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

function Details({ route }) {
  const { movie } = route.params;

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500/${movie.poster_path}` }}
        style={styles.image}
      />
      <Text style={styles.title}>{movie.title}</Text>
      <Text style={styles.overview}>{movie.overview}</Text>
      <Text style={styles.details}>Language: {movie.original_language}</Text>
      <Text style={styles.details}>Rating: {movie.vote_average}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'black',
  },
  image: {
    width: '100%',
    height: 300,
    borderRadius: 10,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  overview: {
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  details: {
    fontSize: 18,
    color: 'white',
    marginBottom: 5,
  },
});

export default Details;
