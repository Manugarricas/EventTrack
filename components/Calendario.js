import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DateTimePicker from '@react-native-community/datetimepicker'; // Calendario para móvil
import DatePicker from 'react-datepicker'; // Calendario para web
import 'react-datepicker/dist/react-datepicker.css';

const CustomDatePicker = ({ date, setDate, addEvent }) => {
  
  const [showPicker, setShowPicker] = useState(false);

  if (Platform.OS === 'web') {
    return (
      <DatePicker
        selected={date}
        onChange={(selectedDate) => {
          setDate(selectedDate);
          addEvent(selectedDate);
        }}
        dateFormat="yyyy-MM-dd"
      />
    );
  } else {
    return (
      <>
        <Button title="Seleccionar fecha" onPress={() => setShowPicker(true)} />
        {showPicker && (
          <DateTimePicker
            value={date}
            mode="date"
            display="default"
            onChange={(event, selectedDate) => {
              setShowPicker(false);
              if (selectedDate) {
                setDate(selectedDate);
                addEvent(selectedDate);
              }
            }}
          />
        )}
      </>
    );
  }
};

const Calendario = () => {
  const [events, setEvents] = useState({});
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
      <StatusBar style="auto" />
      <Calendar
        onDayPress={(day) => {
          addEvent(new Date(day.dateString));
        }}
        markedDates={events}
      />
      <Button title="Borrar eventos" onPress={deleteEvents} />
      <Text>Selecciona una fecha:</Text>
      <CustomDatePicker date={date} setDate={setDay} addEvent={addEvent} />
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
  selectedDate: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Calendario;
