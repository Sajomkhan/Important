import { useState } from "react";
import Loading from "../../components/Loading";
import { base_url } from "../../utils/baseUrl";

const TechForm = ({ setToggle }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("image", image);

      setIsLoading(true)
      const res = await fetch(`${base_url}/api/tech`, {
        method: "POST",
        body: formData,
      });
      setIsLoading(false)

      if (res.ok) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      onClick={() => setToggle(false)}
      className="fixed z-50 top-0 left-0 bg-gray-900/20 w-full h-screen"
    >
      {isLoading && <Loading />}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className=" flex flex-col bg-slate-900 py-4 px-6 mt-[200px] ml-[200px] xl:ml-[350px] max-w-[650px]"
      >
        <button
          onClick={() => setToggle(false)}
          className="px-3 py-1 font-semibold self-end bg-red-500/60"
        >
          X
        </button>

        <h1 className="text-2xl font-bold mb-5">Add New Tech Stack</h1>

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-7 text-sm text-white"
        >
          <input
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
            placeholder="Title"
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <input
            className="p-3 rounded-md w-[350px] md:w-[550px] bg-gray-700/30"
            type="file"
            accept="image/*"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button className="btnn primary_bg w-fit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default TechForm;
