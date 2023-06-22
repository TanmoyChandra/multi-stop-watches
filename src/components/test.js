import React, { useEffect, useState } from "react";
import { View, Image, Text, TouchableOpacity, StyleSheet } from "react-native";
import { initializeApp } from "firebase/app";
import StopwatchView from "./StopwatchCard/StopwatchCard";
import addIcon from ".././../assets/add.png";
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

import { themes } from "../themes/themes";

const firebaseConfig = {
  apiKey: "AIzaSyDRrUVRi5m-fuBk45zt8LYQSiMjWP4-Cx8",
  authDomain: "multi-stop-watches.firebaseapp.com",
  projectId: "multi-stop-watches",
  storageBucket: "multi-stop-watches.appspot.com",
  messagingSenderId: "828912065120",
  appId: "1:828912065120:web:65edc3e5ae64259c578105",
  measurementId: "G-Y68N9Q6B7L",
};

initializeApp(firebaseConfig);


const theme = themes.default; // Change this to select a different theme


const Test = () => {
  const [stopwatches, setStopwatches] = useState([]);

  

  // Fetch stopwatches from Firebase when the component mounts
  useEffect(() => {
    const fetchStopwatches = async () => {
      try {
        const db = getFirestore();
        const stopwatchCollection = collection(db, "stopwatches");
        const snapshot = await getDocs(stopwatchCollection);
        const fetchedStopwatches = snapshot.docs.map((doc) => doc.data());
        setStopwatches(fetchedStopwatches.map(startStopwatchLocally));
      } catch (error) {
        console.error("Error fetching stopwatches:", error);
      }
    };

    fetchStopwatches();
  }, []);

  // Add a new stopwatch to Firebase
  const addStopwatch = async () => {
    try {
      const newStopwatch = {
        id: uuid.v1(),
        name: "New Stopwatch",
        timestamp: new Date().toISOString(),
        elapsedSeconds: 0,
      };

      const db = getFirestore();
      const stopwatchRef = doc(db, "stopwatches", newStopwatch.id);
      await setDoc(stopwatchRef, newStopwatch);
      setStopwatches([...stopwatches, startStopwatchLocally(newStopwatch)]);
    } catch (error) {
      console.error("Error adding stopwatch:", error);
    }
  };

  // Delete a stopwatch from Firebase and the state
  const deleteStopwatch = async (stopwatchId) => {
    try {
      const db = getFirestore();
      const stopwatchRef = doc(db, "stopwatches", stopwatchId);
      await deleteDoc(stopwatchRef);
      setStopwatches(
        stopwatches.filter((stopwatch) => stopwatch.id !== stopwatchId)
      );
    } catch (error) {
      console.error("Error deleting stopwatch:", error);
    }
  };

  // Rename a stopwatch in Firebase and update the state
  const renameStopwatch = async (stopwatchId, newName) => {
    try {
      const db = getFirestore();
      const stopwatchRef = doc(db, "stopwatches", stopwatchId);
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

  // Start incrementing elapsed time for a stopwatch
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
    }, 1000); // Increment elapsed time every 1 second

    return {
      ...stopwatch,
      intervalId,
    };
  };

  // Format the elapsed time in HH:mm:ss format
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
        {/* All the stopwatches will be here */}
        {stopwatches.map((stopwatch) => (
          <StopwatchView
            key={stopwatch.id}
            id={stopwatch.id}
            name={stopwatch.name}
            time={formatElapsedTime(stopwatch.elapsedSeconds)}
            onStop={() => {
              /* Handle stop button press */
            }}
            onDelete={() => deleteStopwatch(stopwatch.id)}
            onRename={renameStopwatch}
          />
        ))}

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
  container: {
    paddingTop: 50,
    backgroundColor: "#1D0F4A",
    height: "100%",
    width: "100%",
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
    height: 27,
    width: 27,
  },
  addButton: {
    position: "absolute",
    bottom: 100,
    right: 20,
    backgroundColor: theme.buttonColorPrimary,
    borderRadius: 18,
    width: 60,
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#8CA0E8",
    shadowOffset: {
      width: 2,
      height: 2,
    },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default Test;
