import { useEffect, useState } from "react";
import { base_url } from "../../utils/baseUrl";
import Loading from "../../components/Loading";

const TechCard = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [techs, setTech] = useState();

  useEffect(() => {
    setIsLoading(true)
    fetch(`${base_url}/api/tech`)
      .then((res) => res.json())
      .then((data) => setTech(data))
      .then(() => setIsLoading(false));
  }, []);

  const handleDelete = async (id) => {
    try {
      setIsLoading(true)
      const res = await fetch(`${base_url}/api/tech/${id}`, {
        method: "DELETE",
      });
      setIsLoading(false)

      if (res.ok) {
        const updateTech = techs.filter((tech) => tech._id !== id);
        setTech(updateTech);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-wrap justify-center gap-5 w-full p-8 lg:p-12 ">
      {isLoading && <Loading />}
      {techs?.map((tech) => (
        <div
          key={tech._id}
          className="flex flex-col bg-gray-600/20 justify-center items-center pb-3"
        >
          <button
            onClick={() => handleDelete(tech._id)}
            className="self-end bg-gray-800/70 text-gray-300 w-6 h-5 m-1"
          >
            <p className="-translate-y-1">x</p>
          </button>
          <div className="h-20 w-20 px-3 mx-3 md:h-28 md:w-28 rounded-full flex items-center justify-center">
            <img src={tech.image.url} alt="Image"></img>
          </div>
          <p className="text-sm md:text-base">{tech.title}</p>
        </div>
      ))}
    </div>
  );
};

export default TechCard;
