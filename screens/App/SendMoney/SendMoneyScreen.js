import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import StripeCheckout from 'expo-stripe-checkout';

class SendMoneyScreen extends Component {
	onPaymentSuccess = (token) => {
        // send the stripe token to your backend!
        console.log(token);
	};

	onClose = () => {
		// maybe navigate to other screen here?
	};

	render() {
		return (
            <View>
                
            </View>
			// <StripeCheckout
			// 	publicKey="sk_test_4eC39HqLyjWDarjtT1zdp7dc"
			// 	amount={100000}
			// 	imageUrl="https://pbs.twimg.com/profile_images/778378996580888577/MFKh-pNn_400x400.jpg"
			// 	storeName="Stripe Checkout"
			// 	description="Test"
			// 	currency="USD"
			// 	allowRememberMe={false}
			// 	prepopulatedEmail="test@test.com"
			// 	onClose={this.onClose}
			// 	onPaymentSuccess={this.onPaymentSuccess}
			// />
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
