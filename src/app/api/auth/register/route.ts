import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyCloudflareTurnstile, validateEmail, validatePassword } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, password, organization, turnstileToken } = body;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json(
        { error: 'Name, email, and password are required' },
        { status: 400 }
      );
    }

    // Verify Cloudflare Turnstile
    if (!turnstileToken) {
      return NextResponse.json(
        { error: 'Cloudflare verification is required' },
        { status: 400 }
      );
    }

    const isValidTurnstile = await verifyCloudflareTurnstile(turnstileToken);
    if (!isValidTurnstile) {
      return NextResponse.json(
        { error: 'Cloudflare verification failed' },
        { status: 400 }
      );
    }

    // Validate email format
    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: 'Please enter a valid email address' },
        { status: 400 }
      );
    }

    // Validate password strength
    const passwordValidation = validatePassword(password);
    if (!passwordValidation.isValid) {
      return NextResponse.json(
        { error: 'Password validation failed', details: passwordValidation.errors },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Check if user already exists
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    // Hash password
    const saltRounds = 12;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Create new user
    const newUser = new User({
      name: name.trim(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      organization: organization?.trim() || undefined,
      isVerified: false
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { 
        userId: newUser._id, 
        email: newUser.email,
        name: newUser.name
      },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    // Return success response (without password)
    const userResponse = {
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      organization: newUser.organization,
      isVerified: newUser.isVerified,
      createdAt: newUser.createdAt
    };

    return NextResponse.json(
      { 
        message: 'User registered successfully',
        user: userResponse,
        token
      },
      { status: 201 }
    );

  } catch (error: unknown) {
    console.error('Registration error:', error);
    
    // Handle mongoose validation errors
    if (error && typeof error === 'object' && 'name' in error && error.name === 'ValidationError') {
      const mongoError = error as unknown as { errors: Record<string, { message: string }> };
      const validationErrors = Object.values(mongoError.errors).map((err) => err.message);
      return NextResponse.json(
        { error: 'Validation failed', details: validationErrors },
        { status: 400 }
      );
    }

    // Handle duplicate key error (email already exists)
    if (error && typeof error === 'object' && 'code' in error && (error as unknown as { code: number }).code === 11000) {
      return NextResponse.json(
        { error: 'User with this email already exists' },
        { status: 409 }
      );
    }

    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
