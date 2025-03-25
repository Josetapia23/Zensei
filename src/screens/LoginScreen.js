import React, { useState } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Alert, Image, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InputField from '../components/inputs/InputField';
import BottomGradient from '../components/gradients/BottomGradient';
import PasswordRecoveryModal from '../components/PasswordRecoveryModal';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, firestore } from '../config/firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showRecovery, setShowRecovery] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleLogin = async () => {
    let valid = true;
    let newErrors = {};

    if (!email) {
      newErrors.email = 'El correo electrónico es obligatorio';
      valid = false;
    } else if (!validateEmail(email)) {
      newErrors.email = 'El formato del correo electrónico no es válido';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'La contraseña es obligatoria';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'La contraseña debe tener al menos 6 caracteres';
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) return;

    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Actualizar última fecha de login
      await updateDoc(doc(firestore, 'users', user.uid), {
        'profile.lastLogin': serverTimestamp()
      });

      navigation.navigate('Home');
    } catch (error) {
      // Manejo de errores específicos de Firebase
      let errorMessage = 'Error de inicio de sesión';
      switch (error.code) {
        case 'auth/user-not-found':
          errorMessage = 'No se encontró un usuario con este correo';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          break;
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido';
          break;
        case 'auth/too-many-requests':
          errorMessage = 'Demasiados intentos. Por favor, intenta más tarde';
          break;
      }

      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ImageBackground
        source={require('../assets/images/fondoLetra.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <BottomGradient />
        <View style={styles.content}>
          <Image
            source={require('../assets/images/caritaWelcome.png')}
            style={styles.logo}
          />

          <View style={styles.formContainer}>
            <InputField
              label="Correo electrónico"
              placeholder="Zen@correo.com"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                // Limpiar error de email si se está escribiendo
                if (errors.email) {
                  setErrors(prev => ({...prev, email: ''}));
                }
              }}
              error={errors.email}
            />

            <InputField
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                // Limpiar error de contraseña si se está escribiendo
                if (errors.password) {
                  setErrors(prev => ({...prev, password: ''}));
                }
              }}
              error={errors.password}
              icon={showPassword ? 'eye-off' : 'eye'}
              onIconPress={() => setShowPassword(!showPassword)}
            />

            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => setShowRecovery(true)}
            >
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>

            <PasswordRecoveryModal
              visible={showRecovery}
              onClose={() => setShowRecovery(false)}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
              <LinearGradient
                colors={['#76B3E5', '#D0E1F3']}
                style={styles.buttonGradient}
              >
                {loading ? (
                  <ActivityIndicator color="#FFF" />
                ) : (
                  <Text style={styles.buttonText}>Ingresar</Text>
                )}
              </LinearGradient>
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>¿No tienes cuenta? </Text>
              <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                <Text style={styles.registerLink}>Crear una cuenta Zensei</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
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
  logo: {
    width: 120,
    height: 120,
    resizeMode: 'contain',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 20,
    padding: 25,
    elevation: 5,
  },
  button: {
    marginTop: 20,
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
  forgotPassword: {
    alignSelf: 'flex-end',
    marginVertical: 10,
  },
  forgotPasswordText: {
    color: '#76B3E5',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  registerText: {
    color: '#76B3E5',
    fontSize: 14,
  },
  registerLink: {
    color: '#76B3E5',
    fontSize: 14,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;