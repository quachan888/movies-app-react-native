import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    ActivityIndicator,
} from 'react-native';
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

const dimensions = Dimensions.get('screen');

const Home = () => {
    const [movieImages, setMovieImages] = useState();
    const [popularMovies, setPopularMovies] = useState();
    const [popularTv, setPopularTv] = useState();
    const [topRatedMovies, setTopRatedMovies] = useState();
    const [familyMovies, setFamilyMovies] = useState();

    const [error, setError] = useState(false);
    const [loaded, setLoaded] = useState(false);

    // Refactoring multiple axios get
    const getData = () => {
        return Promise.all([
            getUpcommingMovies(),
            getPopularMovies(),
            getPopularTv(),
            getTopRatedMovies(),
            getFamilyMovies(),
        ]);
    };

    useEffect(() => {
        getData()
            .then(
                ([
                    upcommingMoviesData,
                    popularMoviesData,
                    popularTvData,
                    topRatedMoviesData,
                    familyMoviesData,
                ]) => {
                    const moviesImagesArray = [];
                    upcommingMoviesData.forEach(movie => {
                        moviesImagesArray.push(
                            `https://image.tmdb.org/t/p/original${movie.poster_path}`,
                        );
                    });
                    setMovieImages(moviesImagesArray);
                    setPopularMovies(popularMoviesData);
                    setPopularTv(popularTvData);
                    setTopRatedMovies(topRatedMoviesData);
                    setFamilyMovies(familyMoviesData);
                },
            )
            .catch(err => setError(err.message))
            .finally(() => setLoaded(true));
    }, []);

    return (
        <>
            {loaded ? (
                <ScrollView>
                    {/* Upcoming Movies Slider */}
                    {movieImages && (
                        <View style={styles.sliderContainer}>
                            <SliderBox
                                images={movieImages}
                                sliderBoxHeight={dimensions.height / 1.5}
                                autoplay={true}
                                circleLoop={true}
                                activeOpacity={0.5}
                                dotStyle={styles.sliderStyle}
                            />
                        </View>
                    )}

                    {popularMovies && (
                        <View style={styles.carousel}>
                            <List
                                title="Popular Movies"
                                content={popularMovies}
                            />
                        </View>
                    )}
                    {popularTv && (
                        <View style={styles.carousel}>
                            <List
                                title="Popular TV Shows"
                                content={popularTv}
                            />
                        </View>
                    )}
                    {topRatedMovies && (
                        <View style={styles.carousel}>
                            <List
                                title="Top Rated Movies"
                                content={topRatedMovies}
                            />
                        </View>
                    )}
                    {familyMovies && (
                        <View style={styles.carousel}>
                            <List
                                title="Family Movies"
                                content={familyMovies}
                            />
                        </View>
                    )}
                </ScrollView>
            ) : (
                <ActivityIndicator size="large" />
            )}
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
    carousel: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,
    },
});

export default Home;
