//navigator imports and createAppContainer import
//wrap the main navigator into createAppContainer 
//and export the resulting component
import { createAppContainer, createSwitchNavigator } from 'react-navigation';

//importing other navigators
import AuthStackNavigator from './AuthStackNavigator';

/**
 * Naming conventions:
 * for navigators:
 * <[Name][NavigatorType]Navigator>
 * 
 * Also make sure that the route names
 * are unique across the application
 */

/**
 * The Entry point Switch Navigator
 */
const EntrySwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthStackNavigator
    },
    {
        initialRouteName: 'Auth',
    }
);

//this should go into [App.js]
export default createAppContainer(EntrySwitchNavigator);

