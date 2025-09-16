"use client";

import React, { useState, forwardRef } from 'react';

type InputType = 'text' | 'email' | 'password';
type InputSize = 'small' | 'medium' | 'large';

interface InputProps {
  type?: InputType;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  size?: InputSize;
  label?: string;
  error?: string;
  required?: boolean;
  name?: string;
  id?: string;
  autoComplete?: string;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({
  type = 'text',
  placeholder,
  value,
  onChange,
  onFocus,
  onBlur,
  className = '',
  disabled = false,
  size = 'medium',
  label,
  error,
  required = false,
  name,
  id,
  autoComplete,
  showPasswordToggle = true,
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  // Determine actual input type
  const inputType = type === 'password' && showPassword ? 'text' : type;

  // Size variants
  const sizeClasses = {
    small: 'px-3 py-2 text-sm',
    medium: 'px-4 py-3 text-base',
    large: 'px-5 py-4 text-lg',
  };

  const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Email validation
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Show email validation error
  const emailError = type === 'email' && value && !isValidEmail(value) 
    ? 'Please enter a valid email address' 
    : null;

  const displayError = error || emailError;

  return (
    <div className="w-full">
      {label && (
        <label 
          htmlFor={id || name} 
          className="block text-sm font-medium mb-2 text-foreground"
        >
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <input
          ref={ref}
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          name={name}
          id={id || name}
          autoComplete={autoComplete}
          required={required}
          className={`
            w-full
            border-[0.5px] border-white 
            rounded-md 
            bg-transparent 
            text-white 
            placeholder-gray-400
            transition-all
            duration-200
            focus:outline-none
            focus:ring-2
            focus:ring-white/20
            focus:border-white
            hover:border-gray-300
            ${sizeClasses[size]}
            ${isFocused ? 'bg-white/5' : ''}
            ${displayError ? 'border-red-500 focus:border-red-500 focus:ring-red-500/20' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed bg-gray-100/10' : 'cursor-text'}
            ${className}
          `}
        />
        
        {/* Password toggle button */}
        {type === 'password' && showPasswordToggle && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            disabled={disabled}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors focus:outline-none"
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? (
              // Eye slash icon (hide password)
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                />
              </svg>
            ) : (
              // Eye icon (show password)
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            )}
          </button>
        )}
      </div>
      
      {/* Error message */}
      {displayError && (
        <p className="mt-1 text-sm text-red-500" role="alert">
          {displayError}
        </p>
      )}
    </div>
  );
});

Input.displayName = 'Input';

export default Input;
