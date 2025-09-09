// src/contexts/AuthContext/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import type { AuthContextType, User } from "./authContext.types";
const apiUrl = import.meta.env.VITE_API_URL;

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Verify user on page load
  useEffect(() => {
    const verifyUser = async () => {
      try {
        const res = await fetch(`${apiUrl}/api/auth/verify`, {
          method: "GET",
          credentials: "include", // Important to send cookies
        });

        if (!res.ok) throw new Error("Unauthorized");

        const data = await res.json();
        setUser(data.user);
      } catch (err) {
        console.error("Token expired or invalid:", err);
        //logout(); //Clear user and cookie
        setUser(null); // Ensure user is cleared
      } finally {
        setIsLoading(false);
      }
    };

    verifyUser();
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // so the cookie is stored
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Login failed");
      }

      const data = await res.json();
      setUser(data.user);
      // Don't toast here, let handleSubmit do it
      return data.user; // Return user on success
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`${apiUrl}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include", // important to store cookie!
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Signup failed");
      }

      const data = await res.json();

      // Optionally set user after signup if your backend returns user data
      setUser(data.user || null);
    } catch (err: any) {
      setError(err.message || "Signup error");
      setUser(null);
      throw err; // rethrow to handle in form
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    try {
      await fetch(`${apiUrl}/api/auth/logout`, {
        method: "POST",
        credentials: "include", // Send cookie to backend
      });
    } catch (err) {
      console.error("Logout failed", err);
    } finally {
      setUser(null);
    }
  };

  const refreshSession = async () => {
    try {
      const res = await fetch(`${apiUrl}/api/auth/verify`, {
        credentials: "include",
      });

      if (!res.ok) throw new Error("Unauthorized");
      const data = await res.json();
      setUser(data.user);
    } catch (err) {
      setUser(null);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, signup, logout, isLoading, refreshSession, error }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
