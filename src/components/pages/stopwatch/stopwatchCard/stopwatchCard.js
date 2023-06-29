import React, { useEffect, useState } from "react";
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  TextInput,
  Modal,
} from "react-native";
import * as Font from "expo-font";
import EditIcon from "../../../../../assets/card_icons/pencil.png";
import DeleteIcon from "../../../../../assets/card_icons/stop.png";

// below card icons
import PlayIcon from "../../../../../assets/card_below_icons/play.png";
import PauseIcon from "../../../../../assets/card_below_icons/pause.png";
import SaveIcon from "../../../../../assets/card_below_icons/bookmark.png";
import SmallDeleteIcon from "../../../../../assets/card_below_icons/trash.png";

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
      <View style={styles.cardOptions}>
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

        <View style={styles.belowButtonsArea}>
          <TouchableOpacity>
            <View style={styles.belowButtonOuterBox}>
              <Image source={PauseIcon} style={styles.BelowButtonIconUI} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.belowButtonOuterBox}>
              <Image source={SaveIcon} style={styles.BelowButtonIconUI} />
            </View>
          </TouchableOpacity>

          <TouchableOpacity>
            <View style={styles.belowButtonOuterBox}>
              <Image
                source={SmallDeleteIcon}
                style={styles.BelowButtonIconUI}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      {/* Rename Modal */}
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
    borderRadius: 25,
    borderBottomEndRadius: 0,
    padding: 16,

    // marginTop: -30,

    height: 85,
    width: cardWidth,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
    width: 17,
    height: 17,
    marginLeft: -2,
    resizeMode: "contain",
    tintColor: theme.buttonColorDanger,
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
});

export default StopwatchView;
