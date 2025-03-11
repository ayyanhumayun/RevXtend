import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { askAesthetics } from './utils/helper.js';
import { askOpenAIAssistant } from './utils/helper.js';

const Aesthetics = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const carData = route.params?.carData || {}; // Retrieve submitted data

  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  
  // Function to request AI modifications
  const handleSendToOpenAI = async () => {
    setLoading(true);
    setAiResponse('');

    const question = `I have a ${carData.brand} ${carData.model} (${carData.year}) with a ${carData.transmission} transmission. What are the best aesthetics modifications I can make? Please respond concisely.`;

    try {
      const response = await askAesthetics(question);
      setAiResponse(response || "No suggestions available.");
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error fetching AI suggestions. Please try again.");
    }

    setLoading(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Car Suggestions</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}><Text style={styles.label}>Brand:</Text> {carData.brand}</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Model:</Text> {carData.model}</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Year:</Text> {carData.year}</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Transmission:</Text> {carData.transmission}</Text>
      </View>

      <TouchableOpacity style={styles.apiButton} onPress={handleSendToOpenAI} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Get Aesthetic Suggestions'}</Text>
      </TouchableOpacity>

      {loading && <ActivityIndicator size="large" color="#FF9500" style={styles.loadingIndicator} />}

      {aiResponse !== '' && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Suggested Modifications:</Text>
          <Text style={styles.responseText}>{aiResponse}</Text>

          <TouchableOpacity style={styles.feedbackButton} onPress={() => navigation.navigate('FeedbackPage')}>
            <Text style={styles.buttonText}>Go to Feedback Page</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF15',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 10,
    width: '100%',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  detailText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    color: '#007BFF',
  },
  apiButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#007BFF',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
  },
  feedbackButton: {
    backgroundColor: '#28A745',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#28A745',
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 3,
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  responseContainer: {
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    marginTop: 12,
    width: '100%',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  responseText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 22,
  },
  loadingIndicator: {
    marginTop: 10,
  },
});

export default Aesthetics;