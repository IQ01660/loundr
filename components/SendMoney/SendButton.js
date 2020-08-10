import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';
import FontSizes from '../../constants/fontSizes';

/**
 * @onPress
 * @color
 * @title
 * @param {*} props 
 */
const SendButton = (props) => (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.6} >
        <View style={{ ...styles.button, backgroundColor: props.color }} >
            <Text style={styles.title} >{props.title}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        width: '100%',
        paddingVertical: 15,
        paddingHorizontal: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontFamily: 'mont-alt-medium',
        fontSize: FontSizes.headerTitle,
        color: Colors.customWhite,
    },
});

export default SendButton;