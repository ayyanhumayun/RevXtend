import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { auth } from './firebaseConfig';  // Import the `auth` instance from firebaseConfig
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen';
import LandingScreen from './LandingScreen';
import Menu from './Menu';
import CarDetailForm from './CarDetails';
import Caraesthetics from './CarDetails-aesthetics';

import CarSpecs from './CarSpecs';
import FeedbackPage from './FeedbackPage';
import Modifications from './Modifications';
import Performance from './performance';
import Aesthetics from './aesthetics';

import AdminDashboard from './AdminDashboard';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Landing"
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: '#0A0F1C' },
        }}
      >
        <Stack.Screen name="Landing" component={LandingScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
        <Stack.Screen name="CarDetails" component={CarDetailForm}/>
        <Stack.Screen name="CarSpecs" component={CarSpecs}/>
        <Stack.Screen name="FeedbackPage" component={FeedbackPage} />
        <Stack.Screen name="Menu" component={Menu} />
        <Stack.Screen name="Modifications" component={Modifications} />
        <Stack.Screen name="Performance" component={Performance} />
        <Stack.Screen name="aesthetics" component={Aesthetics} />
        <Stack.Screen name="Caraesthetics" component={Caraesthetics} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}



