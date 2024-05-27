'use client'

import { useEffect, useState } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';

export default function Login() {
  const [loading, setLoading] = useState(false);
  // const router = useRouter();

  useEffect(() => {
    // Check for authentication status here and redirect if user is already logged in
  }, []);

  const handleGoogleLogin = () => {
    setLoading(true);
    // Redirect to Google login page
    window.location.href = `${process.env.NEXT_PUBLIC_GOOGLE_OAUTH_URL}?response_type=code&client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&scope=email%20profile&access_type=offline&prompt=consent`;
  };

  return (
    <div>
      <Head>
        <title>Login</title>
      </Head>
      <h1>Login Page</h1>
      <button onClick={handleGoogleLogin} disabled={loading}>
        {loading ? 'Loading...' : 'Login with Google'}
      </button>
    </div>
  );
}