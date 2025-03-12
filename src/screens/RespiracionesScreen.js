import React from 'react';
import { View, ImageBackground, StyleSheet, Image, Text, Dimensions, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import CarruselRespiraciones from '../components/CarruselRespiraciones';

const { width, height } = Dimensions.get('window');

const RespiracionesScreen = () => {
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

        <View style={styles.titleContainer}>
          <Text style={styles.title}>Opciones</Text>  
        </View>

        <View style={styles.svgContainer}>
          <CarruselRespiraciones />
          
          {/* Indicador de carrusel */}
          <View style={styles.carouselIndicator}>
            <View style={styles.arrowContainer}>
              <Text style={styles.arrow}>{'‹'}</Text>
              <View style={styles.dashedLineContainer}>
                {Array.from({ length: 20 }).map((_, i) => (
                  <View key={i} style={styles.dash} />
                ))}
              </View>
              <Text style={styles.arrow}>{'›'}</Text>
            </View>
          </View>
        </View>

        {/* Texto de enlace */}
        <TouchableOpacity 
          style={styles.bottomTextContainer}
          onPress={() => console.log('Navegar a formularios')} // Actualizar con tu navegación
        >
          <Text style={styles.bottomText}>¿No encuentras la opción que necesitas?</Text>
        </TouchableOpacity>

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
    top: "8%",
    alignSelf: 'center',
    paddingLeft: "4%",
    zIndex: 1,    
  },
  logo: {
    width: 200,
    height: 200,
    
  },
  titleContainer: {
    position: 'absolute',
    top: '32%',
    alignSelf: 'center',
    zIndex: 2,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 30,
    color: '#76B3E5',
    letterSpacing: -0.4

  },
  svgContainer: {
    position: 'absolute',
    top: '35%',
    alignSelf: 'center',
    zIndex: 2,
    ackgroundColor: 'rgba(255, 255, 255, 0)',
    borderRadius: 20,
    padding: 15,
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '60%',
    zIndex: 0,
  },
  carouselIndicator: {
    position: 'absolute',
    top: '110%',
    width: width * 0.8,
    alignSelf: 'center',
  },
  arrowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    color: '#FFF',
    fontSize: 32,
    marginHorizontal: 5,
    includeFontPadding: false,
    textAlignVertical: 'center',
  },
  dashedLineContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 2,
    marginHorizontal: 10,
  },
  dash: {
    width: 8,
    height: 2,
    backgroundColor: '#FFF',
    marginHorizontal: 2,
  },
  bottomTextContainer: {
    position: 'absolute',
    bottom: height * 0.06,
    alignSelf: 'center',
    zIndex: 3,
  },
  bottomText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: -0.011,
    textDecorationLine: 'underline',
  },
});

export default RespiracionesScreen;