// // components/forms/ReportForm.tsx
// import React, { useState } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   Alert,
//   TouchableOpacity,
//   Image,
//   TextInput,
//   ActivityIndicator,
// } from 'react-native';
// import * as ImagePicker from 'expo-image-picker';
// import * as Location from 'expo-location';
// import { Picker } from '@react-native-picker/picker';
// import { useAuth } from '../../hooks/useAuth';
// import { reportService } from '../../services/api';
// import { ReportCategory, Priority, Report } from '../../types/report';

// interface ReportFormProps {
//   onSubmit: (report: Report) => void;
// }

// export const ReportForm: React.FC<ReportFormProps> = ({ onSubmit }) => {
//   const { user } = useAuth();
//   const [loading, setLoading] = useState(false);
//   const [formData, setFormData] = useState({
//     title: '',
//     description: '',
//     category: ReportCategory.OTHER,
//     priority: Priority.MEDIUM,
//     citizenName: user?.name || '',
//     citizenEmail: user?.email || '',
//     citizenPhone: user?.phone || '',
//   });
//   const [images, setImages] = useState<string[]>([]);
//   const [location, setLocation] = useState<{
//     latitude: number;
//     longitude: number;
//     address: string;
//   } | null>(null);

//   const getCurrentLocation = async () => {
//     try {
//       const { status } = await Location.requestForegroundPermissionsAsync();
//       if (status !== 'granted') {
//         Alert.alert('Permission denied', 'Location permission is required to tag your report.');
//         return;
//       }

//       const currentLocation = await Location.getCurrentPositionAsync({});
//       const address = await Location.reverseGeocodeAsync({
//         latitude: currentLocation.coords.latitude,
//         longitude: currentLocation.coords.longitude,
//       });

//       setLocation({
//         latitude: currentLocation.coords.latitude,
//         longitude: currentLocation.coords.longitude,
//         address: address[0] ? `${address[0].street}, ${address[0].city}` : 'Unknown location',
//       });
//     } catch (error) {
//       Alert.alert('Error', 'Unable to get current location. Please try again.');
//     }
//   };

//   const pickImages = async () => {
//     const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission denied', 'Camera roll permission is required to add photos.');
//       return;
//     }

//     const result = await ImagePicker.launchImageLibraryAsync({
//       mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       allowsMultipleSelection: true,
//       quality: 0.8,
//       selectionLimit: 5,
//     });

//     if (!result.canceled) {
//       const newImages = result.assets.map(asset => asset.uri);
//       setImages(prev => [...prev, ...newImages].slice(0, 5)); // Max 5 images
//     }
//   };

//   const takePhoto = async () => {
//     const { status } = await ImagePicker.requestCameraPermissionsAsync();
//     if (status !== 'granted') {
//       Alert.alert('Permission denied', 'Camera permission is required to take photos.');
//       return;
//     }

//     const result = await ImagePicker.launchCameraAsync({
//       quality: 0.8,
//     });

//     if (!result.canceled) {
//       setImages(prev => [...prev, result.assets[0].uri].slice(0, 5));
//     }
//   };

//   const removeImage = (index: number) => {
//     setImages(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async () => {
//     if (!formData.title.trim() || !formData.description.trim()) {
//       Alert.alert('Error', 'Please fill in all required fields.');
//       return;
//     }

//     if (!location) {
//       Alert.alert('Error', 'Please add location to your report.');
//       return;
//     }

//     setLoading(true);
//     try {
//       const reportData: Partial<Report> = {
//         ...formData,
//         location,
//         images,
//       };

//       const newReport = await reportService.createReport(reportData);
//       onSubmit(newReport);
      
//       // Reset form
//       setFormData({
//         title: '',
//         description: '',
//         category: ReportCategory.OTHER,
//         priority: Priority.MEDIUM,
//         citizenName: user?.name || '',
//         citizenEmail: user?.email || '',
//         citizenPhone: user?.phone || '',
//       });
//       setImages([]);
//       setLocation(null);
      
//       Alert.alert('Success', 'Your report has been submitted successfully!');
//     } catch (error) {
//       Alert.alert('Error', 'Failed to submit report. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.form}>
//         <Text style={styles.title}>Report an Issue</Text>
        
//         {/* Title */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Title *</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.title}
//             onChangeText={(text) => setFormData(prev => ({ ...prev, title: text }))}
//             placeholder="Brief description of the issue"
//             maxLength={100}
//           />
//         </View>

//         {/* Description */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Description *</Text>
//           <TextInput
//             style={[styles.input, styles.textArea]}
//             value={formData.description}
//             onChangeText={(text) => setFormData(prev => ({ ...prev, description: text }))}
//             placeholder="Detailed description of the issue"
//             multiline
//             numberOfLines={4}
//             maxLength={500}
//           />
//         </View>

//         {/* Category */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Category</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={formData.category}
//               onValueChange={(value: any) => setFormData(prev => ({ ...prev, category: value }))}
//               style={styles.picker}
//             >
//               <Picker.Item label="Road Maintenance" value={ReportCategory.ROAD_MAINTENANCE} />
//               <Picker.Item label="Water Supply" value={ReportCategory.WATER_SUPPLY} />
//               <Picker.Item label="Electricity" value={ReportCategory.ELECTRICITY} />
//               <Picker.Item label="Waste Management" value={ReportCategory.WASTE_MANAGEMENT} />
//               <Picker.Item label="Street Lighting" value={ReportCategory.STREET_LIGHTING} />
//               <Picker.Item label="Public Safety" value={ReportCategory.PUBLIC_SAFETY} />
//               <Picker.Item label="Other" value={ReportCategory.OTHER} />
//             </Picker>
//           </View>
//         </View>

