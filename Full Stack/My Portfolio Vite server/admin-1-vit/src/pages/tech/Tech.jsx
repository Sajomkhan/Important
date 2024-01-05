import { useState } from "react";
import TechCard from "./TechCard";
import TechForm from "./TechForm";

const Tech = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div>
      <div className="flex flex-col gap-2 items-center text-gray-200">
        <h1 className="text-3xl font-bold">Tech Stack</h1>
      </div>

      <button
        onClick={() => setToggle(!toggle)}
        className="btnn font-semibold primary_bg mb-3"
      >
        Add New Tech
      </button>

      {toggle && <TechForm setToggle={setToggle}/>}

      <TechCard />
    </div>
  );
};

export default Tech;