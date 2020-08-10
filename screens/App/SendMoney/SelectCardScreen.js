import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import CustomScrollView from '../../../components/CustomScrollView';
import OptionsButton from '../../../components/OptionsButton';

import Colors from '../../../constants/colors';
import FontSizes from '../../../constants/fontSizes';

import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

class SelectCardScreen extends Component {
	state = {
		cards: [],
	};

	componentDidMount() {
		this.updateCardsState();
	}

	updateCardsState = async () => {
		//the pure object from db containing all cards
		const cardsObject = await this.fetchCards();

		//the future array with objects containing needed info on cards
		const cards = [];

		//taking each card from cardsObject
		//creating new object with neede info about each card
		//pushing those objects to cards
		for (const key in cardsObject) {
			const rawCard = cardsObject[key]; //card object from db

			//filtering certain info into a new card object
			const card = {
				//FILTERING HERE...
				last_4: rawCard.last4,
				fingerprint: rawCard.fingerprint,
			};

			//pushing the card object to cards
			cards.push(card);
		}

		return this.setState({
			cards: cards,
		});
	};

	/**
	 * fetches cards and returns a promise resolving to
	 * an object with cards/sources
	 */
	fetchCards = () => {
		const user = firebase.auth().currentUser;
		return firebase
			.database()
			.ref('stripe_customers/' + user.uid + '/sources')
			.once('value')
			.then((snap) => snap.val());
	};

	renderCard = (card, index, cards) => (
		<View style={styles.option} key={card.fingerprint} >
			<OptionsButton
				iconName="credit-card"
				title={'**** **** **** ' + card.last_4}
				onPress={() => {
					this.onSelectCard(card.fingerprint);
				}}
                isLast={index === cards.length - 1}
			/>
		</View>
    );
    
    onSelectCard = (fingerprint) => {
        const charge = this.props.navigation.getParam("charge");
        const user = this.props.navigation.getParam("user");

        charge.source_fingerprint = fingerprint;

        const chargesRef = firebase.database().ref('stripe_customers/' + user.uid + '/charges');
        const newChargeRef = chargesRef.push();

        newChargeRef.set(charge);

        this.props.navigation.navigate('SelectUser'); // unmount all this pay process thingy
        this.props.navigation.navigate('Transactions'); // go to transactions
    }

	render() {
		return (
			<CustomScrollView style={styles.container} backgroundColor={Colors.backgroundGrey}>
                <Text style={{ marginVertical: 20, }} >Select a card to complete the payment</Text>
				<View style={styles.cards}>{this.state.cards.map(this.renderCard)}</View>
			</CustomScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
        alignItems: "center",
    },
	cards: {
		width: '100%',
		backgroundColor: Colors.customWhite,
		marginVertical: 30,
		borderBottomWidth: 1,
		borderBottomColor: Colors.placeHolderColor,
		borderTopWidth: 1,
		borderTopColor: Colors.placeHolderColor,
	},
	option: {
		width: '100%',
	},
});

export default SelectCardScreen;
