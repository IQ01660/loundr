import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

//outside imports
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
//firebase setup
import * as firebase from 'firebase';
import 'firebase/analytics';
import 'firebase/database';
import 'firebase/firestore';
import 'firebase/auth';

var firebaseConfig = {
	apiKey: 'AIzaSyABE5CrAEQivDkyppNM3f_2iw13IiV053c',
	authDomain: 'loundr-fced9.firebaseapp.com',
	databaseURL: 'https://loundr-fced9.firebaseio.com',
	projectId: 'loundr-fced9',
	storageBucket: 'loundr-fced9.appspot.com',
	messagingSenderId: '28905429703',
	appId: '1:28905429703:web:1cc5160bd2b907759d3ce2',
	measurementId: 'G-BMV4TW6QFQ',
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.analytics();

//components
import CustomScrollView from '../../../components/CustomScrollView';
import MinorButton from '../../../components/MinorButton';
import Avatar from '../../../components/Avatar';
import OptionsButton from '../../../components/OptionsButton';

//constants
import Colors from '../../../constants/colors';
import FontSizes from '../../../constants/fontSizes';
const DEFAULT_AVATAR_PATH = '../../../assets/avatar.jpg';
const AVATAR_WIDTH_HEIGHT = 80; // the profile photo's side length (for borderRadius and uri photos)
const CENTRAL_PANEL_WIDTH = '100%';

class MyProfileScreen extends Component {
	state = {
		avatarSource: require(DEFAULT_AVATAR_PATH),
	};

	/**
	 * handling the click "Pick a photo"
	 */
	openImagePickerAsync = async () => {
		//asking for permission if haven't asked already
		const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();

		//if permission not granted - stop the function
		if (permissionResult.granted === false) {
			Alert.alert('Access denied', 'You can grant access through settings later');
			return;
		}

		//open the Camera Roll and store user's choice
		const pickerResult = await ImagePicker.launchImageLibraryAsync();

		//if the user did not pick anything - stop the function
		if (pickerResult.cancelled === true) {
			return;
		}

		//if the user picked an image
		//store its initial uri - position in the cache
		//to get the name of the file
		const fileName = pickerResult.uri.split('/').pop();

		//create a path with that file name in the document directory
		//which is a permanent local memry of the app on the phone
		const permanentFilePath = FileSystem.documentDirectory + fileName;

		//if no errors move the image from cache to permanent storage
		try {
			await FileSystem.moveAsync({
				from: pickerResult.uri,
				to: permanentFilePath,
			});

			//update the state and the DB (later)
			this.setState({
				avatarSource: {
					uri: permanentFilePath,
				},
			});

			//also send it to DB
		} catch (err) {
			//if you got an error log it and use the avatar image from assets
			console.log(err);
			this.setState({
				avatarSource: require(DEFAULT_AVATAR_PATH),
			});
		}
	};

    storeHighScore = (userId, score) => {
        firebase.database().ref('users/' + userId).set({
          highscore: score
        });
    }

	render() {
		return (
			<CustomScrollView backgroundColor={Colors.backgroundGrey} style={styles.container}>
				{/* container for the photo picking stuff */}
				<View style={styles.photoPickerContainer}>
					{/* the avatar container */}
					<View style={styles.imageContainer}>
						<Avatar source={this.state.avatarSource} width={AVATAR_WIDTH_HEIGHT} />
					</View>
					{/* "pick the photo" button */}
					<MinorButton
						color={Colors.logoColor}
						style={styles.pickPhotoBtn}
						title="Pick a photo"
						onPress={this.openImagePickerAsync}
					/>
				</View>
				<View style={styles.options}>
					<OptionsButton
						iconName="credit-card"
						title="Payment Methods"
						onPress={() => {
							this.props.navigation.navigate('PaymentMethods');
						}}
					/>
					<OptionsButton iconName="lock" title="Privacy" />
					<OptionsButton iconName="user" title="Edit Profile" />
					<OptionsButton iconName="sign-out" title="Sign Out" isLast 
                        onPress={() => this.storeHighScore(4, 210)}
                    />
				</View>
			</CustomScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		alignItems: 'center',
	},
	photoPickerContainer: {
		width: CENTRAL_PANEL_WIDTH,
		alignItems: 'center',
	},
	imageContainer: {
		width: AVATAR_WIDTH_HEIGHT,
		height: AVATAR_WIDTH_HEIGHT,
		marginVertical: 30,
	},
	options: {
		width: CENTRAL_PANEL_WIDTH,
		backgroundColor: Colors.customWhite,
		marginVertical: 30,
		borderBottomWidth: 1,
		borderBottomColor: Colors.placeHolderColor,
		borderTopWidth: 1,
		borderTopColor: Colors.placeHolderColor,
	},
});

export default MyProfileScreen;
