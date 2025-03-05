// screens/EstadoDeAnimoScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, Animated, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HappyFace from '../components/faces/HappyFace';

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
    setTimeout(() => navigation.navigate('SiguienteVista'), 500);
  };

  return (
    <View style={styles.container}>
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
          <Text style={styles.subtitle}>Escoge tu humor actual</Text>
        </LinearGradient>

        {/* Contenedor de caritas */}
        <View style={styles.facesContainer}>
          {['Feliz', 'Triste', 'Enojado', 'Neutral'].map((emotion, index) => (
            <TouchableOpacity 
              key={emotion}
              style={[
                styles.faceButton,
                selectedEmotion === emotion && styles.selectedFace
              ]}
              onPress={() => handleEmotionSelect(emotion)}
            >
              <HappyFace size={width * 0.2} />
            </TouchableOpacity>
          ))}
        </View>

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
        colors={['rgba(255,255,255,0)', '#76B3E5']}
        locations={[0, 0.7]}
        style={styles.bottomGradient}
      />

      {/* Flecha animada */}
      <Animated.View style={[styles.arrow, { transform: [{ translateY }] }]}>
        <MaterialCommunityIcons
          name="arrow-down"
          size={40}
          color="#76B3E5"
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    alignItems: 'center',
    paddingTop: height * 0.05,
  },
  logo: {
    width: width * 0.5,
    height: width * 0.40
  },
  content: {
    flex: 1,
    marginTop: height * 0.03,
  },
  card: {
    backgroundColor: '#76B3E5',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 25,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 24,
    color: 'white',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
  },
  facesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginVertical: 30,
  },
  faceButton: {
    margin: 15,
    padding: 10,
    borderRadius: 50,
  },
  selectedFace: {
    backgroundColor: 'rgba(118, 179, 229, 0.2)',
  },
  divider: {
    alignItems: 'center',
    marginVertical: 25,
  },
  dashLine: {
    width: '80%',
    borderBottomWidth: 2,
    borderColor: '#76B3E5',
    borderStyle: 'dashed',
  },
  description: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#6184A7',
    textAlign: 'center',
    lineHeight: 24,
    marginHorizontal: 25,
  },
  bottomGradient: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: height * 0.3,
    zIndex: -1,
  },
  arrow: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
  },
});

export default EstadoDeAnimoScreen;