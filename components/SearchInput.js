import React from 'react';
import { View, TextInput, StyleSheet, FlatList } from 'react-native';

import { EvilIcons } from '@expo/vector-icons';
import Colors from '../constants/colors';
import FontSizes from '../constants/fontSizes';

/**
 * The search bar/ text input field.
 * @value the value of the input field
 * @onChangeText normal textinput prop
 * @param {*} props
 */
const SearchInput = (props) => {
	return (
		<View style={styles.container}>
            <View style={styles.iconContainer}>
                <EvilIcons name="search" size={27} color={Colors.greyInputText} />
            </View>
			<View style={styles.inputContainer}>
				<TextInput
                    {...props}
					value={props.value}
					onChangeText={props.onChangeText}
					style={styles.input}
					autoCapitalize="none"
                    placeholder="Search"
                    placeholderTextColor={Colors.greyInputText}
                    autoCorrect={false}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
        paddingHorizontal: 10,
        paddingVertical: 10,
		width: '100%',
		backgroundColor: Colors.greyInputBackground,
		flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
    },
    iconContainer: {
        marginRight: 10,
    },
    inputContainer: {
        flex: 1,
    },
	input: {
        fontSize: FontSizes.minorText,
        fontFamily: 'mont-alt-regular'
	},
});

export default SearchInput;
