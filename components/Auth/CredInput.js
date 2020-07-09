import React, { Component } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import Colors from '../../constants/colors';
import FontSizes from '../../constants/fontSizes';

/**
 * The input will take the full width
 * of the container.
 * Received props:
 * style, value, onChangeText, autoCompleteType,
 * secureTextEntry, placeholder
 * @param {*} props 
 */
export default function CredInput(props) {

	return (
		<TextInput
			onChangeText={props.onChangeText}
			value={props.value}

			style={{ ...styles.input, ...props.style }}
			autoCapitalize="none"
			placeholder={props.placeholder}
			placeholderTextColor={Colors.customWhite}
			secureTextEntry={props.secureTextEntry}
			autoCompleteType={props.autoCompleteType}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 50,
		width: '100%',
		borderColor: Colors.customWhite,
		borderWidth: 1,
		borderRadius: 30,
		paddingHorizontal: 30,
		color: Colors.customWhite,
		fontSize: FontSizes.credText,
		fontFamily: 'mont-alt-regular',
	},
});
