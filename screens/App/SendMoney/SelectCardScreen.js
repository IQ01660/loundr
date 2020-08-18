import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

import CustomScrollView from '../../../components/CustomScrollView';
import OptionsButton from '../../../components/OptionsButton';
import ErrorMessage from '../../../components/Auth/ErrorMessage'

import Colors from '../../../constants/colors';
import FontSizes from '../../../constants/fontSizes';

import * as firebase from 'firebase';
import "firebase/auth";
import "firebase/database";

class SelectCardScreen extends Component {
	state = {
        cards: [],
        areButtonsDisabled: false,
        hasError: false,
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
                    if (!this.state.areButtonsDisabled)
                    {
                        this.onSelectCard(card.fingerprint);
                    }
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

        Promise.resolve()
        .then(() => {
            return this.setState({
                areButtonsDisabled: true,
            })
        })
        .then(() => {
            return newChargeRef.set(charge);
        })
        .then(() => {
            return this.setTimer(2000);
        })
        .then(async () => {
            const hasError = await newChargeRef.once('value').then(snap => snap.val().error)

            if (hasError)
            {
                throw {msg: "an error occured"};
            }
        })
        .then(() => {
            return this.setState({
                areButtonsDisabled: false,
                hasError: false,
            })
        })
        .then(() => {
            this.props.navigation.navigate('ConfirmPayment');
        })
        .catch(() => {
            this.setState({
                areButtonsDisabled: false,
                hasError: true,
            });
        })
        
    }

    setTimer = (time) => {
		return new Promise((resolve) => {
			setTimeout(() => {
				resolve('Done');
			}, time);
		});
	};

	render() {
		return (
			<CustomScrollView style={styles.container} backgroundColor={Colors.backgroundGrey}>
                <ActivityIndicator size="large" animating={this.state.areButtonsDisabled} />
                
                <Text style={{ marginVertical: 20, }} >Select a card to complete the payment</Text>

                {this.state.hasError ? <ErrorMessage>Error occured in charging your card</ErrorMessage> : null}
				
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
