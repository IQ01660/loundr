import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

//constants
import Colors from '../constants/colors';

const Avatar = (props) => (
    <View style={{ ...styles.container, borderRadius: props.width / 2}} >
        <Image style={{ width: props.width, height: props.width }} source={props.source} resizeMode="cover" />
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        backgroundColor: Colors.logoColor,
        borderWidth: 3,
        borderColor: Colors.logoColor,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Avatar