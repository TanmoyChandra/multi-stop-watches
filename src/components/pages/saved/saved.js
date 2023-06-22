import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";

import { themes } from "../../../themes/themes";
const theme = themes.default; // Change this to select a different theme

const Profile = () => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text>Profile</Text>
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
});

export default Profile;
