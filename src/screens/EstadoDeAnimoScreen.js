// screens/EstadoDeAnimoScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HappyFace from '../components/faces/HappyFace';
import NeutralFace from '../components/faces/NeutralFace';
import SadFace from '../components/faces/SadFace';
import AngryFace from '../components/faces/AngryFace';

const { width, height } = Dimensions.get('window');

const EstadoDeAnimoScreen = ({ navigation }) => {
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const arrowAnim = new Animated.Value(0);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(arrowAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true
        }),
        Animated.timing(arrowAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true
        })
      ])
    ).start();
  }, []);

  const translateY = arrowAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 10]
  });

  const handleEmotionSelect = (emotion) => {
    setSelectedEmotion(emotion);
    // Navegar a siguiente vista después de selección
    setTimeout(() => navigation.navigate('Respiraciones'), 500);
  };

  return (

    <View style={styles.container}>
      {/* Fondo degradado general */}
      <LinearGradient
        colors={['#E8F4FD', '#FFFFFF']}
        style={styles.backgroundGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      />
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/images/logoZenseiFondoAzul.png')}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>

      {/* Contenido principal */}
      <View style={styles.content}>
        {/* Tarjeta con degradado */}
        <LinearGradient
          colors={['#76B3E5', '#6184A7']}
          style={styles.card}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Text style={styles.title}>¿Cómo te sientes hoy?</Text>
          <Text style={styles.subtitle}>Escoge tu estado actual</Text>
        </LinearGradient>

        {/* Degradado central para las caritas */}
        <LinearGradient
          colors={['rgba(118, 179, 229, 0.15)', 'transparent']}
          style={styles.centerGradient}
          start={{ x: 0.5, y: 0.5 }}
          end={{ x: 1, y: 0 }}
        >
          {/* Contenedor de caritas */}
          <View style={styles.facesContainer}>
            {['Feliz', 'Triste', 'Enojado', 'Neutral'].map((emotion) => (
              <TouchableOpacity
                key={emotion}
                style={[styles.faceButton, selectedEmotion === emotion && styles.selectedFace]}
                onPress={() => handleEmotionSelect(emotion)}
              >
                {emotion === 'Feliz' && <HappyFace size={width * 0.2} />}
                {emotion === 'Triste' && <SadFace size={width * 0.2} />}
                {emotion === 'Enojado' && <AngryFace size={width * 0.2} />}
                {emotion === 'Neutral' && <NeutralFace size={width * 0.2} />}
                <View style={styles.faceHalo} />
              </TouchableOpacity>
            ))}
          </View>
        </LinearGradient>

        {/* Línea divisoria */}
        <View style={styles.divider}>
          <View style={styles.dashLine} />
        </View>

        {/* Texto descriptivo */}
        <Text style={styles.description}>
          Zensei puede guiarte inmediatamente si puedes reconocer cómo te sientes.
          También podemos explorar juntos la emoción, ¿qué prefieres?
        </Text>
      </View>

      {/* Gradiente inferior */}
      <LinearGradient
        colors={['rgba(33, 165, 185, 0)', '#76B3E5']}
        locations={[0, 0.7]}
        style={styles.bottomGradient}
      />

      {/* Flecha animada */}
      <Animated.View style={[styles.arrow, { transform: [{ translateY }] }]}>
        <MaterialCommunityIcons
          name="arrow-down"
          size={40}
          color="#FFFFFF"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    position: 'relative',
  },
  backgroundGradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: height,
    zIndex: 0,
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.04,
    zIndex: 2,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.4,
    resizeMode: 'contain',
  },
  content: {
    flex: 1,
    marginTop: height * 0.02,
    zIndex: 1,
    paddingBottom: height * 0.15,
  },
  card: {
    backgroundColor: '#76B3E5',
    marginHorizontal: width * 0.05,
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    zIndex: 2,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: width * 0.06,
    color: 'white',
    textAlign: 'center',
    marginBottom: height * 0.01,
    lineHeight: width * 0.07,
  },
  subtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: width * 0.04,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: width * 0.05,
  },
  centerGradient: {
    position: 'absolute',
    top: height * 0.35,
    width: width * 0.8,
    height: height * 0.36,
    alignSelf: 'center',
    borderRadius: 200,
    //transform: [{ rotate: '-20deg' }],
    opacity: 1,
    zIndex: 1,
  },
  facesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
    zIndex: 2,
  },
  faceButton: {
    margin: width * 0.03,
    padding: width * 0.02,
    borderRadius: 50,
    position: 'relative',
  },
  faceHalo: {
    position: 'absolute',
    width: '110%',
    height: '110%',
    borderRadius: 50,
    transform: [{ scale: 1.3 }],
    zIndex: -1,
  },
  selectedFace: {
    backgroundColor: 'rgba(118, 179, 229, 0.2)',
    transform: [{ scale: 1.1 }],
  },
  divider: {
    alignItems: 'center',
    marginTop: height * 0.04,
    marginBottom: height * 0.03,
  },
  dashLine: {
    width: '80%',
    borderBottomWidth: 2,
    borderColor: '#76B3E5',
    borderStyle: 'dashed',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: width * 0.04,
    color: '#6184A7',
    textAlign: 'center',
    lineHeight: width * 0.06,
    marginHorizontal: width * 0.06,
    marginTop: height * 0.02,
    marginBottom: height * 0.12,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.3,
    zIndex: 0,
  },
  arrow: {
    position: 'absolute',
    bottom: height * 0.06,
    alignSelf: 'center',
    zIndex: 3,
  },
});

export default EstadoDeAnimoScreen;