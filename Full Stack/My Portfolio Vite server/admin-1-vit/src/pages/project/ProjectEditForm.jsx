import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../components/Loading";
import { base_url } from "../../utils/baseUrl";

const ProjectEditForm = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Loading State
  const [isLoading, setIsLoading] = useState(false);
  // Data from DB
  const [getData, setGetData] = useState();
  // Data form input field
  const [image, setImage] = useState("");

  useEffect(() => {
    setIsLoading(true);
    fetch(`${base_url}/api/project/${id}`)
      .then((res) => res.json())
      .then((data) => setGetData(data))
      .then(() => setIsLoading(false));
  }, []);

  const handleDataChange = (e) => {
    setGetData({ ...getData, [e.target.name]: e.target.value });
    // setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", image);

    const propertyNames = Object.keys(getData);
    propertyNames.forEach((key) => {
      formData.append(key, getData[key]);
    });

    try {
      setIsLoading(true);
      const res = await fetch(`${base_url}/api/project/${id}`, {
        method: "PUT",
        body: formData,
        // credentials: "include",
      });
      setIsLoading(false);
      if (res.ok) {
        navigate("/project", { replace: true });
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Project
  const handleDelete = () => {
    setIsLoading(true);
    fetch(`${base_url}/api/project/${id}`, {
      method: "DELETE",
      // credentials: "include",
    })
      .then(() => setIsLoading(false))
      .then(() => navigate("/project", { replace: true }))
      .then(alert("Delete successful"))
      .catch((error) => console.log(error));
  };

  return (
    <div>
      <button
        onClick={() => navigate("/project", { replace: true })}
        className="btnn w-fit font-semibold primary_bg mb-3"
      >
        Go Back
      </button>

      <div className="w-full h-full flex gap-6 lg:flex-row flex-col justify-center items-center bg-gray-800">
        {isLoading && <Loading />}
        <div className="w-[500px] h-[330px] py-3 px-3">
          <img
            src={getData?.image?.url}
            alt="Projects Nameplate"
            className="w-full h-full object-fit rounded-lg"
          />
        </div>
        <div className="flex flex-col items-center lg:w-[650px] shadow-md mt-8">
          <h1 className="text-2xl text-gray-300 font-bold mb-10">
            Project Details
          </h1>

          <form
            onSubmit={handleUpdate}
            className=" flex flex-col gap-6 text-sm text-white"
          >
            <div className="flex flex-col lg:flex-row gap-4 justify-between ">
              <input
                type="text"
                name="projectId"
                value={getData?.projectId}
                onChange={handleDataChange}
                placeholder="ID"
                className="p-2 rounded-md w-1/3 bg-gray-700/30"
              />
              <input
                type="file"
                name="image"
                onChange={(e) => setImage(e.target.files[0])}
                className="p-2 rounded-md w-1/2 bg-gray-700/30"
              />
            </div>
            <input
              type="text"
              name="title"
              value={getData?.title}
              onChange={handleDataChange}
              placeholder="Title"
              className="p-2 rounded-md w-[350px] sm:w-[470px] lg:w-[550px] bg-gray-700/30"
            />
            <input
              type="text"
              name="tech"
              value={getData?.tech}
              onChange={handleDataChange}
              placeholder="Tech"
              className="p-2 rounded-md w-[350px] sm:w-[470px] lg:w-[550px] bg-gray-700/30"
            />
            <input
              type="text"
              name="github"
              value={getData?.github}
              onChange={handleDataChange}
              placeholder="GitHub Url"
              className="p-2 rounded-md w-[350px] sm:w-[470px] lg:w-[550px] bg-gray-700/30"
            />
            <input
              type="text"
              name="live"
              value={getData?.live}
              onChange={handleDataChange}
              placeholder="Live Url"
              className="p-2 rounded-md w-[350px] sm:w-[470px] lg:w-[550px] bg-gray-700/30"
            />
            <textarea
              cols="30"
              rows="5"
              name="desc"
              value={getData?.desc}
              onChange={handleDataChange}
              placeholder="Description"
              className="p-2 rounded-md w-[350px] sm:w-[470px] lg:w-[550px] bg-gray-700/30"
            ></textarea>

            {/* Button */}
            <div className="flex gap-6 font-semibold">
              <button className="btnn primary_bg w-fit mb-5">Update</button>
              <button
                onClick={handleDelete}
                className="btnn danger_bg w-fit mb-5"
              >
                Delete This Project
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProjectEditForm;
