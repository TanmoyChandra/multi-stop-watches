import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";

const Settings = () => {
  useEffect(() => {}, []);

  return (
    <View style={styles.container}>
      <View style={styles.background}>
        <Text>Settings</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
    backgroundColor: "#1D0F4A",
    height: "100%",
    width: "100%",
  },
});

export default Settings;
