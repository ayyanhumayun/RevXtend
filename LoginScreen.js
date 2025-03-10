// import React, { useState } from 'react';
// import {
//   Image,
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   Alert,
//   ActivityIndicator,
//   KeyboardAvoidingView,
//   ScrollView,
//   Platform,
// } from 'react-native';
// import { signInWithEmailAndPassword } from 'firebase/auth';
// import { auth } from './firebaseConfig'; // Import Firebase auth instance
// import { Ionicons } from '@expo/vector-icons';
// import { LinearGradient } from 'expo-linear-gradient';

// const LoginScreen = ({ navigation }) => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [passwordVisible, setPasswordVisible] = useState(false);
//   const [loading, setLoading] = useState(false);

//   const handleLogin = async () => {
//     if (!email || !password) {
//       Alert.alert('Error', 'Please enter both email and password.');
//       return;
//     }

//     setLoading(true);

//     try {
//       const userCredential = await signInWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;

//       if (user) {
//         Alert.alert('Success', 'Logged in successfully!');
//         setTimeout(() => {
//           navigation.replace('Menu'); // Navigate to Menu screen
//         }, 1000);
//       }
//     } catch (error) {
//       handleAuthError(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle Firebase Authentication Errors
//   const handleAuthError = (error) => {
//     let errorMessage = 'Failed to log in.';

//     switch (error.code) {
//       case 'auth/invalid-email':
//         errorMessage = 'Invalid email format.';
//         break;
//       case 'auth/user-disabled':
//         errorMessage = 'This account has been disabled.';
//         break;
//       case 'auth/user-not-found':
//         errorMessage = 'No account found with this email.';
//         break;
//       case 'auth/wrong-password':
//         errorMessage = 'Incorrect password.';
//         break;
//       case 'auth/network-request-failed':
//         errorMessage = 'Network error. Check your connection.';
//         break;
//       default:
//         errorMessage = 'An unexpected error occurred.';
//     }

//     Alert.alert('Login Failed', errorMessage);
//   };

//   return (
//     <KeyboardAvoidingView
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//       style={styles.container}
//     >
//       <LinearGradient colors={['#0A0F1C', '#212F3C']} style={styles.gradient}>
//         <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
//           <View style={styles.innerContainer}>
//             <Image source={require('./logo.png')} style={styles.logo} />
//             <Text style={styles.title}>Login</Text>

//             <TextInput
//               style={styles.input}
//               placeholder="Email"
//               placeholderTextColor="#aaa"
//               value={email}
//               onChangeText={setEmail}
//               autoCapitalize="none"
//               keyboardType="email-address"
//             />

//             <View style={styles.inputContainer}>
//               <TextInput
//                 style={[styles.input, { paddingRight: 50 }]}
//                 placeholder="Password"
//                 placeholderTextColor="#aaa"
//                 value={password}
//                 onChangeText={setPassword}
//                 secureTextEntry={!passwordVisible}
//               />
//               <TouchableOpacity
//                 style={styles.iconContainer}
//                 onPress={() => setPasswordVisible(!passwordVisible)}
//               >
//                 <Ionicons
//                   name={passwordVisible ? 'eye' : 'eye-off'}
//                   size={24}
//                   color="#aaa"
//                 />
//               </TouchableOpacity>
//             </View>

//             {loading ? (
//               <ActivityIndicator size="large" color="#fff" />
//             ) : (
//               <TouchableOpacity style={styles.button} onPress={handleLogin}>
//                 <Text style={styles.buttonText}>Login</Text>
//               </TouchableOpacity>
//             )}

//             <View style={styles.signupContainer}>
//               <Text style={styles.SignUpText}>Don't have an account? </Text>
//               <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
//                 <Text style={styles.SignUplink}>Sign Up</Text>
//               </TouchableOpacity>
//             </View>
//           </View>
//         </ScrollView>
//       </LinearGradient>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
//   gradient: {
//     flex: 1,
//     justifyContent: 'center',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   innerContainer: {
//     width: '100%',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 250,
//     height: 250,
//     marginBottom: 30,
//   },
//   title: {
//     fontSize: 30,
//     fontWeight: 'bold',
//     color: '#fff',
//     marginBottom: 20,
//   },
//   input: {
//     width: '100%',
//     padding: 15,
//     borderWidth: 1,
//     borderColor: '#444',
//     borderRadius: 12,
//     color: '#fff',
//     marginBottom: 15,
//     backgroundColor: '#FFFFFF15',
//   },
//   inputContainer: {
//     width: '100%',
//     position: 'relative',
//     justifyContent: 'center',
//   },
//   iconContainer: {
//     position: 'absolute',
//     right: 15,
//     top: '20%',
//   },
//   button: {
//     backgroundColor: '#FF6B00',
//     width: '70%',
//     padding: 16,
//     borderRadius: 25,
//     marginTop: 20,
//   },
//   buttonText: {
//     color: '#FFFFFF',
//     fontSize: 16,
//     fontWeight: '600',
//     textAlign: 'center',
//   },
//   SignUpText: {
//     color: '#FFFFFF',
//     fontSize: 14,
//   },
//   SignUplink: {
//     color: '#FF6B00',
//     fontWeight: '600',
//   },
//   signupContainer: {
//     flexDirection: 'row',
//     marginTop: 20,
//   },
// });

