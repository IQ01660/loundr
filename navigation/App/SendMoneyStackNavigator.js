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

const SendMoneyStackNavigator = createStackNavigator(
    {
        SendMoney: {
            screen: SendMoneyScreen,
            navigationOptions: {
                title: "Pay or Request",
            }
        },
        SelectCard: {
            screen: SelectCardScreen,
            navigationOptions: {
                title: "Select a Card",
            },
        },
    },
    {
		initialRouteName: 'SendMoney',
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