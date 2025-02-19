import React, { useState } from 'react';
import { View, Text } from 'react-native';
import SplashScreen from './src/screens/SplashScreen';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleFinish = () => {
    setIsLoading(false);
  };

  return (
    <View style={{ flex: 1 }}>
      {isLoading ? (
        <SplashScreen onFinish={handleFinish} />
      ) : (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Text>Bienvenido a Zensei</Text>
        </View>
      )}
    </View>
  );
}
