import React, { useEffect, useState, useCallback } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { MoreHorizontal, BarChart2, CalendarOff } from 'lucide-react';
import { toast } from 'sonner';
import { getUserUrls, deleteUrl } from '../services/urlService';
import type { Url } from '../services/urlService';
import { CreateLinkForm } from '../components/createLinkForm';
import { AnalyticsDashboard } from '../components/analyticsDashboard';

// This interface is now simpler because the service handles the full definition
interface DisplayUrl {
    _id: string;
    name?: string;
    longUrl: string;
    shortCode: string;
    clickCount: number;
    expiresAt?: string;
}

export default function Dashboard() {
  const [urls, setUrls] = useState<DisplayUrl[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const apiUrl = import.meta.env.VITE_API_URL;

  const fetchUrls = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getUserUrls();
      setUrls(data as DisplayUrl[]);
    } catch (error) {
      console.error(error);
      toast.error('Could not load your links.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUrls();
  }, [fetchUrls]);

  const handleDelete = async (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await deleteUrl(id);
      setUrls((prevUrls) => prevUrls.filter((url) => url._id !== id));
      toast.success('Link deleted successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete link');
    }
  };

  const handleCopy = (shortCode: string) => {
    const fullShortUrl = `${apiUrl}/api/url/${shortCode}`;
    navigator.clipboard.writeText(fullShortUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <div className="container mx-auto p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h1>
        <p className="text-muted-foreground">
          Create and manage your short links.
        </p>
      </div>

      <AnalyticsDashboard />

      <div>
        <h2 className="text-2xl font-bold tracking-tight">My Links</h2>
        <CreateLinkForm onLinkCreated={fetchUrls} />
      </div>

      {isLoading ? (
        <div className="text-center py-16">
            <p className="text-muted-foreground">Loading your links...</p>
        </div>
      ) : urls.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {urls.map((url) => (
            <Card
              key={url._id}
              onClick={() => handleCopy(url.shortCode)}
              className="cursor-pointer hover:border-primary transition-colors group"
            >
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-semibold truncate" title={url.name || url.longUrl}>
                  {url.name || new URL(url.longUrl).hostname.replace('www.','')}
                </CardTitle>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0" onClick={(e) => e.stopPropagation()}>
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" onClick={(e) => e.stopPropagation()}>
                    <DropdownMenuItem onClick={(e) => handleDelete(url._id, e)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </CardHeader>
              <CardContent className="space-y-4">
                 <p className="text-sm text-blue-500 group-hover:underline truncate" title={`${apiUrl}/api/url/${url.shortCode}`}>
                    {`${apiUrl.replace(/https?:\/\//, '')}/api/url/${url.shortCode}`}
                </p>
                <div className="flex items-center text-xs text-muted-foreground space-x-4">
                    <div className="flex items-center">
                        <BarChart2 className="mr-1 h-3 w-3" />
                        {url.clickCount} Clicks
                    </div>
                    {url.expiresAt && (
                        <div className="flex items-center">
                            <CalendarOff className="mr-1 h-3 w-3" />
                            Expires {new Date(url.expiresAt).toLocaleDateString()}
                        </div>
                    )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-16 border-2 border-dashed rounded-lg">
            <h2 className="text-xl font-semibold">No links yet!</h2>
            <p className="text-muted-foreground mt-2">Create your first short link using the form above.</p>
        </div>
      )}
    </div>
  );
}