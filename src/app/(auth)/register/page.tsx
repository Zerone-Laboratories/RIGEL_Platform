"use client";

import Button from "../../components/button";
import Input from "../../components/input";
import AnimatedLogo from "../../components/animated-logo";
import CloudflareVerification from "../../components/cloudflare-verification";
import { useAuth } from "../../../hooks/useAuth";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Register() {
  const router = useRouter();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    organization: "",
  });
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
    organization?: string;
    general?: string;
  }>({});
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = () => {
    router.push("/login");
  };

  const handleInputChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value
    }));
    // Clear error when user starts typing
    if (errors[field as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const validateForm = () => {
    const newErrors: typeof errors = {};

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "Name must be at least 2 characters";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        newErrors.email = "Please enter a valid email address";
      }
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(formData.password)) {
      newErrors.password = "Password must contain at least one uppercase letter, one lowercase letter, and one number";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
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
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          organization: formData.organization || undefined,
          turnstileToken: turnstileToken,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Use auth context to handle login
        login(data.user, data.token);
        
        // Redirect to dashboard or login page
        router.push('/dashboard'); // Change this to your desired redirect path
      } else {
        setErrors({ general: data.error || 'Registration failed' });
        if (data.details) {
          console.error('Registration errors:', data.details);
        }
      }
    } catch (error) {
      console.error('Registration error:', error);
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
        />
      </div>
      
      <main className="flex flex-col gap-[32px] row-start-2 items-center relative z-10">
        <h1 className="text-4xl sm:text-3xl font-regular text-center">
          Welcome to  <span className="font-bold"><span className="font-black text-5xl">V</span>erisimilitude</span>
        </h1>
        
        {/* Registration form */}
        <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
          <Input
            type="text"
            label="Full Name"
            placeholder="Enter your full name"
            value={formData.name}
            onChange={handleInputChange("name")}
            error={errors.name}
            required
            autoComplete="name"
            size="medium"
          />

          <Input
            type="text"
            label="Organization"
            placeholder="(Leave empty if not an organization)"
            value={formData.organization}
            onChange={handleInputChange("organization")}
            error={errors.organization}
            size="medium"
          />

          <Input
            type="email"
            label="Email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleInputChange("email")}
            error={errors.email}
            required
            autoComplete="email"
            size="medium"
          />
          
          <Input
            type="password"
            label="Password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleInputChange("password")}
            error={errors.password}
            required
            autoComplete="new-password"
            size="medium"
            showPasswordToggle={true}
          />

          <Input
            type="password"
            label="Confirm Password"
            placeholder="Confirm your password"
            value={formData.confirmPassword}
            onChange={handleInputChange("confirmPassword")}
            error={errors.confirmPassword}
            required
            autoComplete="new-password"
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
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <p className="text-center mt-8">
            Already have an account?{" "}
            <Button onClick={handleLogin} size="small" className="mt-4">Log In</Button>
          </p>
        </form>

        {/* Password requirements */}
        {/* <div className="w-full max-w-md mt-4">
          <p className="text-sm text-gray-400 mb-2">Password requirements:</p>
          <ul className="text-xs text-gray-500 space-y-1">
            <li>• At least 8 characters long</li>
            <li>• Contains uppercase and lowercase letters</li>
            <li>• Contains at least one number</li>
          </ul>
        </div> */}
      </main>
    </div>
  );
}
