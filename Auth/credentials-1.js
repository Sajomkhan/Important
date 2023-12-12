// https://next-auth.js.org/configuration/initialization

//------------------------ package.json -------------------------//
  "dependencies": {
    "bcrypt": "^5.1.1",
    "mongoose": "^7.6.3",
    "next": "14.0.0",
    "next-auth": "^4.24.4",
  },



//------------------------ utils/connect.js -------------------------//
import mongoose from "mongoose";

export async function connectDB(){
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log("DB is connected");
    } catch (error) {
        console.log("Error while connecting.", error);        
    }
}

//------------------------ api/auth/[...nextauth]/route.jsx -------------------------//
import NextAuth from "next-auth/next";
import { CredentialsProvider } from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          console.log("user:", user);
          return user;
        } catch (error) {
          console.log("Error = ", error);
          return null;
        }
      },
    }),
  ],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };




//------------------------api/register/route.jsx-------------------------//
import { connectDB } from "../../utils/connect"
import User from "../../models/userModel"
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
try {
    await connectDB()
    const {email, password} = await req.json();
    const exists = await User.findOne({email})
    // const exists = await User.findOne({$or:[{email},{username}]})
    if(exists){
        return NextResponse.json({message: "Email already exist"}, {status: 500})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
    await User.create({email, password: hashedPassword})
    return NextResponse.json({message: "User registered"}, {status: 201});
} catch (error) {
    console.log("Error while registering user.", error);
    return NextResponse.json({message: "Error occured while registering the user"}, {status: 500});
}
}


//------------------------app/api/register/page.jsx-------------------------//
"use client";
import { signIn } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [creatingUser, setCreatingUser] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const [error, setError] = useState(false);

  async function handleFormSubmit(ev) {
    ev.preventDefault();
    setCreatingUser(true);
    setError(false);
    setUserCreated(false);
    const response = await fetch("/api/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    if (response.ok) {
      setUserCreated(true);
    } else {
      setError(true);
    }
    setCreatingUser(false);
  }  
  return (
     <form onSubmit={handleFormSubmit}>
        <button
          onClick={() => signIn("google", { callbackUrl: "/" })}
        >
          <Image src={"/google.png"} alt={""} width={24} height={24} />
          Login with google
        </button>
      </form>
  )}


//------------------------app/api/signin/page.jsx-------------------------//
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [showPasswordText, setShowPasswordText] = useState("password");
  const [info, setInfo] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleInput = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!info.email || !info.password) {
      setError("Must provide all the credentials.");
    }
    try {
      setPending(true);
      const res = await signIn("credentials", {
        email: info.email,
        password: info.password,
        redirect: false,
      });
      if (res.error) {
        setError("invalid Credentials");
        setPending(false);
        return;
      }
      router.replace("/");
    } catch (error) {
      console.log("Something went wrong", error.message);
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl bg-gray-50  px-4 py-16 sm:px-6 lg:px-8 shadow-lg">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Sign in your account</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="email" className="sr-only">
            Email
          </label>

          <div className="relative">
            <input
              type="email"
              name="email"
              onChange={(e) => handleInput(e)}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter email"
            />
          </div>
        </div>

        <div>
          <label htmlFor="password" className="sr-only">
            Password
          </label>

          <div className="relative">
            <input
              type={showPasswordText}
              name="password"
              onChange={(e) => handleInput(e)}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter password"
            />

            <span
              onClick={() => {
                showPasswordText === "password"
                  ? setShowPasswordText("text")
                  : setShowPasswordText("password");
              }}
              className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  className={`${
                    showPasswordText === "text" ? "text-yellow-600 " : ""
                  }`}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </span>
          </div>
        </div>
        {error && (
          <p className="font-light text-sm text-red-600 ml-4">{error}</p>
        )}

        <div className="flex items-center justify-between">
          <p className="text-sm text-gray-500">
            No account?{" "}
            <a className="underline" href="/register">
              Sign up
            </a>
          </p>

          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            disabled={pending ? true : false}
          >
            {pending ? "Wait for Sign in" : "Sing in"}
          </button>
        </div>
      </form>
    </div>
  );
}

