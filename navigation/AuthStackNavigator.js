/**
 * The Auth Stack Navigator
 */

import { createStackNavigator } from "react-navigation-stack";

//importing screens
import SignInScreen from "../screens/Authentication/SignIn/SignInScreen";

//other navigators
import SignUpStackNavigator from './SignUpStackNavigator';

const AuthStackNavigator = createStackNavigator(
  {
    SignIn: SignInScreen,
    SignUp: SignUpStackNavigator,
  },
  {
    initialRouteName: "SignIn",
    defaultNavigationOptions: {
      headerShown: false,
    },
  }
);

export default AuthStackNavigator;
