import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTabs from "../../../navigation/tabs";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import LoginRegistration from "../login/loginRegistration";

const auth = getAuth();
const db = getFirestore();

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const userInfo = await AsyncStorage.getItem("userLoginInfo");
      if (userInfo) {
        // User is logged in
        setIsLoggedIn(true);
      }
    } catch (error) {
      console.error("Error checking login status:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Loading...</Text>
      </View>
    );
  }

  const registerUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User registered successfully:", user);

      // Save user login information to Firebase Firestore
      saveUserToFirestore(user);

      // Save user login information to AsyncStorage
      saveUserLoginInfo(user);
    } catch (error) {
      console.error("Error registering user:", error);
    }
  };

  const loginUser = async () => {
    console.log("LOGIN called");
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in successfully:", user);

      // Save user login information to AsyncStorage
      saveUserLoginInfo(user);

      setLoggedIn(true);
    } catch (error) {
      console.error("Error logging in user:", error);
    }
  };

  const saveUserToFirestore = async (user) => {
    try {
      await addDoc(collection(db, "users"), {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
      });

      console.log("User information saved to Firebase Firestore successfully.");
    } catch (error) {
      console.error(
        "Error saving user information to Firebase Firestore:",
        error
      );
    }
  };

  const saveUserLoginInfo = async (user) => {
    try {
      const userInfo = {
        uid: user.uid,
        email: user.email,
        firstName: firstName,
        lastName: lastName,
      };

      await AsyncStorage.setItem("userLoginInfo", JSON.stringify(userInfo));
      console.log("User login information saved successfully.");
    } catch (error) {
      console.error("Error saving user login information:", error);
    }
  };

  return (
    <>
      {isLoggedIn || loggedIn ? (
        <NavigationTabs />
      ) : (
        <View style={styles.container}>
          <Text style={styles.heading}>
            {isRegistering ? "Register" : "Login"}
          </Text>
          <LoginRegistration
            isRegistering={isRegistering}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            setLastName={setLastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onButtonPress={isRegistering ? registerUser : loginUser}
            toggleText={
              isRegistering
                ? "Already have an account? Login"
                : "Don't have an account? Register"
            }
            onTogglePress={() => setIsRegistering((prevValue) => !prevValue)}
          />
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Authentication;
