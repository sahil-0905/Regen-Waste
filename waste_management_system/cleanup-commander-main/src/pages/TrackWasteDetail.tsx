
import Layout from '@/components/layout/Layout';
import TrackingDetail from '@/components/tracking/TrackingDetail';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TrackWasteDetail = () => {
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
        <h1 className="text-2xl font-bold mb-6">Pickup Tracking Details</h1>
        <TrackingDetail />
      </div>
    </Layout>
  );
};

export default TrackWasteDetail;
