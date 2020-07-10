/**
 * Sign Up Stack
 */
import { createStackNavigator } from 'react-navigation-stack';

//screens
import SignUpScreen from '../screens/Authentication/SignUp/SignUpScreen';
import ConfirmEmailScreen from '../screens/Authentication/SignUp/ConfirmEmailScreen';
import EnterPhoneScreen from '../screens/Authentication/SignUp/EnterPhoneScreen';
import ConfirmPhoneScreen from '../screens/Authentication/SignUp/ConfirmPhoneScreen';

const SignUpStackNavigator = createStackNavigator(
    {
        SignUp: SignUpScreen,
        ConfirmEmail: ConfirmEmailScreen,
        EnterPhone: EnterPhoneScreen,
        ConfirmPhone: ConfirmPhoneScreen,
    },
    {
        initialRouteName: 'SignUp',
        defaultNavigationOptions: {
            headerShown: false,
        },
    },
);

export default SignUpStackNavigator;