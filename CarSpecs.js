import { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  KeyboardAvoidingView, 
  Platform,
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export default function CarSpecs({ route, navigation }) {
  const { carDetails } = route.params || {};
  const [formData, setFormData] = useState({
    hp: '',
    torque: '',
    installedParts: ''
  });
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    let tempErrors = {};
    
    if (!formData.hp) {
      tempErrors.hp = 'HP is required';
    } else if (isNaN(formData.hp) || formData.hp <= 0) {
      tempErrors.hp = 'Enter valid horsepower';
    }
    
    if (!formData.torque) {
      tempErrors.torque = 'Torque is required';
    } else if (isNaN(formData.torque) || formData.torque <= 0) {
      tempErrors.torque = 'Enter valid torque';
    }
    
    if (!formData.installedParts) {
      tempErrors.installedParts = 'Please list installed parts';
    }
    
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Combine carDetails from previous screen with current formData
      const combinedData = {
        ...carDetails,  // Car details from previous screen (brand, model, year, etc.)
        ...formData,    // Current specs (hp, torque, installedParts)
      };

      console.log('Combined data:', combinedData);
      navigation.navigate('Performance', { carDetails: combinedData });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#0A0F1C', '#212F3C']} style={styles.gradientBackground}>
        <KeyboardAvoidingView style={styles.keyboardAvoidingView} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <ScrollView style={styles.scrollContent} keyboardShouldPersistTaps="handled">
              <View style={styles.container}>
                <Text style={styles.title}>Modifications</Text>
                <View style={styles.content}>
                  {/* Display selected car details */}
                  <View style={styles.selectedCarInfo}>
                    <Text style={styles.carInfoText}>
                      {carDetails?.brand} {carDetails?.model} {carDetails?.year}
                    </Text>
                    <Text style={styles.carInfoText}>
                      {carDetails?.variant}L {carDetails?.transmission}
                    </Text>
                  </View>

                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>HP</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="HP"
                      placeholderTextColor="#8E8E93"
                      keyboardType="numeric"
                      value={formData.hp}
                      onChangeText={(text) => setFormData({...formData, hp: text})}
                    />
                    {errors.hp && <Text style={styles.errorText}>{errors.hp}</Text>}
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Torque</Text>
                    <TextInput
                      style={styles.input}
                      placeholder="Torque (Nm)"
                      placeholderTextColor="#8E8E93"
                      keyboardType="numeric"
                      value={formData.torque}
                      onChangeText={(text) => setFormData({...formData, torque: text})}
                    />
                    {errors.torque && <Text style={styles.errorText}>{errors.torque}</Text>}
                  </View>
                  
                  <View style={styles.inputContainer}>
                    <Text style={styles.label}>Name the parts installed in your car</Text>
                    <TextInput
                      style={[styles.input, styles.textArea]}
                      placeholder="Write description about installed parts"
                      placeholderTextColor="#8E8E93"
                      multiline={true}
                      numberOfLines={4}
                      value={formData.installedParts}
                      onChangeText={(text) => setFormData({...formData, installedParts: text})}
                    />
                    {errors.installedParts && <Text style={styles.errorText}>{errors.installedParts}</Text>}
                  </View>
                </View>
              </View>
            </ScrollView>
          </TouchableWithoutFeedback>
          
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
              <Text style={styles.buttonText}>Get Modifications</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  gradientBackground: { flex: 1 },
  title: {
    fontSize: 28,
    color: '#fff',
    fontFamily: 'Jura-Bold',
    fontWeight: 'bold',
    paddingHorizontal: 20,
    marginTop: 50,
    marginBottom: 20,
    textAlign: 'center',
  },
  scrollContent: { flex: 1 },
  content: { padding: 20, paddingBottom: 120 },
  inputContainer: { marginBottom: 20 },
  label: { color: '#fff', marginBottom: 8, fontFamily: 'Jura-Medium' },
  input: {
    backgroundColor: '#ffffff15',
    borderRadius: 12,
    padding: 12,
    color: '#fff',
    fontFamily: 'Jura-Regular',
  },
  textArea: { height: 100, textAlignVertical: 'top' },
  submitButton: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontSize: 16, fontFamily: 'Jura-Medium' },
  errorText: { color: '#FF4444', fontSize: 12, fontFamily: 'Jura-Regular', marginTop: 4 },
  keyboardAvoidingView: { flex: 1, justifyContent: 'space-between' },
  buttonContainer: { paddingHorizontal: 20, paddingBottom: 60 },
  selectedCarInfo: {
    backgroundColor: '#ffffff15',
    padding: 15,
    borderRadius: 8,
    marginBottom: 20,
  },
  carInfoText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Jura-Medium',
    marginBottom: 4,
  },
});
