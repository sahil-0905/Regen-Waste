// 1. First, let's modify the ReportContext to include activities as well

// src/context/ReportContext.tsx
import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the report interface
export interface Report {
  id: number;
  date: string;
  time: string;
  address: string;
  wasteType: string;
  status: 'scheduled' | 'in-transit' | 'completed';
  quantity?: string;
  description?: string;
  imageCount?: number;
}

// Define the activity interface
export interface Activity {
  id: number;
  type: 'report' | 'schedule' | 'pickup' | 'complete';
  title: string;
  description: string;
  date: string;
  status?: 'pending' | 'in-progress' | 'completed';
}

// Define the context type
interface ReportContextType {
  reports: Report[];
  activities: Activity[];
  addReport: (report: Report) => void;
  addActivity: (activity: Activity) => void;
}

// Create the context
const ReportContext = createContext<ReportContextType | undefined>(undefined);

// Initial data
const initialReports: Report[] = [
  {
    id: 1,
    date: 'May 15, 2023',
    time: '10:00 AM - 12:00 PM',
    address: '123 Main St, Apt 4B, Eco City',
    wasteType: 'Recyclables (Paper, Plastic)',
    status: 'scheduled'
  },
  {
    id: 2,
    date: 'May 20, 2023',
    time: '2:00 PM - 4:00 PM',
    address: '45 Park Avenue, Suite 301, Eco City',
    wasteType: 'Electronic Waste',
    status: 'scheduled'
  },
  {
    id: 3,
    date: 'May 22, 2023',
    time: '9:00 AM - 11:00 AM',
    address: '78 Green Street, Eco City',
    wasteType: 'Organic Waste',
    status: 'in-transit'
  }
];

const initialActivities: Activity[] = [
  {
    id: 1,
    type: 'report',
    title: 'Waste Reported',
    description: 'Plastic and paper waste reported at 123 Main St',
    date: '2 hours ago',
    status: 'pending'
  },
  {
    id: 2,
    type: 'schedule',
    title: 'Pickup Scheduled',
    description: 'Pickup scheduled for electronic waste',
    date: '5 hours ago',
    status: 'in-progress'
  },
  {
    id: 3,
    type: 'pickup',
    title: 'Waste Collected',
    description: 'Organic waste collected from 45 Park Avenue',
    date: 'Yesterday',
    status: 'in-progress'
  },
  {
    id: 4,
    type: 'complete',
    title: 'Disposal Completed',
    description: 'Hazardous waste properly disposed',
    date: '2 days ago',
    status: 'completed'
  }
];

// Create the provider component
export const ReportProvider = ({ children }: { children: ReactNode }) => {
  const [reports, setReports] = useState<Report[]>(initialReports);
  const [activities, setActivities] = useState<Activity[]>(initialActivities);

  const addReport = (report: Report) => {
    setReports(prevReports => [report, ...prevReports]);
  };

  const addActivity = (activity: Activity) => {
    setActivities(prevActivities => [activity, ...prevActivities]);
  };

  return (
    <ReportContext.Provider value={{ reports, activities, addReport, addActivity }}>
      {children}
    </ReportContext.Provider>
  );
};

// Custom hook to use the context
export const useReportContext = () => {
  const context = useContext(ReportContext);
  if (context === undefined) {
    throw new Error('useReportContext must be used within a ReportProvider');
  }
  return context;
};