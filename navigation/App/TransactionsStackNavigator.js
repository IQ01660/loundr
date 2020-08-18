/**
 * Find Users Stack Navigation
 */

import { createStackNavigator } from 'react-navigation-stack';

//constants
import Colors from '../../constants/colors';
import FontSizes from '../../constants/fontSizes';

//screens
import TransactionsScreen from '../../screens/App/Transactions/TransactionsScreen';

const TransactionsStackNavigator = createStackNavigator(
	{
		Payments: {
			screen: TransactionsScreen,
			navigationOptions: {
				title: 'Payments',
            },
        },
	},
	{
		initialRouteName: 'Payments',
		defaultNavigationOptions: {
            headerBackTitle: "Back",
            //headerBackTitleVisible: false,
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

export default TransactionsStackNavigator;
