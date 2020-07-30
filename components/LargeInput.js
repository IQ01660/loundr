import React, { useState } from 'react';
import { TextInput, StyleSheet } from 'react-native';
import FontSizes from '../constants/fontSizes';

import Colors from '../constants/colors';

const LargeInput = props => {
    const [borderColor, borderColorUpdate] = useState(Colors.screenColor);
	const [borderWidth, borderWidthUpdate] = useState(1);

	return (
		<TextInput
            autoCapitalize="none"
            {...props}
			onChangeText={props.onChangeText}
			value={props.value}
			style={{ ...styles.input, ...props.style, borderColor: borderColor, borderWidth: borderWidth }}
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
				borderColorUpdate(Colors.screenColor);
                borderWidthUpdate(1);
			}}
            
		/>
	);
}

const styles = StyleSheet.create({
	input: {
		height: 50,
        width: '100%',
        borderRadius: 5,
		paddingHorizontal: 30,
		color: Colors.customBlack,
		fontSize: 27,
	},
});


export default LargeInput;