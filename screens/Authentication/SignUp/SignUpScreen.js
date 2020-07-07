import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SignUpScreen extends Component
{
    render()
    {
        return (
            <View style={styles.screen} >
                <Text>SignUpScreen!</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default SignUpScreen;