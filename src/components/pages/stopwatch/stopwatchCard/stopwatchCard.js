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
          <TouchableOpacity style={styles.backTextWhite} onPress={onDelete}>
            <Image source={SaveIcon} style={styles.SaveIcon} />
          </TouchableOpacity>

          <TouchableOpacity>
            <Image source={DeleteIcon} style={styles.DeleteIcon} />
          </TouchableOpacity>
        </LinearGradient>

        <View style={styles.card}>
          <View style={styles.columnContainer_2}>
            <View style={styles.rowContainer}>
              <Text style={styles.name}>{name}</Text>
            </View>
            <View style={styles.rowContainer}>
              <Text style={styles.elapsedTime}>{time}</Text>
            </View>
          </View>

          <View style={styles.columnContainer_3}>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <View style={styles.addButton}>
                <Image source={EditIcon} style={styles.EditIcon} />
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.columnContainer_4}>
            <TouchableOpacity onPress={onDelete}>
              <View style={styles.addButton}>
                <Image source={DeleteIcon} style={styles.DeleteIcon} />
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
  card: {
    backgroundColor: theme.secondaryBackgroundColor,
    borderRadius: 18,
    // borderBottomEndRadius: 0,
    padding: 16,
    height: 85,
    width: cardWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    marginTop: 20,
  },

  cardOptions: {
    height: 105,
    width: cardWidth,

    flexDirection: "column",
    // backgroundColor: "#f2f2f2",
    borderRadius: 0,
    padding: 0,

    borderRadius: 25,
    marginTop: 25,
    marginBottom: 25,

    justifyContent: "space-between",
    alignItems: "center",
  },

  belowButtonsArea: {
    height: 40,
    width: 150,
    backgroundColor: theme.secondaryBackgroundColor,
    alignSelf: "flex-end",
    flexDirection: "row",
    justifyContent: "space-between",
    borderBottomEndRadius: 25,
    borderBottomLeftRadius: 25,
    paddingStart: 10,
    paddingEnd: 10,
  },

  belowButtonOuterBox: {
    backgroundColor: theme.buttonLight,
    // marginTop: 100,
    borderRadius: 10,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },

  BelowButtonIconUI: {
    width: 17,
    height: 17,
    resizeMode: "contain",
    tintColor: "#8c8c8c",
  },

  addButton: {
    backgroundColor: theme.buttonLight,
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  deleteButton: {
    backgroundColor: theme.dangerLight,
    borderRadius: 10,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },

  EditIcon: {
    width: 18,
    height: 18,
    marginLeft: -2,
    resizeMode: "contain",
    tintColor: theme.accentColor,
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
  deleteButton: {
    marginLeft: "auto",
  },
  renameButton: {
    marginLeft: 10,
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
  cardBackOptions: {
    borderRadius: 18,
    height: 85,
    alignItems: "center",
    backgroundColor: "#8BC645",
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginTop: 20,
  },
  backTextWhite: {
    color: "#FFF",
  },
  spacer: {
    height: 85,
  },
});

export default StopwatchView;
