import React, { useState } from 'react';
import { View,Image, Text, TouchableOpacity, StyleSheet, Dimensions, TextInput, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ClockIcon from '../../../assets/clock_icon.png';
import EditIcon from '../../../assets/edit_icon.png';
import DeleteIcon from '../../../assets/delete_icon.png';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.90;

const StopwatchView = ({ id, name, time, onDelete, onRename }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState('');

  const handleRename = () => {
    if (newName.trim() !== '') {
      onRename(id, newName);
      setModalVisible(false);
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.columnContainer_1}>
      <Image source={ClockIcon} style={styles.ClockIcon} />
      </View>
      <View style={styles.columnContainer_2}>
        <View style={styles.rowContainer}>
          <Text style={styles.name}>{name}</Text>
        </View>
        <View style={styles.rowContainer}>
          <Text style={styles.elapsedTime}>{time}</Text>
        </View>
      </View>

      <View style={styles.columnContainer_3}>
      <TouchableOpacity  onPress={() => setModalVisible(true)}>
      <Image source={EditIcon} style={styles.ClockIcon} />
          </TouchableOpacity>
          </View>
          <View style={styles.columnContainer_4}>
        <TouchableOpacity onPress={onDelete}>
        <Image source={DeleteIcon} style={styles.ClockIcon} />
        </TouchableOpacity>
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
            <TouchableOpacity style={styles.submitButton} onPress={handleRename}>
              <Text style={styles.submitButtonText}>Submit</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4F3A7B',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.23)',
    padding: 16,
    marginBottom: 16,
    height: 84,
    width: cardWidth,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  ClockIcon:{
    width: 45,
    height: 45,
    marginLeft: -2,
    resizeMode: 'contain',
  },
  columnContainer_1: {
    flex: 2,
  },
  columnContainer_2: {
    flex: 5,
  },
  columnContainer_3: {
    alignItems: 'center',
    flex: 1,
    marginStart: 10
  },
  columnContainer_4: {
    alignItems: 'flex-end',
    flex: 2,
    marginEnd: -6
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 0,
  },
  name: {
    fontSize: 18,
    color: '#F9EAFF',
    fontWeight: 'bold',
    marginRight: 16,
    textShadowColor: '#1D0F4A',
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10
  },  
  elapsedTime: {
    fontSize: 28,
    color: "#00C9A4",
    fontWeight: 'bold',

    // textShadowColor: '#1D0F4A',
    // textShadowOffset: { width: 0, height: 0 },
    // textShadowRadius: 15,
  },
  deleteButton: {
    marginLeft: 'auto',
  },
  renameButton: {
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    width: '80%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  textInput: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 4,
    padding: 8,
    marginBottom: 16,
  },
  submitButton: {
    backgroundColor: 'blue',
    padding: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  submitButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  cancelButton: {
    marginTop: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: 'blue',
    fontWeight: 'bold',
  },
});

export default StopwatchView;
