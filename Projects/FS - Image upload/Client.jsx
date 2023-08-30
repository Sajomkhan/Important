import { useState } from "react";
// import { useNavigate } from "react-router-dom";

const ProjectForm = () => {
    const [title, setTitle] = useState("")
    const [tech, setTech] = useState("")
    const [file, setFile] = useState("")
    const [desc, setDesc] = useState("")

    // console.log({title, tech, file, desc});

    // const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        if (!title || !tech || !file || !desc ){
          alert("Please fill the field properly!");
        }else{

          const data = new FormData();

          data.set("title", title);
          data.set("tech", tech);
          data.set("desc", desc);
          data.set("file", file[0]);
      
          const res = await fetch("http://localhost:5010/api/project", {
            method: "POST",
            body: data,
            credentials: "include",
          });
          if (res.ok) {
          //   navigate("/project", { replace: true });
          //   e.target.reset()
          }
        }
      }

  return (
    <>
      <div className="flex flex-col gap-8 items-center">
        <div className="flex flex-col gap-2 items-center text-gray-200">
          <h1 className="text-3xl font-bold">Add New Project</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-7 text-sm text-white"
        >
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            value={tech}
            onChange={(e) => setTech(e.target.value)}
            placeholder="Tech"
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />
          <input
            type="file"
            onChange={(e) => setFile(e.target.files)}
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />
          <textarea
            cols="30"
            rows="10"
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          ></textarea>
          <button className="btn primary_bg w-fit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ProjectForm;
