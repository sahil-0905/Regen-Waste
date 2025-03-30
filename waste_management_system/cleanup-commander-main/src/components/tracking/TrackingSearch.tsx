
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from '@/hooks/use-toast';
import { Search, Loader } from 'lucide-react';

const TrackingSearch = () => {
  const [trackingId, setTrackingId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!trackingId.trim()) {
      toast({
        title: "Please enter a tracking ID",
        description: "Tracking ID is required to search for your pickup.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulating API call to verify tracking ID
    try {
      // In a real app, this would be an actual API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // For demo purposes, we'll accept IDs 1, 2, and 3
      if (['1', '2', '3'].includes(trackingId)) {
        navigate(`/track/${trackingId}`);
      } else {
        toast({
          title: "Tracking ID not found",
          description: "The tracking ID you entered could not be found. Please check and try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Search failed",
        description: "There was an error searching for the tracking ID. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Track Your Pickup</CardTitle>
        <CardDescription>
          Enter your tracking ID to check the status of your waste pickup request.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="trackingId">Tracking ID</Label>
            <div className="relative">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input 
                id="trackingId" 
                placeholder="Enter your tracking ID (e.g., 123456)" 
                className="pl-10"
                value={trackingId}
                onChange={(e) => setTrackingId(e.target.value)}
                required
              />
            </div>
            <p className="text-xs text-muted-foreground">
              Your tracking ID was provided to you when you scheduled your pickup.
            </p>
          </div>
          
          <div className="flex justify-end">
            <Button 
              type="submit"
              className="bg-eco-primary hover:bg-eco-dark"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Searching...
                </>
              ) : (
                "Track Pickup"
              )}
            </Button>
          </div>
        </form>
        
        <div className="mt-10 border-t pt-6">
          <h3 className="text-sm font-medium mb-4">Recent Pickups</h3>
          <div className="space-y-3">
            {[1, 2, 3].map((id) => (
              <Button 
                key={id}
                variant="outline"
                className="w-full justify-between px-4 text-left h-auto py-3"
                onClick={() => navigate(`/track/${id}`)}
              >
                <div>
                  <p className="font-medium">Tracking ID: {id}</p>
                  <p className="text-xs text-muted-foreground">
                    {id === 1 ? 'Recyclables (Paper, Plastic)' : id === 2 ? 'Electronic Waste' : 'Organic Waste'}
                  </p>
                </div>
                <Search className="h-4 w-4" />
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TrackingSearch;
