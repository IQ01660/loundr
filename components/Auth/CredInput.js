import React, { useState } from 'react';
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
	const [borderColor, borderColorUpdate] = useState(Colors.customWhite);
	const [borderWidth, borderWidthUpdate] = useState(1);

	return (
		<TextInput
			onChangeText={props.onChangeText}
			value={props.value}
			style={{ ...styles.input, ...props.style, borderColor: borderColor, borderWidth: borderWidth }}
			autoCapitalize="none"
			placeholder={props.placeholder}
			placeholderTextColor={Colors.placeHolderColor}
			selectionColor={Colors.btnColor}
			secureTextEntry={props.secureTextEntry}
			autoCompleteType={props.autoCompleteType}
			onFocus={() => {
				borderColorUpdate(Colors.btnColor);
				borderWidthUpdate(4);
			}}
			onBlur={() => {
				borderColorUpdate(Colors.customWhite);
                borderWidthUpdate(1);
			}}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 50,
		width: '100%',
		borderRadius: 30,
		paddingHorizontal: 30,
		color: Colors.customWhite,
		fontSize: FontSizes.credText,
		fontFamily: 'mont-alt-regular',
	},
});
