import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";

import { Card, Text, Button } from "react-native-paper";
import { SwipeRow } from "react-native-swipe-list-view";

import * as Font from "expo-font";
import EditIcon from "../../../../../assets/card_icons/pencil.png";
// import DeleteIcon from "../../../../../assets/card_icons/stop.png";

import { LinearGradient } from "expo-linear-gradient";

// below card icons
import PlayIcon from "../../../../../assets/card_below_icons/play.png";
import PauseIcon from "../../../../../assets/card_below_icons/pause.png";
import SaveIcon from "../../../../../assets/card_below_icons/bookmark.png";
import DeleteIcon from "../../../../../assets/card_below_icons/trash.png";

import StopIcon from "../../../../../assets/card_icons/stop.png";

import { themes } from "../../../../themes/themes";
const theme = themes.default; // Change this to select a different theme

const { width } = Dimensions.get("window");
const cardWidth = width * 0.9;

const StopwatchView = ({ id, name, time, onDelete, onRename }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        "PlusJakartaSans-Regular": require("../../../../../assets/fonts/plus_jakarta_sans/PlusJakartaSans-Bold.ttf"),
        "MuseoModerno-Bold": require("../../../../../assets/fonts/MuseoModerno-Bold.ttf"),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);

  const handleRename = () => {
    if (newName.trim() !== "") {
      onRename(id, newName);
      setModalVisible(false);
    }
  };
  if (!fontsLoaded) {
    return null; // or a loading spinner
  }
  return (
    <>
      <SwipeRow leftOpenValue={75} rightOpenValue={-75}>
        <LinearGradient
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          colors={[
            theme.buttonColorPrimary,
            theme.buttonColorPrimary,
            theme.buttonColorDanger,
            theme.buttonColorDanger,
          ]}
          style={styles.cardBackOptions}
        >
          <TouchableOpacity>
            <Image source={SaveIcon} style={styles.SaveIcon} />
          </TouchableOpacity>

          <TouchableOpacity onPress={onDelete}>
            <Image source={DeleteIcon} style={styles.DeleteIcon} />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.card}>
          <View style={styles.columnContainer_2}>
            <View style={styles.rowContainer}>
              <TouchableOpacity onPress={() => setModalVisible(true)}>
                <View style={styles.rowContainer}>
                  <Text style={styles.name}>{name}</Text>
                  <Image source={EditIcon} style={styles.EditIcon} />
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.elapsedTime}>{time}</Text>
            </View>
          </View>

          {/* Edit Button */}
          <View style={styles.columnContainer_3}>
            <TouchableOpacity>
              <View style={styles.blueButton}>
                <Image source={PauseIcon} style={styles.PauseIcon} />
              </View>
            </TouchableOpacity>
          </View>
          {/* Stop Button */}
          <View style={styles.columnContainer_4}>
            <TouchableOpacity>
              <View style={styles.redButton}>
                <Image source={StopIcon} style={styles.StopIcon} />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </SwipeRow>

      {/* Modal */}
      <Modal animationType="fade" transparent visible={modalVisible}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Rename Stopwatch</Text>
            <TextInput
              style={styles.textInput}
              placeholder="Enter new name"
              onChangeText={setNewName}
              value={newName}
            />
            <TouchableOpacity
              style={styles.submitButton}
              onPress={handleRename}
            >
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.cancelButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  blueButton: {
    backgroundColor: theme.whiteish_blue,
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  redButton: {
    backgroundColor: theme.whiteish_red,
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  PauseIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    tintColor: theme.buttonColorPrimary,
  },

  StopIcon: {
    width: 15,
    height: 15,
    resizeMode: "contain",
    tintColor: theme.buttonColorDanger,
  },

  EditIcon: {
    width: 13,
    height: 13,
    marginTop: 1,
    marginLeft: -10,
    resizeMode: "contain",
    tintColor: theme.textColor_light,
  },

  DeleteIcon: {
    width: 26,
    height: 26,
    marginRight: 12,
    resizeMode: "contain",
    tintColor: theme.whiteish_red,
  },
  SaveIcon: {
    width: 23,
    height: 23,
    marginLeft: 12,
    resizeMode: "contain",
    tintColor: theme.whiteish_blue,
  },
  columnContainer_2: {
    flex: 5,
  },
  columnContainer_3: {
    alignItems: "center",
    flex: 1,
    marginStart: 10,
  },
  columnContainer_4: {
    alignItems: "flex-end",
    flex: 2,
    marginEnd: -6,
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 0,
  },
  name: {
    fontSize: 17,
    color: theme.textColor_light,
    fontFamily: "PlusJakartaSans-Regular",
    marginRight: 16,
  },
  elapsedTime: {
    fontSize: 28,
    color: theme.textColor_dark,
    fontFamily: "MuseoModerno-Bold",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 16,
    width: "80%",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: "blue",
    padding: 12,
    borderRadius: 4,
    alignItems: "center",
  },
  submitButtonText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelButton: {
    marginTop: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    color: "blue",
    fontWeight: "bold",
  },

  // new ui
  card: {
    backgroundColor: theme.secondaryBackgroundColor,
    borderRadius: 25,
    paddingLeft: 30,
    paddingRight: 30,
    height: 110,
    width: cardWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  cardBackOptions: {
    borderRadius: 25,
    height: 110,
    alignItems: "center",
    backgroundColor: "#8BC645",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 20,
  },
});

export default StopwatchView;
