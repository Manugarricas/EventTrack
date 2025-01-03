import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const Calendario = () => {
  const [events, setEvents] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [addEventModalVisibility, setEventModalVisibility] = useState(false);
  const [date, setDay] = useState(new Date());

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

  const addEvent = async (selectedDate) => {
    const parsedDate = selectedDate.toISOString().split('T')[0];

    const updatedEvents = {
      ...events,
      [parsedDate]: { marked: true, dotColor: 'green' },
    };

    setEvents(updatedEvents);

    try {
      await AsyncStorage.setItem('events', JSON.stringify(updatedEvents));
    } catch (error) {
      console.error(error);
    }
  };

  const deleteEvents = async () => {
    setEvents({});
    try {
      await AsyncStorage.removeItem('events');
    } catch (error) {
      console.error(error);
    }
  };

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
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.confirmButton]}
                onPress={() => setModalVisible(false)}>
                <Text style={styles.buttonText}>Aceptar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        transparent={true}
        animationType="slide"
        visible={addEventModalVisibility}
        onRequestClose={() => setEventModalVisibility(false)}>
        <View style={styles.overlay}>
          <View style={styles.alertBox}>
            <Text>¿En qué fecha quieres añadir el evento?</Text>
            <TextInput />
            <Button title="Cancelar" onPress={() => setEventModalVisibility(false)} />
          </View>
        </View>
      </Modal>
      <Calendar
        onDayPress={(day) => {
          addEvent(new Date(day.dateString));
        }}
        markedDates={events}
      />
      <Button title="Agregar evento" onPress={() => setEventModalVisibility(true)} />
      <Button title="Borrar eventos" onPress={deleteEvents} />
      <Text>Selecciona una fecha:</Text>
      <DatePicker
        selected={date}
        onChange={(selectedDate) => {
          setDay(selectedDate);
          addEvent(selectedDate);
        }}
        dateFormat="yyyy-MM-dd"
      />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
    elevation: 5,
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
    backgroundColor: '#e74c3c',
  },
  confirmButton: {
    backgroundColor: '#2ecc71',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Calendario;
