
import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Image, ScrollView, StyleSheet, TouchableOpacity, Alert, Dimensions } from "react-native";
import axios from "axios";
import { Picker } from '@react-native-picker/picker';
import { useFavorites } from '../FavoritesContext';
import routes from "../utilies/routes";

function Home({ navigation }) {
    const [movies, setMovies] = useState([]);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [category, setCategory] = useState("");
    
    const { favorites, addToFavorites } = useFavorites();

    useEffect(() => {
        axios.get('https://api.themoviedb.org/3/movie/now_playing?api_key=5d6003f4b88e280898e5d6397bb06c5f')
            .then(res => {
                setMovies(res.data.results);
                setFilteredMovies(res.data.results);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
            });
    }, []);

    useEffect(() => {
        let updatedMovies = [...movies];

        if (searchTerm) {
            updatedMovies = updatedMovies.filter(movie =>
                movie.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }

        if (category) {
            updatedMovies = updatedMovies.filter(movie =>
                movie.genre_ids.includes(parseInt(category))
            );
        }

        setFilteredMovies(updatedMovies);
    }, [searchTerm, category, movies]);

    const toggleDescription = (movieId) => {
        setFilteredMovies(prevMovies => 
            prevMovies.map(movie => 
                movie.id === movieId ? { ...movie, showDescription: !movie.showDescription } : movie
            )
        );
    };

    const handleAddToFavorites = (movie) => {
        const isAlreadyFavorite = favorites.some(favMovie => favMovie.id === movie.id);

        if (isAlreadyFavorite) {
            Alert.alert('Already in Favorites', `${movie.title} is already in your favorites.`);
        } else {
            addToFavorites(movie);
            Alert.alert('Added to Favorites', `${movie.title} has been added to your favorites.`);
            navigation.navigate('Favorites');
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.filters}>
                <TextInput
                    placeholder="Search by title"
                    value={searchTerm}
                    onChangeText={(text) => setSearchTerm(text)}
                    style={styles.input}
                />

                <Picker
                    selectedValue={category}
                    onValueChange={(itemValue) => setCategory(itemValue)}
                    style={styles.picker}
                >
                    <Picker.Item label="All Categories" value="" />
                    <Picker.Item label="Action" value="28" />
                    <Picker.Item label="Comedy" value="35" />
                    <Picker.Item label="Drama" value="18" />
                    {/* Add more genres as needed */}
                </Picker>
            </View>

            <View style={styles.movies}>
                {filteredMovies.map(movie => (
                    <View style={styles.movie} key={movie.id}>
                        <TouchableOpacity onPress={() => toggleDescription(movie.id)}>
                            <Image 
                                source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }} 
                                style={styles.movieImage} 
                            />
                        </TouchableOpacity>
                        <Text style={styles.movieTitle}>{movie.title}</Text>
                        {movie.showDescription && (
                            <Text style={styles.movieDescription}>{movie.overview || 'No description available'}</Text>
                        )}
                        <TouchableOpacity 
                            style={styles.movieButton} 
                            onPress={() => handleAddToFavorites(movie)}
                        >
                            <Text style={styles.movieButtonText}>❤️</Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        backgroundColor: '#fff',
    },
    filters: {
        marginBottom: 10,
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        marginBottom: 10,
    },
    picker: {
        height: 50,
        width: '100%',
    },
    movies: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
    },
    movie: {
        width: (Dimensions.get('window').width / 2) - 20,
        marginBottom: 15,
        borderRadius: 10,
        overflow: 'hidden',
        backgroundColor: '#f9f9f9',
        padding: 10,
        elevation: 3,
    },
    movieImage: {
        width: '100%',
        height: 150,
        borderRadius: 10,
    },
    movieTitle: {
        fontWeight: 'bold',
        marginTop: 5,
    },
    movieDescription: {
        marginTop: 5,
        color: '#666',
    },
    movieButton: {
        marginTop: 10,
        backgroundColor: '#e0e0e0',
        borderRadius: 5,
        paddingVertical: 5,
        paddingHorizontal: 10,
        alignItems: 'center',
    },
    movieButtonText: {
        fontSize: 18,
    },
});

export default Home;
