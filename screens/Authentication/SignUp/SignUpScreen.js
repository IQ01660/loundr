import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

//imports from outside
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//firebase stuff
import * as firebase from 'firebase';
import "firebase/auth"

//constants
import Colors from '../../../constants/colors';
import FontSizes from '../../../constants/fontSizes';
import checkEmail from '../../../constants/checkEmail';

const MIN_PASS_LENGTH = 8;

//components
import SignInLogo from '../../../components/Auth/SignInLogo';
import CredInput from '../../../components/Auth/CredInput';
import SubmitButton from '../../../components/SubmitButton';
import MinorButton from '../../../components/MinorButton';
import ErrorMessage from '../../../components/Auth/ErrorMessage';

class SignInScreen extends Component {
	state = {
		hasIncorrectCredentials: false,
		//contains the values entered in the input fields
		userInputs: {
			name: '',
			surname: '',
			email: '',
			username: '',
			password: '',
			confirmPass: '',
		},
	};

	/**
	 * updates the state by changing the
	 * input the user entered
	 * @param {*} inputName - the key of the field
	 * @param {*} value - the value of the field
	 */
	onChangeInput = (inputName, value) => {
		this.setState((prevState) => {
			const inputsCopy = { ...prevState.userInputs };
			inputsCopy[inputName] = value;

			return {
				userInputs: inputsCopy,
			};
		});
	};

	/**
	 * called when "Sign Up" is clicked
	 */
	onSignUp = () => {
		/**
		 * Final check of entries
		 */
		//if any of the fields are empty
		Object.keys(this.state.userInputs).forEach((key) => {
			if (!this.state.userInputs[key]) {
				return;
			}
		});
		//if email has a wrong form
		if (!checkEmail(this.state.userInputs.email)) {
			return;
		}
		//if the password length is less than minimum allowed
		if (this.state.userInputs.password.length < MIN_PASS_LENGTH) {
			return;
		}
		//if passwords do not match
		if (this.state.userInputs.password !== this.state.userInputs.confirmPass) {
			return;
		}

		//adding this user to firebase authentification
		firebase
			.auth()
			.createUserWithEmailAndPassword(this.state.userInputs.email, this.state.userInputs.password)
			.then(() => {
				const user = firebase.auth().currentUser;
				return user.updateProfile({
					displayName: this.state.userInputs.name + ' ' + this.state.userInputs.surname,
				});
			})
			.then(() => {
				if (!firebase.auth().currentUser.emailVerified) {
					return firebase.auth().currentUser.sendEmailVerification();
				}
			})
			.then(() => {
				return this.setState({
					hasIncorrectCredentials: false,
				});
			})
			.then(() => {
				this.props.navigation.navigate('ConfirmEmail', {
					user: {
						email: this.state.userInputs.email,
						password: this.state.userInputs.password,
                        username: this.state.userInputs.username,
					},
				});
			})
			.catch((err) => {
				this.setState({
					hasIncorrectCredentials: true,
				});
			});
	};

	/**
	 * navigating to sign up page
	 */
	onSignInNavigate = () => {
		this.props.navigation.navigate('SignIn');
	};

	render() {
		// a message to return if some fields are empty
		let overallErrorMessage = null;

		Object.keys(this.state.userInputs).forEach((key) => {
			if (!this.state.userInputs[key]) {
				overallErrorMessage = <ErrorMessage>You must fill in all of the fields</ErrorMessage>;
			}
		});

		return (
			// ****** IT IS IMPORTANT TO HAVE flexGrow: 1 HERE ******
			//do extraHeight={200} if need extra offset from keyboard
			<KeyboardAwareScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
				{/* Allows to dismiss keyboard when screen is clicked */}
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.inner}>
						<SignInLogo style={styles.logo} />
						<View style={styles.loginContainer}>
							{this.state.hasIncorrectCredentials ? (
								<ErrorMessage>A user with this email already exists</ErrorMessage>
							) : null}

							{/* Checking if any fields are empty */}
							{overallErrorMessage}

							{/* Input Fields */}
							<CredInput
								onChangeText={(name) => this.onChangeInput('name', name)}
								value={this.state.userInputs.name}
								style={styles.input}
								placeholder="name..."
								autoCompleteType="name"
								secureTextEntry={false}
							/>
							<CredInput
								onChangeText={(surname) => this.onChangeInput('surname', surname)}
								value={this.state.userInputs.surname}
								style={styles.input}
								placeholder="surname..."
								autoCompleteType="name"
								secureTextEntry={false}
							/>

							{/* Checking Email's form */}
							{checkEmail(this.state.userInputs.email) ? null : (
								<ErrorMessage>Invalid email form</ErrorMessage>
							)}

							<CredInput
								onChangeText={(email) => this.onChangeInput('email', email)}
								value={this.state.userInputs.email}
								style={styles.input}
								placeholder="email..."
								autoCompleteType="email"
								secureTextEntry={false}
							/>
							<CredInput
								onChangeText={(username) => this.onChangeInput('username', username)}
								value={this.state.userInputs.username}
								style={styles.input}
								placeholder="username..."
								autoCompleteType="username"
								secureTextEntry={false}
							/>
							{/* Password Potential Error Message */}
							{this.state.userInputs.password.length < MIN_PASS_LENGTH ? (
								<ErrorMessage>Password must be at least {MIN_PASS_LENGTH} characters long</ErrorMessage>
							) : null}

							<CredInput
								onChangeText={(password) => this.onChangeInput('password', password)}
								value={this.state.userInputs.password}
								style={styles.input}
								placeholder="password..."
								autoCompleteType="password"
								secureTextEntry={true}
							/>
							{/* Confirm Pass Potential Error Message */}
							{this.state.userInputs.password !== this.state.userInputs.confirmPass ? (
								<ErrorMessage>Passwords do not match</ErrorMessage>
							) : null}

							<CredInput
								onChangeText={(confirmPass) => this.onChangeInput('confirmPass', confirmPass)}
								value={this.state.userInputs.confirmPass}
								style={styles.input}
								placeholder="confirm password..."
								autoCompleteType="password"
								secureTextEntry={true}
							/>

							{/* Signing Up */}
							<SubmitButton
								style={styles.submitBtn}
								title="Sign Up"
								backgroundColor={Colors.btnColor}
								onPress={this.onSignUp}
							/>

							{/* Go to Sign In Page */}
							<Text style={styles.question}>Already have an account?</Text>
							<MinorButton
								title="Sign In"
								color={Colors.btnColor}
								style={styles.minorBtn}
								onPress={this.onSignInNavigate}
							/>
						</View>
					</View>
				</TouchableWithoutFeedback>
			</KeyboardAwareScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.logoColor,
	},
	inner: {
		flex: 1,
		padding: 24,
		alignItems: 'center',
	},
	logo: {
		marginVertical: 50,
	},
	loginContainer: {
		width: '82%',
		alignItems: 'center',
	},
	input: {
		marginVertical: 15,
	},
	submitBtn: {
		marginVertical: 15,
	},
	question: {
		color: Colors.customWhite,
		fontSize: FontSizes.minorText,
		fontFamily: 'mont-alt-regular',
	},
	minorBtn: {
		marginVertical: 15,
	},
});

export default SignInScreen;
