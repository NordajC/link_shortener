import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

const tiers = [
  {
    name: 'Current',
    price: '$0',
    description: 'Perfect for personal use and getting started.',
    features: ['Unlimited Links', 'Link Analytics', '7-Day Expiration'],
    isFeatured: false,
  },
  {
    name: 'Future',
    price: '0',
    description: 'Features that will be intergrated within the next few weeks/months.',
    features: ['All in Starter, plus:', 'Advanced Analytics', 'Custom Links', 'QR Codes', 'Custom Domains'],
    isFeatured: true,
  },
];

export const PricingSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Find the Perfect Plan</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
                Start for free, then upgrade when you're ready.
            </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-start">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className={`flex flex-col h-full ${tier.isFeatured ? 'border-primary shadow-2xl shadow-primary/10' : ''}`}>
                <CardHeader>
                  <CardTitle>{tier.name}</CardTitle>
                  <div className="text-4xl font-bold pt-4">
                    {tier.price} <span className="text-lg font-normal text-muted-foreground">/ month</span>
                  </div>
                  <CardDescription className="pt-2">{tier.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                  <ul className="space-y-3">
                    {tier.features.map((feature) => (
                      <li key={feature} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-2" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" size="lg" variant={tier.isFeatured ? 'default' : 'outline'}>
                    Choose Plan
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};