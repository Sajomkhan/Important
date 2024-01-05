import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { base_url } from "../../utils/baseUrl";

const About = () => {
  const [isLoading, setIsLoading] = useState(false)
  // Data from input field
  const [image, setImage] = useState("");
  // Data from server
  const [data, setData] = useState({});
  
  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

    // Check if About information already exist or not
    const id = data._id? data._id : ""
    const method = data._id? "PUT" : "POST"

  useEffect(() => {
    setIsLoading(true)
    fetch(`${base_url}/api/about`)
      .then((res) => res.json())
      .then((data) => setData(data[0]))
      .then(()=>setIsLoading(false))
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("image", image);

    const propertyNames = Object.keys(data);
    propertyNames.forEach((key) => {
      formData.append(key, data[key]);
    });

    try {
      setIsLoading(true)
      const res = await fetch(`${base_url}/api/about/${id}`, {
        method: method,
        body: formData,
        // credentials: "include",
      });
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
          <h1 className="text-3xl font-bold">About Page</h1>
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
              src={data?.image?.url}
              alt="Picture"
              className="w-12 h-12 object-cover"
            />
          </div>

          <input
            type="text"
            value={data.name}
            name="name"
            onChange={handleDataChange}
            placeholder="Name"
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            value={data.education}
            name="education"
            onChange={handleDataChange}
            placeholder="Education"
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            value={data.position}
            name="position"
            onChange={handleDataChange}
            placeholder="Position"
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            value={data.url}
            name="url"
            onChange={handleDataChange}
            placeholder="CV Url"
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />
          <textarea
            cols="30"
            rows="10"
            value={data.desc}
            name="desc"
            onChange={handleDataChange}
            placeholder="Description"
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          ></textarea>

          <button className="btnn primary_bg w-fit">{data._id? "Update" : "Submit"}</button>
        </form>
      </div>
    </>
  );
};

export default About;
