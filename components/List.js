import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {PureComponent} from 'react';
import Card from './Card';

class List extends PureComponent {
  render() {
    const {title, content} = this.props;
    return (
      <View style={styles.list}>
        <View>
          <Text style={styles.text}>{title}</Text>
        </View>
        <View>
          <FlatList
            data={content}
            renderItem={({item}) => <Card item={item} />}
            horizontal={true}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    paddingBottom: 10,
  },
  list: {
    marginTop: 10,
  },
});

export default List;
