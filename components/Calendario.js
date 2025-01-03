import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker';

// const [events, setEvents] = useState(
//  {
//   '2025-01-02': { marked: true, dotColor: 'red' },
//  }
// )

const Calendario = () => {

  const [events, setEvents] = useState({});

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await AsyncStorage.getItem('events');
        if (events !== null) {
          setEvents(JSON.parse(events));
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadEvents();
  }, []);

  const [modalVisible, setModalVisible] = useState(false);

  const [addEventModalVisibility, setEventModalVisibility] = useState(false);

  const [date, setDay] = useState(new Date());

  const [showPicker, setShowPicker] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowPicker(false);
    setDay(currentDate);
    addEvent(selectedDate);
  }

  const addEvent = async (date) => {
    const parsedDate = date.toISOString().split('T')[0];

    const updateEvents = {
      ...events,
      [parsedDate]: { marked: true, dotColor: 'green' },
    };

    setEvents(updateEvents);

    try {
      await AsyncStorage.setItem('events', JSON.stringify(events));
    } catch (error) {
      console.error(error);
    };
  };

  const deleteEvents = async () => {
    setEvents({});
    try {
      await AsyncStorage.removeItem('events');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <View style={styles.container}>
      <Text>Welcome to EventTrack!</Text>
      <StatusBar style="auto" />
      <Button title="Mostrar Alerta" onPress={() => setModalVisible(true)} />

      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>

        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <Text style={styles.alertTitle}>¡Éxito!</Text>
            <Text style={styles.alertMessage}>Tu operación fue completada con éxito.</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, styles.cancelButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.buttonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType='slide'
        visible={addEventModalVisibility}
        onRequestClose={() => setEventModalVisibility(false)}>
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <Text>En que fecha quieres añadir el evento?</Text>
            <TextInput></TextInput>
            <Button title='Cancelar' onPress={() => setEventModalVisibility(false)} />
          </View>
        </View>
      </Modal>
      <Calendar
        onDayPress={(day) => {
          addEvent(day);
        }}
        markedDates={
          events
        }
      />
      <Button title='Agregar evento' onPress={() => setEventModalVisibility(true)} />
      <Button title='Borrar eventos' onPress={() => deleteEvents} />
      <Button title="Abrir Selector de Fecha" onPress={() => setShowPicker(true)} />
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display="default"
          onChange={onChange}
        />
      )}
      <Text style={styles.selectedDate}>
        Fecha seleccionada: {date.toISOString().split('T')[0]}
      </Text>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fondo semitransparente
  },
  alertBox: {
    width: 300,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5, // Sombra para Android
  },
  alertTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#333',
  },
  alertMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: '#555',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e74c3c', // Rojo
  },
  confirmButton: {
    backgroundColor: '#2ecc71', // Verde
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Calendario;
