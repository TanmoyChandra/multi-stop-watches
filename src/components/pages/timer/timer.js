import React, { useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  Provider as PaperProvider,
  Modal,
  Portal,
  Button,
  TextInput,
} from "react-native-paper";

const Timer = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedHours, setSelectedHours] = useState("0");
  const [selectedMinutes, setSelectedMinutes] = useState("0");
  const [selectedSeconds, setSelectedSeconds] = useState("0");

  const handleTimerSelection = () => {
    setModalVisible(true);
  };

  const handleStartTimer = () => {
    setModalVisible(false);
    // Start the timer with the selected duration
    const totalSeconds =
      parseInt(selectedHours) * 3600 +
      parseInt(selectedMinutes) * 60 +
      parseInt(selectedSeconds);
    // Start the timer logic here...
  };

  return (
    <PaperProvider>
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <TouchableOpacity
          style={{
            paddingVertical: 10,
            paddingHorizontal: 20,
            backgroundColor: "blue",
            borderRadius: 5,
          }}
          onPress={handleTimerSelection}
        >
          <Text style={{ fontSize: 16, color: "white" }}>
            Select Timer Duration
          </Text>
        </TouchableOpacity>
        <Portal>
          <Modal
            visible={modalVisible}
            onDismiss={() => setModalVisible(false)}
          >
            <View
              style={{
                backgroundColor: "white",
                padding: 20,
                borderRadius: 10,
              }}
            >
              <Text style={{ fontSize: 20, marginBottom: 10 }}>
                Select Timer Duration:
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginBottom: 10,
                }}
              >
                <TextInput
                  label="Hours"
                  value={selectedHours}
                  onChangeText={(value) => setSelectedHours(value)}
                  keyboardType="numeric"
                  style={{ flex: 1, marginRight: 10 }}
                />
                <TextInput
                  label="Minutes"
                  value={selectedMinutes}
                  onChangeText={(value) => setSelectedMinutes(value)}
                  keyboardType="numeric"
                  style={{ flex: 1, marginRight: 10 }}
                />
                <TextInput
                  label="Seconds"
                  value={selectedSeconds}
                  onChangeText={(value) => setSelectedSeconds(value)}
                  keyboardType="numeric"
                  style={{ flex: 1 }}
                />
              </View>
              <Button
                mode="contained"
                onPress={handleStartTimer}
                style={{ marginTop: 20 }}
              >
                Select
              </Button>
            </View>
          </Modal>
        </Portal>
      </View>
    </PaperProvider>
  );
};

export default Timer;
