import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars'

export default function App() {

  const [events, setEvents] = useState(
    {
    '2025-01-02': { marked: true, dotColor: 'red' },
})

  const addEvent = () => {
    setEvents({
      ...events,
      '2025-01-03': { marked: true, dotColor: 'green' },
    })
  }

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Calendar
        onDayPress={(day) => {
          console.log('Selected day', day)
        }}
        markedDates={
          events
        }
      />
      <Button title='Agregar evento' onPress={addEvent} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
