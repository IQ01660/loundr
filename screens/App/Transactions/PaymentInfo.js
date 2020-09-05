import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, SnapshotViewIOS } from 'react-native';

import * as Linking from 'expo-linking';

import Colors from '../../../constants/colors';

import SendButton from '../../../components/SendMoney/SendButton';

import * as firebase from 'firebase';
import 'firebase/database';

export default class PaymentInfo extends Component {
	state = {
		receiver_username: null,
		receiver_email: null,
		receiver_name: null,
		receiver_phone: null,
	};
	onReceipt = () => {
		const receipt_url = this.props.navigation.getParam('receipt_url');
		Linking.openURL(receipt_url).then().catch();
	};

	componentDidMount() {
		const receiver_uid = this.props.navigation.getParam('receiver_uid');
		firebase
			.database()
			.ref('usersPublic/' + receiver_uid)
			.once('value')
			.then((snap) => snap.val())
			.then((user) => {
				return this.setState({
					receiver_username: user.username,
					receiver_name: user.displayName,
					receiver_email: user.email,
					receiver_phone: user.phoneNumber,
				});
			});
	}

	render() {
		return (
			<View style={styles.screen}>
				<Text style={styles.title}>Receiver's Info:</Text>
				<Text style={styles.info}>Name: {this.state.receiver_name}</Text>
				<Text style={styles.info}>Username: {this.state.receiver_username}</Text>
				<Text style={styles.info}>Email: {this.state.receiver_email}</Text>
				<Text style={styles.info}>Phone: {this.state.receiver_phone}</Text>
				<View style={styles.buttonContainer} >
					<SendButton color={Colors.btnColor} title="My Receipt" onPress={this.onReceipt} />
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		fontFamily: 'mont-alt-medium',
		fontSize: 25,
		color: Colors.logoColor,
	},
	info: {
		fontFamily: 'mont-alt-regular',
		fontSize: 20,
		color: Colors.customBlack,
    },
    buttonContainer: {
        width: "80%",
        marginVertical: 20,
    },
});
