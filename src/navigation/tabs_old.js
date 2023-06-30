import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";

import Test from "../components/pages/stopwatch/stopwatch";
// import Timer from "../components/pages/timer/timer";
import Saved from "../components/pages/saved/saved";
import Settings from "../components/pages/settings/settings";
import Profile from "../components/pages/profile/profile";

import { TouchableRipple } from "react-native-paper";

// import timer from "../../assets/navigation_icons/timer.png";
// import timer_fill from "../../assets/navigation_icons/timer_fill.png";

import stopwatch from "../../assets/navigation_icons/stopwatch.png";
import stopwatch_fill from "../../assets/navigation_icons/stopwatch_fill.png";

import bookmark from "../../assets/navigation_icons/bookmark.png";
import bookmark_fill from "../../assets/navigation_icons/bookmark_fill.png";

import settings from "../../assets/navigation_icons/settings.png";
import settings_fill from "../../assets/navigation_icons/settings_fill.png";

import user from "../../assets/navigation_icons/user.png";
import user_fill from "../../assets/navigation_icons/user_fill.png";

import { themes } from "../themes/themes";
const theme = themes.default; // Change this to select a different theme

const Tab = createBottomTabNavigator();

const NavigationTabs = () => {
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
          },
        ],
        headerTitleContainerStyle: [{ paddingVertical: 0 }],
        headerStyle: [
          {
            backgroundColor: theme.primaryColor,
            borderRadius: 25,
            height: 120,
          },
        ],
        tabBarStyle: [
          {
            position: "absolute",
            backgroundColor: theme.secondaryBackgroundColor,
            height: 80,
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
          },
        ],
      }}
    >
      {/* Stopwatch */}
      <Tab.Screen
        name="Stopwatch"
        component={Test}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <View
                style={{
                  backgroundColor: focused
                    ? theme.buttonLight
                    : theme.secondaryBackgroundColor,
                  ...styles.navButtonCircle,
                }}
              >
                <Image
                  source={focused ? stopwatch_fill : stopwatch}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused
                      ? theme.activeButtonColor
                      : theme.deactiveButtonColor,
                    alignSelf: "center",
                  }}
                ></Image>
              </View>
              <Text
                style={{
                  color: focused
                    ? theme.activeButtonColor
                    : theme.deactiveButtonColor,
                  ...styles.navButtonText,
                }}
              >
                Stopwatch
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>

      {/* Timer */}
      {/* <Tab.Screen
        name="Timer"
        component={Timer}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <View
                style={{
                  backgroundColor: focused
                    ? theme.buttonLight
                    : theme.secondaryBackgroundColor,
                  ...styles.navButtonCircle,
                }}
              >
                <Image
                  source={focused ? timer_fill : timer}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused
                      ? theme.activeButtonColor
                      : theme.deactiveButtonColor,
                    alignSelf: "center",
                  }}
                ></Image>
              </View>
              <Text
                style={{
                  color: focused
                    ? theme.activeButtonColor
                    : theme.deactiveButtonColor,
                  ...styles.navButtonText,
                }}
              >
                Timer
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen> */}

      {/* Saved */}
      <Tab.Screen
        name="Saved"
        component={Saved}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <View
                style={{
                  backgroundColor: focused
                    ? theme.buttonLight
                    : theme.secondaryBackgroundColor,
                  ...styles.navButtonCircle,
                }}
              >
                <Image
                  source={focused ? bookmark_fill : bookmark}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused
                      ? theme.activeButtonColor
                      : theme.deactiveButtonColor,
                    alignSelf: "center",
                  }}
                ></Image>
              </View>
              <Text
                style={{
                  color: focused
                    ? theme.activeButtonColor
                    : theme.deactiveButtonColor,
                  ...styles.navButtonText,
                }}
              >
                Saved
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>

      {/* Settings */}
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <View
                style={{
                  backgroundColor: focused
                    ? theme.buttonLight
                    : theme.secondaryBackgroundColor,
                  ...styles.navButtonCircle,
                }}
              >
                <Image
                  source={focused ? settings_fill : settings}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused
                      ? theme.activeButtonColor
                      : theme.deactiveButtonColor,
                    alignSelf: "center",
                  }}
                ></Image>
              </View>
              <Text
                style={{
                  color: focused
                    ? theme.activeButtonColor
                    : theme.deactiveButtonColor,
                  ...styles.navButtonText,
                }}
              >
                Settings
              </Text>
            </View>
          ),
        }}
      ></Tab.Screen>

      {/* Profile */}
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <View
                style={{
                  backgroundColor: focused
                    ? theme.buttonLight
                    : theme.secondaryBackgroundColor,
                  ...styles.navButtonCircle,
                }}
              >
                <Image
                  source={focused ? user_fill : user}
                  resizeMode="contain"
                  style={{
                    width: 20,
                    height: 20,
                    tintColor: focused
                      ? theme.activeButtonColor
                      : theme.deactiveButtonColor,
                    alignSelf: "center",
                  }}
                ></Image>
              </View>
              <Text
                style={{
                  color: focused
                    ? theme.activeButtonColor
                    : theme.deactiveButtonColor,
                  ...styles.navButtonText,
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
  navButtonCircle: {
    height: 30,
    weight: 30,
    borderRadius: 15,
    paddingTop: 5,
  },
  navButtonText: {
    width: 65,
    textAlign: "center",
    fontWeight: "600",
  },
});

export default NavigationTabs;
