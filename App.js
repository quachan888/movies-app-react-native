import {NavigationContainer} from '@react-navigation/native';

import {View, StyleSheet} from 'react-native';
import React from 'react';
import Home from './screens/Home';

const App = () => {
    return (
        <NavigationContainer>
            <View style={styles.container}>
                <Home />
            </View>
        </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default App;
