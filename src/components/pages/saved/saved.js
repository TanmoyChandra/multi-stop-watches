import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { Card, Text, Button } from "react-native-paper";
import { initializeApp } from "firebase/app";

import { themes } from "../../../themes/themes";
const theme = themes.default; // Change this to select a different theme

const Saved = () => {
  useEffect(() => {}, []);

  let data = [
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "New Stopwatch",
      timestamp: "2023-07-01T17:39:02.999Z",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "New Stopwatch",
      timestamp: "2023-07-01T17:39:02.999Z",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "New Stopwatch",
      timestamp: "2023-07-01T17:39:02.999Z",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "New Stopwatch",
      timestamp: "2023-07-01T17:39:02.999Z",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "New Stopwatch",
      timestamp: "2023-07-01T17:39:02.999Z",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "New Stopwatch",
      timestamp: "2023-07-01T17:39:02.999Z",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "New Stopwatch",
      timestamp: "2023-07-01T17:39:02.999Z",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "New Stopwatch",
      timestamp: "2023-07-01T17:39:02.999Z",
    },
    {
      elapsedSeconds: "0",
      id: "2b5e8761-1836-11ee-ab9e-23f8bcd16490",
      name: "New Stopwatch",
      timestamp: "2023-07-01T17:39:02.999Z",
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.cardContainer}>
          {data.map((card) => {
            return (
              <Card style={styles.cardStyle} id={card.id}>
                <Card.Content>
                  <Text variant="titleLarge">{card.name}</Text>
                  <Text variant="bodyMedium">Card content</Text>
                </Card.Content>
                {/* <Card.Actions>
                  <Button>Cancel</Button>
                  <Button>Ok</Button>
                </Card.Actions> */}
              </Card>
            );
          })}
        </View>
      </ScrollView>
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
  },
});

export default Saved;
