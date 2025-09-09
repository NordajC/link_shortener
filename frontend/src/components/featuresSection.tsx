import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BarChart3, Link, QrCode, Zap, Clock, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

const features = [
  { 
    icon: <Zap className="h-6 w-6" />, 
    title: 'Lightning Fast', 
    description: 'Create short links in milliseconds with our optimized service.' 
  },
  { 
    icon: <BarChart3 className="h-6 w-6" />, 
    title: 'Link Analytics', 
    description: 'Track every click and measure your link performance with detailed stats.' 
  },
  { 
    icon: <Link className="h-6 w-6" />, 
    title: 'Custom Links', 
    description: 'Brand your links with custom names that are easy to remember.' 
  },
  { 
    icon: <QrCode className="h-6 w-6" />, 
    title: 'QR Codes', 
    description: 'Generate QR codes for your short links to use in print and other media.' 
  },
  { 
    icon: <Clock className="h-6 w-6" />, 
    title: 'Link Expiration', 
    description: 'Set an expiration date for your links for time-sensitive campaigns.' 
  },
  { 
    icon: <Shield className="h-6 w-6" />, 
    title: 'Secure Links', 
    description: 'All links are protected with HTTPS to ensure your data is safe.' 
  },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Why Choose Us?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
              We provide a full suite of tools to help you get the most out of every link.
            </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full hover:border-primary transition-colors group">
                <CardHeader>
                  <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit mb-4 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {feature.icon}
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};