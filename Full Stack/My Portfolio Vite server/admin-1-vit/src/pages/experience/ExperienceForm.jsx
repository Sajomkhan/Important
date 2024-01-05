import { useState } from "react";
import Loading from "../../components/Loading";
import { base_url } from "../../utils/baseUrl";
// split('\n')

const ExperienceForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({});

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const postData = {
      ...formData,
      responsibilities: formData.responsibilities.split("\n"),
    };

    try {
      setIsLoading(true)
      const res = await fetch(`${base_url}/api/experience`, {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(postData),
        // credentials: "include",
      });
      setIsLoading(false)
      if (res.ok) {
        window.location.reload();
        alert("Experience add successful");
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
          <h1 className="text-2xl font-bold">Add Experience</h1>
        </div>

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-7 text-sm text-white"
        >
          <input
            type="text"
            // value={data.position}
            name="position"
            onChange={handleChange}
            placeholder="Position"
            required
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            // value={data.company}
            name="company"
            onChange={handleChange}
            placeholder="Company"
            required
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            // value={data.years}
            name="years"
            onChange={handleChange}
            placeholder="Years"
            required
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          />
          <textarea
            cols="30"
            rows="5"
            // value={data.responsibilities}
            name="responsibilities"
            onChange={handleChange}
            placeholder="Responsibilities (break into line for seperate)"
            required
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
          ></textarea>

          <button className="btnn primary_bg w-fit">Submit</button>
        </form>
      </div>
    </>
  );
};

export default ExperienceForm;
