
// -------------------------Component: Project.js-------------------------------- //

import { useEffect, useState } from "react";
import ProjectsCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

const Project = () => {
  const [projects, setProjects] = useState([]);

  // Get Projects
  useEffect(() => {
    fetch("http://localhost:5010/api/project")
      .then((res) => res.json())
      .then((data) => setProjects(data));
  }, []);

  // Delete Project
  const handleDelete = (id) => {
    try {
      const res = fetch(`http://localhost:5010/api/project/${id}`, {
        method: "DELETE",
        headers: { "content-type": "application/json" },
        credentials: "include",
      });
        
        if(res.status === 200) {
          alert("Delete successfully");     
          // navigate("/project", { replace: true });
        // window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-8 justify-center w-full overflow-y-visible">
      <div className="flex flex-col gap-2 items-center text-gray-200">
        <h1 className="text-3xl font-bold">Projects</h1>
      </div>

      <div className="flex flex-wrap justify-center gap-14 mx-6">
        {projects.length > 0 &&
          projects.map((project, index) => (
            <div key={index} className="">
              <ProjectsCard {...project} />

              <div className="mt-3 flex justify-center gap-4">
                <button className="btn primary_bg">Update</button>
                <button
                  className="btn danger_bg"
                  onClick={() => handleDelete(project._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
      </div>

      <ProjectForm />
    </div>
  );
};

export default Project;





// -------------------------Component: ProjectCard.js-------------------------------- //


const ProjectsCard = ({ title, tech, desc, image }) => {

    return (
      <>
          <div
            className="flex flex-col max-w-[375px] section_color shadow-lg py-2 px-1 rounded-xl"
          >
            <div className="w-full h-[200px]">
              <img
                src={"http://localhost:5010/" + image}
                alt="Projects Nameplate"
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <div className="flex flex-col mx-3 my-4 text-center lg:text-left">
              <h1 className="text-xl font-bold">{title}</h1>
              <p className="text-base font-semibold primary">{tech}</p>
              <p className=" text-sm">{desc}</p>
            </div>
          </div>
      </>
    );
  };
  
  export default ProjectsCard;




// -------------------------Component: ProjectForm.js-------------------------------- //


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


// -------------------------Component: Project.js-------------------------------- //
// -------------------------Component: Project.js-------------------------------- //