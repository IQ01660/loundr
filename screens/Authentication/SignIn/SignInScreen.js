import React, { Component } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import Colors from "../../../constants/colors";
import SignInLogo from "../../../components/Auth/SignInLogo";
import CredInput from "../../../components/Auth/CredInput";
import SubmitButton from "../../../components/SubmitButton";

class SignInScreen extends Component {
  static navigationOptions = {};

  render() {
    return (
      <View style={styles.root}>
        <ScrollView contentContainerStyle={styles.screen}>
          <SignInLogo style={{ marginVertical: 100 }} />
          <View style={styles.credInputContainer}>
            <CredInput
              placeholder={"username..."}
              secureTextEntry={false}
              autoCompleteType={"username"}
            />
            <CredInput
              style={{ marginTop: 10 }}
              placeholder={"password..."}
              secureTextEntry={true}
              autoCompleteType={"password"}
            />
          </View>
          <SubmitButton />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
    backgroundColor: Colors.logoColor,
  },
  screen: {
    flex: 1,
    alignItems: "center",
    backgroundColor: Colors.logoColor,
  },
  credInputContainer: {
    width: "82%",
  },
});

export default SignInScreen;
