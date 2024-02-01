// document for next learn: https://nextjs.org/learn/dashboard-app/adding-authentication
// document for credentials auth: https://authjs.dev/getting-started/providers/credentials-tutorial



// npm install next-auth@beta

//-------------------- add in .env  ----------------------//
AUTH_SECRET=mysicreatkey
AUTH_URL=http://localhost:3000/api/auth


//-------------------app/authConfig.js------------------//
export const authConfig = {
  providers:[],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith("/dashboard");
      if (isOnDashboard) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/dashboard", request.nextUrl));
      }
      return true;
    },
  },
};


//-------------------root-file/ middleware.js------------------//
// the middleware.js is required for perform every requested by authConfige.js
import NextAuth from "next-auth";
import { authConfig } from "./app/authconfig";

export default NextAuth(authConfig).auth;

export const config = {
  matcher: ['/((?!api|static|.*\\..*|_next).*)'],
};


//-------------------app/ auth.js------------------//
// we are gonna fetch our user
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authConfig } from "./authconfig";
import { connectToDB } from "./lib/utils";
import { User } from "./lib/models";
import bcrypt from "bcrypt";

const login = async (credentials) => {
  try {
    connectToDB();
    const user = await User.findOne({ username: credentials.username });

    if (!user || !user.isAdmin) throw new Error("Wrong credentials!");

    const isPasswordCorrect = await bcrypt.compare(
      credentials.password,
      user.password
    );

    if (!isPasswordCorrect) throw new Error("Wrong credentials!");

    return user;
  } catch (err) {
    console.log(err);
    throw new Error("Failed to login!");
  }
};

export const { signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        try {
          const user = await login(credentials);
          return user;  //nextjs will take this user and will pass this to session
        } catch (err) {
          return null;
        }
      },
    }),
  ],
  // ADD ADDITIONAL INFORMATION TO SESSION
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.username = user.username;
        token.img = user.img;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.username = token.username;
        session.user.img = token.img;
      }
      return session;
    },
  },
});


//-------------------app/lib/actions.js-------------------//
export const authenticate = async (prevState, formData) => {
  const { username, password } = Object.fromEntries(formData);

  try {
    await signIn("credentials", { username, password });
  } catch (err) {
    return "Wrong Credentials!";
  }
};


//--------------------app/login/page.jsx----------------------//
"use client";
import { authenticate } from "@/app/lib/actions";
import { useFormState } from "react-dom";

const LoginForm = () => {
  const [state, formAction] = useFormState(authenticate, undefined);

  return (
    <form action={formAction}>
      <h1>Login</h1>
      <input type="text" placeholder="username" name="username" />
      <input type="password" placeholder="password" name="password" />
      <button>Login</button>
      {state && state}
    </form>
  );
};

export default LoginForm;


//---------------------app/components/sidebar.jsx------------------------//
import { auth, signOut } from "@/app/auth";

const Sidebar = async () => {
  
  const { user } = await auth();
  
  return (
    <div >     
    </div>
  );
};

export default Sidebar;
