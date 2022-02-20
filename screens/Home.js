import {View, Text, StyleSheet, Dimensions, ScrollView} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
    getFamilyMovies,
    getPopularMovies,
    getPopularTv,
    getTopRatedMovies,
    getUpcommingMovies,
} from '../services/services';
import {SliderBox} from 'react-native-image-slider-box';
import List from '../components/List';

const Home = () => {
    const dimentions = Dimensions.get('screen');

    const [movieImages, setMovieImages] = useState('');
    const [popularMovies, setPopularMovies] = useState('');
    const [popularTv, setPopularTv] = useState('');
    const [topRatedMovies, setTopRatedMovies] = useState('');
    const [familyMovies, setFamilyMovies] = useState('');

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
                console.log(err.message, error);
                setError(err.message);
            });

        getPopularTv()
            .then(tv => setPopularTv(tv))
            .catch(err => setError(err.message));

        getTopRatedMovies()
            .then(movies => setTopRatedMovies(movies))
            .catch(err => setError(err));

        getFamilyMovies()
            .then(movies => setFamilyMovies(movies))
            .catch(err => setError(err));
    }, [error, popularMovies]);

    return (
        <>
            <ScrollView>
                <View style={styles.sliderContainer}>
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
                    <List title="Popular Movies" content={popularMovies} />
                </View>
                <View>
                    <List title="Popular TV Shows" content={popularTv} />
                </View>
                <View>
                    <List title="Top Rated Movies" content={topRatedMovies} />
                </View>
                <View>
                    <List title="Family Movies" content={familyMovies} />
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    sliderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    sliderStyle: {
        height: 0,
    },
});

export default Home;
