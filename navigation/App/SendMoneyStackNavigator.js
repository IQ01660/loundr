/**
 * Send Money Stack Navigator
 */

import { createStackNavigator } from 'react-navigation-stack';

//constants
import Colors from '../../constants/colors';
import FontSizes from '../../constants/fontSizes';

//screens
import SendMoneyScreen from '../../screens/App/SendMoney/SendMoneyScreen';
import SelectCardScreen from '../../screens/App/SendMoney/SelectCardScreen';
import FindUsersScreen from '../../screens/App/Users/FindUsersScreen';
import ConfirmPaymentScreen from '../../screens/App/SendMoney/ConfirmPaymentScreen';

const SendMoneyStackNavigator = createStackNavigator(
    {
        SelectUser: {
            screen: FindUsersScreen,
            navigationOptions: {
                title: "Select a User",
            }
        },
        SendMoney: {
            screen: SendMoneyScreen,
            navigationOptions: {
                title: "Pay",
            }
        },
        SelectCard: {
            screen: SelectCardScreen,
            navigationOptions: {
                title: "Select a Card",
            },
        },
        ConfirmPayment: {
            screen: ConfirmPaymentScreen,
            navigationOptions: {
                title: "Confirmation",
            },
        },
    },
    {
		initialRouteName: 'SelectUser',
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

export default SendMoneyStackNavigator;