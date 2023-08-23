
// ----------------Component: Fetcher Component------------------------------//

export const cloudinaryFetcher = async( image, setUrl) => {

  const data = new FormData();          
 
  data.append("file", image);
  data.append(
    'upload_preset', 'my-portfolio'
    );
  data.append("cloud_name", ''); 

  
 // Upload Image directly to Cloudinary no need backend
    await fetch(`https://api.cloudinary.com/v1_1/dcqw2t8r1/image/upload`, {
        method: "POST",
        body: data,
      })
      .then((res) => res.json())
      .then((data)=> {
        setUrl(data.url)
      })
      .catch((err) => console.log(err))    
}



// -----------------------Component: Form-Component-------------------------------//

import { useState } from "react";

const Form-Component = () => {
  
const [image, setImage] = useState("");
const [url, setUrl] = useState("");

async function handleSubmit(e) {
  e.preventDefault();

  // Cloudinary fetcher function
  await cloudinaryFetcher(image, setUrl);

  // get url from cloudinary
  console.log(url);
}

return (
  <>
    <div className="flex flex-col gap-8 items-center w-full overflow-y-visible">
      <div className="flex flex-col gap-2 items-center text-gray-200">
        <h1 className="text-3xl font-bold">Add New Tech Stack</h1>
      </div>

      <form
        onSubmit={handleSubmit}
        className=" flex flex-col gap-7 text-sm text-white"
      >
        <input
          type="file"
          onChange={(e) => setImage(e.target.files[0])}
          className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
        />

        <button className="btn primary_bg w-fit">Submit</button>
      </form>
    </div>
  </>
);
  
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    // Cloudinary fetcher function
    await cloudinaryFetcher(image, setUrl);

    // get url from cloudinary
    console.log(url);
  }

  return (
    <>
      <div className="flex flex-col gap-8 items-center w-full overflow-y-visible">
        <div className="flex flex-col gap-2 items-center text-gray-200">
          <h1 className="text-3xl font-bold">Add New Tech Stack</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-7 text-sm text-white"
        >
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />

          <button className="btn primary_bg w-fit">Submit</button>
        </form>
      </div>
    </>
  );

};

export default Form-Component;
