// 3. Update the RecentActivities component to use the context

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Trash2, Truck, Package, CheckCircle2 } from 'lucide-react';
import { useReportContext, Activity } from '../../context/ReportContext';

const getActivityIcon = (type: Activity['type']) => {
  switch (type) {
    case 'report':
      return <Trash2 className="h-5 w-5 text-eco-primary" />;
    case 'schedule':
      return <Calendar className="h-5 w-5 text-sky-primary" />;
    case 'pickup':
      return <Truck className="h-5 w-5 text-earth-primary" />;
    case 'complete':
      return <CheckCircle2 className="h-5 w-5 text-green-500" />;
    default:
      return <Package className="h-5 w-5" />;
  }
};

const getStatusBadge = (status?: Activity['status']) => {
  if (!status) return null;
  
  switch (status) {
    case 'pending':
      return <Badge variant="outline" className="border-amber-500 text-amber-500">Pending</Badge>;
    case 'in-progress':
      return <Badge variant="outline" className="border-blue-500 text-blue-500">In Progress</Badge>;
    case 'completed':
      return <Badge variant="outline" className="border-green-500 text-green-500">Completed</Badge>;
    default:
      return null;
  }
};

const RecentActivities = () => {
  const { activities } = useReportContext();
  
  // Check for newly added activities (those with "Just now" as the date)
  const isNewActivity = (activity: Activity) => {
    return activity.date === 'Just now';
  };
  
  return (
    <Card className="col-span-1 lg:col-span-2">
      <CardHeader>
        <CardTitle>Recent Activities</CardTitle>
        <CardDescription>Your latest waste management activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div 
              key={activity.id} 
              className={`flex items-start space-x-4 p-3 rounded-lg ${isNewActivity(activity) ? 'bg-green-50' : 'hover:bg-slate-50'} transition-colors`}
            >
              <div className={`p-2 rounded-full ${isNewActivity(activity) ? 'bg-green-100' : 'bg-slate-100'}`}>
                {getActivityIcon(activity.type)}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className={`font-medium ${isNewActivity(activity) ? 'text-green-700' : ''}`}>
                    {activity.title} {isNewActivity(activity) && <span className="text-xs text-green-600 ml-2">(New)</span>}
                  </p>
                  {getStatusBadge(activity.status)}
                </div>
                <p className="text-sm text-muted-foreground">{activity.description}</p>
                <p className={`text-xs ${isNewActivity(activity) ? 'text-green-700 font-medium' : 'text-muted-foreground'}`}>
                  {activity.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RecentActivities;