import React from "react";
import { View, Image, StyleSheet } from "react-native";

const SignInLogo = (props) => {
  return (
    <View style={{ ...styles.logoContainer, ...props.style }}>
      <Image
        style={styles.logo}
        source={require("../../assets/signinlogo.png")}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  logoContainer: {
    width: 60,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    width: "100%",
    resizeMode: "contain",
  },
});

export default SignInLogo;
