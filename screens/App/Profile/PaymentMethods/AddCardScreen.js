import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//outside imports
import { CreditCardInput } from 'react-native-credit-card-input';

//constants
import Colors from '../../../../constants/colors';

//components
import CustomScrollView from '../../../../components/CustomScrollView';

class AddCardScreen extends Component
{
    _onChange = form => console.log(form);

    render() {
        

        return (
            <CustomScrollView backgroundColor={Colors.backgroundGrey}>
                <CreditCardInput onChange={this._onChange} requiresName={true}/>
            </CustomScrollView>
        );
    }
}

const styles = StyleSheet.create({
    
});

export default AddCardScreen;