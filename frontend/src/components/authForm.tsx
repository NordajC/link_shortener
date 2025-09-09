// import { Button } from "@/components/ui/button";
// import { useState } from "react";
// import {
//   Card,
//   CardAction,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Input } from "./ui/input";
// import { Label } from "./ui/label";
// import { useNavigate } from "react-router-dom";
// import { useAuth } from "../context/authContext/authContext";
// import { toast } from "sonner";

// function AuthForm() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState("");
//   const [isLoading, setIsLoading] = useState(false);
//   const [isSignUp, setIsSignUp] = useState(false);
//   const navigate = useNavigate();
//   const { login, signup } = useAuth();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");
//     setIsLoading(true);

//     try {
//       if (isSignUp) {
//         await signup(email, password); // 🔐 Uses context, which handles cookies
//       } else {
//         await login(email, password);
//         toast.success("Welcome back!");
//         navigate("/dashboard");
//       }
//     } catch (err: any) {
//       console.log(e);
//         toast.error("Failed to log in. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <Card className="w-full max-w-md bg-card text-card-foreground">
//       <CardHeader>
//         {isSignUp ? (
//           <>
//             <CardTitle>Create an account</CardTitle>
//             <CardDescription>
//               Start shortening links by creating an account
//             </CardDescription>
//           </>
//         ) : (
//           <>
//             <CardTitle>Login to your account</CardTitle>
//             <CardDescription>
//               Enter your email below to login to your account
//             </CardDescription>
//           </>
//         )}
//       </CardHeader>
//       <form onSubmit={handleSubmit}>
//         <CardContent>
//           <div className="flex flex-col gap-6">
//             <div className="grid gap-2">
//               <Label htmlFor="email">Email</Label>
//               <Input
//                 id="email"
//                 type="email"
//                 placeholder="m@example.com"
//                 required
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="bg-input border-border text-foreground"
//               />
//             </div>
//             <div className="grid gap-2">
//               <div className="flex items-center">
//                 <Label htmlFor="password">Password</Label>
//                 {!isSignUp && (
//                   <a
//                     href="#"
//                     className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
//                   >
//                     Forgot your password?
//                   </a>
//                 )}
//               </div>
//               <Input
//                 id="password"
//                 type="password"
//                 required
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//               />
//             </div>
//           </div>
//         </CardContent>
//         <CardFooter className="flex-col gap-2">
//           {isSignUp ? (
//             <>
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full cursor-pointer"
//               >
//                 {isLoading ? "Creating Account..." : "Sign Up"}
//               </Button>
//               <Button
//                 variant="ghost"
//                 onClick={() => setIsSignUp(false)}
//                 className="w-full cursor-pointer"
//               >
//                 Already have an account? Login
//               </Button>
//             </>
//           ) : (
//             <>
//               <Button
//                 type="submit"
//                 disabled={isLoading}
//                 className="w-full cursor-pointer"
//               >
//                 {isLoading ? "Logging In..." : "Login"}
//               </Button>
//               <Button
//                 variant="ghost"
//                 onClick={() => setIsSignUp(true)}
//                 className="w-full cursor-pointer"
//               >
//                 Don't have an account? Sign Up
//               </Button>
//             </>
//           )}
//         </CardFooter>
//       </form>
//       {/* <CardFooter className="flex-col gap-2">
//         <Button type="submit" className="w-full">
//           { isLoading ? 'Logging In...' : 'Login' }
//         </Button>
//         <Button variant="ghost" className="w-full cursor-pointer">
//           Sign Up
//         </Button>
//       </CardFooter> */}
//     </Card>
//   );
// }

// export default AuthForm;

import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext/authContext";
import { toast } from "sonner";

function AuthForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const { login, signup } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      if (isSignUp) {
        await signup(email, password);
        toast.success("Account created successfully!");
        navigate("/dashboard");

      } else {

        await login(email, password); // will throw if failed
        toast.success("Welcome back!");
        navigate("/dashboard");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to authenticate. Please try again.");
      toast.error(err.message || "Failed to authenticate. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError("");
    setEmail("");
    setPassword("");
  };

  return (
    <Card className="w-full max-w-md bg-card text-card-foreground">
      <CardHeader>
        {isSignUp ? (
          <>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>
              Start shortening links by creating an account
            </CardDescription>
          </>
        ) : (
          <>
            <CardTitle>Login to your account</CardTitle>
            <CardDescription>
              Enter your email below to login to your account
            </CardDescription>
          </>
        )}
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-input border-border text-foreground"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                {!isSignUp && (
                  <a
                    href="#"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                )}
              </div>
              <Input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>
        </CardContent>
        <br></br>
        <CardFooter className="flex-col gap-2">
          <Button
            type="submit"
            disabled={isLoading}
            className="w-full cursor-pointer"
          >
            {isLoading
              ? isSignUp
                ? "Creating Account..."
                : "Logging In..."
              : isSignUp
              ? "Sign Up"
              : "Login"}
          </Button>

          <Button
            variant="ghost"
            type="button"
            disabled={isLoading}
            onClick={toggleMode}
            className="w-full cursor-pointer"
          >
            {isSignUp
              ? "Already have an account? Login"
              : "Don't have an account? Sign Up"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}

export default AuthForm;
