import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from "./src/components/test";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTabs from "./src/navigation/tabs";
import Authentication from "./src/components/pages/authentication/authentication";

export default function App() {
  return (
    <>
      <Authentication>
        
      </Authentication>

      {/* <NavigationContainer>
        <NavigationTabs />
      </NavigationContainer>
      <StatusBar style="light" /> */}
    </>
  );
}
