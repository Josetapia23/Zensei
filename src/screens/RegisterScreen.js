import React, { useState, useEffect } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, BackHandler} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InputField from '../components/inputs/InputField';

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phone, setPhone] = useState('');

  const handleRegister = () => {
    // Lógica de registro
    navigation.navigate('Home');
  };
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        navigation.navigate('Welcome');
        return true;
      }
    );
  
    return () => backHandler.remove();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <ImageBackground 
        source={require('../assets/images/fondoLetra.png')} 
        style={styles.background}
        resizeMode="cover"
      >
        <View style={styles.content}>
          {/* Encabezado con texto */}
          <View style={styles.header}>
            <Text style={styles.title}>Hola, regístrate!</Text>
          </View>

          <View style={styles.formContainer}>
            <InputField
              label="Correo electrónico"
              placeholder="Zen@correo.com"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />

            <InputField
              label="Número de teléfono"
              placeholder="Ingresa tu número"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />

            <InputField
              label="Contraseña"
              placeholder="Crea tu contraseña"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />

            <InputField
              label="Confirmar contraseña"
              placeholder="Repite tu contraseña"
              secureTextEntry
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleRegister}>
              <LinearGradient
                colors={['#76B3E5', '#D0E1F3']}
                style={styles.buttonGradient}
              >
                <Text style={styles.buttonText}>Crear cuenta</Text>
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.loginContainer}>
              <Text style={styles.loginText}>¿Ya tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                <Text style={styles.loginLink}>Iniciar sesión</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

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
    paddingHorizontal: 30,
  },
  header: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#76B3E5',
    textAlign: 'center',
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  button: {
    marginTop: 25,
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#76B3E5',
    fontSize: 14,
  },
  loginLink: {
    color: '#76B3E5',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default RegisterScreen;