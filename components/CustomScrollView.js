import React from 'react';
import { StyleSheet, View, TouchableWithoutFeedback, Keyboard } from 'react-native';

//imports from outside
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

/**
 * A ScrollView that is aware of keyboard and easy to use.
 * Props are:
 * @backgroundColor of the screen,
 * @style of the "inner" view,
 * @keyboardVerticalOffset distance from the covered input to keyboard (rough).
 * @param {*} props 
 */
const MyProfileScreen = (props) => (
	// ****** IT IS IMPORTANT TO HAVE flexGrow: 1 HERE ******
    //do extraHeight={200} if need extra offset from keyboard
    
	<KeyboardAwareScrollView 
        extraHeight={props.keyboardVerticalOffset || 0}
        style={{ backgroundColor: props.backgroundColor }} 
        contentContainerStyle={{ flexGrow: 1 }}>

		{/* Allows to dismiss keyboard when screen is clicked */}
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<View style={{ ...styles.inner, ...props.style}}>
                {props.children}
            </View>
		</TouchableWithoutFeedback>

	</KeyboardAwareScrollView>
);

const styles = StyleSheet.create({
	inner: {
		flex: 1,
	},
});

export default MyProfileScreen;
