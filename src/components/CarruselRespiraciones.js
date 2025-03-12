import React from 'react';
import { View, Text, StyleSheet, Dimensions, FlatList } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Concentrarse from './respiraciones/Concentrarse';
import PromoverCreatividad from './respiraciones/PromoverCreatividad';
import PrepararseAreunion from './respiraciones/PrepararseAreunion';
import Dormir from './respiraciones/Dormir';
import ManejarEstres from './respiraciones/ManejarEstres ';
import ReducirAnsiedad from './respiraciones/ReducirAnsiedad';

const { width } = Dimensions.get('window');

const CarruselRespiraciones = () => {
  const respiraciones = [
    {
      title: 'Concentrarse',
      duration: '4-4-4-4',
      Component: Concentrarse
    },
    {
      title: 'Promover Creatividad',
      duration: '5-5-5-5',
      Component: PromoverCreatividad
    },
    {
      title: 'Prepararse para una reunión',
      duration: '3-3-3-3',
      Component: PrepararseAreunion
    },
    {
      title: 'Manejar el estrés',
      duration: '6-6-6-6',
      Component: ManejarEstres
    },
    {
      title: 'Dormir',
      duration: '4-7-8',
      Component: Dormir
    },
    {
      title: 'Reducir la ansiedad',
      duration: '4-7-8',
      Component: ReducirAnsiedad
    }
  ];

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <LinearGradient
        colors={['rgba(255,255,255,0.15)', 'rgba(255,255,255,0.53)']}
        style={styles.cardGradient}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
      >
        <View style={styles.cardContent}>
          <item.Component width={width * 0.3} height={width * 0.35} />
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
      </LinearGradient>
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={respiraciones}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToAlignment="center"
        decelerationRate="fast"
        snapToInterval={width * 0.6}
        pagingEnabled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
  },
  card: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 286,
    width: width * 0.6,
    marginHorizontal: 10,
  },
  cardGradient: {
    flex: 1,
    padding: 2,
  },
  cardContent: {
    flex: 1,
    backgroundColor: 'rgba(118, 179, 229, 0.3)',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontFamily: 'Inter-Bold',
    fontSize: 20,
    color: 'white',
    marginTop: 15,
    textAlign: 'center',
    letterSpacing: -0.11,
  },
  duration: {
    fontFamily: 'Inter-Medium',
    fontSize: 18,
    color: 'white',
    marginTop: 5,
  },
});

export default CarruselRespiraciones;