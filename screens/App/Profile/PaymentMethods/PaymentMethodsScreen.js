import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//components
import CustomScrollView from '../../../../components/CustomScrollView';
import OptionsButton from '../../../../components/OptionsButton';
import FeatherIconButton from '../../../../components/FeatherIconButton';

//constants
import Colors from '../../../../constants/colors';
const CENTRAL_PANEL_WIDTH = '100%';

class PaymentMethodsScreen extends Component {
	render() {
		return (
			<CustomScrollView style={styles.container} backgroundColor={Colors.backgroundGrey}>
				<View style={styles.addContainer}>
					<FeatherIconButton color={Colors.logoColor} iconName="feather" iconColor={Colors.customWhite} onPress={() => {
                        this.props.navigation.navigate('AddCard');
                    }} />
				</View>
				<View style={styles.cards}>
					<OptionsButton iconName="credit-card" title="**** **** **** 1342" />
					<OptionsButton iconName="credit-card" title="**** **** **** 2356" />
					<OptionsButton iconName="credit-card" title="**** **** **** 7534" />
					<OptionsButton iconName="credit-card" title="**** **** **** 9032" isLast />
				</View>
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
