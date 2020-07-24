import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//components
import CustomScrollView from '../../../components/CustomScrollView';
import SubmitButton from '../../../components/SubmitButton';

//constants
import Colors from '../../../constants/colors';

class ConfirmEmailScreen extends Component {
	onNext = () => {
		this.props.navigation.navigate('EnterPhone', {
			user: this.props.navigation.getParam('user'),
		});
	};

	render() {
		return (
			<CustomScrollView backgroundColor={Colors.logoColor} style={styles.container}>
				<View style={styles.inner}>
					<Text style={styles.title}>Please confirm your email before continuing</Text>
					<SubmitButton
						style={styles.submitBtn}
						title="Next"
						backgroundColor={Colors.btnColor}
						onPress={this.onNext}
					/>
				</View>
			</CustomScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	inner: {
		flex: 1,
		width: '82%',
		justifyContent: 'center',
		alignItems: 'center',
	},
	title: {
		color: Colors.customWhite,
	},
	submitBtn: {
		marginVertical: 15,
	},
});

export default ConfirmEmailScreen;
