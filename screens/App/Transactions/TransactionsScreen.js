import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import ChargeStory from '../../../components/SendMoney/ChargeStory';

import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';

class TransactionsScreen extends Component {
	state = {
        charges: [],
    };

    componentDidMount()
    {
        this.updateChargesState();
    }
    
    updateChargesState = () => {
        const chargesArray = []

        this.fetchChargesAsync()
        .then(charges => {
            charges.forEach(charge => {
                if (charge.val().status === "succeeded")
                {
                    //add successful charges to the chargesArray
                    chargesArray.push(charge.val());
                }
            })
        })
        .then(() => {
            //reversing the array
            return chargesArray.reverse()
        })
        .then(() => {
            //update the charges state
            this.setState({
                charges: chargesArray,
            });
        })
        .catch(console.log);
    };

    /**
     * Returns a promise with the snap
     * of all charges of the user
     * ordered by creation time (ascending, so reverse it later)
     */
	fetchChargesAsync = () => {
		const user = firebase.auth().currentUser;
		return firebase
			.database()
			.ref('stripe_customers/' + user.uid + '/charges')
			.orderByChild('created')
			.once('value');
    };
    
    renderCharge = ({ item, index }) => {
        return (
            <ChargeStory note={item.note} receiver={item.receiver} amount={(item.amount_received / 100).toFixed(2)} isLast={index === this.state.charges.length - 1} />
        );
    };

    render() 
    {
		return (
			<View style={styles.screen} >
				<FlatList onRefresh={this.updateChargesState} refreshing={false} data={this.state.charges} renderItem={this.renderCharge} />
			</View>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		flex: 1,
	},
});

export default TransactionsScreen;
