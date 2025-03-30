
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Truck, Calendar, Clock, MapPin, CheckCircle2, Phone, Loader } from 'lucide-react';

interface PickupDetails {
  id: string;
  status: 'scheduled' | 'confirmed' | 'in-transit' | 'completed';
  date: string;
  time: string;
  address: string;
  wasteType: string;
  driverName?: string;
  driverPhone?: string;
  estimatedArrival?: string;
  progress: number;
  statusHistory: {
    status: string;
    time: string;
    description: string;
  }[];
}

const mockPickupDetails: Record<string, PickupDetails> = {
  '1': {
    id: '1',
    status: 'scheduled',
    date: 'May 15, 2023',
    time: '10:00 AM - 12:00 PM',
    address: '123 Main St, Apt 4B, Eco City',
    wasteType: 'Recyclables (Paper, Plastic)',
    progress: 25,
    statusHistory: [
      {
        status: 'Request Received',
        time: 'May 10, 2023 - 11:23 AM',
        description: 'Your pickup request has been received and is being processed.'
      },
      {
        status: 'Scheduled',
        time: 'May 10, 2023 - 11:45 AM',
        description: 'Your pickup has been scheduled for May 15, 2023 between 10:00 AM and 12:00 PM.'
      }
    ]
  },
  '2': {
    id: '2',
    status: 'confirmed',
    date: 'May 20, 2023',
    time: '2:00 PM - 4:00 PM',
    address: '45 Park Avenue, Suite 301, Eco City',
    wasteType: 'Electronic Waste',
    progress: 50,
    statusHistory: [
      {
        status: 'Request Received',
        time: 'May 15, 2023 - 09:12 AM',
        description: 'Your pickup request has been received and is being processed.'
      },
      {
        status: 'Scheduled',
        time: 'May 15, 2023 - 09:30 AM',
        description: 'Your pickup has been scheduled for May 20, 2023 between 2:00 PM and 4:00 PM.'
      },
      {
        status: 'Confirmed',
        time: 'May 18, 2023 - 02:15 PM',
        description: 'Your pickup has been confirmed and assigned to a driver.'
      }
    ]
  },
  '3': {
    id: '3',
    status: 'in-transit',
    date: 'May 22, 2023',
    time: '9:00 AM - 11:00 AM',
    address: '78 Green Street, Eco City',
    wasteType: 'Organic Waste',
    driverName: 'Michael Johnson',
    driverPhone: '(555) 123-4567',
    estimatedArrival: '9:45 AM',
    progress: 75,
    statusHistory: [
      {
        status: 'Request Received',
        time: 'May 18, 2023 - 10:05 AM',
        description: 'Your pickup request has been received and is being processed.'
      },
      {
        status: 'Scheduled',
        time: 'May 18, 2023 - 10:30 AM',
        description: 'Your pickup has been scheduled for May 22, 2023 between 9:00 AM and 11:00 AM.'
      },
      {
        status: 'Confirmed',
        time: 'May 21, 2023 - 04:20 PM',
        description: 'Your pickup has been confirmed and assigned to a driver.'
      },
      {
        status: 'In Transit',
        time: 'May 22, 2023 - 08:45 AM',
        description: 'Driver is en route to your location for pickup.'
      }
    ]
  }
};

const getStatusBadge = (status: PickupDetails['status']) => {
  switch (status) {
    case 'scheduled':
      return <Badge className="bg-amber-500">Scheduled</Badge>;
    case 'confirmed':
      return <Badge className="bg-sky-primary">Confirmed</Badge>;
    case 'in-transit':
      return <Badge className="bg-blue-500">In Transit</Badge>;
    case 'completed':
      return <Badge className="bg-green-500">Completed</Badge>;
    default:
      return null;
  }
};

const TrackingDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [pickup, setPickup] = useState<PickupDetails | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Simulating API call to fetch pickup details
    const fetchPickupDetails = async () => {
      setIsLoading(true);
      try {
        // In a real app, this would be an actual API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Get the pickup details from our mock data
        if (id && mockPickupDetails[id]) {
          setPickup(mockPickupDetails[id]);
        } else {
          // If no matching pickup is found, navigate to the tracking page
          navigate('/track');
        }
      } catch (error) {
        console.error('Error fetching pickup details:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchPickupDetails();
  }, [id, navigate]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader className="h-8 w-8 animate-spin text-eco-primary" />
      </div>
    );
  }
  
  if (!pickup) {
    return (
      <Card>
        <CardContent className="py-10">
          <div className="text-center space-y-3">
            <p className="text-lg font-medium">Pickup not found</p>
            <p className="text-muted-foreground">The requested pickup could not be found.</p>
            <Button 
              className="mt-4 bg-eco-primary hover:bg-eco-dark"
              onClick={() => navigate('/track')}
            >
              Back to Tracking
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }
  
  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Pickup Tracking</CardTitle>
            <CardDescription>
              Track your waste pickup request status
            </CardDescription>
          </div>
          {getStatusBadge(pickup.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <p className="text-sm font-medium mb-2">Pickup Progress</p>
          <Progress value={pickup.progress} className="h-2" />
          <div className="flex justify-between mt-1 text-xs text-muted-foreground">
            <span>Scheduled</span>
            <span>Confirmed</span>
            <span>In Transit</span>
            <span>Completed</span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Truck className="h-4 w-4 text-eco-primary" />
              <span className="font-medium">Waste Type:</span> {pickup.wasteType}
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-eco-primary" />
              <span className="font-medium">Pickup Date:</span> {pickup.date}
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4 text-eco-primary" />
              <span className="font-medium">Pickup Time:</span> {pickup.time}
            </div>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-start space-x-2">
              <MapPin className="h-4 w-4 text-eco-primary shrink-0 mt-0.5" />
              <div>
                <span className="font-medium">Address:</span>
                <p className="text-muted-foreground">{pickup.address}</p>
              </div>
            </div>
            
            {pickup.status === 'in-transit' && pickup.driverName && (
              <>
                <div className="flex items-center space-x-2">
                  <CheckCircle2 className="h-4 w-4 text-eco-primary" />
                  <span className="font-medium">Driver:</span> {pickup.driverName}
                </div>
                
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-eco-primary" />
                  <span className="font-medium">Contact:</span>
                  <Button variant="link" className="p-0 h-auto underline text-sm text-sky-primary">
                    {pickup.driverPhone}
                  </Button>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-eco-primary" />
                  <span className="font-medium">Est. Arrival:</span> {pickup.estimatedArrival}
                </div>
              </>
            )}
          </div>
        </div>
        
        <Separator />
        
        <div>
          <h3 className="text-sm font-medium mb-4">Status History</h3>
          <div className="space-y-4">
            {pickup.statusHistory.map((status, index) => (
              <div key={index} className="relative pl-6 pb-4">
                {/* Timeline connector */}
                {index !== pickup.statusHistory.length - 1 && (
                  <div className="absolute left-[9px] top-[10px] bottom-0 w-0.5 bg-muted" />
                )}
                
                {/* Status dot */}
                <div className={`absolute left-0 top-1 h-4 w-4 rounded-full border-2 
                  ${index === pickup.statusHistory.length - 1 
                    ? 'bg-eco-primary border-eco-light' 
                    : 'bg-white border-eco-primary'}`} 
                />
                
                <div>
                  <p className="font-medium">{status.status}</p>
                  <p className="text-xs text-muted-foreground mb-1">{status.time}</p>
                  <p className="text-sm">{status.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex justify-between pt-4">
          <Button 
            variant="outline"
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
          
          {pickup.status !== 'completed' && (
            <Button 
              variant="outline" 
              className="text-red-500 border-red-200 hover:text-red-700 hover:bg-red-50"
              onClick={() => navigate('/contact')}
            >
              Report an Issue
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingDetail;
