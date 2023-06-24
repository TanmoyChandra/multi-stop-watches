import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { themes } from "../../../themes/themes";
import { useFonts } from "expo-font";
import * as Font from "expo-font";
import { Feather } from "@expo/vector-icons";

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
  const [showPassword, setShowPassword] = useState(false);

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

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
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
            <View style={styles.passwordInput}>
              <TextInput
                style={styles.passwordInputText}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity
                style={styles.eyeIconContainer}
                onPress={togglePasswordVisibility}
              >
                <Feather
                  name={showPassword ? "eye-off" : "eye"}
                  size={24}
                  color="gray"
                  style={styles.eyeIcon}
                />
              </TouchableOpacity>
            </View>
          </View>
          {errorMessage !== "" && (
            <View style={styles.errorBox}>
              <Text style={styles.errorText}>{errorMessage}</Text>
            </View>
          )}
        </View>
        <TouchableOpacity
          style={styles.customButton}
          onPress={handleButtonPress}
        >
          <Text style={styles.customButtonText}>
            {isRegistering ? "Register" : "Login"}
          </Text>
        </TouchableOpacity>
        <Text style={styles.toggleText} onPress={onTogglePress}>
          {toggleText ? (
            <Text style={styles.toggleTextSpan1}>
              Already have an account?{" "}
              <Text style={styles.toggleTextSpan2}>Login</Text>
            </Text>
          ) : (
            <Text style={styles.toggleTextSpan1}>
              Don't have an account?{" "}
              <Text style={styles.toggleTextSpan2}>Register</Text>
            </Text>
          )}
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

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
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
    width: "83%",
  },
  toggleText: {
    marginTop: 30,
  },
  toggleTextSpan1: {
    color: "grey",
  },
  toggleTextSpan2: {
    color: theme.accentColor,
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
    height: 45,
    borderColor: theme.buttonLight,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  inputFull: {
    marginRight: 2.5,
    marginLeft: 2.5,
    marginBottom: 10,
    height: 45,
    borderColor: theme.buttonLight,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  passwordInput: {
    flexDirection: "row",
    alignItems: "center",
    borderColor: theme.buttonLight,
    borderWidth: 1,
    borderRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: "#fff",
  },
  passwordInputText: {
    flex: 1,
    height: 45,
  },
  eyeIconContainer: {
    padding: 10,
  },
  eyeIcon: {
    fontSize: 20,
    color: "#b2b2b2",
  },
  errorText: {
    color: theme.buttonColorDanger,
    marginBottom: 5,
    alignSelf: "center",
  },
  customButton: {
    backgroundColor: theme.accentColor,
    borderRadius: 15,
    width: "81.5%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  customButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },

  errorBox: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: theme.dangerLight,
    borderRadius: 15,
    paddingTop: 8,
    paddingBottom: 1,
    paddingLeft: 10,
  },
});

export default LoginRegistration;
