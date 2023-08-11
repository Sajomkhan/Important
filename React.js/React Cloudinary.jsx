
// Cloudinary File Upload Fetcher Function
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

//   Invoke Fetcher Function

cloudinaryFetcher (image, set)