// export default LoginScreen;


import React, { useState } from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig'; // Import Firebase auth instance
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

const LoginScreen = ({ navigation }) => {
  const route = useRoute();
  const role = route.params?.role || 'user'; // Get role (default: user)

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fixed admin credentials
  const adminCredentials = {
    email: 'admin',
    password: 'admin',
  };

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password.');
      return;
    }

    setLoading(true);

    try {
      if (role === 'admin') {
        // Admin Login Verification
        if (email === adminCredentials.email && password === adminCredentials.password) {
          Alert.alert('Success', 'Logged in as Admin!');
          setTimeout(() => {
            navigation.replace('AdminDashboard'); // Navigate to Admin Dashboard
          }, 1000);
        } else {
          Alert.alert('Login Failed', 'Invalid Admin Credentials');
        }
      } else {
        // Normal User Firebase Authentication
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        if (user) {
          Alert.alert('Success', 'Logged in successfully!');
          setTimeout(() => {
            navigation.replace('Menu'); // Navigate to User Dashboard (Menu)
          }, 1000);
        }
      }
    } catch (error) {
      handleAuthError(error);
    } finally {
      setLoading(false);
    }
  };

  // Handle Firebase Authentication Errors
  const handleAuthError = (error) => {
    let errorMessage = 'Failed to log in.';

    switch (error.code) {
      case 'auth/invalid-email':
        errorMessage = 'Invalid email format.';
        break;
      case 'auth/user-disabled':
        errorMessage = 'This account has been disabled.';
        break;
      case 'auth/user-not-found':
        errorMessage = 'No account found with this email.';
        break;
      case 'auth/wrong-password':
        errorMessage = 'Incorrect password.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Check your connection.';
        break;
      default:
        errorMessage = 'An unexpected error occurred.';
    }

    Alert.alert('Login Failed', errorMessage);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <LinearGradient colors={['#0A0F1C', '#212F3C']} style={styles.gradient}>
        <ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled">
          <View style={styles.innerContainer}>
            <Image source={require('./logo.png')} style={styles.logo} />
            <Text style={styles.title}>{role === 'admin' ? 'Admin Login' : 'User Login'}</Text>

            <TextInput
              style={styles.input}
              placeholder="Email"
              placeholderTextColor="#aaa"
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <View style={styles.inputContainer}>
              <TextInput
                style={[styles.input, { paddingRight: 50 }]}
                placeholder="Password"
                placeholderTextColor="#aaa"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={!passwordVisible}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={() => setPasswordVisible(!passwordVisible)}
              >
                <Ionicons
                  name={passwordVisible ? 'eye' : 'eye-off'}
                  size={24}
                  color="#aaa"
                />
              </TouchableOpacity>
            </View>

            {loading ? (
              <ActivityIndicator size="large" color="#fff" />
            ) : (
              <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
            )}

            {role === 'user' && (
              <View style={styles.signupContainer}>
                <Text style={styles.SignUpText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                  <Text style={styles.SignUplink}>Sign Up</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
  },
  logo: {
    width: 250,
    height: 250,
    marginBottom: 30,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 12,
    color: '#fff',
    marginBottom: 15,
    backgroundColor: '#FFFFFF15',
  },
  inputContainer: {
    width: '100%',
    position: 'relative',
    justifyContent: 'center',
  },
  iconContainer: {
    position: 'absolute',
    right: 15,
    top: '20%',
  },
  button: {
    backgroundColor: '#FF6B00',
    width: '70%',
    padding: 16,
    borderRadius: 25,
    marginTop: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  SignUpText: {
    color: '#FFFFFF',
    fontSize: 14,
  },
  SignUplink: {
    color: '#FF6B00',
    fontWeight: '600',
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 20,
  },
});

export default LoginScreen;
