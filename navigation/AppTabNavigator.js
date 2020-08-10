/**
 * App Tab Navigator
 */
import React from 'react';
import { createBottomTabNavigator } from 'react-navigation-tabs';

//constants
import Colors from '../constants/colors';
import FontSizes from '../constants/fontSizes';

//icon imports
import { Feather, Ionicons } from '@expo/vector-icons'; 

//screens
import FriendsScreen from '../screens/App/Users/FriendsScreen';
import SendMoneyScreen from '../screens/App/SendMoney/SendMoneyScreen';

//other navigators
import ProfileStackNavigator from './App/ProfileStackNavigator';
import FindUsersStackNavigator from './App/FindUsersStackNavigator';
import SendMoneyStackNavigator from './App/SendMoneyStackNavigator';

const AppTabNavigator = createBottomTabNavigator(
    {
        ProfileStack: {
            screen: ProfileStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => {
                    return <Feather name="user" color={tintColor} size={FontSizes.tabIcon} />;
                },
            },
        },
        FindUsers: {
            screen: FindUsersStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => {
                    return <Ionicons name="ios-search" color={tintColor} size={FontSizes.tabIcon} />;
                },
            },
        },
        Friends: {
            screen: FriendsScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => {
                    return <Feather name="archive" color={tintColor} size={FontSizes.tabIcon} />;
                },
            },
        },
        SendMoney: {
            screen: SendMoneyStackNavigator,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => {
                    return <Feather name="send" color={tintColor} size={FontSizes.tabIcon} />;
                },
            },
        },
    },
    {
        initialRouteName: 'ProfileStack',
        tabBarOptions: {
            showLabel: false,
            activeTintColor: Colors.customWhite,
            inactiveTintColor: Colors.logoLabelColor,
            style: {
                backgroundColor: Colors.logoColor,
            }
        }
    },
);
 
export default AppTabNavigator