//         {/* Priority */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Priority</Text>
//           <View style={styles.pickerContainer}>
//             <Picker
//               selectedValue={formData.priority}
//               onValueChange={(value: any) => setFormData(prev => ({ ...prev, priority: value }))}
//               style={styles.picker}
//             >
//               <Picker.Item label="Low" value={Priority.LOW} />
//               <Picker.Item label="Medium" value={Priority.MEDIUM} />
//               <Picker.Item label="High" value={Priority.HIGH} />
//               <Picker.Item label="Urgent" value={Priority.URGENT} />
//             </Picker>
//           </View>
//         </View>

//         {/* Location */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Location *</Text>
//           <TouchableOpacity style={styles.locationButton} onPress={getCurrentLocation}>
//             <Text style={styles.locationButtonText}>
//               {location ? `📍 ${location.address}` : '📍 Add Current Location'}
//             </Text>
//           </TouchableOpacity>
//         </View>

//         {/* Images */}
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Photos (Optional)</Text>
//           <View style={styles.imageSection}>
//             <View style={styles.imageButtons}>
//               <TouchableOpacity style={styles.imageButton} onPress={takePhoto}>
//                 <Text style={styles.imageButtonText}>📷 Take Photo</Text>
//               </TouchableOpacity>
//               <TouchableOpacity style={styles.imageButton} onPress={pickImages}>
//                 <Text style={styles.imageButtonText}>🖼️ Choose Photos</Text>
//               </TouchableOpacity>
//             </View>
            
//             {images.length > 0 && (
//               <ScrollView horizontal style={styles.imagePreview}>
//                 {images.map((image, index) => (
//                   <View key={index} style={styles.imageContainer}>
//                     <Image source={{ uri: image }} style={styles.image} />
//                     <TouchableOpacity
//                       style={styles.removeButton}
//                       onPress={() => removeImage(index)}
//                     >
//                       <Text style={styles.removeButtonText}>×</Text>
//                     </TouchableOpacity>
//                   </View>
//                 ))}
//               </ScrollView>
//             )}
//           </View>
//         </View>

//         {/* Contact Information */}
//         <Text style={styles.sectionTitle}>Contact Information</Text>
        
//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Name</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.citizenName}
//             onChangeText={(text) => setFormData(prev => ({ ...prev, citizenName: text }))}
//             placeholder="Your full name"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Email</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.citizenEmail}
//             onChangeText={(text) => setFormData(prev => ({ ...prev, citizenEmail: text }))}
//             placeholder="Your email address"
//             keyboardType="email-address"
//           />
//         </View>

//         <View style={styles.inputGroup}>
//           <Text style={styles.label}>Phone</Text>
//           <TextInput
//             style={styles.input}
//             value={formData.citizenPhone}
//             onChangeText={(text) => setFormData(prev => ({ ...prev, citizenPhone: text }))}
//             placeholder="Your phone number"
//             keyboardType="phone-pad"
//           />
//         </View>

//         {/* Submit Button */}
//         <TouchableOpacity
//           style={[styles.submitButton, loading && styles.submitButtonDisabled]}
//           onPress={handleSubmit}
//           disabled={loading}
//         >
//           {loading ? (
//             <ActivityIndicator color="#fff" />
//           ) : (
//             <Text style={styles.submitButtonText}>Submit Report</Text>
//           )}
//         </TouchableOpacity>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f5f5f5',
//   },
//   form: {
//     padding: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginBottom: 20,
//     textAlign: 'center',
//     color: '#333',
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '600',
//     marginTop: 20,
//     marginBottom: 10,
//     color: '#333',
//   },
//   inputGroup: {
//     marginBottom: 15,
//   },
//   label: {
//     fontSize: 16,
//     fontWeight: '500',
//     marginBottom: 5,
//     color: '#555',
//   },
//   input: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//     padding: 12,
//     fontSize: 16,
//   },
//   textArea: {
//     height: 100,
//     textAlignVertical: 'top',
//   },
//   pickerContainer: {
//     backgroundColor: '#fff',
//     borderWidth: 1,
//     borderColor: '#ddd',
//     borderRadius: 8,
//   },
//   picker: {
//     height: 50,
//   },
//   locationButton: {
//     backgroundColor: '#007AFF',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//   },
//   locationButtonText: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: '500',
//   },
//   imageSection: {
//     marginTop: 5,
//   },
//   imageButtons: {
//     flexDirection: 'row',
//     gap: 10,
//     marginBottom: 10,
//   },
//   imageButton: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 12,
//     borderRadius: 8,
//     alignItems: 'center',
//     borderWidth: 1,
//     borderColor: '#ddd',
//   },
//   imageButtonText: {
//     fontSize: 14,
//     color: '#333',
//   },
//   imagePreview: {
//     marginTop: 10,
//   },
//   imageContainer: {
//     position: 'relative',
//     marginRight: 10,
//   },
//   image: {
//     width: 80,
//     height: 80,
//     borderRadius: 8,
//   },
//   removeButton: {
//     position: 'absolute',
//     top: -5,
//     right: -5,
//     backgroundColor: 'red',
//     borderRadius: 15,
//     width: 30,
//     height: 30,
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   removeButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
//   submitButton: {
//     backgroundColor: '#28a745',
//     padding: 15,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginTop: 20,
//     marginBottom: 40,
//   },
//   submitButtonDisabled: {
//     backgroundColor: '#ccc',
//   },
//   submitButtonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//   },
// })