import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { initializeApp } from "firebase/app";
import StopwatchView from "./stopwatchCard/stopwatchCard";
import addIcon from "../../../../assets/add.png";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore/lite";
import uuid from "react-native-uuid";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { themes } from "../../../themes/themes";

import firebaseConfig from "../../../../config/config";

initializeApp(firebaseConfig);

const theme = themes.default;

const Test = () => {
  const [stopwatches, setStopwatches] = useState([]);
  const [userId, setUserId] = useState("");

  useEffect(() => {
    const fetchStopwatches = async () => {
      try {
        const userLoginInfo = await AsyncStorage.getItem("userLoginInfo");
        const userInfo = JSON.parse(userLoginInfo);
        const userId = userInfo.uid;
        setUserId(userId);
        console.log("USER ID ->", userId);

        const db = getFirestore();
        const userStopwatchCollection = collection(
          db,
          "stopwatches",
          userId,
          "specific-stopwatches"
        );

        const querySnapshot = await getDocs(userStopwatchCollection);
        const fetchedStopwatches = querySnapshot.docs.map((doc) => doc.data());
        setStopwatches(fetchedStopwatches.map(startStopwatchLocally));
      } catch (error) {
        console.error("Error fetching stopwatches:", error);
      }
    };

    fetchStopwatches();
  }, [userId]);

  const addStopwatch = async () => {
    try {
      const newStopwatch = {
        id: uuid.v1(),
        name: "New Stopwatch",
        timestamp: new Date().toISOString(),
        elapsedSeconds: 0,
      };

      const db = getFirestore();
      const userStopwatchCollection = collection(
        db,
        "stopwatches",
        userId,
        "specific-stopwatches"
      );
      const stopwatchRef = doc(userStopwatchCollection, newStopwatch.id);

      await setDoc(stopwatchRef, newStopwatch);
      setStopwatches([...stopwatches, startStopwatchLocally(newStopwatch)]);
    } catch (error) {
      console.error("Error adding stopwatch:", error);
    }
  };

  const deleteStopwatch = async (stopwatchId) => {
    try {
      const db = getFirestore();
      const userStopwatchCollection = collection(
        db,
        "stopwatches",
        userId,
        "specific-stopwatches"
      );
      const stopwatchRef = doc(userStopwatchCollection, stopwatchId);

      await deleteDoc(stopwatchRef);
      setStopwatches(
        stopwatches.filter((stopwatch) => stopwatch.id !== stopwatchId)
      );
    } catch (error) {
      console.error("Error deleting stopwatch:", error);
    }
  };

  const renameStopwatch = async (stopwatchId, newName) => {
    try {
      const db = getFirestore();
      const userStopwatchCollection = collection(
        db,
        "stopwatches",
        userId,
        "specific-stopwatches"
      );
      const stopwatchRef = doc(userStopwatchCollection, stopwatchId);

      await updateDoc(stopwatchRef, { name: newName });
      setStopwatches((prevStopwatches) =>
        prevStopwatches.map((prevStopwatch) => {
          if (prevStopwatch.id === stopwatchId) {
            return {
              ...prevStopwatch,
              name: newName,
            };
          }
          return prevStopwatch;
        })
      );
    } catch (error) {
      console.error("Error renaming stopwatch:", error);
    }
  };

  const startStopwatchLocally = (stopwatch) => {
    const startTime = new Date(stopwatch.timestamp).getTime();
    const intervalId = setInterval(() => {
      const currentTime = new Date().getTime();
      const elapsedMilliseconds = currentTime - startTime;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

      setStopwatches((prevStopwatches) => {
        return prevStopwatches.map((prevStopwatch) => {
          if (prevStopwatch.id === stopwatch.id) {
            return {
              ...prevStopwatch,
              elapsedSeconds,
            };
          }
          return prevStopwatch;
        });
      });
    }, 1000);

    return {
      ...stopwatch,
      intervalId,
    };
  };

  const formatElapsedTime = (elapsedSeconds) => {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View style={styles.background}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        {stopwatches.map((stopwatch) => (
          <StopwatchView
            key={stopwatch.id}
            id={stopwatch.id}
            name={stopwatch.name}
            time={formatElapsedTime(stopwatch.elapsedSeconds)}
            onStop={() => {}}
            onDelete={() => deleteStopwatch(stopwatch.id)}
            onRename={renameStopwatch}
          />
        ))}
      </ScrollView>

      <TouchableOpacity
        style={styles.addButton}
        onPress={addStopwatch}
        activeOpacity={0.8}
      >
        <Image source={addIcon} style={styles.ClockIcon} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContainer: {
    paddingBottom: 100,
  },
  heading: {
    color: "#F9EAFF",
    fontSize: 40,
    fontWeight: "bold",
    paddingBottom: 10,
    textAlign: "left",
    paddingLeft: "5%",
    textShadowColor: "#4F3A7B",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  background: {
    height: "90%",
    backgroundColor: theme.primaryBackgroundColor,
    flex: 1,
    alignItems: "center",
    position: "relative",
  },
  ClockIcon: {
    height: 23,
    width: 23,
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: theme.buttonColorPrimary,
    borderRadius: 20,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#6587FF",
    shadowOffset: {
      width: 5,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Test;
