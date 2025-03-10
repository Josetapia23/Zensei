import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { BackHandler } from 'react-native';
import { useEffect } from 'react';

// Importar pantallas
import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import HomeScreen from '../screens/HomeScreen';
import EstadoDeAnimoScreen from '../screens/EstadoDeAnimoScreen';
import RespiracionesScreen from '../screens/RespiracionesScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
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
        screenOptions={{
          headerShown: false,
          cardStyleInterpolator: ({ current, layouts }) => ({
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
          }),
        }}
        initialRouteName="Splash"
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Estado" component={EstadoDeAnimoScreen} />
        <Stack.Screen name="Respiraciones" component={RespiracionesScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}