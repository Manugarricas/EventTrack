import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

const Eventos = () => {

  const [events, setEvents] = useState({});

  useEffect(() => {
    const loadEvents = async () => {
      try {
        const events = await AsyncStorage.getItem('events');
        if (events !== null) {
          setEvents(JSON.parse(events));
          console.log(events);
        }
      } catch (error) {
        console.error(error);
      }
    };
    loadEvents();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Esta es la pantalla de Eventos</Text>
      <FlatList
        data={events}
        // keyExtractor={events => events}
        renderItem={({item}) => <View>{{item}}</View>}
      />
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
  text: {
    fontSize: 18,
    color: '#333',
  },
});

export default Eventos;
