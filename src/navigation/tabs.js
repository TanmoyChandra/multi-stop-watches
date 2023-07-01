import React, { useEffect, useState } from "react";
import { createMaterialBottomTabNavigator } from "react-native-paper/react-navigation";
import { Image } from "react-native";
import * as Font from "expo-font";
import {
  Appbar,
  BottomNavigation,
  Card,
  Button,
  Text,
  Chip,
  Divider,
  IconButton,
  FAB,
  PaperProvider,
} from "react-native-paper";
import Test from "../components/pages/stopwatch/stopwatch";
import Saved from "../components/pages/saved/saved";
import Settings from "../components/pages/settings/settings";
import Profile from "../components/pages/profile/profile";

import stopwatch from "../../assets/navigation_icons/stopwatch.png";
import stopwatch_fill from "../../assets/navigation_icons/stopwatch_fill.png";
import bookmark from "../../assets/navigation_icons/bookmark.png";
import bookmark_fill from "../../assets/navigation_icons/bookmark_fill.png";
import settings from "../../assets/navigation_icons/settings.png";
import settings_fill from "../../assets/navigation_icons/settings_fill.png";
import user from "../../assets/navigation_icons/user.png";
import user_fill from "../../assets/navigation_icons/user_fill.png";
import { NavigationContainer } from "@react-navigation/native";

import { themes } from "../themes/themes";
const theme = themes.default; // Change this to select a different theme

const Tab = createMaterialBottomTabNavigator();

function NavigationTabs() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "MuseoModerno-ExtraBold": require("../../assets/fonts/MuseoModerno-ExtraBold.ttf"),
        "MuseoModerno-Bold": require("../../assets/fonts/MuseoModerno-Bold.ttf"),

        "PlusJakartaSans-Medium": require("../../assets/fonts/plus_jakarta_sans/PlusJakartaSans-Medium.ttf"),
        "PlusJakartaSans-Bold": require("../../assets/fonts/plus_jakarta_sans/PlusJakartaSans-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  if (!fontsLoaded) {
    return null; // or a loading spinner
  }

  return (
    <>
      <PaperProvider>
        <Appbar.Header
          style={{
            backgroundColor: theme.accentColor,
            borderRadius: 25,
            height: 90,
          }}
        >
          <Appbar.Content
            title={"ChronoSync"}
            titleStyle={{
              fontSize: 30,
              marginTop: -10,
              paddingTop: 30,
              paddingLeft: 10,
              fontFamily: "MuseoModerno-ExtraBold",
              color: "white",
            }}
          />
        </Appbar.Header>

        <Tab.Navigator
          activeColor={theme.accentColor}
          inactiveColor={theme.deactiveButtonColor}
          shifting={false}
          sceneAnimationEnabled={true}
          barStyle={{
            backgroundColor: theme.secondaryBackgroundColor,
            fontWeight: "bold",
          }}
        >
          <Tab.Screen
            name="Stopwatch"
            component={Test}
            options={{
              tabBarIcon: ({ focused }) => (
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
                />
              ),
            }}
          />
          <Tab.Screen
            name="Saved"
            component={Saved}
            options={{
              tabBarIcon: ({ focused }) => (
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
                />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={Settings}
            options={{
              tabBarIcon: ({ focused }) => (
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
                />
              ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={Profile}
            options={{
              tabBarIcon: ({ focused }) => (
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
                />
              ),
            }}
          />
        </Tab.Navigator>
      </PaperProvider>
    </>
  );
}

export default NavigationTabs;
