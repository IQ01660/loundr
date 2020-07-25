import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';

import Colors from '../constants/colors';
import FontSizes from '../constants/fontSizes';

/**
 * This buton is best suited to be placed
 * near search bars for example.
 * @title
 * @onPress
 * @param {*} props 
 */
const SearchButton = props => {
    return (
        <TouchableOpacity activeOpacity={0.5} onPress={props.onPress} >
            <View style={styles.button} >
                <Text style={styles.title} >{props.title}</Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    button: {},
    title: {
        fontFamily: 'mont-alt-regular',
        fontSize: FontSizes.minorText
    },
});

export default SearchButton;