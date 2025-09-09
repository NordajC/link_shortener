import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { createShortUrl } from '../services/urlService';
import type { CreateUrlPayload } from '../services/urlService';
import { toast } from 'sonner';

interface CreateLinkFormProps {
  onLinkCreated: () => void;
}

export const CreateLinkForm: React.FC<CreateLinkFormProps> = ({ onLinkCreated }) => {
  const [longUrl, setLongUrl] = useState('');
  const [name, setName] = useState('');
  const [expiresAt, setExpiresAt] = useState('');
  const [enableExpiration, setEnableExpiration] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!longUrl) {
      toast.error('Please enter a URL to shorten.');
      return;
    }
    setIsLoading(true);
    try {
      const payload: CreateUrlPayload = {
        longUrl,
        name: name || undefined,
        expiresAt: enableExpiration ? new Date(expiresAt).toISOString() : null,
      };
      await createShortUrl(payload);
      onLinkCreated(); // Callback to refresh the list in the parent
      setLongUrl('');
      setName('');
      setExpiresAt('');
      setEnableExpiration(false);
      toast.success('Link created successfully');
    } catch (error) {
      console.error(error);
      toast.error('Failed to create link');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="mb-8">
      <CardHeader>
        <CardTitle>Create a New Link</CardTitle>
        <CardDescription>Enter a long URL to create a shortened version.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="longUrl">Destination URL</Label>
            <Input
              id="longUrl"
              type="url"
              placeholder="https://github.com/your-repo/..."
              value={longUrl}
              onChange={(e) => setLongUrl(e.target.value)}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">Custom Name (Optional)</Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., My Awesome Project"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="flex items-center justify-between space-x-4">
            <div className="flex items-center space-x-2">
              <Switch
                id="expiration-switch"
                checked={enableExpiration}
                onCheckedChange={setEnableExpiration}
              />
              <Label htmlFor="expiration-switch">Set Expiration</Label>
            </div>
            {enableExpiration && (
              <Input
                type="datetime-local"
                value={expiresAt}
                onChange={(e) => setExpiresAt(e.target.value)}
                className="flex-grow"
              />
            )}
          </div>
          <Button type="submit" className="w-full md:w-auto" disabled={isLoading}>
            {isLoading ? 'Shortening...' : 'Shorten'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};