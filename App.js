import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Test from "./src/components/test";
import { NavigationContainer } from "@react-navigation/native";
import NavigationTabs from "./src/navigation/tabs";

export default function App() {
  return (
    <NavigationContainer>
      <NavigationTabs/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
