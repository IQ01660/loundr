import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

//constants
import Colors from '../../../../constants/colors';
import FontSizes from '../../../../constants/fontSizes';
import { BanksList, BanksInputs } from '../../../../constants/banksInfo';

import * as firebase from 'firebase';
import "firebase/database";
import "firebase/auth";

//components
import RectButton from '../../../../components/RectButton';
import RNPickerSelect from 'react-native-picker-select';
import CustomScrollView from '../../../../components/CustomScrollView';
import LargeInput from '../../../../components/LargeInput';

class BankInfoScreen extends Component {
    state = {
        selectedBank: null,
        bankInfo: null,
    };

    onSubmit = () => {
        const user = firebase.auth().currentUser;
        firebase.database().ref('usersBankInfo/' + user.uid).set({
            selectBank: this.state.selectedBank,
            verified: 'pending', //denied or accepted later
            entries: this.state.bankInfo,
        });
        this.props.navigation.navigate('MyProfile');
    };

    onChangeInput = (fieldName, response) => {
        this.setState((prevState, props) => {
            const bankInfoCopy = { ...prevState.bankInfo };
            bankInfoCopy[fieldName] = response
            return {
                bankInfo: bankInfoCopy,
            };
        });
    };

	render() {
		return (
			<CustomScrollView style={styles.screen} >
                
				<View style={styles.select} >
					<RNPickerSelect
						onValueChange={(value) => this.setState({ selectedBank: value, bankInfo: null })}
						placeholder={{ label: 'Select a Bank', value: null }}
						style={selectBank}
						items={BanksList}
					/>
				</View>
                <View style={styles.submit} >
                    <RectButton title="Submit"  onPress={this.onSubmit} />
                </View>
                <View style={styles.inputs} >
                    {this.state.selectedBank === null ? null :
                        BanksInputs[this.state.selectedBank].map((fieldName, idx) => {
                            return (
                                <View key={idx} style={styles.inputCluster} >
                                    <Text style={styles.inputText}>{fieldName}</Text>
                                    <LargeInput value={this.state.bankInfo ? this.state.bankInfo[fieldName] : ''} placeholder="" onChangeText={(text) => this.onChangeInput(fieldName, text)} />
                                </View>
                            )
                        })
                    }
                </View>

			</CustomScrollView>
		);
	}
}

const styles = StyleSheet.create({
	screen: {
		alignItems: 'center',
    },
    select: {
        width: '90%',
        marginVertical: 15,
        borderColor: Colors.screenColor,
        borderWidth: Platform.OS === 'android' ? 1 : 0,
        borderRadius: Platform.OS === 'android' ? 5 : 0,
    },
    submit: {
        marginVertical: 15,
        width: '90%',
    },
    inputs: {
        width: '90%'
    },
    inputCluster: {
        width: '100%',
        marginVertical: 15,
    },
    inputText: {
        fontSize: FontSizes.credText,
        fontFamily: 'mont-alt-regular'
    },
});

const selectBank = StyleSheet.create({
	inputIOS: {
        fontSize: 27,
        fontFamily: 'mont-alt-regular',
		paddingVertical: 12,
		paddingHorizontal: 10,
		color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
	inputAndroid: {
        fontSize: 27,
        fontFamily: 'mont-alt-regular',
		paddingVertical: 12,
		paddingHorizontal: 10,
        color: 'black',
		paddingRight: 30, // to ensure the text is never behind the icon
	},
});

export default BankInfoScreen;
