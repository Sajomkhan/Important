// These code is taken from events project
// --------------------------------------------------------------------
// clerk.com  -->  dashboard --> add application --> Next.js[select] --> [coppe the secret key & past in .env.local]
// --> continue in docs and flow the instruction
// for custome Sign in and see the docs --> Create custom sign-up and sign-in [at the end]


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
 
export default authMiddleware({
    publicRoutes: [    // add routes address to be public as needed.
        '/',
        '/events/:id',
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing',
    ],
    ignoredRoutes: [
        '/api/webhook/clerk',
        '/api/webhook/stripe',
        '/api/uploadthing',
    ]
});
 
export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};


//--------------------  app/(auth)/sign-in/[[..sign-in] ---------------------// for custome Sign in and see the docs --> Create custom sign-up and sign-in [at the end]
// Creating a custom Sign-in
import { SignIn } from "@clerk/nextjs";

export default function page(){
    return <SignIn/>
}

//--------------------  app/(auth)/sign-up/[[..sign-up] ---------------------//

import { SignUp } from "@clerk/nextjs";

export default function page(){
    return <SignUp/>
}

//-------------------- .env.local ---------------------//
// for custom sign-in and sign-up add in  .env.local 
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/

//--------------------  app/(auth)/layout.tsx ---------------------// for centerize login page
const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
      {children}
    </div>
  );
};

export default Layout;



//-------------------- components/Header.tsx ---------------------//

import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";

const Header = () => {
  return (
    <header >    
      <SignedIn>        // when user is loged in it will automatically visible user profile picture and info
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    
      <SignedOut>       // when user is loged out it will automatically invisible 'Login button' for using this 'SignedOut tag' 
        <Button>
            <Link href='/sign-in'>Login</Link>
        </Button>
      </SignedOut>
    </header>
  );
};

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

//--------------------------------------------------------//

// Now it is time to use webhooks -
// Clerk webhooks allow you to receive event notifications from Clerk.
// Webhooks docs -->  https://clerk.com/docs/users/sync-data

// Install --->  npm install svix

// create a file same the bellow path


// --------------------- app/api/webhook/clerk/route.ts ----------------------//

 import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
 
export async function POST(req: Request) {
 
  // You can find this in the Clerk Dashboard -> Webhooks -> choose the webhook
  const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET
 
  if (!WEBHOOK_SECRET) {
    throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local')
  }
 
  // Get the headers
  const headerPayload = headers();
  const svix_id = headerPayload.get("svix-id");
  const svix_timestamp = headerPayload.get("svix-timestamp");
  const svix_signature = headerPayload.get("svix-signature");
 
  // If there are no headers, error out
  if (!svix_id || !svix_timestamp || !svix_signature) {
    return new Response('Error occured -- no svix headers', {
      status: 400
    })
  }
 
  // Get the body
  const payload = await req.json()
  const body = JSON.stringify(payload);
 
  // Create a new Svix instance with your secret.
  const wh = new Webhook(WEBHOOK_SECRET);
 
  let evt: WebhookEvent
 
  // Verify the payload with the headers
  try {
    evt = wh.verify(body, {
      "svix-id": svix_id,
      "svix-timestamp": svix_timestamp,
      "svix-signature": svix_signature,
    }) as WebhookEvent
  } catch (err) {
    console.error('Error verifying webhook:', err);
    return new Response('Error occured', {
      status: 400
    })
  }
 
  // Get the ID and type
  const { id } = evt.data;
  const eventType = evt.type;
 
  console.log(`Webhook with and ID of ${id} and type of ${eventType}`)
  console.log('Webhook body:', body)
 
  return new Response('', { status: 200 })
}
 
