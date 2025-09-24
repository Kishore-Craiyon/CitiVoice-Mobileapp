export interface Report {
  id: string;
  title: string;
  description: string;
  category: string;
  priority: string;
  status: string;
  location: {
    latitude: number;
    longitude: number;
    address: string;
  };
  images: string[];
  citizenName: string;
  citizenEmail: string;
  citizenPhone: string;
  createdAt: string;
}

export const CATEGORIES = [
  { label: 'Road Maintenance', value: 'road_maintenance' },
  { label: 'Water Supply', value: 'water_supply' },
  { label: 'Electricity', value: 'electricity' },
  { label: 'Waste Management', value: 'waste_management' },
  { label: 'Street Lighting', value: 'street_lighting' },
  { label: 'Public Safety', value: 'public_safety' },
  { label: 'Other', value: 'other' },
];

export const PRIORITIES = [
  { label: 'Low', value: 'low' },
  { label: 'Medium', value: 'medium' },
  { label: 'High', value: 'high' },
  { label: 'Urgent', value: 'urgent' },
];