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
        //then navigate to setting up bank info
        this.props.navigation.navigate('BankInfo');
		const information = {
			card: {
				number: this.state.cardInfo.values.number,
				exp_month: this.state.cardInfo.values.expiry.split('/')[0],
				exp_year: this.state.cardInfo.values.expiry.split('/')[1],
				cvc: this.state.cardInfo.values.cvc,
				name: this.state.cardInfo.values.name.toUpperCase(),
			},
        };
        try{
            var card = await stripe.createToken(information);
            var token = card.id;
            // send token to backend for processing
            console.log(card); //"id": "tok_1H9dC8Efo9dUw6oJZYKP6mqw"
        }
        catch(err)
        {

        }
		
	};

	_onChange = (form) => {
		this.setState({
			cardInfo: form,
		});
	};

	render() {
		return (
			<CustomScrollView style={styles.screen} backgroundColor={Colors.backgroundGrey}>
				<View style={styles.addButton}>
					<RectButton title="Next" onPress={this.onAdd} />
				</View>
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
});

export default AddCardScreen;
