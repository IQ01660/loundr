import React, { Component } from 'react';
import { StyleSheet, View, Alert } from 'react-native';

//outside imports
import * as ImagePicker from 'expo-image-picker';

//components
import CustomScrollView from '../../../components/CustomScrollView';
import MinorButton from '../../../components/MinorButton';

//constants
import Colors from '../../../constants/colors';
import FontSizes from '../../../constants/fontSizes';

const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestCameraRollPermissionsAsync();
    
    if (permissionResult.granted === false) {
      Alert.alert("Access denied", "You can grant access through settings later");
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    console.log(pickerResult);
};

class MyProfileScreen extends Component {
	render() {
		return (
			<CustomScrollView backgroundColor={Colors.customWhite} style={styles.container}>
				<View style={styles.photoPickerContainer} >
					<MinorButton
						color={Colors.logoColor}
						style={styles.pickPhotoBtn}
						title="Pick a photo"
						onPress={openImagePickerAsync}
					/>
				</View>
			</CustomScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {},
    photoPickerContainer: {
        alignItems: 'center',
    },
	pickPhotoBtn: {},
});

export default MyProfileScreen;
