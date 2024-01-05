import { useEffect, useState } from "react";
import ExperienceUpdate from "./ExperienceUpdate";
import Loading from "../../components/Loading";
import { base_url } from "../../utils/baseUrl";

const ExperienceCard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [toggle, setToggle] = useState("")
  const [data, setData] = useState([]);

  useEffect(() => {
    setIsLoading(true)
    fetch(`${base_url}/api/experience`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .then(() => setIsLoading(false));
  }, []);

  if(toggle) return(<ExperienceUpdate id={toggle} setToggle={setToggle}/>)

  return (
    <div className="relative w-full flex flex-col item-center justify-center xl:mt-6 ">
      {isLoading && <Loading />}
      {/* Experience  */}
      <div className="w-full flex flex-wrap justify-around gap-16 ">
        {data?.map((exper) => (
          <div
            key={exper._id}
            className="w-[475px] text-sm section_color shadow-lg p-4 rounded-lg "
          >
            <p className="text-lg font-bold primary">{exper.position}</p>
            <p className=" font-bold">
              {exper.company}
              <span className="font-light text-[12px]">| {exper.years}</span>
            </p>
            <div className=" mt-2">Responsibilities:</div>

            {exper.responsibilities?.map((responsible, index) => (
              <div key={index} className="ml-2 flex flex-col font-light">
                <div className="flex mr-1">
                  <div className="w-2 h-2 rounded-full bg-gray-500/70 mr-2 mt-1.5"></div>
                  <p>{responsible}</p>
                </div>
              </div>
            ))}
            {/* Button div */}
            <div className="flex justify-between gap-4">
              <button onClick={()=>setToggle(exper._id)} className="btnn primary_text mt-3">
                Update
              </button>
              <button onClick={()=>setToggle(exper._id)} className="btnn danger mt-3">
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperienceCard;
