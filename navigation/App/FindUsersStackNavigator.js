/**
 * Find Users Stack Navigation
 */

import { createStackNavigator } from 'react-navigation-stack';

//constants
import Colors from '../../constants/colors';
import FontSizes from '../../constants/fontSizes';

//screens
import FindUsersScreen from '../../screens/App/Users/FindUsersScreen';

const FindUsersStackNavigator = createStackNavigator(
	{
		FindUsers: {
			screen: FindUsersScreen,
			navigationOptions: {
				title: 'Find Users',
            },
        },
	},
	{
		initialRouteName: 'FindUsers',
		defaultNavigationOptions: {
            headerBackTitle: "Back",
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

export default FindUsersStackNavigator;
