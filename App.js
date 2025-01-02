import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Calendar
        onDayPress={(day) => {
          console.log('Selected day', day)
        }}
        markedDates={
          {
            '2025-01-01': {selected: true, marked: true, selectedColor: 'blue'},
          }
        }
      />
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
