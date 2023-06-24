import React, { useEffect, useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { themes } from "../../../themes/themes";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
const theme = themes.default; // Change this to select a different theme

const LoginRegistration = ({
  isRegistering,
  firstName,
  setFirstName,
  lastName,
  setLastName,
  email,
  setEmail,
  password,
  setPassword,
  onButtonPress,
  toggleText,
  onTogglePress,
}) => {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "MuseoModerno-ExtraBold": require("../../../../assets/fonts/MuseoModerno-ExtraBold.ttf"),
        "MuseoModerno-Bold": require("../../../../assets/fonts/MuseoModerno-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handleButtonPress = () => {
    if (isRegistering && (firstName === "" || lastName === "")) {
      setErrorMessage("Please enter your first and last name");
    } else if (email === "" || password === "") {
      setErrorMessage("Please enter your email and password");
    } else {
      setErrorMessage("");
      onButtonPress();
    }
  };

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <>
      <View style={styles.wrapperArea}>
        <View style={styles.upperNameArea}>
          <Text style={styles.appName}>ChronoSync</Text>
          <Text style={styles.appDesc}>Multi Stopwatch & Timer</Text>
        </View>

        <View style={styles.inputBoxArea}>
          {isRegistering && (
            <>
              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.inputHalf}
                  placeholder="First Name"
                  value={firstName}
                  onChangeText={setFirstName}
                  autoCapitalize="none"
                />
                <TextInput
                  style={styles.inputHalf}
                  placeholder="Last Name"
                  value={lastName}
                  onChangeText={setLastName}
                  autoCapitalize="none"
                />
              </View>
            </>
          )}
          <View style={styles.inputContainer_2}>
            <TextInput
              style={styles.inputFull}
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
            />
            <TextInput
              style={styles.inputFull}
              placeholder="Password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          {errorMessage !== "" && (
            <Text style={styles.errorText}>{errorMessage}</Text>
          )}
        </View>
        <Button
          title={isRegistering ? "Register" : "Login"}
          onPress={handleButtonPress}
        />
        <Text style={styles.toggleText} onPress={onTogglePress}>
          {toggleText}
        </Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  wrapperArea: {
    width: "100%",
    height: "100%",
    backgroundColor: theme.primaryBackgroundColor,
    alignItems: "center",
  },
  upperNameArea: {
    width: "100%",
    height: "40%",
    backgroundColor: theme.accentColor,
    borderBottomEndRadius: 25,
    borderBottomStartRadius: 25,
  },
  appName: {
    marginTop: "30%",
    fontSize: 50,
    color: "white",
    fontFamily: "MuseoModerno-ExtraBold",
    alignSelf: "center",
  },
  appDesc: {
    fontSize: 20,
    color: "white",
    fontFamily: "MuseoModerno-Bold",
    alignSelf: "center",
  },

  inputBoxArea: {
    marginTop: "15%",
    width: "80%",
  },
  toggleText: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  inputContainer_2: {
    marginBottom: 10,
  },
  inputHalf: {
    marginRight: 2.5,
    marginLeft: 2.5,
    flex: 1,
    height: 40,
    borderColor: theme.buttonLight,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  inputFull: {
    marginRight: 2.5,
    marginLeft: 2.5,
    marginBottom: 10,
    height: 40,
    borderColor: theme.buttonLight,
    borderWidth: 1,
    borderRadius: 13,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
  },
});

export default LoginRegistration;
