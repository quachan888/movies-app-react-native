import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPopularMovies, getUpcommingMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import {apiURL} from '../services/services';

const Home = () => {
  const [movieImages, setMovieImages] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getUpcommingMovies().then(movies => {
      const moviesImagesArray = [];
      movies.forEach(movie => {
        moviesImagesArray.push(
          `https://image.tmdb.org/t/p/original${movie.poster_path}`,
        );
      });
      setMovieImages(moviesImagesArray);
    });

    // getPopularMovies()
    //   .then(movies => setMovie(movies))
    //   .catch(err => {
    //     console.log(err.message);
    //     setError(err.message);
    //   });
  }, []);

  return (
    <View>
      <SliderBox images={movieImages} />
    </View>
  );
};

export default Home;
