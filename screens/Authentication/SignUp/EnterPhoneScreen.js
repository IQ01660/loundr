import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//components
import CustomScrollView from '../../../components/CustomScrollView';
import CredInput from '../../../components/Auth/CredInput';
import SubmitButton from '../../../components/SubmitButton';
import ErrorMessage from '../../../components/Auth/ErrorMessage';

//constants
import Colors from '../../../constants/colors';

//outside imports
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebaseConfig from '../../../Firebase';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

class EnterPhoneScreen extends Component {
	constructor(props) {
		super(props);
		this.recaptchaRef = React.createRef();
	}

	state = {
		hasIncorrectCred: false,
		didManyRequests: false,
		phone: '',
	};

	onChangePhone = (phone) => {
		this.setState({
			phone: phone,
		});
	};

    /**
     * sending the verification code
     * and checking if this phone entered was registered before
     */
	onSendCode = async () => {
		const phoneProvider = new firebase.auth.PhoneAuthProvider();
		const phoneNumber = this.state.phone;

		try {
            const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, this.recaptchaRef.current);
            
			firebase
				.database()
				.ref('usersPublic')
				.once('value')
				.then((snapshot) => {
					console.log('CHECKING IF PHONE ALREADY IS REGISTERED');

					//if no users in usersPublic no need for the check
					if (snapshot.val() === null) {
						return;
					}

					//otherwise go through every $uid
					return snapshot.forEach((childSnapshot) => {
						//check if any $uid has their phoneNumber equal to the one entered
						if (childSnapshot.phoneNumber === this.state.phone) {
							//if yes go to closest catch and update state - hasIncorectCred
							throw { msg: 'this phone number exists' };
						}
					});
				})
				.then(() => {
					console.log('NAVIGATING');
					//if no error was thrown above navigate to ConfirmPhone page with user info
					return this.props.navigation.navigate('ConfirmPhone', {
						user: this.props.navigation.getParam('user'),
						phoneNumber: phoneNumber,
						verificationId: verificationId,
					});
				})
				.catch((err) => {
					//this will display an error on the screen
					return this.setState({
						hasIncorrectCred: true,
					});
				});
		} catch (err) {
			//this will happen if too many requests were send by user from this IP
			this.setState({
				didManyRequests: true,
			});
		}
	};

    /**
     * if user wants to cancel:
     * their account will be deleted from firebase and they will navigate to SignUp
     * they will also be reauthenticated if they registered a long time ago
     * this will also be called if this page is dismounted
     */
	onCancel = () => {
		firebase
			.auth()
			.currentUser.delete()
			.then(() => {
				this.props.navigation.navigate('SignUp');
			})
			.catch((err) => {
				firebase
					.auth()
					.signInWithEmailAndPassword(
						this.props.navigation.getParam('user').email,
						this.props.navigation.getParam('user').password
					)
					.then(() => {
						return this.onCancel();
					})
					.catch((err) => {
						console.log(err);
					});
			});
    };

	render() {
		return (
			<CustomScrollView backgroundColor={Colors.logoColor} style={styles.container}>
				<View style={styles.inner}>
					{this.state.hasIncorrectCred ? (
						<ErrorMessage>
							A user with this phone number already exists or the phone number is incorrect
						</ErrorMessage>
					) : null}

                    {this.state.didManyRequests ? (
						<ErrorMessage>
							You did too many requests, wait for some time before trying again
						</ErrorMessage>
					) : null}

					<CredInput
						keyboardType="phone-pad"
						style={styles.input}
						value={this.state.phone}
						onChangeText={this.onChangePhone}
						autoCompleteType="tel"
						secureTextEntry={false}
						placeholder="e.g. +994502223344"
					/>

					{/* Sending the Verification Code */}
					<SubmitButton
						style={styles.submitBtn}
						title="Send Code"
						backgroundColor={Colors.btnColor}
						onPress={this.onSendCode}
					/>

					<SubmitButton
						style={styles.submitBtn}
						title="Cancel"
						backgroundColor={Colors.errorMessage}
						onPress={this.onCancel}
					/>

					<Text style={styles.note}>
						Note: after sending the verification code you should receive an SMS message, and standard rates
						may apply
					</Text>

					<FirebaseRecaptchaVerifierModal ref={this.recaptchaRef} firebaseConfig={firebaseConfig} />
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
		color: Colors.customWhite,
		fontFamily: 'mont-alt-regular',
		fontSize: 13,
	},
	submitBtn: {
		marginVertical: 25,
	},
});

export default EnterPhoneScreen;
