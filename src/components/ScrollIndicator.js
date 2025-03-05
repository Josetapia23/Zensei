import React from 'react';
import { TouchableOpacity, View, StyleSheet, Dimensions, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

const ScrollIndicator = () => {
  const navigation = useNavigation();
  const scaleValue = React.useRef(new Animated.Value(1)).current;

  const handlePress = () => {
    Animated.sequence([
      Animated.timing(scaleValue, {
        toValue: 0.8,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleValue, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      navigation.navigate('estado');
    });
  };

  return (
    <TouchableOpacity 
      style={styles.container}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <Animated.View style={[styles.circle, { 
        transform: [{ scale: scaleValue }] 
      }]}>
        <View style={styles.arrow} />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: height * 0.05, // 5% desde la parte inferior
    alignSelf: 'center', // Centrado horizontal
    zIndex: 2
  },
  circle: {
    width: width * 0.2, // 20% del ancho de pantalla
    height: width * 0.2, // Mantener relación 1:1
    borderRadius: width * 0.1, // Mitad del ancho para círculo perfecto
    backgroundColor: '#6184A7',
    borderWidth: 7,
    borderColor: '#D0E1F3',
    justifyContent: 'center',
    alignItems: 'center'
  },
  arrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: width * 0.03, // 3% del ancho
    borderRightWidth: width * 0.03, // 3% del ancho
    borderBottomWidth: width * 0.05, // 5% del ancho
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: '#FFFFFF',
    transform: [{ rotate: '180deg' }], // Flecha hacia abajo
    marginTop: height * 0.005 // Pequeño ajuste de posición
  }
});

export default ScrollIndicator;