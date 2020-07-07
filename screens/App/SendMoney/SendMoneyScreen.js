import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

class SendMoneyScreen extends Component
{
    render()
    {
        return (
            <View style={styles.screen} >
                <Text>SendMoneyScreen!</Text>
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

export default SendMoneyScreen;