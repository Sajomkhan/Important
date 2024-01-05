import { useState } from "react";
import ProjectsCard from "./ProjectCard";
import ProjectForm from "./ProjectForm";

const Project = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col gap-5 justify-center w-full ">
      <h1 className="text-3xl text-center font-bold">Projects</h1>

      
      <button
        onClick={() => setToggle(!toggle)}
        className="btnn w-fit font-semibold primary_bg mb-3"
      >
        Add New Project
      </button>

      { toggle && <ProjectForm setToggle={setToggle}/>}

      <div className="flex flex-wrap justify-center gap-14 mx-6">
        <ProjectsCard />
      </div>

    </div>
  );
};

export default Project;
