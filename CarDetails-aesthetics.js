import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Modal, Animated } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { carData } from './carData';

export default function Aesthetics() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '', 
    transmission: '',
    variant: '',
  });
  const [errors, setErrors] = useState({});
  
  // Add these states for modal
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [currentOptions, setCurrentOptions] = useState([]);
  const slideAnim = useState(new Animated.Value(400))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.brand) tempErrors.brand = 'Brand is required';
    if (!formData.model) tempErrors.model = 'Model is required';
    if (!formData.year) {
      tempErrors.year = 'Year is required';
    } else if (!/^\d{4}$/.test(formData.year)) {
      tempErrors.year = 'Enter a valid year';
    }
    if (!formData.transmission) {
      tempErrors.transmission = 'Transmission type is required';
    }
    if (!formData.variant) {
      tempErrors.variant = 'Variant is required';
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigation.navigate('aesthetics', { carData: formData });
    }
  };

  // Add openPicker function
  const openPicker = (field) => {
    let options = [];
    
    switch(field) {
      case 'brand':
        options = Object.keys(carData).map(brand => ({
          label: brand,
          value: brand
        }));
        break;
      case 'model':
        if (!formData.brand) {
          alert('Please select a brand first');
          return;
        }
        options = Object.keys(carData[formData.brand]).map(model => ({
          label: model,
          value: model
        }));
        break;
      case 'year':
        if (!formData.model) {
          alert('Please select a model first');
          return;
        }
        options = Object.keys(carData[formData.brand][formData.model]).map(year => ({
          label: year,
          value: year
        }));
        break;
      case 'transmission':
        options = [
          { label: 'Manual', value: 'Manual' },
          { label: 'Automatic', value: 'Automatic' }
        ];
        break;
      case 'variant':
        if (!formData.year) {
          alert('Please select a year first');
          return;
        }
        options = carData[formData.brand][formData.model][formData.year].map(variant => ({
          label: variant,
          value: variant
        }));
        break;
    }

    setCurrentField(field);
    setCurrentOptions(options);
    setModalVisible(true);

    // Animate modal
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  // Add closeModal function
  const closeModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setModalVisible(false);
    });
  };

  // Add handleOptionSelect function
  const handleOptionSelect = (value) => {
    setFormData(prev => ({ ...prev, [currentField]: value }));
    closeModal();
  };

  // Add the getFieldDisplayValue helper function
  const getFieldDisplayValue = (field) => {
    if (formData[field]) return formData[field];
    
    switch(field) {
      case 'brand': return 'Select a brand';
      case 'model': return 'Select a model';
      case 'year': return 'Select year';
      case 'variant': return 'Select variant';
      case 'transmission': return 'Select transmission';
      default: return 'Select';
    }
  };

  return (
    <LinearGradient colors={['#0A0F1C', '#212F3C']} style={styles.gradient}>
      <KeyboardAvoidingView
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        {/* Title at the top */}
        <Text style={styles.title}>Car Aesthetic Details</Text>

        <ScrollView
          style={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.content}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Brand</Text>
              <TouchableOpacity 
                style={styles.customPicker}
                onPress={() => openPicker('brand')}
              >
                <Text style={[
                  styles.pickerText,
                  !formData.brand && styles.placeholderText
                ]}>
                  {getFieldDisplayValue('brand')}
                </Text>
                <View style={styles.pickerIcon}>
                  <Text style={styles.pickerIconText}>▼</Text>
                </View>
              </TouchableOpacity>
              {errors.brand && <Text style={styles.errorText}>{errors.brand}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Model</Text>
              <TouchableOpacity 
                style={styles.customPicker}
                onPress={() => openPicker('model')}
              >
                <Text style={[
                  styles.pickerText,
                  !formData.model && styles.placeholderText
                ]}>
                  {getFieldDisplayValue('model')}
                </Text>
                <View style={styles.pickerIcon}>
                  <Text style={styles.pickerIconText}>▼</Text>
                </View>
              </TouchableOpacity>
              {errors.model && <Text style={styles.errorText}>{errors.model}</Text>}
            </View>

            <View style={styles.inputContainer}>
              <Text style={styles.label}>Year</Text>
              <TouchableOpacity 
                style={styles.customPicker}
                onPress={() => openPicker('year')}
              >
                <Text style={[
                  styles.pickerText,
                  !formData.year && styles.placeholderText
                ]}>
                  {getFieldDisplayValue('year')}
                </Text>
                <View style={styles.pickerIcon}>
                  <Text style={styles.pickerIconText}>▼</Text>
                </View>
              </TouchableOpacity>
              {errors.year && <Text style={styles.errorText}>{errors.year}</Text>}
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Transmission</Text>
                <TouchableOpacity 
                  style={styles.customPicker}
                  onPress={() => openPicker('transmission')}
                >
                  <Text style={[
                    styles.pickerText,
                    !formData.transmission && styles.placeholderText
                  ]}>
                    {getFieldDisplayValue('transmission')}
                  </Text>
                  <View style={styles.pickerIcon}>
                    <Text style={styles.pickerIconText}>▼</Text>
                  </View>
                </TouchableOpacity>
              </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Variant (Engine Size)</Text>
              <TouchableOpacity 
                style={styles.customPicker}
                onPress={() => openPicker('variant')}
              >
                <Text style={[
                  styles.pickerText,
                  !formData.variant && styles.placeholderText
                ]}>
                  {getFieldDisplayValue('variant')}
                </Text>
                <View style={styles.pickerIcon}>
                  <Text style={styles.pickerIconText}>▼</Text>
                </View>
              </TouchableOpacity>
              {errors.variant && <Text style={styles.errorText}>{errors.variant}</Text>}
            </View>
          </View>
        </ScrollView>

        {/* Modal Component */}
        <Modal
          visible={modalVisible}
          transparent={true}
          animationType="none"
          onRequestClose={closeModal}
        >
          <TouchableOpacity
            style={styles.modalOverlay}
            activeOpacity={1}
            onPress={closeModal}
          >
            <Animated.View
              style={[
                styles.modalContent,
                {
                  transform: [{ translateY: slideAnim }],
                  opacity: fadeAnim,
                },
              ]}
            >
              <View style={styles.modalHeader}>
                <Text style={styles.modalTitle}>Select {currentField}</Text>
                <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
              <ScrollView style={styles.optionsList}>
                {currentOptions.map((option, index) => (
                  <TouchableOpacity
                    key={option.value}
                    style={[
                      styles.optionItem,
                      index === currentOptions.length - 1 && styles.lastOption,
                      formData[currentField] === option.value && styles.selectedOption,
                    ]}
                    onPress={() => handleOptionSelect(option.value)}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        formData[currentField] === option.value && styles.selectedOptionText,
                      ]}
                    >
                      {option.label}
                    </Text>
                    {formData[currentField] === option.value && (
                      <Text style={styles.checkmark}>✓</Text>
                    )}
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </Animated.View>
          </TouchableOpacity>
        </Modal>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Get Modifications</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 80,
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    color: '#FFFFFF',
    marginTop: 10,
    marginBottom: 8,
    fontSize: 16,
    fontFamily: 'Jura-Medium',
  },
  customPicker: {
    backgroundColor: '#FFFFFF15',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#444',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 48,
    paddingHorizontal: 12,
  },
  disabledPicker: {
    opacity: 0.6,
    backgroundColor: '#FFFFFF08',
    borderColor: '#333',
  },
  pickerText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  placeholderText: {
    color: '#AAAAAA',
  },
  disabledText: {
    color: '#777777',
  },
  pickerIcon: {
    padding: 4,
  },
  pickerIconText: {
    color: '#FFFFFF',
    fontSize: 12,
  },
  bottomButtons: {
    padding: 20,
  },
  submitButton: {
    backgroundColor: '#FF6B00',
    padding: 16,
    borderRadius: 8,
    marginBottom: 50,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  errorText: {
    color: '#FF4444',
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#212F3C',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 10,
  },
  closeButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
  },
  optionsList: {
    maxHeight: 300,
  },
  optionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#444',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  selectedOption: {
    backgroundColor: '#FFFFFF15',
  },
  optionText: {
    color: '#FFFFFF',
  },
  selectedOptionText: {
    fontWeight: 'bold',
  },
  checkmark: {
    color: '#FF6B00',
    marginLeft: 10,
  },
});
