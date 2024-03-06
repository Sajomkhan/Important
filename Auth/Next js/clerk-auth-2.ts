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


//--------------------  app/(auth)/sign-in/[[..sign-in]/page.tsx ---------------------// for custome Sign in and see the docs --> Create custom sign-up and sign-in [at the end]
// Creating a custom Sign-in
import { SignIn } from "@clerk/nextjs";

export default function page(){
    return <SignIn/>
}

//--------------------  app/(auth)/sign-up/[[..sign-up]/page.tsx ---------------------//

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


// --------------------- lib/action/user.actions.ts ----------------------//
//-----------------
export const handleError = (error: unknown) => {
  console.error(error)
  throw new Error(typeof error === 'string' ? error : JSON.stringify(error))
}
//-----------------

"use server";

import { revalidatePath } from "next/cache";

import { connectToDatabase } from "@/lib/database";
import User from "@/lib/database/models/user.model";
import Order from "@/lib/database/models/order.model";
import Event from "@/lib/database/models/event.model";
import { handleError } from "@/lib/utils";

import { CreateUserParams, UpdateUserParams } from "@/types";

export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase();

    const newUser = await User.create(user);
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    handleError(error);
  }
}

export async function getUserById(userId: string) {
  try {
    await connectToDatabase();

    const user = await User.findById(userId);

    if (!user) throw new Error("User not found");
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    handleError(error);
  }
}

export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase();

    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    if (!updatedUser) throw new Error("User update failed");
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    handleError(error);
  }
}

export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase();

    // Find user to delete
    const userToDelete = await User.findOne({ clerkId });

    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Unlink relationships
    await Promise.all([
      // Update the 'events' collection to remove references to the user
      Event.updateMany(
        { _id: { $in: userToDelete.events } },
        { $pull: { organizer: userToDelete._id } }
      ),

      // Update the 'orders' collection to remove references to the user
      Order.updateMany(
        { _id: { $in: userToDelete.orders } },
        { $unset: { buyer: 1 } }
      ),
    ]);

    // Delete user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    handleError(error);
  }
}

// --------------------- app/api/webhook/clerk/route.ts ----------------------//

import { Webhook } from 'svix'
import { headers } from 'next/headers'
import { WebhookEvent } from '@clerk/nextjs/server'
import { createUser } from '@/lib/actions/user.actions'
import { clerkClient } from '@clerk/nextjs'
import { NextResponse } from 'next/server'
 
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

  //========================= Only Keep Eye Here & wrote code here
  
  // CREATE USER //
  if (eventType === "user.created") {
    const { id, email_addresses, image_url, first_name, last_name, username } =
      evt.data; // received data from clark by webhook

    const user = {
      clerkId: id,
      email: email_addresses[0].email_address,
      username: username!,
      firstName: first_name,
      lastName: last_name,
      photo: image_url,
    };

    const newUser = await createUser(user); // create user in database

    if (newUser) {
      await clerkClient.users.updateUserMetadata(id, {
        //send database user referance id to clark
        publicMetadata: {
          userId: newUser._id,
        },
      });
    }

    return NextResponse.json({ message: "OK", user: newUser });
  }

  // UPDATE USER //
  if (eventType === "user.updated") {
    const { id, image_url, first_name, last_name, username } = evt.data;

    const user = {
      firstName: first_name,
      lastName: last_name,
      username: username!,
      photo: image_url,
    };

    const updatedUser = await updateUser(id, user);

    return NextResponse.json({ message: "OK", user: updatedUser });
  }

  // DELETE USER //
  if (eventType === "user.deleted") {
    const { id } = evt.data;

    const deletedUser = await deleteUser(id!);

    return NextResponse.json({ message: "OK", user: deletedUser });
  }
  //============================

  return new Response('', { status: 200 })
}
 
 
 
