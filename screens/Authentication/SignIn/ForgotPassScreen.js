import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomScrollView from '../../../components/CustomScrollView';
import ErrorMessage from '../../../components/Auth/ErrorMessage';
import SubmitButton from '../../../components/SubmitButton';
import CredInput from '../../../components/Auth/CredInput';
import checkEmail from '../../../constants/checkEmail';
import Colors from '../../../constants/colors';

import firebase from 'firebase';
import 'firebase/auth';

class ForgotPassScreen extends Component {
	state = {
		hasIncorrectCred: false,
		validEmail: true,
		email: '',
	};

	onChangeEmail = (email) => {
		this.setState({
			email: email,
			validEmail: checkEmail(email),
		});
	};

	onSubmit = () => {
        if (!this.state.email)
        {
            return;
        }

		if (!this.state.validEmail) {
			return;
		}

		firebase
			.auth()
			.sendPasswordResetEmail(this.state.email)
			.then(() => {
				return this.onCancel();
            })
            .catch((err) => {
                return this.setState({
                    hasIncorrectCred: true,
                });
            })
	};

	onCancel = () => {
		this.props.navigation.navigate('SignIn');
	};

	render() {
		return (
			<CustomScrollView backgroundColor={Colors.logoColor} style={styles.container}>
				<View style={styles.inner}>
                    {!this.state.validEmail ? (
						<ErrorMessage>The entered email has an incorect format</ErrorMessage>
					) : null}

					<CredInput
						keyboardType="email-address"
						style={styles.input}
						value={this.state.email}
						onChangeText={this.onChangeEmail}
						autoCompleteType="email"
						secureTextEntry={false}
						placeholder="e.g. john@amherst.edu"
					/>

					{this.state.hasIncorrectCred ? (
						<ErrorMessage>
							The email entered is either invalid or no account exists bound to this email
						</ErrorMessage>
					) : null}


					{/* Sending the password reset email */}
					<SubmitButton
						style={styles.submitBtn}
						title="Submit"
						backgroundColor={Colors.btnColor}
						onPress={this.onSubmit}
					/>

					<SubmitButton
						style={styles.submitBtn}
						title="Cancel"
						backgroundColor={Colors.errorMessage}
						onPress={this.onCancel}
					/>

					<Text style={styles.note}>
						Note: after clicking "Submit" you should receive an email with instructions on how to reset your
						password
					</Text>
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
		justifyContent: 'center',
		alignItems: 'center',
		width: '82%',
	},
	input: {
		color: Colors.customWhite,
		marginVertical: 25,
	},
	note: {
		color: Colors.customWhite,
		fontFamily: 'mont-alt-regular',
		fontSize: 13,
	},
	submitBtn: {
		marginVertical: 25,
	},
});

export default ForgotPassScreen;
