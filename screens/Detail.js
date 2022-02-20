import React, {useEffect, useState} from 'react';
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    View,
    Dimensions,
} from 'react-native';
import {getMovieDetail} from '../services/services';

const placeholderImage = require('../assets/images/placeholder.png');
const dimensions = Dimensions.get('screen');

const Detail = ({route, navigation}) => {
    const movieId = route.params.movieId;

    const [movieDetail, setMovieDetail] = useState('');
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        getMovieDetail(movieId).then(movieData => {
            setMovieDetail(movieData);
            setLoaded(true);
        });
    }, [movieId]);

    return (
        <>
            {loaded ? (
                <ScrollView>
                    <Image
                        resizeMode="cover"
                        style={styles.image}
                        source={
                            movieDetail.poster_path
                                ? {
                                      uri:
                                          'https://image.tmdb.org/t/p/original' +
                                          movieDetail.poster_path,
                                  }
                                : placeholderImage
                        }
                    />

                    <View style={styles.container}>
                        <Text style={styles.title}>{movieDetail.title}</Text>
                        {movieDetail.genres && (
                            <View style={styles.genresContainer}>
                                {movieDetail.genres.map(genre => (
                                    <Text style={styles.genre} key={genre.id}>
                                        {genre.name}
                                    </Text>
                                ))}
                            </View>
                        )}
                    </View>
                </ScrollView>
            ) : (
                <ActivityIndicator size="large" />
            )}
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        height: dimensions.height / 1.5,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        marginVertical: 10,
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    genre: {
        fontSize: 14,
        fontWeight: 200,
        marginHorizontal: 5,
        textTransform: 'uppercase',
    },
    genresContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
});

export default Detail;
