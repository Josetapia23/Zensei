import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  SafeAreaView, 
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Image
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

export default function CuestionarioFinal({ navigation }) {
  // Estados para las preguntas
  const [selected, setSelected] = useState({
    f1: false,
    f2: false,
    f3: false,
    f4: false,
    f5: false,
    f6: false,
    f7: false,
    f8: false,
    f9: false,
    f10: false,
    f11: false,
    f12: false
  });

  // Función para cambiar estado
  const toggleSelection = (key) => {
    setSelected(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Preguntas del cuestionario
  const questions = [
    { key: 'f1', text: 'Quiero mejorar mi rendimiento' },
    { key: 'f2', text: 'Me siento agotado y cansado' },
    { key: 'f3', text: 'Al finalizar el día no tengo fuerzas para hacer las cosas que me gustan' },
    { key: 'f4', text: 'Mi hijo hace unas pataletas terribles, se tira al piso y llora por mucho tiempo' },
    { key: 'f5', text: 'Necesito más energía durante el día' },
    { key: 'f6', text: 'Busco formas de incrementar mi creatividad' },
    { key: 'f7', text: 'Quiero ayudar a mis hijos a gestionar mejor sus emociones' },
    { key: 'f8', text: 'Necesito técnicas para enseñar a los niños a calmarse' },
    { key: 'f9', text: 'Me gustaría mejorar mi capacidad de concentración' },
    { key: 'f10', text: 'Busco formas de revitalizarme naturalmente' },
    { key: 'f11', text: 'Necesito técnicas para relajarme rápidamente en momentos de tensión' },
    { key: 'f12', text: 'Quiero aprender a gestionar mejor mi energía a lo largo del día' }
  ];

  // Diagnóstico basado en las respuestas
  const diagnose = () => {
    // Contar respuestas por categoría
    let contEnergia = 0;
    let contNinos = 0;
    let contRelax = 0;
    
    // Categorización de preguntas
    if(selected.f1) contEnergia++;
    if(selected.f2) contEnergia++;
    if(selected.f3) contEnergia++;
    if(selected.f5) contEnergia++;
    if(selected.f6) contEnergia++;
    if(selected.f10) contEnergia++;
    if(selected.f12) contEnergia++;
    
    if(selected.f4) contNinos++;
    if(selected.f7) contNinos++;
    if(selected.f8) contNinos++;
    
    if(selected.f9) contRelax++;
    if(selected.f11) contRelax++;
    
    const selectedCount = Object.values(selected).filter(value => value).length;
    
    if(selectedCount === 0) {
      alert(`Verifique sus respuestas`);
    } else if(contEnergia >= 3) {
      alert(`Le recomendamos hacer la respiración tipo "Fuelle" la cual puede encontrar en la opción "Incrementar energia y estimular creatividad"`);
      navigation.navigate('Respiraciones');
    } else if(contNinos >= 2) {
      alert(`Le recomendamos hacer la respiración "Niños" la cual puede encontrar en la opción "Enseñar a mi hijo a calmarse"`);
      navigation.navigate('Respiraciones');
    } else if(contRelax >= 1) {
      alert(`Le recomendamos hacer la respiración "20 40 40" que la puede encontrar en la opción "Reducir la ansiedad"`);
      navigation.navigate('Respiraciones');
    } else {
      alert(`Recomendamos probar la respiración "Abeja" para calmar la mente que puede encontrar en "Calmar la mente"`);
      navigation.navigate('Respiraciones');
    }
  };

  // Renderizar un ítem del cuestionario
  const renderQuestionItem = (item, index) => {
    const isSelected = selected[item.key];
    
    return (
      <TouchableOpacity 
        key={item.key}
        style={styles.questionItem}
        onPress={() => toggleSelection(item.key)}
        activeOpacity={0.8}
      >
        <LinearGradient
          colors={isSelected ? ['#DEF1FF', '#76B3E5'] : ['#FFFFFF', '#F5F5F5']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.questionGradient}
        >
          <View style={styles.questionContent}>
            <Text style={[styles.questionText, isSelected && styles.selectedText]}>
              {item.text}
            </Text>
            <View style={[
              styles.selector, 
              isSelected && styles.selectedSelector
            ]}>
              {isSelected && <View style={styles.selectedDot} />}
            </View>
          </View>
        </LinearGradient>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../assets/images/fondohome.png')}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.95)', 'rgba(255, 255, 255, 0.8)']}
          style={styles.overlay}
        >
          <SafeAreaView style={styles.safeArea}>
            <View style={styles.logoContainer}>
              <Image
                source={require('../assets/images/logoZenseiAzul.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </View>
            
            <Text style={styles.title}>Última etapa de diagnóstico</Text>
            <Text style={styles.subtitle}>Selecciona lo que más te identifica</Text>
            
            <ScrollView 
              style={styles.scrollView}
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
            >
              <View style={styles.questionsContainer}>
                {questions.map((item, index) => renderQuestionItem(item, index))}
              </View>
              
              <TouchableOpacity 
                style={styles.button}
                onPress={diagnose}
                activeOpacity={0.8}
              >
                <LinearGradient
                  colors={['#76B3E5', '#3B89C4']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                  style={styles.buttonGradient}
                >
                  <Text style={styles.buttonText}>Diagnósticar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </ScrollView>
          </SafeAreaView>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
    alignItems: 'center',
  },
  logoContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#76B3E5',
    marginTop: 20,
    fontFamily: 'Inter-Bold',
  },
  subtitle: {
    fontSize: 18,
    color: '#76B3E5',
    marginTop: 5,
    marginBottom: 20,
    fontFamily: 'Inter-Medium',
  },
  scrollView: {
    width: '100%',
    paddingHorizontal: 20,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  questionsContainer: {
    width: '100%',
  },
  questionItem: {
    width: '100%',
    marginBottom: 15,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  questionGradient: {
    borderRadius: 15,
    padding: 16,
  },
  questionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 16,
    color: '#555555',
    flex: 1,
    paddingRight: 10,
    fontFamily: 'Inter-Medium',
  },
  selectedText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  selector: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#76B3E5',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedSelector: {
    borderColor: '#FFFFFF',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  selectedDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#FFFFFF',
  },
  button: {
    width: '60%',
    height: 50,
    borderRadius: 25,
    alignSelf: 'center',
    marginTop: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  buttonGradient: {
    width: '100%',
    height: '100%',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'Inter-Bold',
  }
});