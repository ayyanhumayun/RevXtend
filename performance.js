import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { askOpenAIAssistant } from './utils/helper.js';
import { askPowerEstimation } from './utils/helper.js'; // Import the function
 // Import the function

const Performance = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const carData = route.params?.carData || {}; // Retrieve submitted data

  const [loading, setLoading] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [powerGain, setPowerGain] = useState('');
  
  // Function to request AI modifications
  const handleSendToOpenAI = async () => {
    setLoading(true);
    setAiResponse('');

    const question = `I have a ${carData.brand} ${carData.model} (${carData.year}) with a ${carData.transmission} transmission. What are the best performance modifications I can make? Please respond concisely. asnwer it like you have 80% model accuracy`;

    try {
      const response = await askOpenAIAssistant(question);
      setAiResponse(response);
    } catch (error) {
      console.error("Error fetching AI response:", error);
      setAiResponse("Error fetching AI suggestions. Please try again.");
    }

    setLoading(false);
  };

  // Function to request AI power gain estimation
  const handlePowerGainEstimation = async () => {
    setLoading(true);
    setPowerGain('');

    const question = `Based on these modifications of car ${carData.model},(${carData.year}) : ${aiResponse}, what is the estimated power gain in horsepower and torque? Don't  give the aesthetics' parts like led lights etc. Answer in bullet and shortly and lease respond concisely and don't bold it should be in normal text and asnwer it like you have 80% model accuracy`;

    try {
      const response = await askPowerEstimation(question);
      setPowerGain(response);
    } catch (error) {
      console.error("Error fetching power gain estimation:", error);
      setPowerGain("Error fetching power gain estimation. Please try again.");
    }

    setLoading(false);
  };

  if (powerGain) {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.heading}>Estimated Power Gain</Text>
        <View style={styles.responseContainer}>
          <Text style={styles.responseText}>{powerGain}</Text>
        </View>
        <TouchableOpacity style={styles.feedbackButton} onPress={() => navigation.navigate('FeedbackPage')}>
          <Text style={styles.buttonText}>Go to Feedback Page</Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.heading}>Car Performance Suggestions</Text>

      <View style={styles.detailsContainer}>
        <Text style={styles.detailText}><Text style={styles.label}>Brand:</Text> {carData.brand}</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Model:</Text> {carData.model}</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Year:</Text> {carData.year}</Text>
        <Text style={styles.detailText}><Text style={styles.label}>Transmission:</Text> {carData.transmission}</Text>
      </View>

      {aiResponse === '' && (
        <TouchableOpacity style={styles.apiButton} onPress={handleSendToOpenAI} disabled={loading}>
          <Text style={styles.buttonText}>{loading ? 'Processing...' : 'Get Performance Suggestions'}</Text>
        </TouchableOpacity>
      )}

      {aiResponse !== '' && (
        <View style={styles.responseContainer}>
          <Text style={styles.responseTitle}>Suggested Modifications:</Text>
          <Text style={styles.responseText}>{aiResponse}</Text>
        </View>
      )}
  {loading && <ActivityIndicator size="large" color="#FF9500" style={styles.loadingIndicator} />}
      {aiResponse !== '' && (
        <TouchableOpacity style={styles.apiButton} onPress={handlePowerGainEstimation}>
          <Text style={styles.buttonText}>Power Gain Estimation</Text>
        </TouchableOpacity>
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
    color: '#FFFFFF',
    marginBottom: 20,
    textAlign: 'center',
  },
  detailsContainer: {
    backgroundColor: '#FFFFFF15',
    padding: 20,
    borderRadius: 10,
  
    width: '100%',
    marginBottom: 20,
   
  },
  detailText: {
    fontSize: 17,
    color: '#ffff',
    marginBottom: 6,
  },
  label: {
    fontWeight: 'bold',
    color: '#FF6B00',
  },
  responseTitle:
  {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#FF6B00',
    marginBottom: 10,
  },
  apiButton: {
    marginTop:20,
    backgroundColor: '#FF6B00',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  feedbackButton: {
    backgroundColor: '#FF6B00',
    marginTop: 35,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  responseContainer: {
    backgroundColor: '#FFFFFF15',
    padding: 15,
    borderRadius: 10,
    marginTop: 12,
    
  },
  responseText: {
    color: '#ffff',
    fontSize: 17,
    lineHeight: 35,
  },
  loadingIndicator: {
    marginTop: 10,
  },
});

export default Performance;
