// import React, { useState, useEffect } from "react";
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   TouchableOpacity,
//   Alert,
//   TextInput,
//   ActivityIndicator,
//   Modal,
// } from "react-native";
// import { LinearGradient } from "expo-linear-gradient";
// import { Ionicons } from "@expo/vector-icons";
// import { auth, db } from "./firebaseConfig";
// import {
//   createUserWithEmailAndPassword,
//   signOut,
// } from "firebase/auth";
// import {
//   collection,
//   doc,
//   setDoc,
//   deleteDoc,
//   getDocs,
// } from "firebase/firestore";

// const AdminDashboard = ({ navigation }) => {
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [modalVisible, setModalVisible] = useState(false);

//   useEffect(() => {
//     const fetchUsers = async () => {
//       try {
//         setLoading(true);
//         const querySnapshot = await getDocs(collection(db, "users"));
//         const usersList = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
//         setUsers(usersList);
//       } catch (error) {
//         Alert.alert("Error", error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchUsers();
//   }, []);

//   const confirmAddUser = () => {
//     Alert.alert(
//       "Confirmation",
//       "Do you want to add a new user?",
//       [
//         { text: "Cancel", style: "cancel" },
//         { text: "Yes", onPress: () => setModalVisible(true) },
//       ]
//     );
//   };

//   const handleAddUser = async () => {
//     if (!email || !password) {
//       Alert.alert("Error", "Please enter an email and password.");
//       return;
//     }
//     try {
//       setLoading(true);
//       const userCredential = await createUserWithEmailAndPassword(auth, email, password);
//       const user = userCredential.user;
//       await setDoc(doc(db, "users", user.uid), { email: user.email, role: "user" });
//       setUsers([...users, { id: user.uid, email: user.email, role: "user" }]);
//       Alert.alert("Success", "User added successfully!");
//       setModalVisible(false);
//       setEmail("");
//       setPassword("");
//     } catch (error) {
//       Alert.alert("Error", error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <LinearGradient colors={["#0A0F1C", "#1C2834"]} style={styles.container}>
//       <ScrollView contentContainerStyle={styles.content}>
//         <Text style={styles.header}>Admin Dashboard</Text>

//         <TouchableOpacity style={styles.card} onPress={confirmAddUser}>
//           <Ionicons name="person-add" size={28} color="#FFFFFF" style={styles.icon} />
//           <Text style={styles.cardText}>Add User</Text>
//         </TouchableOpacity>

//         <Text style={styles.subHeader}>User List</Text>
//         {loading ? (
//           <ActivityIndicator size="large" color="#FF6B00" style={styles.loader} />
//         ) : (
//           users.map((user) => (
//             <View key={user.id} style={styles.userCard}>
//               <Text style={styles.userText}>{user.email}</Text>
//             </View>
//           ))
//         )}

//         <TouchableOpacity style={styles.logoutButton} onPress={() => signOut(auth)}>
//           <Text style={styles.logoutButtonText}>Logout</Text>
//         </TouchableOpacity>
//       </ScrollView>

//       <Modal visible={modalVisible} transparent animationType="slide">
//         <View style={styles.modalContainer}>
//           <View style={styles.modalContent}>
//             <Text style={styles.modalTitle}>Enter User Details</Text>
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Email"
//               placeholderTextColor="#AAA"
//               value={email}
//               onChangeText={setEmail}
//               keyboardType="email-address"
//             />
//             <TextInput
//               style={styles.input}
//               placeholder="Enter Password"
//               placeholderTextColor="#AAA"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//             />
//             <TouchableOpacity style={styles.modalButton} onPress={handleAddUser}>
//               <Text style={styles.modalButtonText}>Create User</Text>
//             </TouchableOpacity>
//             <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
//               <Text style={styles.cancelButtonText}>Cancel</Text>
//             </TouchableOpacity>
//           </View>
//         </View>
//       </Modal>
//     </LinearGradient>
//   );
// };

// const styles = StyleSheet.create({
//   container: { flex: 1 },
//   content: { alignItems: "center", paddingVertical: 40 },
//   header: { fontSize: 30, fontWeight: "bold", color: "#FFFFFF", marginBottom: 40 },
//   card: { backgroundColor: "#222", width: "85%", padding: 15, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20 },
//   cardText: { color: "#FFFFFF", fontSize: 18, fontWeight: "500", marginLeft: 10 },
//   subHeader: { fontSize: 22, color: "#FFF", marginTop: 20, marginBottom: 10 },
//   userCard: { backgroundColor: "#333", width: "85%", padding: 12, borderRadius: 8, marginBottom: 10 },
//   userText: { color: "#FFF", fontSize: 16 },
//   logoutButton: { backgroundColor: "#FF6B00", width: "80%", padding: 16, borderRadius: 25, marginTop: 30, alignItems: "center" },
//   logoutButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
//   modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
//   modalContent: { backgroundColor: "#FFF", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
//   modalTitle: { fontSize: 20, fontWeight: "bold", marginBottom: 20 },
//   input: { width: "100%", padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
//   modalButton: { backgroundColor: "#FF6B00", padding: 10, borderRadius: 5, marginBottom: 10 },
//   modalButtonText: { color: "#FFF", fontWeight: "bold" },
//   cancelButtonText: { color: "red" },
// });

