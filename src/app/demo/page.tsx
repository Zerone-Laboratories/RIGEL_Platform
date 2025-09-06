"use client";

import Input from "../components/input";
import Button from "../components/button";
import { useState } from "react";

export default function InputDemo() {
  const [textValue, setTextValue] = useState("");
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");
  const [disabledValue, setDisabledValue] = useState("This is disabled");

  return (
    <div className="font-literata min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-4xl sm:text-5xl font-regular text-center mb-12">
          Input Component <span className="font-bold">Demo</span>
        </h1>

        <div className="space-y-8">
          {/* Text Input */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Text Input</h2>
            <Input
              type="text"
              label="Full Name"
              placeholder="Enter your full name"
              value={textValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTextValue(e.target.value)}
              size="medium"
              required
            />
          </div>

          {/* Email Input */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Email Input</h2>
            <Input
              type="email"
              label="Email Address"
              placeholder="Enter your email"
              value={emailValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmailValue(e.target.value)}
              size="medium"
              autoComplete="email"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Password Input</h2>
            <Input
              type="password"
              label="Password"
              placeholder="Enter your password"
              value={passwordValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPasswordValue(e.target.value)}
              size="medium"
              autoComplete="new-password"
              showPasswordToggle={true}
              required
            />
          </div>

          {/* Different Sizes */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Different Sizes</h2>
            <div className="space-y-4">
              <Input
                type="text"
                label="Small Input"
                placeholder="Small size"
                size="small"
              />
              <Input
                type="text"
                label="Medium Input"
                placeholder="Medium size (default)"
                size="medium"
              />
              <Input
                type="text"
                label="Large Input"
                placeholder="Large size"
                size="large"
              />
            </div>
          </div>

          {/* Error States */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Error States</h2>
            <div className="space-y-4">
              <Input
                type="email"
                label="Email with Error"
                placeholder="Enter invalid email to see error"
                value="invalid-email"
                error="Please enter a valid email address"
              />
              <Input
                type="password"
                label="Password with Error"
                placeholder="Password"
                error="Password must be at least 8 characters long"
              />
            </div>
          </div>

          {/* Disabled State */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Disabled State</h2>
            <Input
              type="text"
              label="Disabled Input"
              placeholder="This input is disabled"
              value={disabledValue}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDisabledValue(e.target.value)}
              disabled={true}
            />
          </div>

          {/* Without Labels */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Without Labels</h2>
            <div className="space-y-4">
              <Input
                type="text"
                placeholder="Text input without label"
              />
              <Input
                type="email"
                placeholder="Email input without label"
              />
              <Input
                type="password"
                placeholder="Password input without label"
                showPasswordToggle={true}
              />
            </div>
          </div>

          {/* Complete Form Example */}
          <div>
            <h2 className="text-2xl font-semibold mb-4">Complete Form Example</h2>
            <form className="space-y-4">
              <Input
                type="text"
                label="First Name"
                placeholder="Enter your first name"
                required
              />
              <Input
                type="text"
                label="Last Name"
                placeholder="Enter your last name"
                required
              />
              <Input
                type="email"
                label="Email"
                placeholder="Enter your email"
                required
                autoComplete="email"
              />
              <Input
                type="password"
                label="Password"
                placeholder="Create a password"
                required
                autoComplete="new-password"
                showPasswordToggle={true}
              />
              <Input
                type="password"
                label="Confirm Password"
                placeholder="Confirm your password"
                required
                autoComplete="new-password"
                showPasswordToggle={true}
              />
              <Button type="submit" className="w-full mt-6">
                Submit Form
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
