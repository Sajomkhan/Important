// https://next-auth.js.org/configuration/initialization

//------------------------ package.json -------------------------//
"dependencies": {
    "bcrypt": "^5.1.1",
    "mongoose": "^7.6.3",
    "next": "14.0.0",
    "next-auth": "^4.24.4",
  },
  
//------------------------ package.json -------------------------//
DB_URI=mongodb
NEXTAUTH_SECRET = mysicreatkey
NEXTAUTH_URL=http://localhost:3000/api/auth

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
import User from "@/app/models/userModel";
import { connectDB } from "@/app/utils/connect";
import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcrypt";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",

      async authorize(credentials) {
        await connectDB();

        try {
          const user = await User.findOne({ email: credentials.email });

          if (user) {
            // check password
            const isPasswordCorrect = await bcrypt.compare(
              credentials.password,
              user.password
            );
            if (isPasswordCorrect) {
              return user;
            } else {
              throw new Error("Wrong Credentials");
            }
          } else {
            throw new Error("User not found");
          }
        } catch (error) {
          console.log("Error while credentials processing.", error);
          return NextResponse.json(
            { message: "Error while credentials processing." },
            { status: 500 }
          );
        }
      },
    }),
  ],

  // If any error occured during Sign in it will redirect to the bellow address
  pages:{
    error: "/login" 
  }

});

export { handler as GET, handler as POST };


//------------------------api/register/route.jsx-------------------------//
import { connectDB } from "@/app/utils/connect";
import User from "@/app/models/userModel";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";

export const POST = async (req) => {
    const {username, email, password} = await req.json();
    await connectDB()
    const exists = await User.findOne({$or:[{email},{username}]})
    if(exists){
        return NextResponse.json({message: "Email already exist"}, {status: 500})
    }
    const hashedPassword = await bcrypt.hash(password, 10)
try {
    await User.create({username, email, password: hashedPassword})
    return NextResponse.json({message: "User registered"}, {status: 201});
} catch (error) {
    console.log("Error while registering user.", error);
    return NextResponse.json({message: "Error occured while registering the user"}, {status: 500});
}
}


//------------------------ provider/AuthProvider/AuthProvider.jsx-------------------------//
"use client"
import { SessionProvider } from "next-auth/react";

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;

//------------------------ app/layout.jsx-------------------------//
"use client"
import AuthProvider from "./provider/AuthProvider/AuthProvider";

export default function RootLayout({ children }) {
    return (
          <AuthProvider>
            <Navbar />
            {children}
          </AuthProvider>
    );
  }

//------------------------app/models/userModel.js-------------------------//
import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    username: {
        type: String,
        require:[true, "Must provide a username"],
        unique: [true, "Must be unique"]
    },
    email: {
        type: String,
        require:[true, "Must provide a email"],
        unique: [true, "Must be unique"]
    },
    password: {
        type: String,
        require:[true, "Must provide a passowrd"],
    },
}, {timestamps: true})

const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User


//------------------------app/components/Navbar.jsx-------------------------//
"use client";
import { signOut, useSession } from "next-auth/react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();
  const session = useSession()
  const name = session.data?.user?.username;
  console.log(session.data?.user);
  console.log(session.status);

  return (
      <navbar>
          
         { name? (
             <p>{name}</p>
          ):(
             <a href="/login">Sign in</a>
          )
         }
          
          {              {
            session.status === "authenticated" &&
            <button onClick={signOut} >
                Sign Out
            </button>
          }
      </div>)
}

//------------------------app/api/register/page.jsx-------------------------//
"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function RegisterPage() {
  const router = useRouter();
  const [showPasswordText, setShowPasswordText] = useState("password");
  const [info, setInfo] = useState({ username: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  const handleInput = (e) => {
    setInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!info.username || !info.email || !info.password)
      setError("Must provide all the credentials.");
    try {
      setPending(true);
      const res = await fetch("api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(info),
      });
      if (res.ok) {
        setPending(false);
        const form = e.target;
        form.reset();
        router.push("/login");
        console.log("user registered");
      } else {
        console.log("Something went wrong");
        const errorData = await res.json();
        setError(errorData.message);
        setPending(false);
      }
    } catch (error) {
      console.log("Something went wrong", error.message);
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl bg-gray-50  px-4 py-16 sm:px-6 lg:px-8 shadow-lg">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">
          Register
        </h1>
      </div>
      <form
        onSubmit={handleSubmit}
        className="mx-auto mb-0 mt-8 max-w-md space-y-4"
      >
        <div>
          <label htmlFor="username" className="sr-only">
            Username
          </label>
          <div className="relative">
            <input
              type="username"
              name="username"
              onChange={(e) => handleInput(e)}
              className="w-full rounded-lg border-gray-200 p-4 pe-12 text-sm shadow-sm"
              placeholder="Enter username"
            />
          </div>
        </div>
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
          <p className="flex gap-2 text-sm text-gray-500 ml-4 mr-6">
            Already register? {""}
            <a className="underline" href="/login">
              Sign in
            </a>
          </p>
          <button
            type="submit"
            className="inline-block rounded-lg bg-blue-500 px-5 py-3 text-sm font-medium text-white"
            disabled={pending ? true : false}
          >
            {pending ? "Registering..." : "Register"}
          </button>
        </div>
      </form>
    </div>
  );
}


//------------------------app/api/login/page.jsx-------------------------//
"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { signIn } from "next-auth/react";

export default function LoginPage() {
  const router = useRouter();
  const [showPasswordText, setShowPasswordText] = useState("password");
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);


  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    if (email || password) {
      setError("Must provide all the credentials.");
    }
    try {
      setPending(true);
      const res = await signIn("credentials", {
        email: email,
        password: password,
        redirect: false,
      });
      if (res.error) {
        setError("Invalid Credentials");
        setPending(false);
        return;
      }
      router.replace("/dashboard");
    } catch (error) {
      console.log("Something went wrong", error.message);
      setPending(false);
    }
  };

  return (
    <div className="mx-auto max-w-screen-xl bg-gray-50  px-4 py-16 sm:px-6 lg:px-8 shadow-lg">
      <div className="mx-auto max-w-lg text-center">
        <h1 className="text-2xl font-bold sm:text-3xl">Sign in</h1>
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
            {pending ? "Wait..." : "Sing in"}
          </button>
        </div>
      </form>
    </div>
  );
}


// --------------------------app/dashboard/layout (Protected Route)-----------------------------//
"use client"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export default function DashboardLayout({children}) {
  const router = useRouter()
  const session = useSession()

  if(session.status === "loading"){
    return <p>Loading...</p>
  }  
  if(session.status === "unauthenticated"){
    return router.push("/login")
  }

  return (
    <section>
      {children}
    </section>
  )
}
