// // app/report/[id].tsx - Report Details Screen
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   Text,
//   StyleSheet,
//   ScrollView,
//   ActivityIndicator,
//   SafeAreaView,
//   Image,
// } from 'react-native';
// import { useLocalSearchParams } from 'expo-router';
// import { reportService } from '../../services/api';
// import { Report } from '../../types/report';

// export default function ReportDetailsScreen() {
//   const { id } = useLocalSearchParams<{ id: string }>();
//   const [report, setReport] = useState<Report | null>(null);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     loadReport();
//   }, [id]);

//   const loadReport = async () => {
//     try {
//       if (id) {
//         const reportData = await reportService.getReportById(id);
//         setReport(reportData);
//       }
//     } catch (error) {
//       console.error('Error loading report:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#007bff" />
//       </View>
//     );
//   }

//   if (!report) {
//     return (
//       <View style={styles.errorContainer}>
//         <Text style={styles.errorText}>Report not found</Text>
//       </View>
//     );
//   }

//   return (
//     <SafeAreaView style={styles.container}>
//       <ScrollView style={styles.content}>
//         <View style={styles.header}>
//           <Text style={styles.title}>{report.title}</Text>
//           <View style={styles.statusBadge}>
//             <Text style={styles.statusText}>
//               {report.status.replace('_', ' ').toUpperCase()}
//             </Text>
//           </View>
//         </View>

//         <Text style={styles.description}>{report.description}</Text>

//         <View style={styles.details}>
//           <Text style={styles.detailItem}>📍 {report.location.address}</Text>
//           <Text style={styles.detailItem}>📂 {report.category.replace('_', ' ')}</Text>
//           <Text style={styles.detailItem}>⚡ {report.priority.toUpperCase()}</Text>
//           <Text style={styles.detailItem}>📅 {new Date(report.createdAt).toLocaleDateString()}</Text>
//         </View>

//         {report.images && report.images.length > 0 && (
//           <View style={styles.imagesSection}>
//             <Text style={styles.sectionTitle}>Photos</Text>
//             <ScrollView horizontal style={styles.imagesScroll}>
//               {report.images.map((image, index) => (
//                 <Image key={index} source={{ uri: image }} style={styles.image} />
//               ))}
//             </ScrollView>
//           </View>
//         )}

//         {report.comments && report.comments.length > 0 && (
//           <View style={styles.commentsSection}>
//             <Text style={styles.sectionTitle}>Updates</Text>
//             {report.comments.map((comment) => (
//               <View key={comment.id} style={styles.comment}>
//                 <Text style={styles.commentAuthor}>
//                   {comment.author} ({comment.authorRole})
//                 </Text>
//                 <Text style={styles.commentMessage}>{comment.message}</Text>
//                 <Text style={styles.commentDate}>
//                   {new Date(comment.createdAt).toLocaleDateString()}
//                 </Text>
//               </View>
//             ))}
//           </View>
//         )}
//       </ScrollView>
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
  
//   // Auth screens styles
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
  
//   // Report details styles
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   errorText: {
//     fontSize: 18,
//     color: '#666',
//   },
//   reportHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'flex-start',
//     marginBottom: 20,
//   },
//   reportTitle: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#333',
//     flex: 1,
//     marginRight: 15,
//   },
//   statusBadge: {
//     backgroundColor: '#007bff',
//     paddingHorizontal: 12,
//     paddingVertical: 6,
//     borderRadius: 20,
//   },
//   statusText: {
//     color: '#fff',
//     fontSize: 12,
//     fontWeight: '600',
//   },
//   description: {
//     fontSize: 16,
//     color: '#666',
//     lineHeight: 24,
//     marginBottom: 20,
//   },
//   details: {
//     backgroundColor: '#fff',
//     borderRadius: 12,
//     padding: 20,
//     marginBottom: 20,
//   },
//   detailItem: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 10,
//   },
//   sectionTitle: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 15,
//   },
//   imagesSection: {
//     marginBottom: 20,
//   },
//   imagesScroll: {
//     marginTop: 10,
//   },
//   image: {
//     width: 120,
//     height: 120,
//     borderRadius: 8,
//     marginRight: 10,
//   },
//   commentsSection: {
//     marginBottom: 20,
//   },
//   comment: {
//     backgroundColor: '#fff',
//     borderRadius: 8,
//     padding: 15,
//     marginBottom: 10,
//   },
//   commentAuthor: {
//     fontSize: 14,
//     fontWeight: '600',
//     color: '#007bff',
//     marginBottom: 5,
//   },
//   commentMessage: {
//     fontSize: 16,
//     color: '#333',
//     marginBottom: 5,
//   },
//   commentDate: {
//     fontSize: 12,
//     color: '#999',
//   },
// });
              