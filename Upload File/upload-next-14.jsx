


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

      const response = fetch("api/upload", {
        method: "POST",
        body: data,
      });
      return response

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

export async function POST(request: NextRequest) {
    const data = await request.formData()
    const file: File | null =  data.get('file') as unknown as File

    if(!file) {
        return NextResponse.json({ success: false })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    console.log(buffer);

    return NextResponse.json({success: true, message: 'The file was sent'})
    
}
