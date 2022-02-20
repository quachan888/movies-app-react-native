import {View, Text, StyleSheet, Dimensions, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {getPopularMovies, getUpcommingMovies} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const Home = () => {
  const dimentions = Dimensions.get('screen');

  const [movieImages, setMovieImages] = useState('');
  const [popularMovies, setPopularMovies] = useState('');
  const [error, setError] = useState(false);

  useEffect(() => {
    getUpcommingMovies()
      .then(movies => {
        const moviesImagesArray = [];
        movies.forEach(movie => {
          moviesImagesArray.push(
            `https://image.tmdb.org/t/p/original${movie.poster_path}`,
          );
        });
        setMovieImages(moviesImagesArray);
      })
      .catch(err => {
        console.log(err.message);
        setError(err.message);
      });

    getPopularMovies()
      .then(movies => setPopularMovies(movies))
      .catch(err => {
        console.log(err.message);
        setError(err.message);
      });

    console.log(popularMovies);
  }, []);

  return (
    <>
      {/* <View style={styles.sliderContainer}> */}
      <View>
        <SliderBox
          images={movieImages}
          sliderBoxHeight={dimentions.height / 1.5}
          autoplay={true}
          circleLoop={true}
          activeOpacity={0.5}
          dotStyle={styles.sliderStyle}
        />
      </View>
      <View>
        <List title="Hello TITLE" content={popularMovies} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  sliderContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderStyle: {
    height: 0,
  },
});

export default Home;
