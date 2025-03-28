import React from 'react';
import { View, TextInput, StyleSheet, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const InputField = ({ 
  label, 
  placeholder, 
  secureTextEntry, 
  value, 
  onChangeText, 
  error, 
  keyboardType = 'default', 
  ...rest 
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <LinearGradient
        colors={['#D0E1F3', '#76B3E5']}
        style={styles.gradientBorder}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
      >
        <TextInput
          style={[styles.input, error && styles.inputError]}
          placeholder={placeholder}
          placeholderTextColor="#84B1E0"
          secureTextEntry={secureTextEntry}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          {...rest}
        />
      </LinearGradient>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    width: '100%',
  },
  label: {
    color: '#76B3E5',
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  gradientBorder: {
    borderRadius: 15,
    padding: 2,
  },
  input: {
    backgroundColor: '#FFF',
    borderRadius: 13,
    padding: 15,
    fontSize: 16,
    color: '#1E4673',
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});

export default InputField;