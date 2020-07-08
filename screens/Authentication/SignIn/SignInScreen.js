import React, { Component } from "react";
import { ScrollView, Text, StyleSheet } from "react-native";
import Colors from "../../../constants/colors";

class SignInScreen extends Component {
  static navigationOptions = {
    title: "Sign In",
  };

  render() {
    return (
      <ScrollView contentContainerStyle={styles.screen}>
        <Text>a</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.logoColor,
  },
});

export default SignInScreen;
