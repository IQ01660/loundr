import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';

import Colors from '../../constants/colors';
import FontSizes from '../../constants/fontSizes';

const NOTE_SIZE = 20

export default (props) => (
	<TouchableOpacity onPress={props.onPress} >
		<View style={{ ...styles.container, borderBottomWidth: props.isLast ? 1 : 0 }} >
			<View style={styles.receiver} >
				<Text style={styles.receiverText} >{props.receiver}</Text>
                <Text>{props.note.slice(0, NOTE_SIZE) + (props.note.length > NOTE_SIZE ? "..." : "")}</Text>
			</View>
			<View style={styles.amount} >
				<Text style={styles.amountText} > - ${props.amount}</Text>
			</View>
		</View>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        width: '100%',
        paddingHorizontal: 30,
        paddingVertical: 30,
        alignItems: "center",
        justifyContent: "space-between",
        borderColor: Colors.customBlack,
        borderTopWidth: 1,
        backgroundColor: Colors.backgroundGrey
    },

    receiver: {
        overflow: "hidden",
        flex: 1,
    },
    
    receiverText: {
        fontFamily: 'mont-alt-regular',
        fontSize: FontSizes.minorText,
        color: Colors.logoColor,
    },

    amount: {
        //backgroundColor: "yellow"
    },
    amountText: {
        fontFamily: 'mont-alt-regular',
        fontSize: FontSizes.minorText,
        color: Colors.errorMessage,
    },
});
