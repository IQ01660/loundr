import React from 'react';
import { StyleSheet, View, Image, Platform } from 'react-native';
import LottieView from 'lottie-react-native';
import RectButton from '../../../components/RectButton';

import Colors from '../../../constants/colors';

import { FontAwesome } from '@expo/vector-icons'; 

export default class ConfirmPaymentScreen extends React.Component {
	componentDidMount() {
		if (Platform.OS === 'ios') {
			this.animation.play();
			// Or set a specific startFrame and endFrame with:
			// this.animation.play(30, 120);
		}
	}

	render() {
		return (
			<View style={styles.animationContainer}>
				{Platform.OS === 'ios' ? (
					<LottieView
						ref={(animation) => {
							this.animation = animation;
						}}
						style={{
							width: 300,
							height: 300,
						}}
						source={require('../../../assets/lottie/done_lottie.json')}
						// OR find more Lottie files @ https://lottiefiles.com/featured
						// Just click the one you like, place that file in the 'assets' folder to the left, and replace the above 'require' statement
					/>
				) : (
					<View style={styles.android_tick}>
                        <FontAwesome name="send" size={100} color={Colors.btnColor} />
					</View>
				)}
				<View style={{ width: '80%' }}>
					<RectButton
						title="Done"
						color={Colors.logoColor}
						onPress={() => {
							this.props.navigation.navigate('SelectUser'); //unmount all this pay process thingy

							this.props.navigation.navigate('Transactions'); //go to transactions
							return;
						}}
					/>
				</View>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	animationContainer: {
		backgroundColor: Colors.backgroundGrey,
		alignItems: 'center',
		justifyContent: Platform.OS === 'ios' ? 'flex-start' : "space-evenly",
		flex: 1,
	},
	android_tick: {
        marginVertical: 30
    },
});
