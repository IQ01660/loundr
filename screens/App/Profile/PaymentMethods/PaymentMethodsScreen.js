/**
 * Note this screen should be unmounted if
 * a new card is added, i.e. navigate to MyProfile
 * before opening this screen for the user
 * The cards list should get updated when page is mounted
 * and when a card is deleted
 */

import React, { Component } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

//components
import CustomScrollView from '../../../../components/CustomScrollView';
import OptionsButton from '../../../../components/OptionsButton';
import FeatherIconButton from '../../../../components/FeatherIconButton';

import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

//constants
import Colors from '../../../../constants/colors';
const CENTRAL_PANEL_WIDTH = '100%';

class PaymentMethodsScreen extends Component {
	state = {
        cards: [], //users' payment methods
        isLoading: true, //the spinner's state
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
			.then(snap => snap.val());
    };
    
    updateCardsState = async () => {
        //the pure object from db containing all cards
        const cardsObject = await this.fetchCards();

        //the future array with objects containing needed info on cards
        const cards = [];

        //taking each card from cardsObject
        //creating new object with neede info about each card
        //pushing those objects to cards
        for (const key in cardsObject)
        {
            const rawCard = cardsObject[key]; //card object from db

            //filtering certain info into a new card object
            const card = {
                //FILTERING HERE...
                last_4: "4242",
            };

            //pushing the card object to cards
            cards.push(card);
        }
        
        return this.setState({
            cards: cards,
            isLoading: false,
        });
    };

    /**
     * rendering for the mapping
     * @param card
     * @param index
     * @param cards
     */
    renderCard = (card, index, cards) => (
        <OptionsButton iconName="credit-card" title={"**** **** **** " + card.last_4} isLast={index + 1 === cards.length} />
    );

    componentDidMount()
    {
        //update the list of cards in the state
        this.updateCardsState();
    }

	render() {
		return (
			<CustomScrollView style={styles.container} backgroundColor={Colors.backgroundGrey}>
				<View style={styles.addContainer}>
					<FeatherIconButton
						color={Colors.logoColor}
						iconName="feather"
						iconColor={Colors.customWhite}
						onPress={() => {
							this.props.navigation.navigate('AddCard');
						}}
					/>
				</View>

				<View style={styles.cards}>
					{this.state.cards.map(this.renderCard)}
				</View>

                <ActivityIndicator size="large" animating={this.state.isLoading} />
			</CustomScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
	addContainer: {
		alignItems: 'flex-end',
		justifyContent: 'center',
		padding: 20,
	},
	cards: {
		width: CENTRAL_PANEL_WIDTH,
		backgroundColor: Colors.customWhite,
		marginVertical: 30,
		borderBottomWidth: 1,
		borderBottomColor: Colors.placeHolderColor,
		borderTopWidth: 1,
		borderTopColor: Colors.placeHolderColor,
	},
});

export default PaymentMethodsScreen;
