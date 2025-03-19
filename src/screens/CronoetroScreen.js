import React, { useState, useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ImageBackground, 
  Dimensions, 
  Image,
  Animated,
  StatusBar
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute, useNavigation } from '@react-navigation/native';

// Importamos todos los componentes de respiración
import Concentrarse from '../components/respiraciones/Concentrarse';
import PromoverCreatividad from '../components/respiraciones/PromoverCreatividad';
import PrepararseAreunion from '../components/respiraciones/PrepararseAreunion';
import Dormir from '../components/respiraciones/Dormir';
import ManejarEstres from '../components/respiraciones/ManejarEstres';
import ReducirAnsiedad from '../components/respiraciones/ReducirAnsiedad';

const { width, height } = Dimensions.get('window');

// Definir los tiempos disponibles para seleccionar (de 1 a 30 minutos)
const timers = [...Array(30).keys()].map((i) => i + 1);
const itemSize = width * 0.38;
const itemSpacing = (width - itemSize) / 2;

const CronoetroScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const { respiracion } = route.params || {};
  
  // Estados para la nueva funcionalidad del cronómetro
  const [duration, setDuration] = useState(5); // 5 minutos por defecto
  const [minutes, setMinutes] = useState(duration);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);

  // Animaciones
  const xScroll = useRef(new Animated.Value(0)).current;
  const timerAnimation = useRef(new Animated.Value(height)).current;
  const animateButton = useRef(new Animated.Value(0)).current;

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
  const RespiracionComponent = respiracion ? 
    getComponentByName(respiracion.componentName) : 
    Concentrarse;

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
            alert('Tu práctica ha finalizado. Esperamos hayas tenido una experiencia de bienestar');
            navigation.navigate('RespiracionesScreen');
          }
        }
      }, 1000);
    } else {
      clearInterval(interval);
    }
    
    return () => clearInterval(interval);
  }, [isActive, minutes, seconds]);

  // Iniciar la animación y el cronómetro
  const startTimer = () => {
    setMinutes(duration);
    setSeconds(0);
    setIsActive(true);
    
    // Animar el botón de inicio y la barra de tiempo
    Animated.sequence([
      Animated.timing(animateButton, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.timing(timerAnimation, {
        toValue: 0,
        duration: 1000,
        useNativeDriver: true
      }),
      Animated.parallel([
        Animated.timing(timerAnimation, {
          toValue: height,
          duration: duration * 60000,
          useNativeDriver: true
        })
      ])
    ]).start(() => {
      Animated.timing(animateButton, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start();
    });
  };

  // Función para detener o reanudar el cronómetro
  const toggleTimer = () => {
    if (isActive) {
      setIsActive(false);
    } else {
      if (minutes === 0 && seconds === 0) {
        startTimer();
      } else {
        setIsActive(true);
      }
    }
  };

  // Interpolaciones para animaciones
  const opacity = animateButton.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0]
  });

  const translateY = animateButton.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 200]
  });

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      <ImageBackground
        source={require('../assets/images/fondohome.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.95)', 'rgba(255, 255, 255, 0.8)']}
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

        {/* Barra de progreso animada */}
        <Animated.View 
          style={[StyleSheet.absoluteFillObject, {
            height,
            width,
            backgroundColor: 'rgba(118, 179, 229, 0.3)',
            transform: [{
              translateY: timerAnimation
            }]
          }]}
        />

        <View style={styles.content}>
          <Text style={styles.headerText}>
            Selecciona el tiempo disponible que tienes
            para hacer tu práctica de respiración
          </Text>
          
          <Text style={styles.titleCronometro}>CRONÓMETRO</Text>
          {respiracion && (
            <Text style={styles.subtitleRespiracion}>{respiracion.title}</Text>
          )}
          
          {/* Selector de tiempo animado */}
          <Animated.View
            style={{
              opacity,
              marginTop: 30,
              height: itemSize * 1.2,
              width: width,
            }}
          >
            <Text style={styles.selectorLabel}>Desliza para elegir los minutos:</Text>
            <Animated.FlatList
              data={timers}
              keyExtractor={item => item.toString()}
              horizontal
              bounces={false}
              showsHorizontalScrollIndicator={false}
              onMomentumScrollEnd={event => {
                const index = Math.round(
                  event.nativeEvent.contentOffset.x / itemSize
                );
                setDuration(timers[index]);
              }}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: xScroll } } }],
                { useNativeDriver: true }
              )}
              snapToInterval={itemSize}
              decelerationRate="fast"
              style={{ flexGrow: 0 }}
              contentContainerStyle={{
                paddingHorizontal: itemSpacing
              }}
              renderItem={({ item, index }) => {
                const inputRange = [
                  (index - 1) * itemSize,
                  index * itemSize,
                  (index + 1) * itemSize
                ];

                const opacity = xScroll.interpolate({
                  inputRange,
                  outputRange: [0.4, 1, 0.4]
                });

                const scale = xScroll.interpolate({
                  inputRange,
                  outputRange: [0.7, 1, 0.7]
                });

                return (
                  <View
                    style={{
                      width: itemSize,
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    <Animated.Text
                      style={[
                        styles.timerSelectorText,
                        {
                          opacity,
                          transform: [{
                            scale
                          }]
                        }
                      ]}
                    >
                      {item}
                    </Animated.Text>
                  </View>
                );
              }}
            />
          </Animated.View>

          {/* Botón de inicio animado */}
          <Animated.View
            style={[
              styles.startButtonContainer,
              {
                opacity,
                transform:[{
                  translateY
                }]
              }
            ]}
          > 
            <TouchableOpacity style={styles.startButton} onPress={startTimer}>
              <Text style={styles.startButtonText}>Iniciar</Text>
            </TouchableOpacity>
          </Animated.View>
          
          {/* Texto para volver a la selección */}
          <TouchableOpacity 
            style={styles.bottomTextContainer}
            onPress={() => navigation.navigate('RespiracionesScreen')}
          >
            <Text style={styles.bottomText}>¿No es la actividad que necesitas?</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.buttonsContainer}>
          <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
            <Text style={styles.backButtonText}>←</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[
              styles.timerButton, 
              { backgroundColor: isActive ? 'rgba(118, 179, 229, 0.5)' : 'rgba(118, 179, 229, 0.3)' }
            ]} 
            onPress={toggleTimer}
          >
            <Text style={styles.timerButtonText}>{isActive ? '⏸️' : '⏱️'}</Text>
          </TouchableOpacity>
        </View>

        <LinearGradient
          colors={['rgba(255, 255, 255, 0.8)', 'rgba(255, 255, 255, 0.95)']}
          style={styles.bottomOverlay}
        />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '100%',
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
    justifyContent: 'center',
    paddingHorizontal: 20,
    marginTop: -20,
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
    color: '#76B3E5',
    marginTop: 10,
  },
  subtitleRespiracion: {
    fontFamily: 'Inter-Medium',
    fontSize: 24,
    color: '#76B3E5',
    marginTop: 5,
    marginBottom: 20,
  },
  selectorLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#76B3E5',
    marginBottom: 10,
    textAlign: 'center',
  },
  timerSelectorText: {
    fontFamily: 'Inter-Bold',
    fontSize: 36,
    color: '#76B3E5',
  },
  startButtonContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: 'rgba(118, 179, 229, 0.3)',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 22,
    color: '#76B3E5',
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: 100,
    alignSelf: 'center',
  },
  bottomText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#76B3E5',
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
    backgroundColor: 'rgba(118, 179, 229, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  backButtonText: {
    fontSize: 24,
    color: '#76B3E5',
  },
  timerButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
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