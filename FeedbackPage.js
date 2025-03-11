import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Pressable,
  Alert,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// Initialize Firestore & Auth
const db = getFirestore();
const auth = getAuth();

export default function FeedbackPage() {
  const navigation = useNavigation();
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Function to handle star rating selection
  const handleRating = (ratingValue) => {
    setRating(ratingValue);
  };

  // Function to submit feedback to Firestore
  const handleSubmit = async () => {
    if (rating === 0 || feedback.trim() === '') {
      Alert.alert('Error', 'Please provide a rating and feedback');
      return;
    }

    setIsSubmitting(true); // Disable button while submitting

    // Get the current authenticated user
    const user = auth.currentUser;
    if (!user) {
      Alert.alert('Error', 'You must be logged in to submit feedback');
      setIsSubmitting(false);
      return;
    }

    try {
      // Store feedback with user details in Firestore
      await addDoc(collection(db, 'feedback'), {
        userId: user.uid,
        username: user.displayName || 'Anonymous',
        email: user.email,
        rating: rating,
        feedback: feedback,
        timestamp: serverTimestamp(),
      });

      Alert.alert('Thank You!', 'Your feedback has been submitted.');
      setFeedback('');
      setRating(0);
      navigation.navigate("Menu");
    } catch (error) {
      console.error('Error saving feedback:', error);
      Alert.alert('Error', 'Failed to submit feedback. Please try again.');
    } finally {
      setIsSubmitting(false); // Re-enable button
    }
  };

  return (
    <LinearGradient colors={['#0A0F1C', '#1C2834']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Feedback</Text>
        <Text style={styles.subtitle}>Please rate your experience</Text>

        {/* Star Rating */}
        <View style={styles.ratingContainer}>
          {[1, 2, 3, 4, 5].map((star) => (
            <TouchableOpacity key={star} onPress={() => handleRating(star)}>
              <MaterialIcons
                name={star <= rating ? 'star' : 'star-border'}
                size={40}
                color="#FF6B00"
              />
            </TouchableOpacity>
          ))}
        </View>

        {/* Feedback Text Input */}
        <TextInput
          style={styles.textInput}
          placeholder="Write your feedback..."
          placeholderTextColor="#D1D1D1"
          multiline
          value={feedback}
          onChangeText={setFeedback}
        />

        {/* Submit Button */}
        <Pressable
          style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <LinearGradient
            colors={['#FF6B00', '#FF6B00']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradientButton}
          >
            <Text style={styles.buttonText}>
              {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
            </Text>
          </LinearGradient>
        </Pressable>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  content: {
    alignItems: 'center',
    paddingBottom: 30,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginTop: 160,
    marginBottom: 20,
    letterSpacing: 2,
  },
  subtitle: {
    fontSize: 24,
    color: '#D1D1D1',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 34,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  textInput: {
    height: 150,
    width: '100%',
    borderColor: '#aaa',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 30,
  },
  button: {
    borderRadius: 8,
    overflow: 'hidden',
    marginTop: 20,
    elevation: 10,
  },
  gradientButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    paddingHorizontal: 28,
    borderRadius: 8,
  },
  buttonText: {
    fontFamily: 'Jura',
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 1,
  },
  buttonPressed: {
    opacity: 0.9,
  },
});

// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   TouchableOpacity,
//   TextInput,
//   ScrollView,
//   Pressable,
//   Alert,
// } from 'react-native';
// import { LinearGradient } from 'expo-linear-gradient';
// import { useNavigation } from '@react-navigation/native';
// import { MaterialIcons } from '@expo/vector-icons';
// import { getAuth, signOut } from 'firebase/auth';
// import { getFirestore, collection, addDoc, serverTimestamp } from 'firebase/firestore';

// // Initialize Firestore & Auth
// const db = getFirestore();
// const auth = getAuth();

// export default function FeedbackPage() {
//   const navigation = useNavigation();
//   const [rating, setRating] = useState(0);
//   const [feedback, setFeedback] = useState('');
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   // Function to handle star rating selection
//   const handleRating = (ratingValue) => {
//     setRating(ratingValue);
//   };

//   // Function to log out user and navigate to Sign In screen
//   const handleLogout = async () => {
//     try {
//       await signOut(auth);
//       navigation.navigate('LandingScreen'); // Redirect to Sign-In screen
//     } catch (error) {
//       Alert.alert('Error', 'Failed to log out. Please try again.');
//       console.error('Logout Error:', error);
//     }
//   };

//   // Function to submit feedback to Firestore
//   const handleSubmit = async () => {
//     if (rating === 0 || feedback.trim() === '') {
//       Alert.alert('Error', 'Please provide a rating and feedback');
//       return;
//     }

//     setIsSubmitting(true); // Disable button while submitting

//     // Get the current authenticated user
//     const user = auth.currentUser;
//     if (!user) {
//       Alert.alert('Error', 'You must be logged in to submit feedback');
//       setIsSubmitting(false);
//       return;
//     }

//     try {
//       // Store feedback with user details in Firestore
//       await addDoc(collection(db, 'feedback'), {
//         userId: user.uid,
//         username: user.displayName || 'Anonymous',
//         email: user.email,
//         rating: rating,
//         feedback: feedback,
//         timestamp: serverTimestamp(),
//       });

//       // Reset fields after successful submission
//       setFeedback('');
//       setRating(0);

//       // Show options after successful submission
//       Alert.alert(
//         'Thank You!',
//         'Your feedback has been submitted successfully.',
//         [
//           {
//             text: 'Need More Modifications',
//             onPress: () => navigation.navigate('Menu'), // Navigate to Menu page
//           },
//           {
//             text: 'Logout',
//             onPress: handleLogout, // Logout and navigate to Sign In
//             style: 'destructive',
//           },
//         ]
//       );
//     } catch (error) {
//       console.error('Error saving feedback:', error);
//       Alert.alert('Error', 'Failed to submit feedback. Please try again.');
//     } finally {
//       setIsSubmitting(false); // Re-enable button
//     }
//   };

//   return (
//     <LinearGradient colors={['#0A0F1C', '#1C2834']} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.title}>Feedback</Text>
//         <Text style={styles.subtitle}>Please rate your experience</Text>

//         {/* Star Rating */}
//         <View style={styles.ratingContainer}>
//           {[1, 2, 3, 4, 5].map((star) => (
//             <TouchableOpacity key={star} onPress={() => handleRating(star)}>
//               <MaterialIcons
//                 name={star <= rating ? 'star' : 'star-border'}
//                 size={40}
//                 color="#FF6B00"
//               />
//             </TouchableOpacity>
//           ))}
//         </View>

//         {/* Feedback Text Input */}
//         <TextInput
//           style={styles.textInput}
//           placeholder="Write your feedback..."
//           placeholderTextColor="#D1D1D1"
//           multiline
//           value={feedback}
//           onChangeText={setFeedback}
//         />

//         {/* Submit Button */}
//         <Pressable
//           style={({ pressed }) => [styles.button, pressed && styles.buttonPressed]}
//           onPress={handleSubmit}
//           disabled={isSubmitting}
//         >
//           <LinearGradient
//             colors={['#FF6B00', '#FF6B00']}
//             start={{ x: 0, y: 0 }}
//             end={{ x: 1, y: 0 }}
//             style={styles.gradientButton}
//           >
//             <Text style={styles.buttonText}>
//               {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
//             </Text>
//           </LinearGradient>
//         </Pressable>
//       </ScrollView>
//     </LinearGradient>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     paddingHorizontal: 20,
//     justifyContent: 'center',
//   },
//   content: {
//     alignItems: 'center',
//     paddingBottom: 30,
//   },
//   title: {
//     fontSize: 48,
//     fontWeight: 'bold',
//     color: '#FFFFFF',
//     marginTop: 160,
//     marginBottom: 20,
//     letterSpacing: 2,
//   },
//   subtitle: {
//     fontSize: 24,
//     color: '#D1D1D1',
//     textAlign: 'center',
//     marginBottom: 30,
//     lineHeight: 34,
//   },
//   ratingContainer: {
//     flexDirection: 'row',
//     marginBottom: 20,
//   },
//   textInput: {
//     height: 150,
//     width: '100%',
//     borderColor: '#aaa',
//     borderWidth: 1,
//     borderRadius: 8,
//     padding: 10,
//     color: '#FFFFFF',
//     fontSize: 16,
//     marginBottom: 30,
//   },
//   button: {
//     borderRadius: 8,
//     overflow: 'hidden',
//     marginTop: 20,
//     elevation: 10,
//   },
//   gradientButton: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'center',
//     paddingVertical: 16,
//     paddingHorizontal: 28,
//     borderRadius: 8,
//   },
//   buttonText: {
//     fontFamily: 'Jura',
//     color: '#FFFFFF',
//     fontSize: 18,
//     letterSpacing: 1,
//   },
//   buttonPressed: {
//     opacity: 0.9,
//   },
// });
