/**
 * Profile Stack Navigation
 */

import { createStackNavigator } from 'react-navigation-stack';

//constants
import Colors from '../../constants/colors';
import FontSizes from '../../constants/fontSizes';

//screens
import MyProfileScreen from '../../screens/App/Profile/MyProfileScreen';
import PaymentMethodsScreens from '../../screens/App/Profile/PaymentMethods/PaymentMethodsScreen';
import AddCardScreen from '../../screens/App/Profile/PaymentMethods/AddCardScreen';

const ProfileStackNavigator = createStackNavigator(
	{
		MyProfile: {
			screen: MyProfileScreen,
			navigationOptions: {
				title: 'My Profile',
            },
        },
        PaymentMethods: {
            screen: PaymentMethodsScreens,
            navigationOptions: {
                title: 'Payment Methods'
            },
        },
        AddCard: {
            screen: AddCardScreen,
            navigationOptions: {
                title: 'Add a Card'
            },
        },

	},
	{
		initialRouteName: 'MyProfile',
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

export default ProfileStackNavigator;
