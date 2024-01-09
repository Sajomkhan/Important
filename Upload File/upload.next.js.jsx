


//=====================app/pate.tsx=======================//

"use client";
import{ useState } from "react";

const Home = () => {
    
  const [file, setFile] = useState<File>();

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return;

    try {
      const data = new FormData();
      data.set("file", file);

      const res = fetch("api/upload", {
        method: "POST",
        body: data,
      });

    } catch (error: any) {
      console.log(error);
    }
  };

  return (
      <form onSubmit={onSubmit}>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files?.[0])}
        />
        <button type="submit">Submit</button>
      </form>
  );
};

export default Home;



//=================app/api/upload/route.ts=================//
