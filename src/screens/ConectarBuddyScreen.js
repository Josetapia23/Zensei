import React from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Dimensions, Image } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

// Import components
import Concentrarse from '../components/respiraciones/Concentrarse';
import PromoverCreatividad from '../components/respiraciones/PromoverCreatividad';
import PrepararseAreunion from '../components/respiraciones/PrepararseAreunion';
import Dormir from '../components/respiraciones/Dormir';
import ManejarEstres from '../components/respiraciones/ManejarEstres ';
import ReducirAnsiedad from '../components/respiraciones/ReducirAnsiedad';

const { width, height } = Dimensions.get('window');

const ConectarBuddyScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { respiracion } = route.params || {};

  const handleStartPress = () => {
    navigation.navigate('CronoetroScreen', { respiracion });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  // Component mapping to render the selected breathing SVG
  const componentMap = {
    'Concentrarse': Concentrarse,
    'PromoverCreatividad': PromoverCreatividad,
    'PrepararseAreunion': PrepararseAreunion,
    'ManejarEstres': ManejarEstres,
    'Dormir': Dormir,
    'ReducirAnsiedad': ReducirAnsiedad
  };

  // Get the component based on the name
  const SelectedComponent = componentMap[respiracion?.componentName] || Concentrarse;

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/fondohome.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        {/* Gradiente superior */}
        <LinearGradient
          colors={['rgb(255, 255, 255)', 'rgba(255, 255, 255, 0)']}
          locations={[0.4, 1]}
          style={styles.topOverlay}
        />

        {/* Logo */}
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/images/logoZenseiAzul.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        {/* Main content */}
        <View style={styles.contentContainer}>
          <Text style={styles.instructionText}>
            Estamos listos para empezar! Asegúrate de estar en un espacio armonioso, de preferencia sentado, con las palmas sobre las piernas.
          </Text>

          {/* Button */}
          <TouchableOpacity style={styles.startButton} onPress={handleStartPress}>
            <Text style={styles.buttonText}>ENCIENDE A BUDDY Y PRESIONA CONTINUAR</Text>
          </TouchableOpacity>

          {/* Gradiente inferior */}
          <LinearGradient
            colors={['rgba(118, 179, 229, 0)', 'rgba(118, 179, 229, 0.8)']}
            style={styles.bottomOverlay}
          />

          {/* Navigation arrows with SVG in the middle */}
          <View style={styles.navigationContainer}>
            <TouchableOpacity style={styles.arrowButton} onPress={handleBackPress}>
              <MaterialIcons name="arrow-back-ios" size={30} color="#FFFFFF" />
            </TouchableOpacity>
            
            {/* Breathing SVG Container in the middle */}
            <View style={styles.breathingSvgContainer}>
              <SelectedComponent width={120} height={120} color="#FFFFFF" />
            </View>
            
            <TouchableOpacity 
              style={styles.arrowButton} 
              onPress={handleStartPress}
            >
              <MaterialIcons name="arrow-forward-ios" size={30} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  topOverlay: {
    position: 'absolute',
    top: 0,
    width: '100%',
    height: '70%',
    zIndex: 1,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 50,
    zIndex: 2,
  },
  logo: {
    width: 200,
    height: 120,
    resizeMode: 'contain',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingBottom: 40,
    zIndex: 2,
  },
  instructionText: {
    color: '#76B3E5',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'Inter-Regular',
    paddingHorizontal: 30,
    lineHeight: 30,
    marginBottom: 30,
  },
  startButton: {
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingHorizontal: 30,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 100,
    marginBottom: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: '#76B3E5',
    fontSize: 18,
    fontFamily: 'Inter-Bold',
    textAlign: 'center',
  },
  navigationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginTop: 'auto',
    paddingBottom: 20,
  },
  arrowButton: {
    padding: 10,
  },
  breathingSvgContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomOverlay: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '70%',
    zIndex: 0,
  },
});

export default ConectarBuddyScreen;