/**
 * The Auth Stack Navigator
 */

import { createStackNavigator } from "react-navigation-stack";

//importing screens
import SignInScreen from "../screens/Authentication/SignIn/SignInScreen";
import ForgotPassScreen from '../screens/Authentication/SignIn/ForgotPassScreen';

//other navigators
import SignUpStackNavigator from './Auth/SignUpStackNavigator';

const AuthStackNavigator = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpStackNavigator,
    ForgotPass: ForgotPassScreen,
  },
  {
    initialRouteName: "SignIn",
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default AuthStackNavigator;
