import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Colors from '../constants/colors';
import FontSizes from '../constants/fontSizes';

/**
 * @title
 * @onPress
 * takes the whole width of the container
 * @param {*} props 
 */
const RectButton = props => (
    <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} >
        <View style={styles.button} >
            <Text style={styles.title} >{props.title}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        backgroundColor: Colors.screenColor,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 10,

    },
    title: {
        color: Colors.customWhite,
        fontFamily: 'mont-alt-regular',
        fontSize: 28,
    },
});

export default RectButton;