import React, { useState, useCallback } from 'react';
import { View, Text, ImageBackground, StyleSheet, Image } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import GradientOverlay from '../components/gradients/GradientOverlay';
import BottomGradient from '../components/gradients/BottomGradient';
import ScrollIndicator from '../components/ScrollIndicator';

const HomeScreen = () => {
  const dynamicMessage = "Bienvenido a Zensei, maestro de la calma.";
  const frases = [
    '"Piensa, sueña, cree y atrévete (Walt Disney)"',
    '"La paz viene del interior. No la busques fuera (Siddhārtha Gautama)"',
    '"El secreto para salir adelante es comenzar  (Mark Twain)"',
    '"Cree en ti, eres una persona maravillosa que logrará lo que se proponga"',
    '"La paz comienza con una sonrisa (Madre Teresa de Calcuta)"',
    '"Cuanto más tranquilo se vuelve un hombre, mayor es su éxito, sus influencias, su poder. La tranquilidad de la mente es una de las bellas joyas de la sabiduría (James Allen)"',
    '"Siempre hay esperanza"',
  ];

  const [fraseActual, setFraseActual] = useState('');

  const obtenerFraseAleatoria = () => {
    const indice = Math.floor(Math.random() * frases.length);
    return frases[indice];
  };

  useFocusEffect(
    useCallback(() => {
      setFraseActual(obtenerFraseAleatoria());
    }, [])
  );

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/fondohome.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <GradientOverlay
          colors={['#FFFFFF', 'rgba(255,255,255,0.2)']}
          locations={[0.40, 1]}
          style={styles.topGradient}
        />

        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logoZenseiAzul.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.contentWrapper}>
          <View style={styles.messageCard}>
            <Text style={styles.welcomeText}>{dynamicMessage}</Text>
            <Text style={styles.fraseText}>
              {fraseActual}
            </Text>
          </View>
        </View>

        <BottomGradient />
        <ScrollIndicator />
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF'
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%'
  },
  contentWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: "1%"
  },
  logoContainer: {
    position: 'absolute',
    top: "12%",
    alignSelf: 'center',
    paddingLeft: "4%",
    zIndex: 1
  },
  logo: {
    width: 200,
    height: 200,
  },
  messageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 24,
    width: '90%',
    maxWidth: 400,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8
  },
  welcomeText: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    lineHeight: 30,
    textAlign: 'center',
    color: '#76B3E5',
    letterSpacing: -0.4
  },
  fraseText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    textAlign: 'center',
    color: '#4A90E2',
    marginTop: 20,
    fontStyle: 'italic',
  },
  topGradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '55%',
    left: '0%'
  }
});

export default HomeScreen;