// // hooks/useAuth.ts - Updated version with better error handling
// import React, { useState, useEffect, useContext, createContext, ReactNode } from 'react';
// import { User, LoginCredentials, RegisterData } from '../types/auth';
// import { authService } from '../services/auth';

// interface AuthContextType {
//   user: User | null;
//   loading: boolean;
//   error: string | null;
//   login: (credentials: LoginCredentials) => Promise<void>;
//   register: (data: RegisterData) => Promise<void>;
//   logout: () => Promise<void>;
//   clearError: () => void;
// }

// const AuthContext = createContext<AuthContextType | undefined>(undefined);

// interface AuthProviderProps {
//   children: React.ReactNode;
// }

// export const AuthProvider = < AuthProviderProps> ({ children }: { children: ReactNode }) => {
//   const [user, setUser] = useState<User | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);

//   useEffect(() => {
//     loadUser();
//   }, []);

//   const loadUser = async () => {
//     try {
//       setError(null);
//       const userData = await authService.getCurrentUser();
//       setUser(userData);
//     } catch (error: any) {
//       console.error('Error loading user:', error);
//       setError('Failed to load user data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const login = async (credentials: LoginCredentials) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const { user: userData } = await authService.login(credentials);
//       setUser(userData);
//     } catch (error: any) {
//       setError(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const register = async (data: RegisterData) => {
//     setLoading(true);
//     setError(null);
//     try {
//       const { user: userData } = await authService.register(data);
//       setUser(userData);
//     } catch (error: any) {
//       setError(error.message);
//       throw error;
//     } finally {
//       setLoading(false);
//     }
//   };

//   const logout = async () => {
//     setLoading(true);
//     setError(null);
//     try {
//       await authService.logout();
//       setUser(null);
//     } catch (error: any) {
//       setError('Failed to logout');
//       console.error('Logout error:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const clearError = () => {
//     setError(null);
//   };

//   const value: AuthContextType = {
//     user,
//     loading,
//     error,
//     login,
//     register,
//     logout,
//     clearError,
//   };

//   return (
//     <AuthContext.Provider value='value'>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export const useAuth = (): AuthContextType => {
//   const context = useContext(AuthContext);
//   if (!context) {
//     throw new Error('useAuth must be used within AuthProvider');
//   }
//   return context;
// };
