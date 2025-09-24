import { Report } from '../types/report';
import { saveReport, getReports } from './storage';

// Mock API service (replace with real API calls later)
export const reportService = {
  async createReport(reportData: Partial<Report>): Promise<Report> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const newReport: Report = {
      id: Date.now().toString(),
      title: reportData.title || '',
      description: reportData.description || '',
      category: reportData.category || 'other',
      priority: reportData.priority || 'medium',
      status: 'pending',
      location: reportData.location || { latitude: 0, longitude: 0, address: '' },
      images: reportData.images || [],
      citizenName: reportData.citizenName || '',
      citizenEmail: reportData.citizenEmail || '',
      citizenPhone: reportData.citizenPhone || '',
      createdAt: new Date().toISOString(),
    };
    
    // Save locally for now
    await saveReport(newReport);
    
    return newReport;
  },

  async getAllReports(): Promise<Report[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Get from local storage for now
    return await getReports();
  }
};