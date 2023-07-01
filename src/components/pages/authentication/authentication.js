import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTabs from "../../../navigation/tabs";
import { doc, setDoc, getDoc } from "firebase/firestore";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { ActivityIndicator, Colors } from "react-native-paper";
import LoginRegistration from "../login/loginRegistration";

import { themes } from "../../../themes/themes";
const theme = themes.default;

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
  const [isProcessing, setIsProcessing] = useState(false);

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

  const registerUser = async () => {
    setIsProcessing(true);
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
    } finally {
      setIsProcessing(false);
    }
  };

  const loginUser = async () => {
    setIsProcessing(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;
      console.log("User logged in successfully:");

      // Fetch user information from Firebase Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnapshot = await getDoc(userDocRef);
      if (userDocSnapshot.exists()) {
        const userData = userDocSnapshot.data();
        const { firstName, lastName } = userData;
        console.log("userData=======", userData);

        // Save user login information to AsyncStorage
        saveUserLoginInfo({ ...user, firstName, lastName });

        setLoggedIn(true);
      } else {
        console.error("User data not found in Firestore.");
      }
    } catch (error) {
      console.error("Error logging in user:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const saveUserToFirestore = async (user) => {
    try {
      const userDocRef = doc(db, "users", user.uid); // Use user UID as document ID
      await setDoc(userDocRef, {
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
        firstName: user.firstName,
        lastName: user.lastName,
      };

      await AsyncStorage.setItem("userLoginInfo", JSON.stringify(userInfo));
      console.log("User login information saved successfully.");
    } catch (error) {
      console.error("Error saving user login information:", error);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator
          animating={true}
          color={theme.accentColor}
          size={50}
          style={styles.loader}
        />
      </View>
    );
  }

  return (
    <>
      {isLoggedIn || loggedIn ? (
        <NavigationTabs />
      ) : (
        <View style={styles.container}>
          <LoginRegistration
            isRegistering={isRegistering}
            firstName={firstName}
            setFirstName={setFirstName}
            lastName={lastName}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            onButtonPress={isRegistering ? registerUser : loginUser}
            toggleText={isRegistering ? true : false}
            onTogglePress={() => setIsRegistering((prevValue) => !prevValue)}
          />
          {isProcessing && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator
                animating={true}
                color={theme.accentColor}
                size={50}
                style={styles.loader}
              />
            </View>
          )}
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  loadingOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default Authentication;
