Next Auth Link:    https://authjs.dev/getting-started/oauth-tutorial
Next Auth Link:    https://next-auth.js.org/getting-started/introduction 
Google Cloud Link: https://console.cloud.google.com/apis/credentials?project=carbide-ego-389714


// ------------------.env file-----------------------------

GOOGLE_ID = 115874380407-5m0pmnaicvpbi1kecevqsr2rv3512c3p.apps.googleusercontent.com
GOOGLE_SECRET = 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

NEXTAUTH_URL = http://localhost:3000
NEXTAUTH_SECRET = anyRandomNumber



// ------------------Installation-----------------------------

npm install next-auth


// ------------------src\provider\AuthProvider-----------------------------

"use client"

import { SessionProvider } from "next-auth/react"

const AuthProvider = ({ children }) => {
  return (
    <SessionProvider>
        {children}
    </SessionProvider>
  )
}

export default AuthProvider



// ------------------layout.js-----------------------------

import AuthProvider from "@/provider/AuthProvider";

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
        <Navbar />
        {children}
    </AuthProvider>
  );
}



// ------------------app\api\auth\[...nextauth]\route.js-----------------------------

import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    GithubProvider({
        clientId: process.env.GITHUB_ID,
        clientSecret: process.env.GITHUB_SECRET,
      }),
  ],
})

export { handler as GET, handler as POST}



// ------------------ app/signin\page.jsx-----------------------------

"use client";

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Signin = () => {
  const { data : session, status } = useSession();  
  const router = useRouter()

  // if session status is loading
  if (status === "loading") {
    return <div className="text-center text-xl mt-10">Loading...</div>
  }

  // if session status is authenticated
  if (status === "authenticated") {
    router.push('/')
  }

  // if session status is unauthenticate
  return (
    <main>
      <div className="container">
        <div className=" mt-10 ">
          <span
            className="text-lg text-blue-500 hover:underline cursor-pointer p-3"
            onClick={() => signIn("google")}
          >
            Google Signin
          </span>
        </div>
      </div>
    </main>
  );
};

export default Signin;


// --------------------- components/Navebar.jsx--------------------------

"use client";

import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const Navbar = () => {
  const { data, status } = useSession();

  console.log(status);

  return (
    <div className="navbar bg-base-100">
      <div className="container p-0">
        <div className="flex-1">
          <Link href={"/"} className="font-semibold text-xl">
            daisyUI
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link href="/blogs">Home</Link>
            </li>
            <li>
              <Link href="/signin">Signin</Link>
            </li>
            <li>
              <div onClick={() => signOut("google")}>Signout</div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
