
// npm i next-cloudinary

// set .env 

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=dcqw3rtr1
NEXT_PUBLIC_CLOUDINARY_API_KEY=656279482671211
CLOUDINARY_API_SECRET=ZDkaFqtLLGKY-uf5-vcmZ_Ul4rOw


// Upload file
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
