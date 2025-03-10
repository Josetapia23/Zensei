import React from 'react';
import { View, ImageBackground, StyleSheet, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CarruselRespiraciones from '../components/CarruselRespiraciones';

const RespiracionesScreen = () => {
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/fondohome.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.2)']}
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

        <View style={styles.svgContainer}>
          <CarruselRespiraciones />
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
    height: '55%',
  },
  logoContainer: {
    position: 'absolute',
    top: "12%",
    alignSelf: 'center',
    zIndex: 1
  },
  logo: {
    width: 200,
    height: 200,
  },
  svgContainer: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    zIndex: 2,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 20,
    padding: 15,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '30%',
    zIndex: 0,
  },
});

export default RespiracionesScreen;