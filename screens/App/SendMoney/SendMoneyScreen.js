import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

class SendMoneyScreen extends Component {
	onPaymentSuccess = (token) => {
		// send the stripe token to your backend!
	};

	onClose = () => {
		// maybe navigate to other screen here?
    };
    
	render() {
		return (
			<View style={styles.screen} >
                <Text>Send Money Screen</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default SendMoneyScreen;
