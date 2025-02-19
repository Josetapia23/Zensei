import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Animated } from 'react-native';
import * as Font from 'expo-font';

export default function SplashScreen({ onFinish }) {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const fadeAnim = new Animated.Value(0);
  const textTop = "Zen";
  const textBottom = "sei";

  // Cargar fuente personalizada
  useEffect(() => {
    async function loadFonts() {
      await Font.loadAsync({
        'TheLastShuriken': require('../../src/assets/fonts/theLastShuriken.ttf'),
      });
      setFontsLoaded(true);
    }
    loadFonts();
  }, []);

  useEffect(() => {
    if (fontsLoaded) {
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 2000,
        useNativeDriver: true,
      }).start(() => {
        setTimeout(() => {
          onFinish();
        }, 1500);
      });
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.container}>
      {/* Logo Carita al lado derecho */}
      <View style={styles.logoWithText}>
        <View style={styles.textGroup}>
          {/* Texto superior (ZEN) */}
          <View style={styles.textContainer}>
            {textTop.split("").map((letter, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.letter,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {letter}
              </Animated.Text>
            ))}
          </View>

          {/* Texto inferior (SEI) */}
          <View style={styles.textContainer}>
            {textBottom.split("").map((letter, index) => (
              <Animated.Text
                key={index}
                style={[
                  styles.letter,
                  {
                    opacity: fadeAnim,
                    transform: [
                      {
                        translateY: fadeAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [20, 0],
                        }),
                      },
                    ],
                  },
                ]}
              >
                {letter}
              </Animated.Text>
            ))}
          </View>
        </View>

        {/* Logo Carita alineada a la derecha */}
        <Animated.Image
          source={require('../../src/assets/images/caritaZenseiLogo.png')}
          style={[
            styles.logoFace,
            {
              opacity: fadeAnim,
              transform: [
                {
                  scale: fadeAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0.5, 1],
                  }),
                },
              ],
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#76B3E5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoWithText: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textGroup: {
    flexDirection: 'column',
    marginRight: 10,
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  letter: {
    fontSize: 64,
    color: '#fff',
    fontFamily: 'TheLastShuriken',
    marginHorizontal: 5,
  },
  logoFace: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
});
