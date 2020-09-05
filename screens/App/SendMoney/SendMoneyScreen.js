import React, { Component } from 'react';
import { View, StyleSheet, Text, TextInput, StatusBar } from 'react-native';

import CustomScrollView from '../../../components/CustomScrollView';
import SendButton from '../../../components/SendMoney/SendButton';
import SendInput from '../../../components/SendMoney/SendInput';

import Colors from '../../../constants/colors';
import FontSizes from '../../../constants/fontSizes';

import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

class SendMoneyScreen extends Component {
	state = {
        receiver: this.props.navigation.getParam("displayName"),
        receiver_uid: this.props.navigation.getParam("uid"),
		amount: '', // a string but needs to be a float when sending to backend
		description: '',
	};

    /**
     * Paying some other user money
     */
	onPay = () => {
        
        const amountFloat = parseFloat(this.state.amount);

		//do not act if amount is NaN 
		if (isNaN(amountFloat)) {
			return;
        }

        const charge = {
            amount: amountFloat * 100,
            note: this.state.description,
            receiver: this.state.receiver,
            receiver_uid: this.state.receiver_uid,
            act: 'pay',
        }

        const user = firebase.auth().currentUser;

        this.props.navigation.navigate('SelectCard', {
            charge: charge,
            user: user,
        });
    };

    /**
     * Requesting money from another user
     */
	onRequest = () => {
        this.props.navigation.navigate('ConfirmPayment');
    };

	onChangeAmount = (amount) => {
		const amountFloat = parseFloat(amount);

		//do not change anything if NaN (excluding amount == '')
		if (isNaN(amountFloat) && amount !== '') {
			return;
		}

		//if more than 2 digits after the dot, then ignore
		if (amount.includes('.') && amount.split('.')[1].length > 2) {
			return;
		}

		this.setState({
			amount: amount,
		});
	};

	onChangeDescription = (description) => {
		this.setState({
			description: description,
		});
	};

	render() {
		return (
			<CustomScrollView style={styles.container} backgroundColor={Colors.backgroundGrey}>
				<View style={styles.buttons}>
                {/* THIS WILL BE INCLUDED LATER */}
					{/* <View style={styles.buttonHolder}>
						<SendButton
							onPress={this.onRequest}
							title="Request"
							color={Colors.logoColor}
						/>
					</View> */}
					<View style={styles.buttonHolder}>
						<SendButton onPress={this.onPay} title="Pay" color={Colors.btnColor} />
					</View>
				</View>
				<View style={styles.primaryInputs}>
					<View style={styles.receiver}>
						<SendInput
							value={this.state.receiver}
							placeholder="Luka Djuranovic"
							secureTextEntry={false}
							autoCompleteType="off"
							editable={false}
						/>
					</View>
					<View style={styles.amount}>
						<Text style={styles.prefix}>$</Text>
						<SendInput
							value={this.state.amount}
							onChangeText={this.onChangeAmount}
							placeholder="24.99"
							keyboardType="decimal-pad"
							secureTextEntry={false}
							autoCompleteType="off"
						/>
					</View>
				</View>
				<TextInput
					placeholder="What's it for?"
					multiline={true}
					textAlignVertical="top"
					style={{
						width: '100%',
						fontSize: FontSizes.credText,
						fontFamily: 'mont-alt-regular',
						paddingHorizontal: 15,
                        paddingBottom: 50,
                        
					}}
					numberOfLines={3}
					//maxLength={100}
					onChangeText={this.onChangeDescription}
					value={this.state.description}
				/>
			</CustomScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
		justifyContent: 'flex-start',
	},
	buttons: {
		width: '100%',
		flexDirection: 'row',
		marginTop: 10,
	},
	buttonHolder: {
		flex: 1,
		paddingHorizontal: 5,
	},
	primaryInputs: {
		flexDirection: 'row',
		marginVertical: 20,
		borderBottomColor: Colors.placeHolderColor,
		borderBottomWidth: 1,
		marginHorizontal: 5,
	},
	receiver: {
		flex: 1,
		paddingLeft: 10,
	},
	amount: {
		flexDirection: 'row',
		alignItems: 'center',
		width: 100,
	},
	prefix: {
		fontSize: FontSizes.headerTitle,
		fontFamily: 'mont-alt-regular',
		marginRight: 10,
		color: Colors.logoColor,
	},
});

export default SendMoneyScreen;
