import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';
import { signToken } from '@/lib/auth';
import bcrypt from 'bcryptjs';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password are required' },
        { status: 400 }
      );
    }

    await connectToDatabase();



    const adminCount = await Admin.countDocuments();
    if (adminCount === 0) {
      if (email === 'info@webuydeadstocks' || email === 'info@webuydeadstocks.com') {
        const hashedPassword = await bcrypt.hash('wbds@2456', 10);
        await Admin.create({ email: 'info@webuydeadstocks', password: hashedPassword });
      }
    }

    const admin = await Admin.findOne({ email });

    if (!admin) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return NextResponse.json(
        { message: 'Invalid credentials' },
        { status: 401 }
      );
    }


    const token = await signToken({ adminId: admin._id, email: admin.email });


    const response = NextResponse.json(
      { message: 'Login successful' },
      { status: 200 }
    );

    response.cookies.set({
      name: 'admin_token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { message: 'Internal server error' },
      { status: 500 }
    );
  }
}
