/**
 * The Auth Stack Navigator
 */

import { createStackNavigator } from 'react-navigation-stack'

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
    }
);

export default AuthStackNavigator;