import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import connectDB from '@/lib/mongodb';
import User from '@/models/User';
import { verifyCloudflareTurnstile, validateEmail } from '@/lib/validation';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email, password, turnstileToken } = body;

    // Validate required fields
    if (!email || !password) {
      return NextResponse.json(
        { error: 'Email and password are required' },
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

    // Connect to database
    await connectDB();

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return NextResponse.json(
        { error: 'Invalid email or password' },
        { status: 401 }
      );
    }

    // Generate JWT token with 1 month expiration
    const token = jwt.sign(
      { 
        userId: user._id, 
        email: user.email,
        name: user.name
      },
      process.env.JWT_SECRET!,
      { expiresIn: '30d' }
    );

    // Return success response (without password)
    const userResponse = {
      id: user._id,
      name: user.name,
      email: user.email,
      organization: user.organization,
      isVerified: user.isVerified,
      createdAt: user.createdAt
    };

    // Create response with cookie
    const response = NextResponse.json(
      { 
        message: 'Login successful',
        user: userResponse,
        token
      },
      { status: 200 }
    );

    // Set HTTP-only cookie that expires in 1 month
    const oneMonthFromNow = new Date();
    oneMonthFromNow.setMonth(oneMonthFromNow.getMonth() + 1);
    
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      expires: oneMonthFromNow,
      path: '/'
    });

    return response;

  } catch (error: unknown) {
    console.error('Login error:', error);
    
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
