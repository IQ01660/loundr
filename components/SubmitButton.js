import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Colors from '../constants/colors';
import FontSizes from '../constants/fontSizes';

/**
 * Accepts a title, an onPress, and a backgroundColor prop.
 * As well as a style prop.
 * Takes the whole width of the container.
 * @param {*} props 
 */
const SubmitButton = (props) => (
    <TouchableOpacity style={{width: '100%'}} activeOpacity={0.5} onPress={props.onPress} disabled={props.disabled == true} >
        <View style={ {...styles.button, backgroundColor: props.backgroundColor, ...props.style} } >
            <Text style={styles.title}>{props.title}</Text>
        </View>
    </TouchableOpacity>
);

const styles = StyleSheet.create({
    button: {
        width: '100%',
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    title: {
        fontFamily: 'mont-alt-regular',
        fontSize: FontSizes.headerTitle,
        color: Colors.customWhite,
    },
});

export default SubmitButton;