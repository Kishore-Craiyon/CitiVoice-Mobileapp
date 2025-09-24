// // services/auth.ts - Create this file with proper error handling
// import api from './api';
// import { setSecureItem, removeSecureItem, getSecureItem } from './storage';
// import { LoginCredentials, RegisterData, User } from '../types/auth';

// export const authService = {
//   async login(credentials: LoginCredentials): Promise<{ user: User; token: string }> {
//     try {
//       const response = await api.post('/auth/login', credentials);
//       const { user, token } = response.data;
      
//       await setSecureItem('authToken', token);
//       await setSecureItem('userData', JSON.stringify(user));
      
//       return { user, token };
//     } catch (error: any) {
//       console.error('Login error:', error);
//       throw new Error(error.response?.data?.message || 'Login failed');
//     }
//   },

//   async register(data: RegisterData): Promise<{ user: User; token: string }> {
//     try {
//       const response = await api.post('/auth/register', data);
//       const { user, token } = response.data;
      
//       await setSecureItem('authToken', token);
//       await setSecureItem('userData', JSON.stringify(user));
      
//       return { user, token };
//     } catch (error: any) {
//       console.error('Register error:', error);
//       throw new Error(error.response?.data?.message || 'Registration failed');
//     }
//   },

//   async logout(): Promise<void> {
//     try {
//       await removeSecureItem('authToken');
//       await removeSecureItem('userData');
//     } catch (error) {
//       console.error('Logout error:', error);
//     }
//   },

//   async getCurrentUser(): Promise<User | null> {
//     try {
//       const userData = await getSecureItem('userData');
//       return userData ? JSON.parse(userData) : null;
//     } catch (error) {
//       console.error('Get current user error:', error);
//       return null;
//     }
//   }
// };
