import React, { useEffect, useState } from "react";
import {
  View,
  TouchableOpacity,
  StyleSheet,
  flexDirection,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as Font from "expo-font";
import { Card, Text, Button, Avatar } from "react-native-paper";

import { themes } from "../../../themes/themes";
const theme = themes.default; // Change this to select a different theme

const Profile = () => {
  const navigation = useNavigation();
  const [userDetails, setUserDetails] = useState(null);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    // Fetch user details from AsyncStorage
    getUserDetails();
  }, []);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "PlusJakartaSans-Regular": require("../../../../assets/fonts/plus_jakarta_sans/PlusJakartaSans-Bold.ttf"),
        "MuseoModerno-Bold": require("../../../../assets/fonts/MuseoModerno-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  // Function to get user details from AsyncStorage
  const getUserDetails = async () => {
    try {
      const userDetailsJSON = await AsyncStorage.getItem("userLoginInfo");
      if (userDetailsJSON) {
        const userDetails = JSON.parse(userDetailsJSON);
        console.log(userDetails);
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

  if (!fontsLoaded) {
    return (
      <>
        <Text>Loading..</Text>
      </>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        {userDetails && (
          <Card style={styles.profileCard}>
            <View style={styles.rowContainer}>
              <View style={styles.avatarContainer}>
                <Avatar.Text size={55} label="XD" />
              </View>
              <View style={styles.detailsContainer}>
                <Text style={styles.fullName}>
                  {userDetails.firstName} {userDetails.lastName}
                </Text>
                <Text style={styles.email}>{userDetails.email}</Text>
              </View>
            </View>
          </Card>
        )}
        <TouchableOpacity style={styles.customButton} onPress={handleLogout}>
          <Text style={styles.customButtonText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primaryBackgroundColor,
    height: "100%",
    width: "100%",
  },
  background: {
    flex: 1,
  },
  profileCard: {
    padding: 15,
    margin: 15,
    width: "87%",
    alignSelf: "center",
    borderRadius: 25,
    backgroundColor: "white",
  },
  rowContainer: {
    flexDirection: "row", // Align the avatar and details horizontally
  },
  avatarContainer: {
    marginTop: 3,
    marginRight: 10,
  },
  detailsContainer: {
    flex: 1, // Take remaining space in the row
  },
  fullName: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 25,
    color: theme.textColor_dark,
  },
  email: {
    fontFamily: "PlusJakartaSans-Regular",
    fontSize: 15,
    color: theme.textColor_light,
  },
  customButton: {
    backgroundColor: theme.accentColor,
    borderRadius: 15,
    width: "87%",
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
    alignSelf: "center",
  },
  customButtonText: {
    color: "white",
    fontSize: 16,
    marginTop: -5,
    fontFamily: "PlusJakartaSans-Bold",
  },
});

export default Profile;
