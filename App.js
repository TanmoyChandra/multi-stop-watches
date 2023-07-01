import React, { useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import Authentication from "./src/components/pages/authentication/authentication";
import { Provider } from "react-native-paper";
import { NavigationContainer, DarkTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { themes } from "./src/themes/themes";

import {
  Easing,
  FlatList,
  ScrollView,
  StyleSheet,
  useColorScheme,
  View,
} from "react-native";

const theme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    secondaryContainer: "transparent", // Use transparent to disable the little highlighting oval
  },
};

const Stack = createStackNavigator();

export default function App() {
  useEffect(() => {}, []);

  return (
    <Provider>
      <SafeAreaProvider>
        <NavigationContainer theme={DarkTheme}>
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Authentication" component={Authentication} />
          </Stack.Navigator>
        </NavigationContainer>
        <StatusBar style="dark" />
      </SafeAreaProvider>
    </Provider>
  );
}
