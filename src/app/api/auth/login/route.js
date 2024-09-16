// src/app/api/auth/login/route.js
import axios from 'axios';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    // Parse request body
    const { email, password } = await req.json();

    // Call the Rails backend for login
    const response = await axios.post('http://127.0.0.1:3002/api/v1/login', { email, password }, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Extract the token from the response
    const { token } = response.data;

    // Return the token in the response
    return NextResponse.json({ token }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }
}
