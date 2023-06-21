import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet } from "react-native";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

const auth = getAuth();

const Authentication = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isRegistering, setIsRegistering] = useState(true);

  // Function to register a new user
  const registerUser = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Handle successful registration
      console.log("User registered successfully:", user);
    } catch (error) {
      // Handle registration error
      console.error("Error registering user:", error);
    }
  };

  // Function to log in an existing user
  const loginUser = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      // Handle successful login
      console.log("User logged in successfully:", user);
    } catch (error) {
      // Handle login error
      console.error("Error logging in user:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>{isRegistering ? "Register" : "Login"}</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button
        title={isRegistering ? "Register" : "Login"}
        onPress={isRegistering ? registerUser : loginUser}
      />
      <Text
        style={styles.toggleText}
        onPress={() => setIsRegistering((prevValue) => !prevValue)}
      >
        {isRegistering ? "Already have an account? Login" : "Don't have an account? Register"}
      </Text>
    </View>
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
  input: {
    width: "80%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  toggleText: {
    marginTop: 20,
    color: "blue",
    textDecorationLine: "underline",
  },
});

export default Authentication;
