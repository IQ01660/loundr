import React, { Component } from 'react';
import { StyleSheet, View, Alert, Text, ActivityIndicator } from 'react-native';

//outside imports
import * as ImagePicker from 'expo-image-picker';
import * as firebase from 'firebase';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

//components
import CustomScrollView from '../../../components/CustomScrollView';
import MinorButton from '../../../components/MinorButton';
import Avatar from '../../../components/Avatar';
import OptionsButton from '../../../components/OptionsButton';

//constants
import Colors from '../../../constants/colors';
import fontSizes from '../../../constants/fontSizes';
const DEFAULT_AVATAR_PATH = '../../../assets/avatar.jpg';
const AVATAR_WIDTH_HEIGHT = 80; // the profile photo's side length (for borderRadius and uri photos)
const CENTRAL_PANEL_WIDTH = '100%';

class MyProfileScreen extends Component {
	state = {
		avatarSource: require(DEFAULT_AVATAR_PATH),
		uid: null,
		username: '',
		fullName: '',
        email: '',
        spinnerOn: false,
	};

	authStateChangedUnsubscribe;

	/**
	 * this method updates the state of the page
	 * containing the info about user signed in
	 * @param {*} user
	 */
	updateUserInfo = async (curUser) => {
		let username = null;

		const usersSnapshot = await firebase.database().ref('usersPublic').once('value');
		await usersSnapshot.forEach((user) => {
			if (user.key === curUser.uid) {
				username = user.val().username;
			}
		});

		this.setState({
			uid: curUser.uid,
			email: curUser.email,
			fullName: curUser.displayName,
			username: username,
		});
    };

	/**
	 * updates the state of the page, namely the avatarSource.
	 * should be run when page is just opened and after Pick a photo is clicked
	 */
	updateProfilePhoto = (user) => {
        if (user.photoURL)
        {
            this.setState({
                avatarSource: {
                    uri: user.photoURL,
                },
            });
        }
        else
        {
            this.setState({
                avatarSource: require(DEFAULT_AVATAR_PATH),
            });
        }
	};

	componentDidMount() {
		//if the first time getting to the screen
		const user = firebase.auth().currentUser;
        this.updateUserInfo(user);
        this.updateProfilePhoto(user);
		/**
		 * this will go back to sign in screen if not authenticated
		 */
		this.authStateChangedUnsubscribe = firebase.auth().onAuthStateChanged(async (user) => {
			if (user) {
				// User is signed in.
                this.updateUserInfo(user);
			} else {
				// User signed out
				this.props.navigation.navigate('SignIn');
			}
		});
	}

	componentWillUnmount() {
		//unsubscribing from auth state change listener
		this.authStateChangedUnsubscribe();
    }

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
        
        //turn on the spinner
        await this.setState({
            spinnerOn: true,
        })

		//if the user picked an image
		//store its initial uri - position in the cache
		//to get the name of the file
		const extension = pickerResult.uri.split('.').pop();

		//if no errors move the image from cache to firebase storage
		try {
			// Create a root reference
			var storageRef = firebase.storage().ref();
			// folder with profile images
			var profileImagesRef = storageRef.child('profileImages');
			// future profile photo ref
			var photoRef = profileImagesRef.child(`${this.state.uid}`);

			// making a blob out of picked image
			const response = await fetch(pickerResult.uri);
			const blob = await response.blob();

			//putting the image into storage / replacing prev one
            await photoRef.put(blob);

            //the current user authenticated
            const currentUser = firebase.auth().currentUser;

            //the url of the brand new photo
            const url = await firebase.storage().ref('profileImages/' + currentUser.uid).getDownloadURL();

            //updating the photoUrl for fast future photo upload
            await currentUser.updateProfile({
                photoURL: url,
            })
            
            //updating the photo on the screen
            await this.updateProfilePhoto(currentUser);

            //turn the spinner off
            this.setState({
                spinnerOn: false,
            });

            // uploading the photoUrl to DB publicUsers
            firebase.database().ref('usersPublic/' + currentUser.uid + '/photoUrl').set(url);

		} catch (err) {
			//if you got an error log it and use the avatar image from assets
			console.log(err);
			return this.setState({
				avatarSource: require(DEFAULT_AVATAR_PATH),
			});
        }
	};

	render() {
		return (
			<CustomScrollView backgroundColor={Colors.backgroundGrey} style={styles.container}>
				{/* container for the photo picking stuff */}
				<View style={styles.photoPickerContainer}>
					<Text style={styles.userInfoText}>{this.state.fullName}</Text>
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

					{/* user info */}

					<Text style={styles.userInfoText}>{this.state.email}</Text>
					<Text style={styles.userInfoText}>{this.state.username}</Text>
				</View>
                <ActivityIndicator animating={this.state.spinnerOn} style={{marginVertical: 15}} size="large" />
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
					<OptionsButton
						iconName="sign-out"
						title="Sign Out"
						isLast
						onPress={() => {
							firebase.auth().signOut();
						}}
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
	userInfoText: {
		color: Colors.btnColor,
		marginTop: 15,
		fontFamily: 'mont-alt-medium',
		fontSize: fontSizes.headerTitle,
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
