// frontend/src/components/heroSection.tsx
import React, { useState, useRef, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { Copy } from "lucide-react";
import { motion } from "framer-motion";
import Threads, { type ThreadsRef } from "./ui/Threads"; // Uncomment and adjust the path if you need to import Threads
import { ArrowRightIcon } from "lucide-react";
import { Spinner } from "./ui/shadcn-io/spinner/index";

export const HeroSection = () => {
  const [longUrl, setLongUrl] = useState("");
  const [shortCode, setShortCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const apiUrl = import.meta.env.VITE_API_URL;
  const threadsRef = useRef<ThreadsRef>(null);

  const memoizedAnimation = useMemo(() => {
    return (
      <Threads
        ref={threadsRef}
        amplitude={0.5}
        distance={0.3}
        enableMouseInteraction={false}
      />
    );
  }, []); // 3. The empty array [] means "only run this once"

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setShortCode("");
    try {
      const res = await fetch(`${apiUrl}/api/url/public`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ longUrl }),
      });
      if (!res.ok) throw new Error("Failed to shorten link");
      const data = await res.json();
      setShortCode(data.shortCode);
      threadsRef.current?.triggerCut();
    } catch (error) {
      toast.error("Something went wrong. Please try another URL.");
    } finally {
      setIsLoading(false);
    }
  };

  const fullShortUrl = `${apiUrl}/${shortCode}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullShortUrl);
    toast.success("Link copied to clipboard!");
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} // Maybe add a duration
        style={{ width: "100%", height: "600px", position: "relative"}}
      >
        {memoizedAnimation}
        {/* Content */}
        <div className="mx-auto text-center absolute z-10 inset-0 top-32 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold tracking-tighter text-foreground mb-4">
              Shorten. Share. Analyze.
            </h1>
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Your all-in-one solution for powerful, manageable, and insightful
              links.
            </p>
          </motion.div>

          <motion.div>
            <Card className="w-full max-w-xl mx-auto shadow-2xl bg-background/50 backdrop-blur-xs border border-white/10 rounded-full px-1 py-6">
              <CardContent>
                <form onSubmit={handleSubmit} className="flex gap-2">
                  <Input
                    type="url"
                    placeholder="Enter a long URL to shorten..."
                    value={longUrl}
                    onChange={(e) => setLongUrl(e.target.value)}
                    required
                    className="text-base bg-[#0a0a0a]; border-0 rounded-full inline-flex w-full"
                  />
                  <Button
                    type="submit"
                    className="m-0 p-0 rounded-full inline-flex w-9"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <Spinner variant="circle" />
                    ) : (
                      <ArrowRightIcon />
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
          <br></br>
          {shortCode && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
            >
              <Card className="w-full max-w-xl mx-auto shadow-2xl bg-background/50 backdrop-blur-xs border border-white/10 rounded-full px-1">
                <CardContent>
                  <div className="px-2 bg-muted/50 rounded-full flex items-center justify-between overflow-hidden">
                    <span className="text-sm font-mono truncate">
                      {fullShortUrl}
                    </span>
                    <Button variant="ghost" size="icon" onClick={handleCopy}>
                      <Copy className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </motion.div>
    </>
  );
};
