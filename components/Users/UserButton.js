import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Avatar from '../Avatar';

import Colors from '../../constants/colors';
import FontSizes from '../../constants/fontSizes';

/**
 * Can be used for displaying a list of users.
 * Takes the whole width of container.
 * @source
 * @onPress
 * @displayName
 * @username
 * @param {*} props
 */
const UserButton = (props) => {
	return (
		<TouchableOpacity activeOpacity={0.6} onPress={props.onPress} >
			<View style={styles.container}>
				<View style={styles.imageBar}>
					<View style={styles.imageContainer}>
						<Avatar width={50} source={props.source} />
					</View>
				</View>
				<View style={styles.infoBar}>
					<View style={styles.textContainer}>
						<Text style={styles.username}>{props.username}</Text>
					</View>
					<View style={styles.textContainer}>
						<Text style={styles.name}>{props.displayName}</Text>
					</View>
				</View>
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
	},

	imageBar: {
		paddingLeft: 20,
	},
	imageContainer: {
		width: 50,
		height: 50,
	},

	infoBar: {
		flex: 1,
		paddingLeft: 20,
	},
	textContainer: {
		paddingVertical: 2,
	},
	username: {
		fontFamily: 'mont-alt-regular',
		fontSize: FontSizes.credText,
	},
	name: {
		fontFamily: 'mont-alt-regular',
		color: Colors.greyInputText,
		fontSize: FontSizes.credText,
	},
});

export default UserButton;
