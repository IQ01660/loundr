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
		phone: '',
	};

	onChangePhone = (phone) => {
		this.setState({
			phone: phone,
		});
	};

	onSendCode = async () => {
		const phoneProvider = new firebase.auth.PhoneAuthProvider();
		const phoneNumber = this.state.phone;

		try {
			const verificationId = await phoneProvider.verifyPhoneNumber(phoneNumber, this.recaptchaRef.current);

			firebase
				.database()
				.ref('users')
                .once('value')
				.then((snapshot) => {
                    console.log("CHECKING IF PHONE ALREADY IS REGISTERED");
                    if (snapshot.val() === null)
                    {
                        return;
                    }

					return snapshot.forEach((childSnapshot) => {
						if (childSnapshot.phoneNumber === this.state.phone) {
							throw { msg: 'this phone number exists' };
						}
					});
                }, (err) => (console.log(err)))
                .then(() => {
                    console.log("NAVIGATING")
                    return this.props.navigation.navigate('ConfirmPhone', {
                        user: this.props.navigation.getParam('user'),
                        phoneNumber: phoneNumber,
                        verificationId: verificationId,
                    });
                })
				.catch((err) => {
					return this.setState({
						hasIncorrectCred: true,
					});
				});

			
		} catch (err) {
			console.log(err);
		}
	};

	onCancel = () => {
		firebase
			.auth()
			.currentUser.delete()
			.then(() => {
				return firebase.auth().signOut();
            })
            .then(() => {
                this.props.navigation.navigate('SignUp')
            })
			.catch((err) => {
                console.log(err);
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
