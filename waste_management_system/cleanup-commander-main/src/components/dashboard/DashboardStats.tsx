
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Trash2, Recycle, Calendar, Clock } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  progress?: number;
  color?: string;
}

const StatCard = ({ title, value, icon, description, progress, color = "bg-eco-primary" }: StatCardProps) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      <div className={`${color} p-2 rounded-full text-white`}>
        {icon}
      </div>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
      {progress !== undefined && (
        <div className="mt-3">
          <Progress value={progress} className="h-2" />
          <p className="text-xs text-right mt-1">{progress}% of monthly goal</p>
        </div>
      )}
    </CardContent>
  </Card>
);

const DashboardStats = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatCard
        title="Total Waste Reported"
        value="1,256 kg"
        icon={<Trash2 className="h-4 w-4" />}
        progress={65}
      />
      <StatCard
        title="Recycled Waste"
        value="856 kg"
        icon={<Recycle className="h-4 w-4" />}
        progress={78}
        color="bg-sky-primary"
      />
      <StatCard
        title="Scheduled Pickups"
        value="8"
        icon={<Calendar className="h-4 w-4" />}
        description="3 pending, 5 completed"
        color="bg-earth-primary"
      />
      <StatCard
        title="Average Response Time"
        value="4.2 hrs"
        icon={<Clock className="h-4 w-4" />}
        description="13% faster than last month"
        color="bg-earth-light"
      />
    </div>
  );
};

export default DashboardStats;
