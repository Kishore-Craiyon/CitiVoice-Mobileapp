// // app/auth/login.tsx - Login Screen
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
// } from 'react-native';
// import { useRouter, Link } from 'expo-router';
// import { useAuth } from '../../hooks/useAuth';
// import { LoginCredentials } from '../../types/auth';

// export default function LoginScreen() {
//   const router = useRouter();
//   const { login, loading } = useAuth();
//   const [credentials, setCredentials] = useState<LoginCredentials>({
//     email: '',
//     password: '',
//   });

//   const handleLogin = async () => {
//     if (!credentials.email.trim() || !credentials.password.trim()) {
//       Alert.alert('Error', 'Please fill in all fields');
//       return;
//     }

//     try {
//       await login(credentials);
//       router.replace('/(tabs)');
//     } catch (error: any) {
//       Alert.alert('Login Failed', error.message || 'Invalid credentials');
//     }
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <KeyboardAvoidingView
//         behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//         style={styles.keyboardView}
//       >
//         <View style={styles.content}>
//           <View style={styles.header}>
//             <Text style={styles.title}>Welcome Back</Text>
//             <Text style={styles.subtitle}>Sign in to report civic issues</Text>
//           </View>

//           <View style={styles.form}>
//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Email</Text>
//               <TextInput
//                 style={styles.input}
//                 value={credentials.email}
//                 onChangeText={(text) => setCredentials(prev => ({ ...prev, email: text }))}
//                 placeholder="Enter your email"
//                 keyboardType="email-address"
//                 autoCapitalize="none"
//                 autoCorrect={false}
//               />
//             </View>

//             <View style={styles.inputGroup}>
//               <Text style={styles.label}>Password</Text>
//               <TextInput
//                 style={styles.input}
//                 value={credentials.password}
//                 onChangeText={(text) => setCredentials(prev => ({ ...prev, password: text }))}
//                 placeholder="Enter your password"
//                 secureTextEntry
//                 autoCapitalize="none"
//               />
//             </View>

//             <TouchableOpacity
//               style={[styles.loginButton, loading && styles.loginButtonDisabled]}
//               onPress={handleLogin}
//               disabled={loading}
//             >
//               {loading ? (
//                 <ActivityIndicator color="#fff" />
//               ) : (
//                 <Text style={styles.loginButtonText}>Sign In</Text>
//               )}
//             </TouchableOpacity>

//             <View style={styles.footer}>
//               <Text style={styles.footerText}>Don't have an account? </Text>
//               <Link href="/auth/register" asChild>
//                 <TouchableOpacity>
//                   <Text style={styles.linkText}>Sign Up</Text>
//                 </TouchableOpacity>
//               </Link>
//             </View>
//           </View>
//         </View>
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