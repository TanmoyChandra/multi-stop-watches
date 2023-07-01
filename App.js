import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import Authentication from "./src/components/pages/authentication/authentication";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { themes } from "./src/themes/themes";
import { Provider as PaperProvider } from "react-native-paper";

const theme = themes.default;
const Tab = createMaterialBottomTabNavigator();

export default function App() {
  useEffect(() => {}, []);

  return (
    // <PaperProvider>
    <SafeAreaProvider>
      <NavigationContainer>
        <Tab.Navigator
          barStyle={{
            display: "none",
          }}
        >
          <Tab.Screen name="Authentication" component={Authentication} />
        </Tab.Navigator>
      </NavigationContainer>
      <StatusBar backgroundColor={theme.statusBarColor} style="light" />
    </SafeAreaProvider>
    // </PaperProvider>
  );
}
