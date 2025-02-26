import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NuevaVistaScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nueva Vista</Text>
      <Text style={styles.text}>¡Has hecho scroll correctamente! 🎉</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#76B3E5',
    marginBottom: 20
  },
  text: {
    fontSize: 18,
    color: '#6184A7',
    textAlign: 'center'
  }
});

export default NuevaVistaScreen;