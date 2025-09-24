// // app/auth/register.tsx - Registration Screen
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   TextInput,
//   TouchableOpacity,
//   StyleSheet,
//   SafeAreaView,
//   ActivityIndicator,
//   Alert,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
// } from 'react-native';
// import { useRouter, Link } from 'expo-router';
// import { useAuth } from '../../hooks/useAuth';
// import { RegisterData } from '../../types/auth';

// export default function RegisterScreen() {
//   const router = useRouter();
//   const { register, loading } = useAuth();
//   const [formData, setFormData] = useState<RegisterData>({
//     name: '',
//     email: '',
//     phone: '',
//     password: '',
//     confirmPassword: '',
//   });

//   const validateForm = () => {
//     if (!formData.name.trim()) {
//       Alert.alert('Error', 'Please enter your name');
//       return false;
//     }
//     if (!formData.email.trim()) {
//       Alert.alert('Error', 'Please enter your email');
//       return false;
//     }
//     if (!formData.email.includes('@')) {
//       Alert.alert('Error', 'Please enter a valid email');
//       return false;
//     }
//     if (!formData.phone.trim()) {
//       Alert.alert('Error', 'Please enter your phone number');
//       return false;
//     }
//     if (formData.password.length < 6) {
//       Alert.alert('Error', 'Password must be at least 6 characters');
//       return false;
//     }
//     if (formData.password !== formData.confirmPassword) {
//       Alert.alert('Error', 'Passwords do not match');
//       return false;
//     }
//     return true;
//   };

//   const handleRegister = async () => {
//     if (!validateForm()) return;

//     try {
//       await register(formData);
//       router.replace('/(tabs)');
//     } catch (error: any) {
//       Alert.alert('Registration Failed', error.message || 'Failed to create account');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardView}
//       >
//         <ScrollView contentContainerStyle={styles.scrollContent}>
//           <View style={styles.content}>
//             <View style={styles.header}>
//               <Text style={styles.title}>Create Account</Text>
//               <Text style={styles.subtitle}>Join our civic reporting community</Text>
//             </View>

//             <View style={styles.form}>
//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Full Name</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.name}
//                   onChangeText={(text) => setFormData(prev => ({ ...prev, name: text }))}
//                   placeholder="Enter your full name"
//                   autoCapitalize="words"
//                 />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Email</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.email}
//                   onChangeText={(text) => setFormData(prev => ({ ...prev, email: text }))}
//                   placeholder="Enter your email"
//                   keyboardType="email-address"
//                   autoCapitalize="none"
//                   autoCorrect={false}
//                 />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Phone Number</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.phone}
//                   onChangeText={(text) => setFormData(prev => ({ ...prev, phone: text }))}
//                   placeholder="Enter your phone number"
//                   keyboardType="phone-pad"
//                 />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Password</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.password}
//                   onChangeText={(text) => setFormData(prev => ({ ...prev, password: text }))}
//                   placeholder="Create a password"
//                   secureTextEntry
//                   autoCapitalize="none"
//                 />
//               </View>

//               <View style={styles.inputGroup}>
//                 <Text style={styles.label}>Confirm Password</Text>
//                 <TextInput
//                   style={styles.input}
//                   value={formData.confirmPassword}
//                   onChangeText={(text) => setFormData(prev => ({ ...prev, confirmPassword: text }))}
//                   placeholder="Confirm your password"
//                   secureTextEntry
//                   autoCapitalize="none"
//                 />
//               </View>

//               <TouchableOpacity
//                 style={[styles.registerButton, loading && styles.registerButtonDisabled]}
//                 onPress={handleRegister}
//                 disabled={loading}
//               >
//                 {loading ? (
//                   <ActivityIndicator color="#fff" />
//                 ) : (
//                   <Text style={styles.registerButtonText}>Create Account</Text>
//                 )}
//               </TouchableOpacity>

//               <View style={styles.footer}>
//                 <Text style={styles.footerText}>Already have an account? </Text>
//                 <Link href="/auth/login" asChild>
//                   <TouchableOpacity>
//                     <Text style={styles.linkText}>Sign In</Text>
//                   </TouchableOpacity>
//                 </Link>
//               </View>
//             </View>
//           </View>
//         </ScrollView>
//       </KeyboardAvoidingView>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   // Common styles
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   keyboardView: {
//     flex: 1,
//   },
//   content: {
//     flex: 1,
//     padding: 20,
//   },
//   scrollContent: {
//     flexGrow: 1,
//   },

//    // Auth screens styles
//   header: {
//     alignItems: 'center',
//     marginBottom: 40,
//     paddingTop: 60,
//   },
//   title: {
//     fontSize: 28,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 8,
//   },
//   subtitle: {
//     fontSize: 16,
//     color: '#666',
//     textAlign: 'center',
//   },
//   form: {
//     flex: 1,
//   },
//   inputGroup: {
//     marginBottom: 20,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     color: '#333',
//     marginBottom: 8,
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 12,
//     padding: 16,
//     fontSize: 16,
//     color: '#333',
//   },
//   loginButton: {
//     backgroundColor: '#007bff',
//     borderRadius: 12,
//     padding: 16,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   loginButtonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   loginButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   registerButton: {
//     backgroundColor: '#28a745',
//     borderRadius: 12,
//     padding: 16,
//     alignItems: 'center',
//     marginTop: 20,
//   },
//   registerButtonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   registerButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   footer: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginTop: 30,
//   },
//   footerText: {
//     fontSize: 16,
//     color: '#666',
//   },
//   linkText: {
//     fontSize: 16,
//     color: '#007bff',
//     fontWeight: '600',
//   },
// })