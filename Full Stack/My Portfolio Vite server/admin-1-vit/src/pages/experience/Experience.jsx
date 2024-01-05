import { useState } from "react";
import ExperienceCard from "./ExperienceCard";
import ExperienceForm from "./ExperienceForm";


const Experience = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex flex-col gap-5 justify-center w-full ">
      <h1 className="text-3xl text-center font-bold">Experience</h1>
      
      <button
        onClick={() => setToggle(!toggle)}
        className="btnn w-fit font-semibold primary_bg mb-3"
      >
        {!toggle? "Add Experience" : "<< Go Back"}
      </button>

      { toggle && <ExperienceForm />}

      <div className="flex flex-wrap justify-center gap-8 mx-6">
        < ExperienceCard/>
      </div>

    </div>
  );
};

export default Experience;
