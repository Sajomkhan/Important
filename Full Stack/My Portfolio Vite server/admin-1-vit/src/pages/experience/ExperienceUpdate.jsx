import { useEffect, useState } from "react";
import Loading from "../../components/Loading";
import { base_url } from "../../utils/baseUrl";

const ExperienceUpdate = ({ id, setToggle }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [getData, setGetData] = useState();
  const [array, setArray] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const res = await fetch(`${base_url}/api/experience/${id}`);
        const jsonData = await res.json();
        setGetData(jsonData);
        setArray(jsonData.responsibilities.join("\n"));
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const handleChange = (e) => {
    setGetData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updateData = {
      ...getData,
      responsibilities: array.split("\n"),
    };
    try {
      setIsLoading(true);
      const res = await fetch(`${base_url}/api/experience/${id}`, {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(updateData),
        // credentials: "include",
      });
      setIsLoading(false);
      if (res.ok) {
        // window.location.reload();
        // alert("Update successful");
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Delete Experience
  const handleDelete = () => {
    fetch(`${base_url}/api/experience/${id}`, {
      method: "DELETE",
      // credentials: "include",
    })
      // .then(() => window.location.reload())
      .catch((error) => console.log(error));
  };

  return (
    <>
      {isLoading && <Loading />}
      <div className="flex flex-col gap-1 items-center bg-gray-900/20 px-3 py-3 lg:px-8 ">
        <button
          onClick={() => setToggle("")}
          className="px-3 py-1 font-semibold self-end bg-red-500/60"
        >
          X
        </button>

        <div className="flex flex-col gap-2 items-center text-gray-200">
          <h1 className="text-2xl font-bold">Update Experience</h1>
        </div>

        <form
          // onSubmit={handleSubmit}
          className="flex flex-col gap-7 text-sm text-white mt-6"
        >
          <input
            type="text"
            name="position"
            value={getData?.position}
            onChange={handleChange}
            placeholder="Position"
            required
            className="p-3 rounded-md w-[380px] xl:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            name="company"
            value={getData?.company}
            onChange={handleChange}
            placeholder="Company"
            required
            className="p-3 rounded-md w-[380px] xl:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            name="years"
            value={getData?.years}
            onChange={handleChange}
            placeholder="Years"
            required
            className="p-3 rounded-md w-[380px] xl:w-[550px] bg-gray-700/30"
          />
          <textarea
            cols="30"
            rows={getData?.responsibilities?.length + 1}
            name="responsibilities"
            value={array}
            onChange={(e) => setArray(e.target.value)}
            placeholder="Responsibilities (break into line for seperate)"
            required
            className="p-3 rounded-md w-[380px] xl:w-[550px] bg-gray-700/30"
          ></textarea>

          <div className="flex gap-7">
            <button onClick={handleSubmit} className="btnn primary_bg w-fit">
              Update
            </button>
            <button onClick={handleDelete} className="btnn danger_bg w-fit">
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ExperienceUpdate;
