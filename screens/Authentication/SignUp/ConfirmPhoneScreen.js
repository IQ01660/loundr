import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//components
import CustomScrollView from '../../../components/CustomScrollView';
import CredInput from '../../../components/Auth/CredInput';
import SubmitButton from '../../../components/SubmitButton';

//constants
import Colors from '../../../constants/colors';

//outside imports
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

class ConfirmPhoneScreen extends Component {
	state = {
		hasIncorrectCred: false,
		code: '',
		user: this.props.navigation.getParam('user'),
		phoneNumber: this.props.navigation.getParam('phoneNumber'),
		verificationId: this.props.navigation.getParam('verificationId'),
	};

	onChangeCode = (code) => {
		this.setState({
			code: code,
		});
	};

	/**
	 * This is where I check the following:
	 * 1) check if confirmation code is correct
	 * 2) sign out
	 * 3) sign in with email and password
	 * 4) updateProfile (phone)
	 * 5) add data to database
	 */
	onConfirm = () => {
		var credential = firebase.auth.PhoneAuthProvider.credential(this.state.verificationId, this.state.code);

		firebase
			.auth()
            .signInWithCredential(credential)
            .catch(err => {
                return this.setState({
                    hasIncorrectCred: true,
                });
            })
			.then(() => {
                return firebase.auth().signOut();
            })
            .then(() => {
                return firebase.auth().signInWithEmailAndPassword(this.state.user.email, this.state.user.password)
            })
            .then(() => (
                firebase.auth().currentUser.updatePhoneNumber(this.state.phoneNumber)
            ))
            .then(() => {
                const user = firebase.auth().currentUser;
                return firebase.database().ref('users/' + user.uid).set({
                        displayName: user.displayName,
                        username: this.state.user.username,
                        email: user.email,
                        phoneNumber: user.phoneNumber,
                        friends: {},
                        cards: {},
                    });
                }
            );
	};

	render() {
		return (
			<CustomScrollView backgroundColor={Colors.logoColor} style={styles.container}>
				<View style={styles.inner}>
					<CredInput
						keyboardType="number-pad"
						style={styles.input}
						value={this.state.code}
						onChangeText={this.onChangeCode}
						autoCompleteType="off"
						secureTextEntry={false}
						placeholder="Verification code"
					/>

					{/* Sending the Verification Code */}
					<SubmitButton
						style={styles.submitBtn}
						title="Confirm"
						backgroundColor={Colors.btnColor}
						onPress={this.onConfirm}
					/>

					{this.state.hasIncorrectCred ? <Text style={styles.note}>Incorrect Verification Code</Text> : null}
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
		justifyContent: 'space-evenly',
		alignItems: 'center',
		width: '82%',
	},
	input: {
		color: Colors.customWhite,
		marginVertical: 25,
	},
	note: {
		color: Colors.errorMessage,
		fontFamily: 'mont-alt-regular',
		fontSize: 13,
	},
	submitBtn: {
		marginVertical: 25,
	},
});

export default ConfirmPhoneScreen;
