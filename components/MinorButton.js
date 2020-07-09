import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import FontSizes from '../constants/fontSizes';

/**
 * Props:
 * color, title, onPress, style
 * @param {*} props
 */
const MinorButton = (props) => (
	<TouchableOpacity onPress={props.onPress}>
		<View style={{borderBottomWidth: 1, borderBottomColor: props.color,}}>
			<Text style={{ ...styles.btn, color: props.color, ...props.style }}>
				{props.title}
			</Text>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	btn: {
		fontFamily: 'mont-alt-regular',
		fontSize: FontSizes.minorText,
	},
});

export default MinorButton;
