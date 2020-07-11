/**
 * Profile Stack Navigation
 */

import { createStackNavigator } from 'react-navigation-stack';

//constants
import Colors from '../../constants/colors';
import FontSizes from '../../constants/fontSizes';

//screens
import MyProfileScreen from '../../screens/App/Profile/MyProfileScreen';

const ProfileStackNavigator = createStackNavigator(
	{
		MyProfile: {
			screen: MyProfileScreen,
			navigationOptions: {
				title: 'My Profile',
			},
		},
	},
	{
		initialRouteName: 'MyProfile',
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

export default ProfileStackNavigator;
