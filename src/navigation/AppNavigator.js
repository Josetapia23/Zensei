import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';

// Importamos todas las pantallas
import HomeScreen from '../screens/HomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import RespiracionesScreen from '../screens/RespiracionesScreen';
import CronoetroScreen from '../screens/CronoetroScreen';
import EstadoDeAnimoScreen from '../screens/EstadoDeAnimoScreen';
import ConectarBuddyScreen from '../screens/ConectarBuddyScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  useEffect(() => {
    const backAction = () => {
      BackHandler.exitApp();
      return true;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="Splash"
        screenOptions={({ route }) => ({
          headerShown: false,
          // Aplicamos la animación vertical para todas las pantallas excepto Cronometro y ConectarBuddy
          cardStyleInterpolator: ({ current, layouts }) => {
            // Estas pantallas usarán animación horizontal (izquierda/derecha)
            if (route.name === 'CronoetroScreen' || route.name === 'ConectarBuddy') {
              return {
                cardStyle: {
                  transform: [
                    {
                      translateX: current.progress.interpolate({
                        inputRange: [0, 1],
                        outputRange: [layouts.screen.width, 0],
                      }),
                    },
                  ],
                },
              };
            }
            // Las demás pantallas usarán animación vertical (arriba/abajo)
            return {
              cardStyle: {
                transform: [
                  {
                    translateY: current.progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [layouts.screen.height, 0],
                    }),
                  },
                ],
              },
            };
          },
        })}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Respiraciones" component={RespiracionesScreen} />
        <Stack.Screen name="CronoetroScreen" component={CronoetroScreen} />
        <Stack.Screen name="Estado" component={EstadoDeAnimoScreen} />
        <Stack.Screen name="ConectarBuddy" component={ConectarBuddyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;