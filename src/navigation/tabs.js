import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Test from "../components/test";
import Saved from "../components/pages/saved/saved";
import Settings from "../components/pages/setings/settings";
import Profile from "../components/pages/profile/profile";

import { TouchableRipple } from "react-native-paper";

import user from "../../assets/navigation_icons/user.png";
import settings from "../../assets/navigation_icons/settings.png";
import stopwatch from "../../assets/navigation_icons/stopwatch.png";
import bookmark from "../../assets/navigation_icons/bookmark.png";

import user_fill from "../../assets/navigation_icons/user_fill.png";
import settings_fill from "../../assets/navigation_icons/settings_fill.png";
import stopwatch_fill from "../../assets/navigation_icons/stopwatch_fill.png";
import bookmark_fill from "../../assets/navigation_icons/bookmark_fill.png";

import { themes } from "../themes/themes";

const Tab = createBottomTabNavigator();

const NavigationTabs = () => {

  const theme = themes.default; // Change this to select a different theme


  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        // headerShown: false,

        headerTitleStyle: [
          {
            fontSize: 35,
            color: theme.textColor_blue,
            fontWeight: "bold",
            textAlign: "left",
            // textShadowColor: "#4F3A7B",
            // textShadowOffset: { width: 1, height: 1 },
            // textShadowRadius: 2,
          },
        ],
        headerStyle: [
          {
            backgroundColor: theme.primaryColor,
          },
        ],
        tabBarStyle: [
          {
            position: "absolute",
            backgroundColor: theme.secondaryBackgroundColor,
            height: 65,
            ...styles.shadow,
          },
        ],
      }}
    >
      <Tab.Screen
        name="Stopwatch"
        component={Test}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <TouchableRipple>
                <Image
                  source={focused ? stopwatch_fill : stopwatch}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused ? theme.activeButtonColor : theme.deactiveButtonColor,
                    alignSelf: "center",
                  }}
                ></Image>
              </TouchableRipple>
              <Text
                style={{
                  color: focused ? theme.activeButtonColor : theme.deactiveButtonColor,
                  fontWeight: "600",
                }}
              >
                Stopwatch
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={focused ? bookmark_fill : bookmark}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? theme.activeButtonColor : theme.deactiveButtonColor,
                  alignSelf: "center",
                }}
              ></Image>
              <Text
                style={{
                  color: focused ? theme.activeButtonColor : theme.deactiveButtonColor,
                  fontWeight: "600",
                }}
              >
                Saved
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={focused ? settings_fill : settings}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? theme.activeButtonColor : theme.deactiveButtonColor,
                  alignSelf: "center",
                }}
              ></Image>
              <Text
                style={{
                  color: focused ? theme.activeButtonColor : theme.deactiveButtonColor,
                  fontWeight: "600",
                }}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>

      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={focused ? user_fill : user}
                resizeMode="contain"
                style={{
                  width: 20,
                  height: 20,
                  tintColor: focused ? theme.activeButtonColor : theme.deactiveButtonColor,
                  alignSelf: "center",
                }}
              ></Image>
              <Text
                style={{
                  color: focused ? theme.activeButtonColor : theme.deactiveButtonColor,
                  fontWeight: "600",
                }}
              >
                Profile
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>
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
