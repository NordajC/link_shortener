// import React, { useState } from 'react';
// import { Button } from '@/components/ui/button';
// import { Input } from '@/components/ui/input';
// import { Card, CardContent } from '@/components/ui/card';
// import { toast } from 'sonner';
// import { Copy } from 'lucide-react';

// export default function Home() {
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
//       console.error(error);
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
//     <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-br from-background via-blue-950/20 to-background">
//       <div className="text-center max-w-2xl mx-auto">
//         <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">
//           Shorten. Share. Simplify.
//         </h1>
//         <p className="text-lg md:text-xl text-muted-foreground mb-8">
//           The simple and powerful link shortener built for the modern web.
//           Links created here expire in 7 days.
//         </p>
//       </div>

//       <Card className="w-full max-w-lg shadow-2xl">
//         <CardContent className="p-6">
//           <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
//             <Input
//               type="url"
//               placeholder="https://your-long-url.com/goes-here"
//               value={longUrl}
//               onChange={(e) => setLongUrl(e.target.value)}
//               required
//               className="h-12 text-base"
//             />
//             <Button type="submit" className="h-12 px-6" disabled={isLoading}>
//               {isLoading ? 'Creating...' : 'Shorten'}
//             </Button>
//           </form>

//           {shortCode && (
//             <div className="mt-4 p-4 bg-muted rounded-md flex items-center justify-between">
//               <span className="text-blue-500 font-mono truncate">{fullShortUrl}</span>
//               <Button variant="ghost" size="icon" onClick={handleCopy}>
//                 <Copy className="h-4 w-4" />
//               </Button>
//             </div>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

import { HeroSection } from "../components/heroSection";
import { FeaturesSection } from "../components/featuresSection";
import { PricingSection } from "../components/pricingSection";
import { DashboardShowcase } from "@/components/howItWorks";
import { useRef } from "react";

export default function Home() {
  const showcaseRef = useRef<HTMLDivElement>(null);

  const handleScrollToShowcase = () => {
    showcaseRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };
  return (
    <div className="w-full">
      
        <HeroSection />
      

      <div ref={showcaseRef}>
        <DashboardShowcase /> {/* 👈 Replace InteractiveGuide */}
      </div>

      <FeaturesSection />
      <PricingSection />
    </div>
  );
}
