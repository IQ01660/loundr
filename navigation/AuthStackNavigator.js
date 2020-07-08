/**
 * The Auth Stack Navigator
 */

import { createStackNavigator } from 'react-navigation-stack';

//constants
import Colors from '../constants/colors';
import FontSizes from '../constants/fontSizes';

//importing screens
import SignInScreen from '../screens/Authentication/SignIn/SignInScreen';
import SignUpScreen from '../screens/Authentication/SignUp/SignUpScreen';

const AuthStackNavigator = createStackNavigator(
	{
		SignIn: SignInScreen,
		SignUp: SignUpScreen,
	},
	{
		initialRouteName: 'SignIn',
		defaultNavigationOptions: {
			headerStyle: {
				backgroundColor: Colors.logoColor,
			},
			headerTintColor: Colors.customWhite,
			headerTitleStyle: {
                fontFamily: 'mont-alt-bold',
                fontSize: FontSizes.headerTitle,
			},
		},
	}
);

export default AuthStackNavigator;
