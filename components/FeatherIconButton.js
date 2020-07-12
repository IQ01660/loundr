import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import FontSizes from '../constants/fontSizes';

/**
 * @color backgroundColor of the button
 * @iconName Feater icon name
 * @iconColor the color of the icon
 * @onPress a function
 * @param {*} props
 */
const FeatherIconButton = (props) => (
	<TouchableOpacity activeOpacity={0.5} onPress={props.onPress} >
		<View style={{ ...styles.container, backgroundColor: props.color }}>
			<Feather name={props.iconName} size={FontSizes.tabIcon} color={props.iconColor} />
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		width: 100,
		height: 100,
		borderRadius: 50,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default FeatherIconButton;
