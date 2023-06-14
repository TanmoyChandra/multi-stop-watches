import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  deleteDoc,
} from 'firebase/firestore/lite';
import uuid from 'react-native-uuid';

const firebaseConfig = {
    apiKey: "AIzaSyDRrUVRi5m-fuBk45zt8LYQSiMjWP4-Cx8",
    authDomain: "multi-stop-watches.firebaseapp.com",
    projectId: "multi-stop-watches",
    storageBucket: "multi-stop-watches.appspot.com",
    messagingSenderId: "828912065120",
    appId: "1:828912065120:web:65edc3e5ae64259c578105",
    measurementId: "G-Y68N9Q6B7L"
  };

initializeApp(firebaseConfig);

const Test = () => {
  const [stopwatches, setStopwatches] = useState([]);

  // Fetch stopwatches from Firebase when the component mounts
  useEffect(() => {
    const fetchStopwatches = async () => {
      try {
        const db = getFirestore();
        const stopwatchCollection = collection(db, 'stopwatches');
        const snapshot = await getDocs(stopwatchCollection);
        const fetchedStopwatches = snapshot.docs.map((doc) => doc.data());
        setStopwatches(fetchedStopwatches.map(startStopwatchLocally));
      } catch (error) {
        console.error('Error fetching stopwatches:', error);
      }
    };

    fetchStopwatches();
  }, []);

  // Add a new stopwatch to Firebase
  const addStopwatch = async () => {
    try {
      const newStopwatch = {
        id: uuid.v1(),
        name: 'New Stopwatch',
        timestamp: new Date().toISOString(),
        elapsedSeconds: 0,
      };

      const db = getFirestore();
      const stopwatchRef = doc(db, 'stopwatches', newStopwatch.id);
      await setDoc(stopwatchRef, newStopwatch);
      setStopwatches([...stopwatches, startStopwatchLocally(newStopwatch)]);
    } catch (error) {
      console.error('Error adding stopwatch:', error);
    }
  };

  // Delete a stopwatch from Firebase and the state
  const deleteStopwatch = async (stopwatchId) => {
    try {
      const db = getFirestore();
      const stopwatchRef = doc(db, 'stopwatches', stopwatchId);
      await deleteDoc(stopwatchRef);
      setStopwatches(stopwatches.filter((stopwatch) => stopwatch.id !== stopwatchId));
    } catch (error) {
      console.error('Error deleting stopwatch:', error);
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

  // Stop incrementing elapsed time for a stopwatch
  const stopStopwatch = (stopwatchId) => {
    try {
      const updatedStopwatches = stopwatches.map((stopwatch) => {
        if (stopwatch.id === stopwatchId) {
          clearInterval(stopwatch.intervalId);
          return {
            ...stopwatch,
            intervalId: null,
          };
        }
        return stopwatch;
      });
      setStopwatches(updatedStopwatches);
    } catch (error) {
      console.error('Error stopping stopwatch:', error);
    }
  };

  // Format the elapsed time in HH:mm:ss format
  const formatElapsedTime = (elapsedSeconds) => {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds % 3600) / 60);
    const seconds = elapsedSeconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View>
      <Text>Stopwatches:</Text>
      {stopwatches.map((stopwatch) => (
        <View key={stopwatch.id}>
          <Text>{stopwatch.name}</Text>
          <Text>{formatElapsedTime(stopwatch.elapsedSeconds)}</Text>
          <Button title="Stop" onPress={() => stopStopwatch(stopwatch.id)} />
          <Button title="Delete" onPress={() => deleteStopwatch(stopwatch.id)} />
        </View>
      ))}
      <Button title="Add Stopwatch" onPress={addStopwatch} />
    </View>
  );
};

export default Test;
