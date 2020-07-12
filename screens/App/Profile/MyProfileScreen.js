import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

//outside imports
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';

//components
import CustomScrollView from '../../../components/CustomScrollView';
import MinorButton from '../../../components/MinorButton';
import Avatar from '../../../components/Avatar';

//constants
import Colors from '../../../constants/colors';
import FontSizes from '../../../constants/fontSizes';
const AVATAR_WIDTH_HEIGHT = 80; // the profile photo's side length (for borderRadius and uri photos)
const CENTRAL_PANEL_WIDTH = '75%'

class MyProfileScreen extends Component {
	state = {
		avatarSource: require('../../../assets/avatar.png'),
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
            })

            //update the state and the DB (later)
            this.setState({
                avatarSource: {
                    uri: permanentFilePath,
                },
            });

            //also send it to DB

        } 
        //if you got an error log it and use the avatar image from assets
        catch(err) {
            console.log(err);
            this.setState({
                avatarSource: require('../../../assets/avatar.png'),
            });
        }
    };

	render() {
		return (
			<CustomScrollView backgroundColor={Colors.customWhite} style={styles.container}>
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
        backgroundColor: 'yellow',
	},
	imageContainer: {
		width: AVATAR_WIDTH_HEIGHT,
		height: AVATAR_WIDTH_HEIGHT,
		marginVertical: 30,
	},
    options: {
        width: CENTRAL_PANEL_WIDTH,
        backgroundColor: 'purple',
    }
});

export default MyProfileScreen;
