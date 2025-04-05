"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Logo } from "@/components/ui/logo";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would validate credentials here
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#f0e6c9] p-4">
      <div className="w-full max-w-md space-y-8">
        <div className="flex flex-col items-center justify-center space-y-2 text-center">
          <Logo 
            className="mb-4" 
            textClassName="text-4xl text-[#5c4c29]" 
            cursorClassName="text-4xl font-bold text-[#8b7e57]" 
          />
          <h1 className="text-2xl font-bold text-[#5c4c29]">Sign in to your account</h1>
          <p className="text-[#8b7e57]">Enter your credentials to access the dashboard</p>
        </div>

        <div className="rounded-lg border-2 border-[#8b7e57] bg-white p-6 shadow-md">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-[#5c4c29]">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="admin@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-2 border-[#8b7e57] bg-[#f0e6c9] text-[#5c4c29]"
                required
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-[#5c4c29]">Password</Label>
                <a href="#" className="text-sm text-[#8b7e57] hover:underline">
                  Forgot password?
                </a>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border-2 border-[#8b7e57] bg-[#f0e6c9] text-[#5c4c29]"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-[#8b7e57] text-white hover:bg-[#5c4c29]"
            >
              Sign in
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
