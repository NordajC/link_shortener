// import React from 'react';
// import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
// import { BarChart3, Link, QrCode, Zap } from 'lucide-react';
// import { motion } from 'framer-motion';

// const features = [
//   { icon: <Zap />, title: 'Lightning Fast', description: 'Create short links in milliseconds with our optimized service.' },
//   { icon: <BarChart3 />, title: 'Link Analytics', description: 'Track every click and measure your link performance with detailed stats.' },
//   { icon: <Link />, title: 'Custom Links', description: 'Brand your links with custom names that are easy to remember.' },
//   // Add more features if you like
// ];

// export const FeaturesSection = () => {
//   return (
//     <section className="py-20">
//       <div className="container mx-auto">
//         <h2 className="text-3xl font-bold text-center mb-4">Why Choose Us?</h2>
//         <p className="text-muted-foreground text-center max-w-2xl mx-auto mb-12">
//           We provide a full suite of tools to help you get the most out of every link.
//         </p>
//         <div className="grid md:grid-cols-3 gap-8">
//           {features.map((feature, index) => (
//             <motion.div
//               key={feature.title}
//               initial={{ opacity: 0, y: 50 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.5, delay: index * 0.1 }}
//             >
//               <Card>
//                 <CardHeader>
//                   <div className="bg-primary/10 text-primary p-3 rounded-full w-fit mb-4">
//                     {feature.icon}
//                   </div>
//                   <CardTitle>{feature.title}</CardTitle>
//                   <CardDescription>{feature.description}</CardDescription>
//                 </CardHeader>
//               </Card>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// };

import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { BarChart3, Link, QrCode } from 'lucide-react';
import { motion } from 'framer-motion';

const featurePoints = [
  { icon: <BarChart3 className="h-5 w-5 text-primary" />, title: 'In-Depth Analytics', description: 'Understand your audience with detailed click tracking and reports.' },
  { icon: <Link className="h-5 w-5 text-primary" />, title: 'Custom Branded Links', description: 'Strengthen your brand with customizable short URLs.' },
  { icon: <QrCode className="h-5 w-5 text-primary" />, title: 'Dynamic QR Codes', description: 'Generate QR codes for your links to bridge the physical and digital worlds.' },
];

export const FeaturesSection = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto">
        <div className="text-center mb-12">
            <h2 className="text-3xl font-bold">Go Beyond Shortening</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto mt-2">
                Our platform is a complete link management solution.
            </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="bg-muted/50">
                  <CardContent className="p-8">
                      <img 
                          src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg" // Replace with a screenshot of your app's dashboard
                          alt="Dashboard Preview"
                          className="rounded-lg shadow-xl w-full"
                      />
                  </CardContent>
              </Card>
            </motion.div>
            
            <div className="space-y-8">
              {featurePoints.map((feature, index) => (
                 <motion.div 
                    key={index}
                    className="flex items-start gap-4"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: index * 0.15 }}
                  >
                   <div className="bg-primary/10 text-primary p-3 rounded-lg w-fit h-fit">
                        {feature.icon}
                   </div>
                   <div>
                       <h3 className="font-semibold text-lg">{feature.title}</h3>
                       <p className="text-muted-foreground">{feature.description}</p>
                   </div>
                </motion.div>
              ))}
            </div>
        </div>
      </div>
    </section>
  );
};