import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Vibration,
} from "react-native";
import { AppState } from "react-native";
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

import * as Device from "expo-device";
import * as Notifications from "expo-notifications";

import * as BackgroundFetch from "expo-background-fetch";
import * as TaskManager from "expo-task-manager";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: true,
  }),
});

import { themes } from "../../../themes/themes";
const theme = themes.default;

import firebaseConfig from "../../../../config/config";

initializeApp(firebaseConfig);

const BACKGROUND_TASK_NAME = "printTask";

const Test = () => {
  const [stopwatches, setStopwatches] = useState([]);
  const [userId, setUserId] = useState("");

  // notification related
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  // background task
  const handleBackgroundTask = async () => {
    console.log("notification will be here something...");

    stopwatches.forEach((stopwatch) => {
      const timestamp = new Date(stopwatch.timestamp);
      const currentTime = new Date();
      const elapsedMilliseconds = currentTime - timestamp;
      const elapsedSeconds = Math.floor(elapsedMilliseconds / 1000);

      const hours = Math.floor(elapsedSeconds / 3600);
      const minutes = Math.floor((elapsedSeconds % 3600) / 60);
      const seconds = elapsedSeconds % 60;

      let time_string = "";
      if (hours == 0) {
        time_string = minutes + "m";
      } else {
        time_string = hours + "h " + minutes + "m";
      }
      schedulePushNotification(stopwatch.id, stopwatch.name, time_string);
    });

    // Perform any other background tasks here

    return BackgroundFetch.Result;
    // return BackgroundFetch.Result.NewData;
  };

  TaskManager.defineTask(BACKGROUND_TASK_NAME, handleBackgroundTask);
  // background task end

  useEffect(() => {
    const checkBackgroundStatus = async () => {
      const appState = AppState.currentState; //await removed
      if (appState === "background") {
        await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
          minimumInterval: 60 * 1, // Minimum interval in minutes
        });
      }
    };

    AppState.addEventListener("change", checkBackgroundStatus);
    checkBackgroundStatus();

    return () => {
      AppState.removeEventListener("change", checkBackgroundStatus);
      BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK_NAME);
    };
  }, []);

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

    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, [userId]);

  const addStopwatch = async () => {
    // Vibrate/Haptic Feedback
    Vibration.vibrate(150);
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

      await schedulePushNotification(
        newStopwatch.id,
        newStopwatch.name,
        "0:0:0"
      );
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

      schedulePushNotification(
        stopwatch.id,
        stopwatch.name,
        formatElapsedTime(elapsedSeconds)
      );
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

async function schedulePushNotification(id, name, time) {
  await Notifications.scheduleNotificationAsync({
    identifier: id,
    content: {
      title: name,
      sound: null, // Disable notification sound
      body: "Elapsed time is " + time,
      data: { data: "goes here" },
    },
    trigger: null,
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    token = (await Notifications.getExpoPushTokenAsync()).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }
  return token;
}

export default Test;
