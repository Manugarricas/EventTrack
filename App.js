import React from 'react';
import { StyleSheet } from 'react-native';
import Home from './components/Home';
import { createStackNavigator } from '@react-navigation/stack';
import Calendario from './components/Calendario';
import Eventos from './components/Eventos';
import { NavigationContainer } from '@react-navigation/native';

const Stack = createStackNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen name='Home' component={Home} options={{ title: 'Inicio' }} />
        <Stack.Screen name='Calendario' component={Calendario} />
        <Stack.Screen name='Eventos' component={Eventos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2f2f2',
  }
});
