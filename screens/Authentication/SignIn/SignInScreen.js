import React, { Component } from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';

class SignInScreen extends Component {
	static navigationOptions = {
		title: 'Sign In',
	};

	render() {
		return (
			<ScrollView contentContainerStyle={styles.screen}>
				<Text>Hey</Text>
			</ScrollView>
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

export default SignInScreen;
