"use client";

import Button from "@/components/button";
import Input from "@/components/input";
import AnimatedLogo from "@/components/animated-logo";
import CloudflareVerification from "@/components/cloudflare-verification";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const router = useRouter();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = () => {
    router.push("/register");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    const newErrors: {email?: string; password?: string; general?: string} = {};
    
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      return;
    }

    if (!turnstileToken) {
      setErrors({ general: "Please complete the Cloudflare verification" });
      return;
    }

    setIsLoading(true);
    setErrors({});

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          turnstileToken: turnstileToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Use auth context to handle login
        login(data.user, data.token);
        
        // Redirect to dashboard
        router.push('/dashboard'); // Change this to your desired redirect path
      } else {
        setErrors({ general: data.error || 'Login failed' });
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrors({ general: 'Network error. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="font-literata grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 relative">
      {/* Background animated logo */}
      <div className="fixed inset-0 flex items-center justify-center pointer-events-none opacity-40 z-0">
        <AnimatedLogo
          width={900}
          height={900}
          className="fixed"
          loading={isLoading}
        />
      </div>
      
      <main className="flex flex-col gap-[32px] row-start-2 items-center relative z-10">
        {/* <AnimatedLogo
          width={300}
          height={300}
          className="mx-auto"
        /> */}
        <h1 className="text-4xl sm:text-3xl font-regular text-center">
          Log in with <span className="font-bold"><span className="font-black text-5xl">V</span>erisimilitude</span> account
        </h1>
        
        {/* Login form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            required
            autoComplete="email"
            size="medium"
          />
          
          <Input
            type="password"
            label="Password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            required
            autoComplete="current-password"
            size="medium"
            showPasswordToggle={true}
          />

          {/* Cloudflare Verification */}
          <CloudflareVerification
            onVerify={(token) => setTurnstileToken(token)}
            onError={() => setErrors({ general: "Cloudflare verification failed" })}
            onExpire={() => setTurnstileToken("")}
            className="flex justify-center"
          />

          {/* Display general errors */}
          {errors.general && (
            <div className="text-red-500 text-sm text-center">
              {errors.general}
            </div>
          )}
          
          <Button 
            type="submit" 
            size="medium" 
            className="w-full mt-6"
            disabled={isLoading || !turnstileToken}
          >
            {isLoading ? 'Logging In...' : 'Log In'}
          </Button>
          
          <p className="text-center mt-8">
            Don&apos;t have an account yet?{" "}
            <Button onClick={handleRegister} size="small" className="mt-4">Register</Button>
          </p>
        </form>
      </main>
      {/* <div className="absolute bottom-8 right-8">
        <Image
          src="/vrs_logo_without_back.svg"
          alt="VerisimilitudeAI"
          width={150}
          height={150}
          priority
        />
      </div> */}
    </div>
  );
}
