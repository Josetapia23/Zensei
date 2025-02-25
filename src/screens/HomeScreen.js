import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import GradientOverlay from '../components/gradients/GradientOverlay';
import BottomGradient from '../components/gradients/BottomGradient';

const HomeScreen = () => {
  const dynamicMessage = "Bienvenido a Zensei, tu vida está a punto de cambiar";
  
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/fondohome.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Degradado superior personalizado */}
        <GradientOverlay
          colors={['#FFFFFF', 'rgba(255,255,255,0.2)']}
          locations={[0.25, 1]}
          style={styles.topGradient}
        />

        {/* Contenido principal */}
        <View style={styles.contentWrapper}>
          <View style={styles.messageCard}>
            <Text style={styles.welcomeText}>{dynamicMessage}</Text>
          </View>
        </View>

        {/* Degradado inferior con componente mejorado */}
        <BottomGradient />
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
    paddingHorizontal: 20
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
  topGradient: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '40%',
    left: '0%'
  }
});

export default HomeScreen;