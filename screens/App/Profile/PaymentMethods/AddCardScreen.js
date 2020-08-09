import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import RectButton from '../../../../components/RectButton';

import api_keys from '../../../../constants/api-keys';

//outside imports
import { CreditCardInput } from 'react-native-credit-card-input';
const stripe = require('stripe-client')(api_keys.stripe_publishable_key);

//constants
import Colors from '../../../../constants/colors';

//firebase stuff
import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

//components
import CustomScrollView from '../../../../components/CustomScrollView';
import fontSizes from '../../../../constants/fontSizes';

class AddCardScreen extends Component {
	state = {
		cardInfo: null,
		hasError: false,
		isLoading: false,
    };

	onAdd = async () => {
		if (!this.state.cardInfo) {
			return;
		}
		const information = {
			card: {
				number: this.state.cardInfo.values.number,
				exp_month: this.state.cardInfo.values.expiry.split('/')[0],
				exp_year: this.state.cardInfo.values.expiry.split('/')[1],
				cvc: this.state.cardInfo.values.cvc,
				name: this.state.cardInfo.values.name.toUpperCase(),
			},
		};
		try {
			await this.setState({
				isLoading: true,
			});

			var card = await stripe.createToken(information);
			var token = card.id;

			// send token to backend for processing

			//if the card info entered is in incorrect format
			if (card.error) {
				throw { msg: 'incorrect format of the card' };
			}

			//the current user authenticated
			const user = firebase.auth().currentUser;

			//the new reference for the token
			const reference = await firebase
				.database()
				.ref('stripe_customers/' + user.uid + '/tokens')
				.push();

			//writing token to the DB
			await reference.set({
				token: token,
				error: false,
			});

			//wait before checking if an error happened in the backend
			await this.setTimer(5000)
				.then(() => this._checkForError(reference))
				.then((res) => {
					if (res) {
						throw { err: 'incorrect info' };
					} else {
						return;
					}
				})
				.then(() => {
					//then navigate "My Profile"
					this.props.navigation.navigate('MyProfile');
					//turn off spinner
					this.setState({
                        isLoading: false,
                        hasError: false,
					});
				})
				.catch((err) => {
                    //turn off spinner
                    //and note the error
					this.setState({
                        isLoading: false,
                        hasError: true,
					});
				});
		} catch (err) {
			return this.setState({
				hasError: true,
				isLoading: false,
			});
		}
	};

	/**
	 * a timer returning a promise
	 * @param {*} time
	 */
	setTimer = (time) => {
		return new Promise((resolve, reject) => {
			setTimeout(() => {
				resolve('Done');
			}, time);
		});
	};

	_onChange = (form) => {
		this.setState({
			cardInfo: form,
		});
	};

	_checkForError = (reference) => {
		return firebase
			.database()
            .ref(reference)
            .child('error')
			.once('value')
			.then((snap) => {
                console.log(snap.val());
				return snap.val();
			});
	};

	render() {
		return (
			<CustomScrollView style={styles.screen} backgroundColor={Colors.backgroundGrey}>
				<View style={styles.addButton}>
					<RectButton color={Colors.screenColor} title="Next" onPress={this.onAdd} />
				</View>

				<ActivityIndicator size="large" animating={this.state.isLoading} />

				{this.state.hasError ? <Text style={styles.error} >Incorrect information entered on the card</Text> : null}

				<View style={styles.card}>
					<CreditCardInput onChange={this._onChange} requiresName={true} />
				</View>
			</CustomScrollView>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		alignItems: 'center',
	},
	card: {
		marginVertical: 15,
	},
	addButton: {
		marginTop: 15,
		width: '90%',
    },
    error: {
        fontFamily: 'mont-alt-regular',
        fontSize: fontSizes.credText,
        color: Colors.errorMessage,
    }
});

export default AddCardScreen;