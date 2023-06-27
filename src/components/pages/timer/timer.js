// import React, { useEffect } from "react";
// import { AppState } from "react-native";
// import * as BackgroundFetch from "expo-background-fetch";
// import * as TaskManager from "expo-task-manager";

// const BACKGROUND_TASK_NAME = "printTask";

// const handleBackgroundTask = async () => {
//   console.log("Printing something...");

//   // Perform any other background tasks here

//   return BackgroundFetch;
// };

// TaskManager.defineTask(BACKGROUND_TASK_NAME, handleBackgroundTask);

// const Timer = () => {
//   useEffect(() => {
//     const checkBackgroundStatus = async () => {
//       const appState = await AppState.currentState;
//       if (appState === "background") {
//         await BackgroundFetch.registerTaskAsync(BACKGROUND_TASK_NAME, {
//           minimumInterval: 1, // Minimum interval in minutes
//         });
//       }
//     };

//     AppState.addEventListener("change", checkBackgroundStatus);
//     checkBackgroundStatus();

//     return () => {
//       AppState.removeEventListener("change", checkBackgroundStatus);
//       BackgroundFetch.unregisterTaskAsync(BACKGROUND_TASK_NAME);
//     };
//   }, []);

//   return <></>;
// };

// export default Timer;
