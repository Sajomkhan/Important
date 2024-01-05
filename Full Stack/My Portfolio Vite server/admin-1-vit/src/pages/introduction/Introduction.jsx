import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { base_url } from "../../utils/baseUrl";

const Introduction = () => {
  const [isLoading, setIsLoading] = useState(false)
  // Data from input form
  const [image, setImage] = useState("");
  // Data from server
  const [showImage, setShowImage] = useState();
  const [data, setData] = useState({});

  // Check if About information already exist or not
  const id = data._id ? data._id : "";
  const method = data._id ? "PUT" : "POST";

  // Fetch  GET Data
  useEffect(() => {
    const handleFetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`${base_url}/api/introduction`);
        const responseData = await response.json();
        setData(responseData[0]);
        setShowImage(responseData[0].image.url);
        setIsLoading(false)
      } catch (error) {
        console.error("Error while fetching data:", error);
      }
    };
    handleFetchData();
  }, []);
console.log(data);

  // Input Handle
  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (name === "skills") {
      const newArray = value.split("\n");
      setData((prevData) => ({
        ...prevData,
        [name]: newArray,
      }));
    } else {
      setData((prevData) => ({
        ...prevData,
        [name]: type === "file" ? files[0] : value,
      }));
    }
  };

  // Fetch POST Data
  const handleSubmit = async (event) => {
    event.preventDefault();

    const formData = new FormData();

    formData.append("image", image);

    const propertyNames = Object.keys(data);
    propertyNames.forEach((key) => {
      if (key === "skills") {
        formData.append(key, data[key].join('\n'));
      } else {
        formData.append(key, data[key]);
      }
    });

    setIsLoading(true)
    try {
      const res = await fetch(
        `${base_url}/api/introduction/${id}`,
        {
          method: method,
          body: formData,
        }
      );
      setIsLoading(false)
      if (res.ok) {
        window.location.reload();
        alert("Update successfull");
      }
    } catch (error) {
      console.log(error);
    }
  };


  return (
    <>
     {isLoading && <Loading />}
      <div className="flex flex-col gap-8 items-center w-full overflow-y-visible">
        <div className="flex flex-col gap-2 items-center text-gray-200">
          <h1 className="text-3xl font-bold">Introduction</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-7 text-sm text-white"
        >
          <div className="flex justify-between items-center p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30">
            <input
              type="file"
              name="image"
              onChange={(e) => setImage(e.target.files[0])}
            />
            <img
              src={showImage}
              alt="Picture"
              className="w-12 h-12 object-cover"
            />
          </div>

          <input
            type="text"
            name="headline"
            value={data?.headline}
            onChange={handleInputChange}
            placeholder="Headline"
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />

          <div className="flex p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30">
            <textarea
              cols="full"
              rows="5"
              type="text"
              name="skills_initiative"
              value={data?.skills_initiative}
              onChange={handleInputChange}
              placeholder="Skills initiative"
              className="bg-transparent self-start"
            />

            <div className="bg-teal-600/30 h-24 w-0.5" />

            <textarea
              cols="30"
              rows="5"
              name="skills"
              value={data?.skills?.join("\n")}
              onChange={handleInputChange}
              placeholder="Write your skills (seperate by line break)"
              className="flex-1 bg-transparent pl-5"
            ></textarea>
          </div>

          <textarea
            cols="30"
            rows="5"
            name="desc"
            value={data?.desc}
            onChange={handleInputChange}
            placeholder="Description"
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          ></textarea>

          <button className="btnn primary_bg w-fit">
            {data?._id ? "Update" : "Submit"}
          </button>
        </form>
      </div>
    </>
  );
};

export default Introduction;