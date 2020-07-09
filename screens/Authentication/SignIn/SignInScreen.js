import React, { Component } from 'react';
import {
	StyleSheet,
	View,
	Text,
	Button,
	TouchableWithoutFeedback,
	Keyboard,
	KeyboardAvoidingView,
	Platform,
} from 'react-native';

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

class SignInScreen extends Component {
	static navigationOptions = {};

	state = {
		userInputs: {
			username: '',
			password: '',
		},
	};

	/**
	 * updates the state by changing the
	 * username the user entered
	 * @param {*} username - the updated username
	 */
	onChangeUsername = (username) => {
		this.setState((prevState) => {
			return {
				userInputs: {
					username: username,
					password: prevState.userInputs.password,
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
					username: prevState.userInputs.username,
					password: password,
				},
			};
		});
	};

	render() {
		return (
			<KeyboardAwareScrollView contentContainerStyle={styles.containerContent} style={styles.container}>
				<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
					<View style={styles.inner}>
						<SignInLogo style={styles.logo} />
						<View style={styles.loginContainer}>
							<CredInput
								onChangeText={this.onChangeUsername}
								value={this.state.userInputs.username}
								style={styles.input}
								placeholder="username..."
								autoCompleteType="username"
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
                            
							<SubmitButton style={styles.submitBtn} title="log in" backgroundColor={Colors.btnColor} />

							<Text style={styles.question}>Don't have an account yet?</Text>
							<MinorButton title="Sign Up" color={Colors.btnColor} style={styles.submitBtn} />
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
        padding: 24,
        flex:1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		// backgroundColor: Colors.customBlack,
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
});

export default SignInScreen;
