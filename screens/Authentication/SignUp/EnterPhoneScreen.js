import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

//components
import CustomScrollView from '../../../components/CustomScrollView';

//constants
import Colors from '../../../constants/colors';

//outside imports
import PhoneInput from 'react-native-phone-input'

import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha';
import firebaseConfig from '../../../Firebase'

class EnterPhoneScreen extends Component
{
    constructor(props)
    {
        super(props);
        this.recaptchaRef = React.createRef();
    }

    render() {
        return (
            <CustomScrollView backgroundColor={Colors.logoColor} style={styles.container} >
                <View style={styles.inner} >
                    
                    <FirebaseRecaptchaVerifierModal 
                        ref={this.recaptchaRef}
                        firebaseConfig={firebaseConfig}
                    />
                </View>
            </CustomScrollView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center'
    },
    inner: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default EnterPhoneScreen;