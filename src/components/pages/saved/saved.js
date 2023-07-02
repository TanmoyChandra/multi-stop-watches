import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import * as Font from "expo-font";
import { Card, Text, Button } from "react-native-paper";
import { initializeApp } from "firebase/app";
import { IconButton, MD3Colors } from "react-native-paper";
import { Dialog, Portal } from "react-native-paper";
import { themes } from "../../../themes/themes";
const theme = themes.default; // Change this to select a different theme

const Saved = () => {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // dialog
  const [visible, setVisible] = React.useState(false);
  const hideDialog = () => setVisible(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "PlusJakartaSans-Regular": require("../../../../assets/fonts/plus_jakarta_sans/PlusJakartaSans-Bold.ttf"),
        "MuseoModerno-Bold": require("../../../../assets/fonts/MuseoModerno-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  let data = [
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "Evening Lunch",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "1h 10m",
      elapsedSec: "10",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "Gym Workout",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "2h 5m",
      elapsedSec: "10",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "Night Study",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "2h 15m",
      elapsedSec: "10",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "Last Meal",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "0h 30m",
      elapsedSec: "10",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "Evening Lunch",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "1h 7m",
      elapsedSec: "10",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "New Stopwatch",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "5h 10m",
      elapsedSec: "10",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "Office to home",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "50h 10m",
      elapsedSec: "10",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "Swimming",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "50h 10m",
      elapsedSec: "10",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "Evening Lunch",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "50h 10m",
      elapsedSec: "10",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "Evening Lunch",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "50h 10m",
      elapsedSec: "10",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "Evening Lunch",
      timestamp: "2023-07-01T17:39:02.999Z",
      elapsedHour: "50h 10m",
      elapsedSec: "10",
    },
  ];

  if (!fontsLoaded) {
    return (
      <>
        <Text>Loading..</Text>
      </>
    );
  }
  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardContainer}>
          {data.map((card, index) => {
            const date = new Date(card.timestamp);

            const options = {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            };

            const formattedDateTime = date.toLocaleDateString("en-US", options);

            return (
              <Card style={styles.cardStyle} key={index}>
                <Card.Content>
                  <Text variant="titleMedium" style={styles.stopWatchHeading}>
                    {card.name}
                  </Text>
                  <Text variant="bodySmall" style={styles.stopWatchMetaData}>
                    {formattedDateTime}
                  </Text>
                  <Text variant="headlineLarge" style={styles.stopWatchTime}>
                    {card.elapsedHour}
                  </Text>
                </Card.Content>
                <Card.Actions>
                  <View style={styles.cardShare}>
                    <Text style={styles.shareText}>Share</Text>
                  </View>
                  <View style={styles.cardDelete}>
                    <Text
                      style={styles.deleteText}
                      onPress={() => {
                        setVisible(true);
                      }}
                    >
                      Delete
                    </Text>
                  </View>
                </Card.Actions>
              </Card>
            );
          })}
        </View>
      </ScrollView>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title style={styles.title}>Delete</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={styles.title}>
              Do you really want to delete this saved stopwatch time?
            </Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={() => setVisible(false)}>Cancel</Button>
            <Button onPress={() => setVisible(false)}>Delete</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.primaryBackgroundColor,
    height: "100%",
    width: "100%",
  },
  cardContainer: {
    marginTop: 16,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  cardStyle: {
    width: "48%", // Adjust the width as per your preference
    marginBottom: 16,
    backgroundColor: "white",
    elevation: 0,
  },

  stopWatchHeading: {
    fontFamily: "PlusJakartaSans-Regular",
    color: theme.textColor_light,
  },
  stopWatchMetaData: {
    // fontFamily: "PlusJakartaSans-Regular",
    color: theme.textColor_light,
    fontSize: 11,
  },
  stopWatchTime: {
    marginTop: 10,
    // fontSize
    fontFamily: "MuseoModerno-Bold",
    color: theme.textColor_dark,
  },
  cardShare: {
    height: 30,
    width: "47%",
    backgroundColor: theme.buttonLight,
    borderRadius: 9,
    alignItems: "center",
    paddingTop: 5,
  },
  cardDelete: {
    height: 30,
    width: "47%",
    backgroundColor: theme.dangerLight,
    borderRadius: 9,
    alignItems: "center",
    paddingTop: 5,
  },
  shareText: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans-Regular",
    color: theme.buttonColorPrimary,
  },
  deleteText: {
    fontSize: 13,
    fontFamily: "PlusJakartaSans-Regular",
    color: theme.buttonColorDanger,
  },
  title: {
    // fontWeight: "bold",
    color: theme.textColor_dark,
    textAlign: "center",
  },
});

export default Saved;
