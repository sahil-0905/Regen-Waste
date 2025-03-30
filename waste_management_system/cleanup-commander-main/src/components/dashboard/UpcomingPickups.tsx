
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Truck, Calendar, MapPin, Clock, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Pickup {
  id: number;
  date: string;
  time: string;
  address: string;
  wasteType: string;
  status: 'scheduled' | 'in-transit' | 'completed';
}

const pickups: Pickup[] = [
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

const getStatusBadge = (status: Pickup['status']) => {
  switch (status) {
    case 'scheduled':
      return <Badge className="bg-eco-primary">Scheduled</Badge>;
    case 'in-transit':
      return <Badge className="bg-sky-primary">In Transit</Badge>;
    case 'completed':
      return <Badge className="bg-green-500">Completed</Badge>;
    default:
      return null;
  }
};

const UpcomingPickups = () => {
  const navigate = useNavigate();
  
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div>
          <CardTitle>Upcoming Pickups</CardTitle>
          <CardDescription>Your scheduled waste collections</CardDescription>
        </div>
        <Button 
          variant="outline" 
          size="sm" 
          className="text-sky-primary"
          onClick={() => navigate('/schedule')}
        >
          Schedule New
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {pickups.map((pickup) => (
            <div key={pickup.id} className="border rounded-lg p-4 space-y-3">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <Truck className="h-5 w-5 text-eco-primary" />
                  <h4 className="font-medium">{pickup.wasteType}</h4>
                </div>
                {getStatusBadge(pickup.status)}
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                <div className="flex items-center space-x-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span>{pickup.date}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{pickup.time}</span>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 text-sm">
                <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
                <span className="text-muted-foreground">{pickup.address}</span>
              </div>
              
              <div className="pt-2 flex justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="text-sky-primary"
                  onClick={() => navigate(`/track/${pickup.id}`)}
                >
                  <ExternalLink className="h-3.5 w-3.5 mr-1" />
                  Track
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default UpcomingPickups;
