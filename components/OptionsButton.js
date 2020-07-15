import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

//constants
import Colors from '../constants/colors';
import FontSizes from '../constants/fontSizes';

/**
 * A button that can be used in settings e.g.
 * Needs props:
 * @iconName - FontAwesome name of the icon
 * @title - the title of the button
 * @isLast - boolean, shows the last item in the list
 * @onPress - function
 * @param {*} props 
 */
const OptionsButton = (props) => (
	<TouchableOpacity activeOpacity={0.5} onPress={props.onPress} >
		<View style={styles.container}>
			<View style={styles.iconContainer} >
				<FontAwesome name={props.iconName} size={FontSizes.tabIcon} color={Colors.placeHolderColor} />
			</View>
			<View style={{ ...styles.titleContainer, borderBottomWidth: props.isLast ? 0 : 1 }} >
				<Text style={styles.title}>{props.title}</Text>
                <FontAwesome name="angle-right" size={FontSizes.tabIcon} color={Colors.placeHolderColor} />
			</View>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        width: '100%',
        flexDirection: 'row'
    },
    iconContainer: {
        width: '15%',
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 13,
    },
    titleContainer: {
        width: '85%',
        justifyContent: 'space-between',
        flexDirection: "row",
        alignItems: 'center',
        borderBottomColor: Colors.placeHolderColor,
        paddingVertical: 13,
        paddingRight: 20,
    },
	title: {
		fontFamily: 'mont-alt-regular',
		color: Colors.customBlack,
		fontSize: FontSizes.credText,
	},
});

export default OptionsButton;
