import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';

import FontSizes from '../../constants/fontSizes';

import Colors from '../../constants/colors';

/**
 * @onChangeText
 * @placeholder
 * @value
 * @secureTextEntry
 * @autoCompleteType
 * @param {*} props 
 */
const SendInput = props => {

	return (
		<TextInput
            autoCapitalize="none"
            {...props}
			onChangeText={props.onChangeText}
			value={props.value}
			style={{ ...styles.input, ...props.style }}
			placeholder={props.placeholder}
			placeholderTextColor={Colors.placeHolderColor}
			selectionColor={Colors.logoColor}
			secureTextEntry={props.secureTextEntry}
			autoCompleteType={props.autoCompleteType}
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		width: '100%',
        paddingVertical: 15,
        paddingRight: 20,
        fontSize: FontSizes.headerTitle,
        fontFamily: 'mont-alt-regular',
        color: Colors.logoColor,
	},
});


export default SendInput;