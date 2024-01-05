import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loading from "../../components/Loading";
import { base_url } from "../../utils/baseUrl";

const ProjectsCard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [projects, setProjects] = useState([]);

  // Get Projects
  useEffect(() => {
    setIsLoading(true);
    fetch(`${base_url}/api/project`)
      .then((res) => res.json())
      .then((data) => setProjects(data))
      .then(() => setIsLoading(false));
  }, []);

  if (!projects) {
    return (
      <div className="w-full h-screen flex justify-center bg-gray-800">
        <div className="text-2xl mt-16 mx-auto primary ">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-wrap justify-center gap-14 mx-6">
      {isLoading && <Loading />}
      {projects.length > 0 &&
        projects.map((project) => {
          const { _id, title, projectId, tech, github, live, desc } = project;
          const { url } = project.image;

          return (
            <div key={project._id}>
              <div className="flex flex-col max-w-[375px] section_color shadow-lg py-2 px-1 rounded-xl">
                <div className="w-full h-[200px]">
                  <img
                    src={url}
                    alt="Projects Nameplate"
                    className="w-full h-full object-cover rounded-lg"
                  />
                </div>
                <div className="flex flex-col mx-3 my-4">
                  <h1 className="text-xl font-bold">{title}</h1>
                  <p className="text-base font-semibold primary_text">{tech}</p>

                  {/*Live & Github Button div */}
                  <div className="my-3 flex items-center gap-6">
                    <p className="font-thin">Go to the project link :</p>
                    <Link to={github} className="btnn_sm primary_bg">
                      GitHub
                    </Link>
                    <Link to={live} className="btnn_sm danger_bg">
                      Live
                    </Link>
                  </div>

                  <p className=" text-sm">{desc}</p>
                </div>

                {/* Button div */}
                <div className="flex justify-between gap-4 mb-1">
                  <div>
                    <Link
                      to={`/project-edit/${_id}`}
                      className="btnn primary_text"
                    >
                      Update
                    </Link>
                    <Link to={`/project-edit/${_id}`} className="btnn danger">
                      Delete
                    </Link>
                  </div>
                  <div className="flex gap-1 items-center font-thin text-[12px] primary_text">
                    <p>Project Id: </p>
                    <div className=" bg-transparent text-center mr-5">
                      {projectId}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default ProjectsCard;
