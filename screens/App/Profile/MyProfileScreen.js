import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

//outside imports
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { RNS3 } from 'react-native-aws3';

const options = {
	keyPrefix: 'uploads/',
	bucket: 'loundr-images',
	region: 'us-east-2',
	accessKey: 'AKIAJURMZG7RVDDU2MFA',
	secretKey: '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',
	successActionStatus: 201,
};


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

            console.log(permanentFilePath);
            
            const file = {
                // uri can also be a file system path (i.e. file://)
                uri: permanentFilePath,
                name: "ikram-profile-0.png",
                type: "image/png"
            }

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
					<OptionsButton iconName="sign-out" title="Sign Out" isLast />
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
