'use client';

import Head from 'next/head';
import Link from "next/link";
import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/client";
import { redirect } from "next/navigation";
import { SubmitButton } from "./submit-button";
import { useState } from "react";

export default function Login({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const [loading, setLoading] = useState(false);

  const signIn = async () => {
    setLoading(true);

    const supabase = createClient();
    try {
      // Replace 'YOUR_REDIRECT_URI' with the actual redirect URI configured in your Google Developer Console
      const redirectUri = encodeURIComponent('https://dailyexpense-tracker.vercel.app/protected');
      window.open(`https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email&access_type=offline&prompt=consent`, "_blank");
    } catch (error) {
      console.error("Google login error:", error);
      redirect("/login?message=Could not authenticate user");
    } finally {
      setLoading(false);
  };


  return (
    <div className="flex-1 flex flex-col w-full px-8 sm:max-w-md justify-center gap-2">
      <Head>
        <title>Login</title>
        <meta name="description" content="Login page for your application" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>

      <Link href="/" className="absolute left-8 top-8 py-2 px-4 rounded-md no-underline text-foreground bg-btn-background hover:bg-btn-background-hover flex items-center group text-sm">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 h-4 w-4 transition-transform group-hover:-translate-x-1">
          <polyline points="15 18 9 12 15 6" />
        </svg>{" "}
        Back
      </Link>

      <form className="animate-in flex-1 flex flex-col w-full justify-center gap-2 text-foreground">
        <SubmitButton
          formAction={signIn}
          className="bg-green-700 rounded-md px-4 py-2 text-foreground mb-2"
          pendingText="Signing In..."
          disabled={loading}
        >
          {loading ?  'Logging in...' : 'Login with Google'}
        </SubmitButton>

        {searchParams?.message && (
          <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
            {searchParams.message}
          </p>
        )}
      </form>
    </div>
  );
}
}