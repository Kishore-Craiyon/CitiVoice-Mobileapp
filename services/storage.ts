import AsyncStorage from '@react-native-async-storage/async-storage';
import { Report } from '../types/report';

const REPORTS_KEY = 'civic_reports';

export const saveReport = async (report: Report): Promise<void> => {
  try {
    const existingReports = await getReports();
    const updatedReports = [report, ...existingReports];
    await AsyncStorage.setItem(REPORTS_KEY, JSON.stringify(updatedReports));
  } catch (error) {
    console.error('Error saving report:', error);
  }
};

export const getReports = async (): Promise<Report[]> => {
  try {
    const reportsJson = await AsyncStorage.getItem(REPORTS_KEY);
    return reportsJson ? JSON.parse(reportsJson) : [];
  } catch (error) {
    console.error('Error getting reports:', error);
    return [];
  }
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};