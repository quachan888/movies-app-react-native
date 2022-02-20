import {Text, StyleSheet, View, TouchableOpacity, Image} from 'react-native';
import React, {Component} from 'react';

export default class Card extends Component {
  render() {
    const {item} = this.props;
    return (
      <TouchableOpacity style={styles.container}>
        {/* <Text>{item.poster_path}</Text> */}
        <Image
          style={styles.image}
          source={{
            uri: `https://image.tmdb.org/t/p/original${item.poster_path}`,
          }}
        />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    position: 'relative',
  },
  image: {
    height: 200,
    width: 120,
    borderRadius: 10,
  },
});
