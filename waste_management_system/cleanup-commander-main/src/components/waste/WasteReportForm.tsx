import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from '@/hooks/use-toast';
import { Loader, MapPin, AlertCircle } from 'lucide-react';
import FileUploader from './FileUploader';
import { useReportContext } from '../../context/ReportContext'; // We'll create this context

const WasteReportForm = () => {
  const [wasteType, setWasteType] = useState('');
  const [location, setLocation] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('kg');
  const [useCurrentLocation, setUseCurrentLocation] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const navigate = useNavigate();
  const { addReport, addActivity } = useReportContext(); // Get the context function

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!wasteType || !location || !description) {
      toast({
        title: "Incomplete form",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    
    setIsLoading(true);
    
    // Simulating API call for submitting waste report
    try {
      // In a real app, this would be an actual API call
      // You would probably upload the files to a server here as well
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Get the readable waste type label
      const wasteTypeLabel = getWasteTypeLabel(wasteType);
      
      // Create a new report object
      const newReport = {
        id: Date.now(), // Generate a temporary ID
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        time: '10:00 AM - 12:00 PM', // Default time or you could add time selection to the form
        address: location,
        wasteType: wasteTypeLabel,
        status: 'scheduled' as const,
        quantity: quantity ? `${quantity} ${unit}` : 'Not specified',
        description: description,
        imageCount: uploadedFiles.length
      };
      
      // Add to context
      addReport(newReport);

      // Create and add an activity
      const newActivity = {
        id: Date.now(),
        type: 'report' as const,
        title: 'Waste Reported',
        description: `${wasteTypeLabel} reported at ${location.substring(0, 30)}${location.length > 30 ? '...' : ''}`,
        date: 'Just now',
        status: 'pending' as const
      };
      
      // Add to activities
      addActivity(newActivity);
      
      toast({
        title: "Report submitted successfully",
        description: "Your waste report has been submitted for processing.",
        variant: "default",
      });
      
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Submission failed",
        description: "There was an error submitting your report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  // Helper function to get the readable waste type label
  const getWasteTypeLabel = (type: string): string => {
    const wasteTypes: Record<string, string> = {
      'recyclable': 'Recyclable (Paper, Plastic, Glass)',
      'organic': 'Organic Waste',
      'electronic': 'Electronic Waste',
      'hazardous': 'Hazardous Waste',
      'construction': 'Construction Debris',
      'other': 'Other Waste'
    };
    
    return wasteTypes[type] || type;
  };
  
  const handleGetCurrentLocation = () => {
    setUseCurrentLocation(true);
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setLocation(`Lat: ${latitude.toFixed(6)}, Lng: ${longitude.toFixed(6)}`);
          
          toast({
            title: "Location detected",
            description: "Your current location has been added to the report.",
          });
        },
        (error) => {
          console.error('Error getting location:', error);
          setUseCurrentLocation(false);
          
          toast({
            title: "Location error",
            description: "Could not get your current location. Please enter manually.",
            variant: "destructive",
          });
        }
      );
    } else {
      setUseCurrentLocation(false);
      toast({
        title: "Geolocation not supported",
        description: "Your browser doesn't support geolocation. Please enter location manually.",
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Report Waste</CardTitle>
        <CardDescription>
          Please provide details about the waste you want to report for collection.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Form fields remain unchanged */}
          <div className="space-y-4">
            <div>
              <Label htmlFor="wasteType">Waste Type</Label>
              <Select value={wasteType} onValueChange={setWasteType} required>
                <SelectTrigger id="wasteType">
                  <SelectValue placeholder="Select waste type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Waste Categories</SelectLabel>
                    <SelectItem value="recyclable">Recyclable (Paper, Plastic, Glass)</SelectItem>
                    <SelectItem value="organic">Organic Waste</SelectItem>
                    <SelectItem value="electronic">Electronic Waste</SelectItem>
                    <SelectItem value="hazardous">Hazardous Waste</SelectItem>
                    <SelectItem value="construction">Construction Debris</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <Label htmlFor="location">Location</Label>
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="sm" 
                  className="h-7 text-xs text-eco-primary"
                  onClick={handleGetCurrentLocation}
                  disabled={useCurrentLocation && !location}
                >
                  {useCurrentLocation && !location ? (
                    <Loader className="h-3 w-3 mr-1 animate-spin" />
                  ) : (
                    <MapPin className="h-3 w-3 mr-1" />
                  )}
                  Use Current Location
                </Button>
              </div>
              <Input 
                id="location" 
                placeholder="Enter waste location or address" 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="quantity">Quantity</Label>
                <Input 
                  id="quantity" 
                  type="number" 
                  min="0"
                  placeholder="Enter quantity" 
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="unit">Unit</Label>
                <Select value={unit} onValueChange={setUnit}>
                  <SelectTrigger id="unit">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">Kilograms (kg)</SelectItem>
                    <SelectItem value="tons">Tons</SelectItem>
                    <SelectItem value="bags">Bags</SelectItem>
                    <SelectItem value="items">Items</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                placeholder="Provide additional details about the waste" 
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div>
              <Label>Photos</Label>
              <div className="mt-1">
                <FileUploader 
                  onFilesSelected={setUploadedFiles}
                  maxFiles={3}
                  accept="image/*"
                  maxSize={5}
                />
              </div>
              <p className="text-xs text-muted-foreground mt-1 flex items-center">
                <AlertCircle className="h-3 w-3 mr-1" />
                Photos help our team prepare for the pickup.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-3">
            <Button 
              type="button" 
              variant="outline"
              onClick={() => navigate('/dashboard')}
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              className="bg-eco-primary hover:bg-eco-dark"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Report"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default WasteReportForm;