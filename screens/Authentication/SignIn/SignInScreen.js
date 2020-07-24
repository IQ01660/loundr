import React, { Component } from 'react';
import { StyleSheet, View, Text, TouchableWithoutFeedback, Keyboard, Alert } from 'react-native';

//imports from outside
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

//firebase stuff
import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

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
		//contains the values entered of the input fields
		userInputs: {
			email: '',
            password: '',
        },
        hasIncorrectCredentials: false,
	};
	/**
	 * updates the state by changing the
	 * username the user entered
	 * @param {*} username - the updated username
	 */
	onChangeEmail = (email) => {
		this.setState((prevState) => {
			return {
				userInputs: {
					...prevState.userInputs,
					email: email,
				},
			};
		});
	};

	/**
	 * updates the state by changing the
	 * password the user entered
	 * @param {*} password - the updated password
	 */
	onChangePassword = (password) => {
		this.setState((prevState) => {
			return {
				userInputs: {
					...prevState.userInputs,
					password: password,
				},
			};
		});
    };

	/**
	 * called when "Sign In" is clicked
	 */
	onSignIn = () => {
		firebase
			.auth()
            .signInWithEmailAndPassword(this.state.userInputs.email, this.state.userInputs.password)
            .then(() => {
                if (!firebase.auth().currentUser.emailVerified)
                {
                    throw {msg: "Verify email first"};
                }
            })
            .then()
            .then(() => {
                return this.setState({
                    hasIncorrectCredentials: false,
                });
            })
			.then(() => {
				this.props.navigation.navigate('MyProfile', {
					user: firebase.auth().currentUser,
				});
            }).
            catch(err => {
                this.setState({
                    hasIncorrectCredentials: true,
                });
            });
	};

	/**
	 * navigating to SignUp page
	 */
	onSignUpNavigate = () => {
		this.props.navigation.navigate('SignUp');
	};

	/**
	 * navigating to forgot password screen
	 */
	onForgotPassword = () => {
        this.props.navigation.navigate('ForgotPass');
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
                            {/* Potential Error Message */}
                            {this.state.hasIncorrectCredentials ? <ErrorMessage>Incorrect email or password</ErrorMessage> : null}

							{/* Input Fields */}
							<CredInput
								onChangeText={this.onChangeEmail}
								value={this.state.userInputs.email}
								style={styles.input}
								placeholder="email..."
								autoCompleteType="email"
								secureTextEntry={false}
							/>
							<CredInput
								onChangeText={this.onChangePassword}
								value={this.state.userInputs.password}
								style={styles.input}
								placeholder="password..."
								autoCompleteType="password"
								secureTextEntry={true}
							/>

							{/* Signing In */}
							<SubmitButton
								style={styles.submitBtn}
								title="Sign In"
								backgroundColor={Colors.btnColor}
								onPress={this.onSignIn}
							/>

							{/* Go to Log In Page */}
							<Text style={styles.question}>Don't have an account yet?</Text>
							<MinorButton
								title="Sign Up"
								color={Colors.btnColor}
								style={styles.minorBtn}
								onPress={this.onSignUpNavigate}
							/>
							<MinorButton
								title="Forgot password"
								color={Colors.logoLabelColor}
								style={styles.minorBtn}
								onPress={this.onForgotPassword}
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
