import {FlatList, SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPopularMovies} from './services/services';

const App = () => {
  const [movie, setMovie] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getPopularMovies()
      .then(movies => {
        setMovie(movies[3]);
      })
      .catch(err => {
        console.log(err);
        setError(true);
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
