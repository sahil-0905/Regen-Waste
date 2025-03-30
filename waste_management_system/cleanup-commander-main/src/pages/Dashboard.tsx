
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import DashboardStats from '@/components/dashboard/DashboardStats';
import RecentActivities from '@/components/dashboard/RecentActivities';
import UpcomingPickups from '@/components/dashboard/UpcomingPickups';
import { Button } from "@/components/ui/button";
import { Plus, FileText, CalendarDays } from 'lucide-react';

const Dashboard = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated') === 'true';
    setIsAuthenticated(auth);
    
    if (!auth) {
      navigate('/login');
    }
  }, [navigate]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  return (
    <Layout>
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Monitor and manage your waste management activities</p>
        </div>
        <div className="flex mt-4 sm:mt-0 space-x-3">
          <Button
            className="bg-eco-primary hover:bg-eco-dark"
            onClick={() => navigate('/report')}
          >
            <Plus className="mr-2 h-4 w-4" />
            Report Waste
          </Button>
          <Button
            variant="outline"
            className="border-eco-primary text-eco-primary hover:bg-eco-background"
            onClick={() => navigate('/schedule')}
          >
            <CalendarDays className="mr-2 h-4 w-4" />
            Schedule Pickup
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        <DashboardStats />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivities />
          <UpcomingPickups />
        </div>
        
        <div className="flex justify-center mt-8">
          <Button
            variant="ghost"
            className="text-sky-primary"
            onClick={() => navigate('/reports')}
          >
            <FileText className="mr-2 h-4 w-4" />
            View All Reports
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
