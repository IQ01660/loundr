/**
 * Note this screen should be unmounted if
 * a new card is added, i.e. navigate to MyProfile
 * before opening this screen for the user
 * The cards list should get updated when page is mounted
 * and when a card is deleted
 */

import React, { Component } from 'react';
import { Animated, View, StyleSheet, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';

import { Feather } from '@expo/vector-icons';

//constants
import Colors from '../../../../constants/colors';
import FontSizes from '../../../../constants/fontSizes';

//components
import CustomScrollView from '../../../../components/CustomScrollView';
import OptionsButton from '../../../../components/OptionsButton';
import FeatherIconButton from '../../../../components/FeatherIconButton';

import * as firebase from 'firebase';
import 'firebase/database';
import 'firebase/auth';

const CENTRAL_PANEL_WIDTH = '100%';
const DELETE_SIZE = 50;
const INIT_DEL_SIZE = 1;

class PaymentMethodsScreen extends Component {
	state = {
		cards: [], //users' payment methods
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
				expiry_month: rawCard.exp_month < 10 ? '0' + rawCard.exp_month : rawCard.exp_month,
				expiry_year: rawCard.exp_year,
				fingerprint: rawCard.fingerprint,
				//for animation
				delete_width: new Animated.Value(INIT_DEL_SIZE),
				del_width: INIT_DEL_SIZE,
			};

			//pushing the card object to cards
			cards.push(card);
		}

		return this.setState({
			cards: cards,
		});
    };

	/**
	 * rendering for the mapping
	 * @param card
	 * @param index
	 * @param cards
	 */
	renderCard = (card, index, cards) => (
		<View key={card.fingerprint} style={styles.optionContainer}>
			<View style={{ flex: 1, flexDirection: 'row' }}>
				<OptionsButton
					iconName="credit-card"
					title={'**** **** **** ' + card.last_4}
					isLast={index + 1 === cards.length}
					onPress={() => {
						Animated.timing(this.state.cards[index].delete_width, {
							toValue: card.del_width === DELETE_SIZE ? INIT_DEL_SIZE : DELETE_SIZE,
							useNativeDriver: false,
						}).start(() => {
							const cardsCopy = [...cards];
							const cardCopy = { ...card };

							cardCopy.del_width = cardCopy.del_width === DELETE_SIZE ? INIT_DEL_SIZE : DELETE_SIZE;

							cardsCopy[index] = cardCopy;

							this.setState({
								cards: cardsCopy,
							});
						});
					}}
				/>
			</View>

			<Animated.View style={{ width: card.delete_width, justifyContent: 'center', alignItems: 'flex-start' }}>
				<TouchableOpacity
					onPress={() => {
						Alert.alert('Delete this card?', 'This change is permanent', [
							{
                                text: 'Cancel',
								style: 'cancel',
                            },
                            {
								text: 'Delete',
								onPress: () => this.onDelete(card.fingerprint),
								style: 'destructive',
							},
						]);
					}}
				>
					<View>
						<Feather name="trash-2" size={24} color={Colors.errorMessage} />
					</View>
				</TouchableOpacity>
			</Animated.View>
		</View>
    );
    
    /**
     * deletes the specified card
     * using the source fingerprint
     * Note: this also deletes bankInfo
     */
    onDelete = (fingerprint) => {
        const user = firebase.auth().currentUser;
        firebase.database().ref('stripe_customers/' + user.uid + '/sources/' + fingerprint).remove().catch(console.log);
        this.props.navigation.navigate('MyProfile');
    };

	componentDidMount() {
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

				<View style={styles.cards}>{this.state.cards.map(this.renderCard)}</View>
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
	optionContainer: {
		width: '100%',
		flexDirection: 'row',
	},
});

export default PaymentMethodsScreen;
