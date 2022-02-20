import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import axios from 'axios';

const getPopularMovies = async () => {
  const response = await axios.get(
    'https://api.themoviedb.org/3/movie/popular?api_key=4a364319375ed2702b522fc312cf8834a',
  );
  return response.data.results;
};

const App = () => {
  const [movie, setMovie] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getPopularMovies()
      .then(movies => {
        setMovie(movies[0]);
      })
      .catch(err => {
        setError(err);
      });
  }, []);

  return (
    <SafeAreaView>
      <Text>{movie.original_title}</Text>
      <Text>{movie.overview}</Text>
      {error && (
        <Text style={{color: 'red'}}>Error in the server: {error}</Text>
      )}
    </SafeAreaView>
  );
};

export default App;

const styles = StyleSheet.create({});
