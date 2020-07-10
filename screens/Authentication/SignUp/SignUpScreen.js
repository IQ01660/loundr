import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native';

//imports from outside
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//constants
import Colors from '../../../constants/colors';
import FontSizes from '../../../constants/fontSizes';

//components
import SignInLogo from '../../../components/Auth/SignInLogo';
import CredInput from '../../../components/Auth/CredInput';
import SubmitButton from '../../../components/SubmitButton';
import MinorButton from '../../../components/MinorButton';
import ErrorMessage from '../../../components/Auth/ErrorMessage';

class SignInScreen extends Component {
	static navigationOptions = {};

	state = {
		//contains the values entered in the input fields
		userInputs: {
			name: '',
			surname: '',
			email: '',
			username: '',
			password: '',
			confirmPass: '',
			phone: '',
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
	onSignUp = () => {};

	/**
	 * navigating to sign up page
	 */
	onSignInNavigate = () => {
		this.props.navigation.navigate('SignIn');
	};

	render() {
		return (
			// ****** IT IS IMPORTANT TO HAVE flexGrow: 1 HERE ******
			<KeyboardAwareScrollView style={styles.container} contentContainerStyle={{ flexGrow: 1 }}>
				{/* Allows to dismiss keyboard when screen is clicked */}
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.inner}>
						<SignInLogo style={styles.logo} />
						<View style={styles.loginContainer}>
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

							{this.state.userInputs.password.length < 8 ? <ErrorMessage>Password must be at least 8 characters long</ErrorMessage> : null}

							<CredInput
								onChangeText={(password) => this.onChangeInput('password', password)}
								value={this.state.userInputs.password}
								style={styles.input}
								placeholder="password..."
								autoCompleteType="password"
								secureTextEntry={true}
							/>
                            {this.state.userInputs.password !== this.state.userInputs.confirmPass ? <ErrorMessage>Passwords do not match</ErrorMessage> : null}

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
							<Text style={styles.question}>Don't have an account yet?</Text>
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
