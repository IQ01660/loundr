import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RectButton from '../../../../components/RectButton';

//outside imports
import { CreditCardInput } from 'react-native-credit-card-input';
const stripe = require('stripe-client')(
	'pk_test_51H4OZVEfo9dUw6oJVfMQHsnMHjZL4IaX3OTa1aFkiixMSux27YEIvAhqhMLZLT7iCyaAinMPNVRz3voZw7sfBeZb00SmE7PUsZ'
);

//constants
import Colors from '../../../../constants/colors';

//components
import CustomScrollView from '../../../../components/CustomScrollView';

class AddCardScreen extends Component {
	state = {
		cardInfo: null,
	};

	onAdd = async () => {
		const information = {
			card: {
				number: this.state.cardInfo.values.number,
				exp_month: this.state.cardInfo.values.expiry.split('/')[0],
				exp_year: this.state.cardInfo.values.expiry.split('/')[1],
				cvc: this.state.cardInfo.values.cvc,
				name: this.state.cardInfo.values.name,
			},
		};
		var card = await stripe.createToken(information);
		var token = card.id;
		// send token to backend for processing
        console.log(card); //"id": "tok_1H9dC8Efo9dUw6oJZYKP6mqw"
        
	};

	_onChange = (form) => {
		this.setState({
			cardInfo: form,
		});
	};

	render() {
		return (
			<CustomScrollView backgroundColor={Colors.backgroundGrey}>
				<CreditCardInput onChange={this._onChange} requiresName={true} />
				<RectButton title="Add" onPress={this.onAdd} />
			</CustomScrollView>
		);
	}
}

const styles = StyleSheet.create({});

export default AddCardScreen;
