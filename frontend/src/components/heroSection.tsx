// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { toast } from 'sonner';
// import { Copy } from 'lucide-react';
// import { motion } from 'framer-motion';

// export const HeroSection = () => {
//   const [longUrl, setLongUrl] = useState('');
//   const [shortCode, setShortCode] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const apiUrl = import.meta.env.VITE_API_URL;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setShortCode('');
//     try {
//       const res = await fetch(`${apiUrl}/api/url/public`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ longUrl }),
//       });
//       if (!res.ok) throw new Error('Failed to shorten link');
//       const data = await res.json();
//       setShortCode(data.shortCode);
//     } catch (error) {
//       toast.error('Something went wrong. Please try another URL.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fullShortUrl = `${apiUrl}/api/url/${shortCode}`;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(fullShortUrl);
//     toast.success('Link copied to clipboard!');
//   };

//   return (
//     <section className="w-full py-20 md:py-32 relative">
//       {/* Background Image Container */}
//       <div className="absolute inset-0 z-0">
//         <img
//           src="https://images.pexels.com/photos/1591060/pexels-photo-1591060.jpeg" // Replace with your stunning visual
//           alt="Background"
//           className="w-full h-full object-cover opacity-10"
//         />
//         <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent"></div>
//       </div>

//       {/* Content */}
//       <div className="container mx-auto text-center relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">
//             Shorten. Share. Simplify.
//           </h1>
//           <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
//             The simple and powerful link shortener built for the modern web.
//             Links created here expire in 7 days.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <Card className="w-full max-w-lg mx-auto shadow-2xl bg-background/80 backdrop-blur-sm">
//             <CardContent className="p-6">
//               <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
//                 <Input
//                   type="url"
//                   placeholder="https://your-long-url.com/goes-here"
//                   value={longUrl}
//                   onChange={(e) => setLongUrl(e.target.value)}
//                   required
//                   className="h-12 text-base"
//                 />
//                 <Button type="submit" className="h-12 px-6" disabled={isLoading}>
//                   {isLoading ? 'Creating...' : 'Shorten'}
//                 </Button>
//               </form>
//               {shortCode && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   className="mt-4 p-4 bg-muted rounded-md flex items-center justify-between overflow-hidden"
//                 >
//                   <span className="text-blue-500 font-mono truncate">{fullShortUrl}</span>
//                   <Button variant="ghost" size="icon" onClick={handleCopy}>
//                     <Copy className="h-4 w-4" />
//                   </Button>
//                 </motion.div>
//               )}
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// };


// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { toast } from 'sonner';
// import { Copy, Link, BarChart, QrCode } from 'lucide-react';
// import { motion } from 'framer-motion';

// // A small component for the floating icons
// const FloatingIcon = ({
//   icon,
//   className,
//   style,
// }: {
//   icon: React.ReactNode;
//   className?: string;
//   style?: React.CSSProperties;
// }) => (
//   <motion.div
//     className={`absolute hidden md:block p-3 bg-background/50 border rounded-lg shadow-lg ${className}`}
//     style={style}
//     initial={{ opacity: 0, scale: 0.5 }}
//     animate={{ opacity: 1, scale: 1 }}
//     transition={{ duration: 0.5, delay: 0.4 }}
//   >
//     {icon}
//   </motion.div>
// );

// export const HeroSection = () => {
//   const [longUrl, setLongUrl] = useState('');
//   const [shortCode, setShortCode] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const apiUrl = import.meta.env.VITE_API_URL;

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setShortCode('');
//     try {
//       const res = await fetch(`${apiUrl}/api/url/public`, {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ longUrl }),
//       });
//       if (!res.ok) throw new Error('Failed to shorten link');
//       const data = await res.json();
//       setShortCode(data.shortCode);
//     } catch (error) {
//       toast.error('Something went wrong. Please try another URL.');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const fullShortUrl = `${apiUrl}/api/url/${shortCode}`;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(fullShortUrl);
//     toast.success('Link copied to clipboard!');
//   };

//   return (
//     <section className="w-full py-20 md:py-32 relative overflow-hidden">
//       {/* Background Gradient */}
//       <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-blue-950/20 to-background opacity-50"></div>
//       <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
//       <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent"></div>
      
//       {/* Floating Icons */}
//       <FloatingIcon icon={<Link className="text-primary"/>} className="top-1/4 left-[10%] animate-float" />
//       <FloatingIcon icon={<BarChart className="text-primary"/>} className="top-1/2 right-[12%] animate-float" style={{ animationDelay: '2s' }}/>
//       <FloatingIcon icon={<QrCode className="text-primary"/>} className="bottom-1/4 left-[20%] animate-float" style={{ animationDelay: '4s' }} />

//       {/* Content */}
//       <div className="container mx-auto text-center relative z-10">
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//         >
//           <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">
//             Shorten. Share. Analyze.
//           </h1>
//           <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
//             Your all-in-one solution for powerful, manageable, and insightful links.
//           </p>
//         </motion.div>

