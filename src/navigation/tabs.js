import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import Test from "../components/test";

const Tab = createBottomTabNavigator();

const NavigationTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: [
          {
            position: "absolute",
            bottom: 10,
            left: 10,
            right: 10,
            elevation: 0,
            backgroundColor: "#F9EAFF",
            borderRadius: 25,
            height: 60,
            ...styles.shadow,
          },
        ],
      }}
    >
      <Tab.Screen name="Home" component={Test}></Tab.Screen>
      <Tab.Screen name="X" component={Test}></Tab.Screen>
      <Tab.Screen name="Y" component={Test}></Tab.Screen>
      <Tab.Screen name="Z" component={Test}></Tab.Screen>
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  shadow: {
    shadowColor: "1D0F4A",
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3.5,
    elevation: 5,
  },
});

export default NavigationTabs;
