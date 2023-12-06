// clerk.com  -->  dashboard
// --> add application


npm install @clerk/nextjs

  
//-------------------- .env ---------------------//

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_YW1hemVkLWdvYmxpbi0yNy5jbGVyay5hY2NvdW50cy5kZXYk
CLERK_SECRET_KEY=sk_test_w4vsvNuMU4Q6D1jhD6C7Z0RFsnfKkKZsxCfuIZFkiu



//-------------------- /app/layout.tsx ---------------------//
  // Create a middleware.ts file. If your application uses the src/ directory, 
  // your middleware.ts file should be placed inside the src/ folder. 
  // If you are not using a src/ directory, place the middleware.ts file in your root directory alongside .env.local. //
  
import { ClerkProvider } from '@clerk/nextjs'
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>{children}</body>
 
      </html>
    </ClerkProvider>
  )
}



//-------------------- root file/middleware.ts ---------------------//
    
import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
    publicRoutes: ['/']    // add routes address to be public as needed.
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};


//-------------------- (components)/Navbar.tsx ---------------------//

"use client"
import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs"

export default function Navbar() {

    const {user, isLoaded, isSignedIn} = useUser()

  return (
      <nav>
        <div className="flex items-center gap-3">
          <Link href={"/"}>Home</Link>
          <Link href={"/dashboard"}>Dashboard</Link>
          // SignOut button invesible when user not signin
          {
            isLoaded && user &&
            <>
               <UserButton afterSignOutUrl="/" />
            </>
          }
        </div>
      </nav>
  );
}

// ---------------------home.tsx-----------------------//
import { auth,  } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation'

export default function Home() {
  const {userId} = auth()

  if(userId){
    redirect("/dashboard")
  }

  return (
    <main className="">
      <h1>Home Page</h1>
    </main>
  )
}

 