/**
 * App Tab Navigator
 */
import { createBottomTabNavigator } from 'react-navigation-tabs';

//constants

//screens
import MyProfileScreen from '../screens/App/Profile/MyProfileScreen';
import FindUsersScreen from '../screens/App/Users/FindUsersScreen';
import FriendsScreen from '../screens/App/Users/FriendsScreen';

const AppTabNavigator = createBottomTabNavigator(
    {
        MyProfile: MyProfileScreen,
        FindUsers: FindUsersScreen,
        Friends: FriendsScreen,
    },
    {
        initialRouteName: 'MyProfile',
    },
);
 
export default AppTabNavigator