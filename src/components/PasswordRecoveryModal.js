import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import InputField from './inputs/InputField';

const PasswordRecoveryModal = ({ visible, onClose }) => {
  const [email, setEmail] = useState('');
  const [emailSent, setEmailSent] = useState(false);

  const handleSendEmail = () => {
    // Lógica para enviar el correo (la implementarás después)
    console.log('Enviando correo a:', email);
    setEmailSent(true);
    setTimeout(() => {
      setEmailSent(false);
      onClose();
    }, 3000);
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'rgba(0,0,0,0.7)']}
          style={styles.modalOverlay}
        >
          <View style={styles.modalContent}>
            {!emailSent ? (
              <>
                <Text style={styles.title}>Recuperar Contraseña</Text>
                <Text style={styles.subtitle}>
                  Ingresa tu correo electrónico para restablecer tu contraseña
                </Text>

                <InputField
                  label="Correo electrónico"
                  placeholder="Zen@correo.com"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />

                <TouchableOpacity 
                  style={styles.button} 
                  onPress={handleSendEmail}
                >
                  <LinearGradient
                    colors={['#76B3E5', '#D0E1F3']}
                    style={styles.buttonGradient}
                  >
                    <Text style={styles.buttonText}>Enviar correo</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </>
            ) : (
              <View style={styles.successContainer}>
                <Text style={styles.successText}>¡Correo enviado!</Text>
                <Text style={styles.successSubtext}>
                  Revisa tu bandeja de entrada para continuar
                </Text>
              </View>
            )}

            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={onClose}
            >
              <Text style={styles.closeText}>Volver al login</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalOverlay: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    width: '85%',
    elevation: 5,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2E5984',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  button: {
    marginTop: 15,
    borderRadius: 30,
    overflow: 'hidden',
  },
  buttonGradient: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  successContainer: {
    alignItems: 'center',
    paddingVertical: 15,
  },
  successText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E5984',
    marginBottom: 10,
  },
  successSubtext: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 15,
  },
  closeText: {
    color: '#76B3E5',
    fontSize: 14,
    textDecorationLine: 'underline',
  },
});

export default PasswordRecoveryModal;