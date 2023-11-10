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
