//standard imports
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

//importing AppLoading
//currently for uploading files in the render() in [App.js]
import { AppLoading } from 'expo';

//importing font package
import * as Font from 'expo-font';

/**
 * fetches all fonts;
 * returns a promise;
 * put as a prop into AppLoading component
 */
const fetchFonts = () => {
    return Font.loadAsync({
        //use this mostly
        'mont-alt-regular': require('./assets/fonts/MontserratAlternates-Regular.ttf'),

        //use this for subTitles or when regular is too thin
        'mont-alt-medium': require('./assets/fonts/MontserratAlternates-Medium.ttf'),

        //use this for titles
        'mont-alt-bold': require('./assets/fonts/MontserratAlternates-Bold.ttf'),
    });
};

/**
 * Here we will have the main SwitchNavigator rendered
 */
class App extends Component 
{
    state = {
        //checks if fonts loaded
        fontsLoaded: false,
    };

    render() 
    {
        /**
         * render AppLoading screen if 
         * fonts are still not loaded
         */
        if (!this.state.fontsLoaded)
        {
            return (
                <AppLoading
                    startAsync={fetchFonts}
                    onFinish={() => this.setState({ fontsLoaded: true })}
                    onError={console.warn}
                />
            );
        }

		return (
			<View style={styles.container}>
				<Text>Hey App.js is here</Text>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});

export default App;