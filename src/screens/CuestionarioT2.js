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

export default function CuestionarioT2({ navigation }) {
  // Estados para las preguntas
  const [selected, setSelected] = useState({
    t1: false,
    t2: false,
    t3: false,
    t4: false,
    t5: false,
    t6: false,
    t7: false,
    t8: false,
    t9: false,
    t10: false,
    t11: false,
    t12: false
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
    { key: 't1', text: 'Estoy muy disperso, tengo la cabeza llena de cosas' },
    { key: 't2', text: 'Mi mente va a mil con todas estas cosas por hacer' },
    { key: 't3', text: 'Tengo la mente tan revolucionada, no se qué hacer para calmarme cuando termino de trabajar' },
    { key: 't4', text: 'Quiero estar más tranquilo, menos nervioso antes de una reunión o entrevista de trabajo' },
    { key: 't5', text: 'Siento que mi mente está siempre activa, incluso cuando intento dormir' },
    { key: 't6', text: 'Quiero mejorar mi rendimiento en el trabajo o estudios' },
    { key: 't7', text: 'Me siento agotado y cansado frecuentemente' },
    { key: 't8', text: 'Al finalizar el día no tengo fuerzas para hacer las cosas que me gustan' },
    { key: 't9', text: 'Necesito técnicas para controlar mi respiración cuando estoy nervioso' },
    { key: 't10', text: 'Me gustaría aprender a relajarme de forma natural' },
    { key: 't11', text: 'Tengo dificultades para concentrarme en una sola tarea' },
    { key: 't12', text: 'Busco formas de manejar mejor el estrés diario' }
  ];

  // Diagnóstico basado en las respuestas
  const diagnose = () => {
    const selectedCount = Object.values(selected).filter(value => value).length;
    
    if (selectedCount >= 4) {
      alert(`Le recomendamos hacer la respiración "Abeja" que le ayudará a calmar la mente y la puede encontrar en la opción "Calmar la mente"`);
      navigation.navigate('Respiraciones');
    } else if (selectedCount === 0) {
      alert(`Verifique sus respuestas`);
    } else if (selectedCount >= 1 && selectedCount <= 3) {
      alert(`Vamos a revisar un último conjunto de preguntas para encontrar la respiración ideal para usted`);
      navigation.navigate('CuestionarioFinal');
    } else {
      navigation.navigate('CuestionarioFinal');
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
            
            <Text style={styles.title}>¿Aún no te identicas con nada?</Text>
            <Text style={styles.subtitle}>Prueba con estás</Text>
            
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