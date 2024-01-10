// -----------------------Generate Metadata----------------------//
const fetchPost = async (postId) => {
    const post = await fetch(`/api/posts/${postId}`, {
        method: "GET",
    });
    return post.json()
};

export async function generateMetadata({ params }){
    const { post } = await fetchPost(params.id);

    return {
        title: post[0].title,
        description: post[0].description
    }
}

export default function PostId({ params}) {
    return <main>
        Post: {params.id}
    </main>
}

//===================Dynamic Metadata=====================//
//===================== app/layout.tsx====================//

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Home Page",
    template: "%s | Test App",
  },
  description: "My Testing App Description",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
      <html lang="en">
        <body >
            {children}
        </body>
      </html>
  );
}


//===================== app/products/page.tsx====================//
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Products Page",
    description: "Products Description",
  };

const Products = () => {
  return (
    <div>Products</div>
  )
}
export default Products


//===================== app/about/page.tsx====================//
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Page",
    description: "About Description",
  };

const About = () => {
  return (
    <div>About</div>
  )
}
export default About