// export default AdminDashboard;


import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
  TextInput,
  ActivityIndicator,
  Modal,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "./firebaseConfig";
import {
  createUserWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  onSnapshot,
} from "firebase/firestore";

const AdminDashboard = ({ navigation }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  // ✅ Use Firestore real-time listener
  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "users"), (snapshot) => {
      const usersList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(usersList);
    });

    return () => unsubscribe(); // Clean up listener on unmount
  }, []);

  const confirmAddUser = () => {
    Alert.alert("Confirmation", "Do you want to add a new user?", [
      { text: "Cancel", style: "cancel" },
      { text: "Yes", onPress: () => setModalVisible(true) },
    ]);
  };

  const handleAddUser = async () => {
    if (!email || !password) {
      Alert.alert("Error", "Please enter an email and password.");
      return;
    }
    try {
      setLoading(true);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), { email: user.email, role: "user" });

      Alert.alert("Success", "User added successfully!");
      setModalVisible(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      Alert.alert("Error", error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = async (userId) => {
    Alert.alert("Delete User", "Are you sure you want to delete this user?", [
      { text: "Cancel", style: "cancel" },
      {
        text: "Yes",
        onPress: async () => {
          try {
            setLoading(true);
            await deleteDoc(doc(db, "users", userId));
            Alert.alert("Success", "User deleted successfully!");
          } catch (error) {
            Alert.alert("Error", error.message);
          } finally {
            setLoading(false);
          }
        },
      },
    ]);
  };

  return (
    <LinearGradient colors={["#0A0F1C", "#1C2834"]} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.header}>Admin Dashboard</Text>

        <TouchableOpacity style={styles.card} onPress={confirmAddUser}>
          <Ionicons name="person-add" size={28} color="#FFFFFF" style={styles.icon} />
          <Text style={styles.cardText}>Add User</Text>
        </TouchableOpacity>

        <Text style={styles.subHeader}>User List</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#FF6B00" style={styles.loader} />
        ) : users.length > 0 ? (
          users.map((user) => (
            <View key={user.id} style={styles.userCard}>
              <Text style={styles.userText}>{user.email}</Text>
              <TouchableOpacity onPress={() => handleDeleteUser(user.id)}>
                <Ionicons name="trash" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))
        ) : (
          <Text style={styles.noUsersText}>No users found</Text>
        )}

        <TouchableOpacity style={styles.logoutButton} onPress={() => signOut(auth)}>
          <Text style={styles.logoutButtonText}>Logout</Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Enter User Details</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter Email"
              placeholderTextColor="#AAA"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <TextInput
              style={styles.input}
              placeholder="Enter Password"
              placeholderTextColor="#AAA"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
            <TouchableOpacity style={styles.modalButton} onPress={handleAddUser}>
              <Text style={styles.modalButtonText}>Create User</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { alignItems: "center", paddingVertical: 40 },
  header: { fontSize: 30, fontWeight: "bold", color: "#FFFFFF", marginBottom: 40 },
  card: { backgroundColor: "#222", width: "85%", padding: 15, borderRadius: 10, flexDirection: "row", alignItems: "center", justifyContent: "center", marginBottom: 20 },
  cardText: { color: "#FFFFFF", fontSize: 18, fontWeight: "500", marginLeft: 10 },
  subHeader: { fontSize: 22, color: "#FFF", marginTop: 20, marginBottom: 10 },
  userCard: { backgroundColor: "#333", width: "85%", padding: 12, borderRadius: 8, marginBottom: 10, flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  userText: { color: "#FFF", fontSize: 16 },
  noUsersText: { color: "#FFF", fontSize: 16, marginTop: 10 },
  logoutButton: { backgroundColor: "#FF6B00", width: "80%", padding: 16, borderRadius: 25, marginTop: 30, alignItems: "center" },
  logoutButtonText: { color: "#FFFFFF", fontSize: 16, fontWeight: "600" },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { backgroundColor: "#FFF", padding: 20, borderRadius: 10, width: "80%", alignItems: "center" },
  input: { width: "100%", padding: 10, borderWidth: 1, marginBottom: 10, borderRadius: 5 },
  modalButton: { backgroundColor: "#FF6B00", padding: 10, borderRadius: 5, marginBottom: 10 },
  modalButtonText: { color: "#FFF", fontWeight: "bold" },
  cancelButtonText: { color: "red" },
});

export default AdminDashboard;
