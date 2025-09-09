import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Link2, BarChart } from 'lucide-react';
import { toast } from 'sonner';
import { AnalyticsChart } from '../components/analyticsChart';

interface ChartDataItem {
  date: string;
  clicks: number;
}

interface AnalyticsData {
  totalLinks: number;
  totalClicks: number;
  chartData: ChartDataItem[];
}

export const AnalyticsDashboard = () => {
  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchAnalytics = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiUrl}/api/url/analytics`, { credentials: 'include' });
        if (!res.ok) throw new Error('Failed to fetch analytics');
        const data = await res.json();
        setAnalytics(data);
      } catch (error) {
        console.error(error);
        toast.error('Could not load analytics.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchAnalytics();
  }, [apiUrl]);

  return (
    <div className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Links</CardTitle>
            <Link2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : analytics?.totalLinks}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
            <BarChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{isLoading ? '...' : analytics?.totalClicks}</div>
          </CardContent>
        </Card>
      </div>
      
      {isLoading ? (
         <Card className="h-[438px] flex items-center justify-center"><p className="text-muted-foreground">Loading chart...</p></Card>
      ) : (
        analytics && analytics.chartData && <AnalyticsChart data={analytics.chartData} />
      )}
    </div>
  );
};