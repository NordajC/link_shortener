import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { BarChart3, Link2, MoreHorizontal, MousePointerClick } from 'lucide-react';
import { motion } from 'framer-motion';

// A sub-component for the animated feature callouts (the "speech bubbles")
const FeatureCallout = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true, amount: 0.8 }}
    transition={{ duration: 0.5 }}
    className={`absolute hidden lg:flex items-center gap-3 ${className}`}
  >
    <div className="bg-background p-3 rounded-lg shadow-xl border text-sm whitespace-nowrap max-w-[200px]">{children}</div>
    <div className="w-8 h-px bg-primary/50"></div>
    <div className="w-2 h-2 rounded-full bg-primary shrink-0"></div>
  </motion.div>
);

export const DashboardShowcase = () => {
  return (
    // Fixed overflow issues with proper container structure
    <section className="py-20 bg-muted/50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold">A Dashboard Built for Control</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
            Go beyond simple shortening. Our dashboard gives you the tools to manage and analyze every link.
          </p>
        </div>

        {/* Main container for the mock-up and callouts - with proper overflow handling */}
        <div className="relative max-w-5xl mx-auto">
          {/* Feature Callouts - positioned more carefully to avoid overflow */}
          <FeatureCallout className="top-[10%] right-full mr-2 xl:mr-4">
            Visualize your traffic
          </FeatureCallout>
          <FeatureCallout className="top-[35%] left-full ml-2 xl:ml-4">
            Customize links with names
          </FeatureCallout>
          <FeatureCallout className="bottom-[20%] right-full mr-2 xl:mr-4">
            Manage links with ease
          </FeatureCallout>

          {/* The Mock Dashboard */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full"
          >
            <Card className="w-full max-w-2xl mx-auto shadow-2xl bg-background">
              <CardContent className="p-4 sm:p-6 space-y-6">
                {/* Mock Analytics Section */}
                <div className="grid grid-cols-2 gap-4">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Total Clicks</CardTitle>
                      <BarChart3 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">12,504</div>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                      <CardTitle className="text-sm font-medium">Active Links</CardTitle>
                      <Link2 className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">82</div>
                    </CardContent>
                  </Card>
                </div>

                {/* Mock Create Form - with better responsive handling */}
                <div className="flex gap-2">
                  <Input 
                    readOnly 
                    placeholder="https://your-next-big-idea.com/..."
                    className="min-w-0 flex-1"
                  />
                  <Button disabled className="shrink-0">Shorten</Button>
                </div>

                {/* Mock Link Cards */}
                <div className="space-y-3">
                  <Card className="bg-muted/50">
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                      <CardTitle className="text-base">My Awesome Project</CardTitle>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MousePointerClick className="w-4 h-4 mr-2" /> 1,234 Clicks
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                   <Card>
                    <CardHeader className="flex flex-row items-center justify-between p-4">
                      <CardTitle className="text-base">Social Media Campaign</CardTitle>
                       <div className="flex items-center gap-4">
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MousePointerClick className="w-4 h-4 mr-2" /> 4,815 Clicks
                        </div>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                  </Card>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
};