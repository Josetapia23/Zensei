import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Dimensions, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';

// Importamos todos los componentes de respiración
import Concentrarse from '../components/respiraciones/Concentrarse';
import PromoverCreatividad from '../components/respiraciones/PromoverCreatividad';
import PrepararseAreunion from '../components/respiraciones/PrepararseAreunion';
import Dormir from '../components/respiraciones/Dormir';
import ManejarEstres from '../components/respiraciones/ManejarEstres ';
import ReducirAnsiedad from '../components/respiraciones/ReducirAnsiedad';

const { width, height } = Dimensions.get('window');

const CronoetroScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { respiracion } = route.params || {};
  
  // Estado para el cronómetro
  const [minutes, setMinutes] = useState(5);
  const [seconds, setSeconds] = useState(30);
  const [isActive, setIsActive] = useState(false);

  // Función para mapear el nombre del componente al componente real
  const getComponentByName = (name) => {
    const componentMap = {
      'Concentrarse': Concentrarse,
      'PromoverCreatividad': PromoverCreatividad,
      'PrepararseAreunion': PrepararseAreunion,
      'Dormir': Dormir,
      'ManejarEstres': ManejarEstres,
      'ReducirAnsiedad': ReducirAnsiedad
    };
    
    return componentMap[name] || Concentrarse; // Por defecto Concentrarse si no se encuentra
  };

  // Obtenemos el componente SVG correspondiente
  const RespiracionComponent = getComponentByName(respiracion.componentName);

  // Lógica del cronómetro
  useEffect(() => {
    let interval = null;
    
    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else {
          if (minutes > 0) {
            setMinutes(minutes - 1);
            setSeconds(59);
          } else {
            clearInterval(interval);
            setIsActive(false);
            // Aquí podrías añadir alguna notificación o feedback cuando el tiempo termine
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  // Función para iniciar/pausar el cronómetro
  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  // Función para regresar a la pantalla anterior
  const goBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/fondohome.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.9)', 'rgba(255, 255, 255, 0)']}
          locations={[0.4, 1]}
          style={styles.topOverlay}
        />

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logoZenseiAzul.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.content}>
          <Text style={styles.headerText}>
            Selecciona el tiempo disponible que tienes
            para hacer tu práctica de respiración
          </Text>
          
          <Text style={styles.titleCronometro}>CRONOMETRO</Text>
          <Text style={styles.subtitleRespiracion}>{respiracion.title}</Text>
          
          <View style={styles.timerContainer}>
            <View style={styles.timerBox}>
              <Text style={styles.timerDigit}>{String(minutes).padStart(1, '0')}</Text>
            </View>
            <Text style={styles.timerColon}>:</Text>
            <View style={styles.timerBox}>
              <Text style={styles.timerDigit}>{String(seconds).padStart(2, '0')}</Text>
            </View>
          </View>
          
          <View style={styles.respiracionIconContainer}>
            <RespiracionComponent width={width * 0.35} height={width * 0.35} color="#FFFFFF" />
          </View>
          
          <TouchableOpacity 
            style={styles.bottomTextContainer}
            onPress={() => navigation.navigate('RespiracionesScreen')}
          >
            <Text style={styles.bottomText}>¿No es la actividad que necesitas?</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.backButton} onPress={goBack}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.timerButton} onPress={toggleTimer}>
            <Text style={styles.timerButtonText}>⏱️</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['rgba(118, 179, 229, 0)', 'rgba(118, 179, 229, 0.8)']}
          style={styles.bottomOverlay}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#76B3E5',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '70%',
  },
  logoContainer: {
    position: 'absolute',
    top: "5%",
    alignSelf: 'center',
    zIndex: 1,
  },
  logo: {
    width: 120,
    height: 120,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '25%',
    paddingHorizontal: 20,
  },
  headerText: {
    fontFamily: 'Inter-Medium',
    fontSize: 22,
    color: '#76B3E5',
    textAlign: 'center',
    marginBottom: 20,
  },
  titleCronometro: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    color: '#FFFFFF',
    marginTop: 10,
  },
  subtitleRespiracion: {
    fontFamily: 'Inter-Medium',
    fontSize: 24,
    color: '#FFFFFF',
    marginTop: 5,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  timerBox: {
    width: 80,
    height: 120,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerDigit: {
    fontFamily: 'Inter-Bold',
    fontSize: 90,
    color: '#76B3E5',
  },
  timerColon: {
    fontFamily: 'Inter-Bold',
    fontSize: 70,
    color: '#FFFFFF',
    marginHorizontal: 5,
  },
  respiracionIconContainer: {
    width: width * 0.7,
    height: width * 0.7,
    borderRadius: width * 0.35,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  bottomTextContainer: {
    marginTop: 30,
  },
  bottomText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    textDecorationLine: 'underline',
  },
  buttonsContainer: {
    position: 'absolute',
    bottom: 40,
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 30,
  },
  backButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#FFFFFF',
  },
  timerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  timerButtonText: {
    fontSize: 24,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
    zIndex: -1,
  },
});

export default CronoetroScreen;