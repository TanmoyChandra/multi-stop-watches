import React, { useEffect, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

import { themes } from "../../../themes/themes";
const theme = themes.default; // Change this to select a different theme

const Profile = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Fetch user details from AsyncStorage
    getUserDetails();
  }, []);

  // Function to get user details from AsyncStorage
  const getUserDetails = async () => {
    try {
      const userDetailsJSON = await AsyncStorage.getItem("userLoginInfo");
      if (userDetailsJSON) {
        const userDetails = JSON.parse(userDetailsJSON);
        setUserDetails(userDetails);
      }
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // Function to clear AsyncStorage and logout the user
  const handleLogout = async () => {
    try {
      // Clear user details from AsyncStorage
      await AsyncStorage.removeItem("userLoginInfo");
      // Reset the navigation stack to authentication page
      navigation.reset({
        index: 0,
        routes: [{ name: "Authentication" }],
      });
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        {userDetails && (
          <>
            <Text style={styles.label}>
              Name: {userDetails.firstName} {userDetails.lastName}
            </Text>
            <Text style={styles.label}>Email: {userDetails.email}</Text>
          </>
        )}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: theme.primaryBackgroundColor,
    height: "100%",
    width: "100%",
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
    color: "#000",
    marginBottom: 10,
  },
  logoutButton: {
    backgroundColor: "#4F3A7B",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 20,
  },
  logoutButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
  },
});

export default Profile;
