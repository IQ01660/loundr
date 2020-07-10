import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

//constants
import Colors from '../../constants/colors';
import FontSizes from '../../constants/fontSizes';
import fontSizes from '../../constants/fontSizes';

/**
 * Can be used when displaying errors
 * when users enter credentials e.g.
 * Note: takes the whole width of container
 * @param {*} props - children
 */
const ErrorText = (props) => (
    <View style={styles.container}>
        <Text style={styles.message}>{props.children}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: Colors.errorContainer,
        borderRadius: 30,
        paddingHorizontal: 30,
        paddingVertical: 5,
    },
    message: {
        color: Colors.errorMessage,
        fontFamily: 'mont-alt-regular',
        fontSize: FontSizes.credText,
    },
});

export default ErrorText;