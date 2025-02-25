import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import BottomGradient from '../components/gradients/BottomGradient';
export default function WelcomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      {/* Fondo con letras */}
      <ImageBackground 
        source={require('../../src/assets/images/fondoLetra.png')} 
        style={styles.background}
        resizeMode="cover"
      >
        {/* Contenedor principal */}
        <View style={styles.content}>
          {/* Texto de bienvenida (más arriba) */}
          <Text style={styles.title}>Hola!</Text>

          {/* Imagen de la carita (más arriba) */}
          <Image source={require('../../src/assets/images/caritaWelcome.png')} style={styles.logo} />
        </View>
      </ImageBackground>

      {/* Degradado en la parte inferior (subido un poco más) */}
      <BottomGradient />


      {/* Contenedor de botones encima del degradado */}
      <View style={styles.buttonContainer}>
        {/* Botón de Iniciar Sesión */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
          <LinearGradient
            colors={['#76B3E5', '#D0E1F3']}
            style={styles.buttonBackground}
          >
            <Text style={styles.buttonText}>Iniciar sesión</Text>
          </LinearGradient>
        </TouchableOpacity>

        <Text style={styles.subText}>¿Eres nuevo?</Text>

        {/* Botón de Registro */}
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Register')}>
          <LinearGradient
            colors={['#76B3E5', '#D0E1F3']}
            style={styles.buttonBackground}
          >
            <Text style={styles.buttonText}>Regístrate</Text>
          </LinearGradient>
        </TouchableOpacity>

        {/* Enlace informativo */}
        <Text style={styles.linkText}>Has click aquí para recibir mensajes de Zensei</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  background: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: '-50%', // Subimos el contenido
  },
  title: {
    fontSize: 100,
    fontWeight: 'bold',
    color: '#84B1E0',
    marginBottom: 10,
    marginTop: '-20%', // mover el "Hola!"
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
    marginBottom: '10%' // mover la img central
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 50,
    width: '100%',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    marginVertical: 10,
  },
  buttonBackground: {
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#D0E1F3',
  },
  buttonText: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold',
  },
  subText: {
    fontSize: 16,
    color: '#fff',
    marginVertical: 5,
  },
  linkText: {
    fontSize: 16,
    color: '#fff',
    textDecorationLine: 'underline',
    marginTop: 20,
  },
});
