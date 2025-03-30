
import Layout from '@/components/layout/Layout';
import SchedulePickupForm from '@/components/waste/SchedulePickupForm';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SchedulePickup = () => {
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
      <div className="py-6">
        <h1 className="text-2xl font-bold mb-6">Schedule Pickup</h1>
        <SchedulePickupForm />
      </div>
    </Layout>
  );
};

export default SchedulePickup;