//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5, delay: 0.2 }}
//         >
//           <Card className="w-full max-w-xl mx-auto shadow-2xl bg-background/60 backdrop-blur-md border border-white/10">
//             <CardContent className="p-6">
//               <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
//                 <Input
//                   type="url"
//                   placeholder="Enter a long URL to shorten..."
//                   value={longUrl}
//                   onChange={(e) => setLongUrl(e.target.value)}
//                   required
//                   className="h-12 text-base bg-background/50"
//                 />
//                 <Button type="submit" className="h-12 px-6" disabled={isLoading}>
//                   {isLoading ? 'Creating...' : 'Shorten'}
//                 </Button>
//               </form>
//               {shortCode && (
//                 <motion.div
//                   initial={{ opacity: 0, height: 0 }}
//                   animate={{ opacity: 1, height: 'auto' }}
//                   className="mt-4 p-4 bg-muted/50 rounded-md flex items-center justify-between overflow-hidden"
//                 >
//                   <span className="text-primary font-mono truncate">{fullShortUrl}</span>
//                   <Button variant="ghost" size="icon" onClick={handleCopy}>
//                     <Copy className="h-4 w-4" />
//                   </Button>
//                 </motion.div>
//               )}
//             </CardContent>
//           </Card>
//         </motion.div>
//       </div>
//     </section>
//   );
// };

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { Copy, Link2, BarChart3, Globe, Scissors, PieChart } from 'lucide-react';
import { motion } from 'framer-motion';

// A small component for the floating icons
const FloatingIcon = ({ icon, className, ...props }: { icon: React.ReactNode; className?: string, style?: React.CSSProperties }) => (
  <motion.div
    // 👇 Added flex properties to center the icon inside
    className={`absolute hidden md:block p-3 bg-background/50 border rounded-lg shadow-lg flex items-center justify-center ${className}`}
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: 0.4 }}
    {...props}
  >
    {icon}
  </motion.div>
);

export const HeroSection = () => {
  const [longUrl, setLongUrl] = useState('');
  const [shortCode, setShortCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShortCode('');
    try {
      const res = await fetch(`${apiUrl}/api/url/public`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ longUrl }),
      });
      if (!res.ok) throw new Error('Failed to shorten link');
      const data = await res.json();
      setShortCode(data.shortCode);
    } catch (error) {
      toast.error('Something went wrong. Please try another URL.');
    } finally {
      setIsLoading(false);
    }
  };

  const fullShortUrl = `${apiUrl}/api/url/${shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl);
    toast.success('Link copied to clipboard!');
  };

  return (
    <section className="w-full py-20 md:py-32 relative overflow-hidden">
      {/* Background Gradient */}
      {/* <div className="absolute inset-0 z-0 bg-gradient-to-br from-background via-blue-950/20 to-background opacity-50"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_top_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_bottom_right,_var(--tw-gradient-stops))] from-secondary/10 via-transparent to-transparent"></div> */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-100 to-background dark:from-slate-900 dark:to-background"></div>


      {/* Floating Icons */}
      <FloatingIcon 
        icon={<Link2 className="w-10 h-10 text-primary/40"/>} 
        className="top-[15%] left-[10%] animate-float" 
      />
      <FloatingIcon 
        icon={<BarChart3 className="w-8 h-8 text-primary/40"/>} 
        className="top-[25%] right-[15%] animate-float" 
        style={{ animationDelay: '1.5s' }} 
      />
      <FloatingIcon 
        icon={<Globe className="w-9 h-9 text-blue-500/40"/>} 
        className="top-[60%] right-[10%] animate-float" 
        style={{ animationDelay: '3s' }} 
      />
      <FloatingIcon 
        icon={<Scissors className="w-12 h-12 text-blue-500/30"/>} 
        className="bottom-[15%] left-[15%] animate-float" 
        style={{ animationDelay: '4.5s' }} 
      />
      <FloatingIcon 
        icon={<PieChart className="w-6 h-6 text-primary/40"/>} 
        className="bottom-[20%] right-[25%] animate-float" 
        style={{ animationDelay: '6s' }} 
      />

      {/* Content */}
      <div className="container mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">
            Shorten. Share. Analyze.
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Your all-in-one solution for powerful, manageable, and insightful links.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="w-full max-w-xl mx-auto shadow-2xl bg-background/60 backdrop-blur-md border border-white/10">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
                <Input
                  type="url"
                  placeholder="Enter a long URL to shorten..."
                  value={longUrl}
                  onChange={(e) => setLongUrl(e.target.value)}
                  required
                  className="h-12 text-base bg-background/50"
                />
                <Button type="submit" className="h-12 px-6" disabled={isLoading}>
                  {isLoading ? 'Creating...' : 'Shorten'}
                </Button>
              </form>
              {shortCode && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="mt-4 p-4 bg-muted/50 rounded-md flex items-center justify-between overflow-hidden"
                >
                  <span className="text-primary font-mono truncate">{fullShortUrl}</span>
                  <Button variant="ghost" size="icon" onClick={handleCopy}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </motion.div>
              )}
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
};