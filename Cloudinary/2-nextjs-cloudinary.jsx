
// npm i next-cloudinary

// set .env 

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dcqw3rtr1
NEXT_PUBLIC_CLOUDINARY_API_KEY=656279482671211
CLOUDINARY_API_SECRET=ZDkaFqtLLGKY-uf5-vcmZ_Ul4rOw


// Upload file
const [cover, setCover] = useState<any>()
  
<form action={(formData)=>updateProfile(formData, cover?.secure_url)}>
  import { CldUploadWidget } from "next-cloudinary";
    <CldUploadWidget uploadPreset="social" onSuccess={(result)=> console.log(result)
    }>
      {({ open }) => {
        return (
          <div onClick={()=>open()}>
            <label htmlFor="">Cover Picture</label>
            <div>
              <Image src={user.cover || "/noCover.png"} width={60} height={40} className=" w-15 h-10 rounded-md object-cover"></Image>
              <span className="text-xs underline text-gray-600 hover:text-blue-500">
                Upload
              </span>
            </div>
          </div>
        );
      }}
    </CldUploadWidget>
 <form />


// ----------lib/action.ts-------------- //
export const updateProfile = async (formData: FormData, cover:string) => {
  const fields = Object.fromEntries(formData);
  // or // const name = formData.get("name") as string
  const fiendsWithCover = {cover, ...fields}


  const { userId } = auth();
  try {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: fiendsWithCover
    });
    return { success: false, error: true };
  } catch (err) {
    console.log(err);
    return { success: false, error: true };
  }
}

