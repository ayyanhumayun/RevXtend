import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView, Animated, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import RNPickerSelect from 'react-native-picker-select';
import { carData } from './carData';

export default function CarDetailForm() {
  const navigation = useNavigation();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    year: '',
    transmission: '',
    variant: '',
  });
  const [errors, setErrors] = useState({});

  // State for dropdown options
  const [availableModels, setAvailableModels] = useState([]);
  const [availableYears, setAvailableYears] = useState([]);
  const [availableVariants, setAvailableVariants] = useState([]);
  
  // Animation and modal states
  const [modalVisible, setModalVisible] = useState(false);
  const [currentField, setCurrentField] = useState('');
  const [currentOptions, setCurrentOptions] = useState([]);
  const slideAnim = useState(new Animated.Value(400))[0];
  const fadeAnim = useState(new Animated.Value(0))[0];

  // Get all unique brands
  const brands = Object.keys(carData).map(brand => ({
    label: brand,
    value: brand
  }));

  // Update available models when brand changes
  useEffect(() => {
    if (formData.brand) {
      const models = Object.keys(carData[formData.brand]).map(model => ({
        label: model,
        value: model
      }));
      setAvailableModels(models);
      setFormData(prev => ({ ...prev, model: '', year: '', variant: '' }));
    }
  }, [formData.brand]);

  // Update available years when model changes
  useEffect(() => {
    if (formData.brand && formData.model) {
      const years = Object.keys(carData[formData.brand][formData.model]).map(year => ({
        label: year,
        value: year
      }));
      setAvailableYears(years);
      setFormData(prev => ({ ...prev, year: '', variant: '' }));
    }
  }, [formData.model]);

  // Update available variants when year changes
  useEffect(() => {
    if (formData.brand && formData.model && formData.year) {
      const variants = carData[formData.brand][formData.model][formData.year].map(variant => ({
        label: variant,
        value: variant
      }));
      setAvailableVariants(variants);
      setFormData(prev => ({ ...prev, variant: '' }));
    }
  }, [formData.year]);

  const validateForm = () => {
    let tempErrors = {};
    if (!formData.brand) tempErrors.brand = 'Brand is required';
    if (!formData.model) tempErrors.model = 'Model is required';
    if (!formData.year) tempErrors.year = 'Year is required';
    if (!formData.transmission) tempErrors.transmission = 'Transmission type is required';
    if (!formData.variant) tempErrors.variant = 'Variant is required';
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleContinue = () => {
    if (validateForm()) {
      navigation.navigate('Performance', { carData: formData });
    }
  };

  // Open custom picker modal
  const openPicker = (field) => {
    let options = [];
    let title = '';
    
    switch(field) {
      case 'brand':
        options = brands;
        title = 'Select a brand';
        break;
      case 'model':
        if (!formData.brand) {
          setErrors({...errors, model: 'Please select a brand first'});
          return;
        }
        options = availableModels;
        title = 'Select a model';
        break;
      case 'year':
        if (!formData.model) {
          setErrors({...errors, year: 'Please select a model first'});
          return;
        }
        options = availableYears;
        title = 'Select year';
        break;
      case 'variant':
        if (!formData.year) {
          setErrors({...errors, variant: 'Please select a year first'});
          return;
        }
        options = availableVariants;
        title = 'Select variant';
        break;
      case 'transmission':
        options = [
          { label: 'Manual', value: 'Manual' },
          { label: 'Automatic', value: 'Automatic' }
        ];
        title = 'Select transmission';
        break;
    }
    
    setCurrentField(field);
    setCurrentOptions(options);
    setModalVisible(true);
    
    // Start animations
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
      })
    ]).start();
  };

  // Close modal and reset animations
  const closePicker = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 400,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      })
    ]).start(() => {
      setModalVisible(false);
    });
  };

  // Handle option selection
  const handleSelect = (value) => {
    setFormData({...formData, [currentField]: value});
    closePicker();
  };

  // Field display helper
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
        <Text style={styles.title}>Car Details</Text>

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
                style={[
                  styles.customPicker,
                  !formData.brand && styles.disabledPicker
                ]}
                onPress={() => openPicker('model')}
                disabled={!formData.brand}
              >
                <Text style={[
                  styles.pickerText,
                  !formData.model && styles.placeholderText,
                  !formData.brand && styles.disabledText
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
                style={[
                  styles.customPicker,
                  !formData.model && styles.disabledPicker
                ]}
                onPress={() => openPicker('year')}
                disabled={!formData.model}
              >
                <Text style={[
                  styles.pickerText,
                  !formData.year && styles.placeholderText,
                  !formData.model && styles.disabledText
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
              <Text style={styles.label}>Variant (Engine Size)</Text>
              <TouchableOpacity 
                style={[
                  styles.customPicker,
                  !formData.year && styles.disabledPicker
                ]}
                onPress={() => openPicker('variant')}
                disabled={!formData.year}
              >
                <Text style={[
                  styles.pickerText,
                  !formData.variant && styles.placeholderText,
                  !formData.year && styles.disabledText
                ]}>
                  {getFieldDisplayValue('variant')}
                </Text>
                <View style={styles.pickerIcon}>
                  <Text style={styles.pickerIconText}>▼</Text>
                </View>
              </TouchableOpacity>
              {errors.variant && <Text style={styles.errorText}>{errors.variant}</Text>}
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
              {errors.transmission && <Text style={styles.errorText}>{errors.transmission}</Text>}
            </View>
          </View>
        </ScrollView>

        <View style={styles.bottomButtons}>
          <TouchableOpacity
            style={styles.submitButton}
            onPress={handleContinue}
          >
            <Text style={styles.buttonText}>Get Modifications</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Custom Dropdown Modal */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="none"
        onRequestClose={closePicker}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={closePicker}
        >
          <Animated.View
            style={[
              styles.modalBackground,
              {
                opacity: fadeAnim
              }
            ]}
          />

          <Animated.View
            style={[
              styles.modalContainer,
              {
                transform: [
                  { translateY: slideAnim }
                ]
              }
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select {currentField}</Text>
              <TouchableOpacity onPress={closePicker} style={styles.closeButton}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>
            
            <ScrollView style={styles.optionsList}>
              {currentOptions.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.optionItem,
                    formData[currentField] === option.value && styles.selectedOption,
                    index === currentOptions.length - 1 && styles.lastOption
                  ]}
                  onPress={() => handleSelect(option.value)}
                >
                  <Text style={[
                    styles.optionText,
                    formData[currentField] === option.value && styles.selectedOptionText
                  ]}>
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
  // Custom Picker Styles
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
  // Modal Styles
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
  },
  modalContainer: {
    backgroundColor: '#1E2A3A',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
    paddingBottom: 20,
    // Add shadow for iOS
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    // Add elevation for Android
    elevation: 5,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3E50',
  },
  modalTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  closeButton: {
    padding: 8,
  },
  closeButtonText: {
    color: '#FF6B00',
    fontSize: 18,
    fontWeight: 'bold',
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#2C3E50',
  },
  lastOption: {
    borderBottomWidth: 0,
  },
  selectedOption: {
    backgroundColor: 'rgba(255, 107, 0, 0.2)',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  selectedOptionText: {
    color: '#FF6B00',
    fontWeight: 'bold',
  },
  checkmark: {
    color: '#FF6B00',
    fontSize: 18,
    fontWeight: 'bold',
  },
  // Bottom area
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
});