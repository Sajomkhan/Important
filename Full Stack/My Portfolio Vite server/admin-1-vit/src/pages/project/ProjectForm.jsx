import { useState } from "react";
import Loading from "../../components/Loading";
import { base_url } from "../../utils/baseUrl";

const ProjectForm = ({ setToggle }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [image, setImage] = useState("");
  const [data, setData] = useState({});
  const handleDataChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    // setData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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
      const res = await fetch(`${base_url}/api/project/`, {
        method: "POST",
        body: formData,
        // credentials: "include",
      });
      setIsLoading(false)
      if (res.ok) {
        window.location.reload();
        alert('Project added successfully')
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section
      onClick={() => setToggle(false)}
      className="fixed z-50 w-full h-screen top-0 left-0 bg-gray-900/20 overflow-y-auto"
    >

      {isLoading && <Loading />}
      <div
        onClick={(e) => {
          e.stopPropagation();
        }}
        className="flex flex-col lg:w-[650px] items-center shadow-md bg-gray-900 mt-16 ml-[200px] xl:ml-[320px]"
      >
        {/* Close button */}
        <button
          onClick={() => setToggle(false)}
          className="btnn font-semibold self-end bg-red-500/50 rounded-sm m-2"
        >
          X
        </button>

        <h1 className="text-2xl font-bold mb-3">Add New Project</h1>

        <form
          onSubmit={handleSubmit}
          className=" flex flex-col gap-6 text-sm text-white"
        >
          <div className="flex flex-col lg:flex-row gap-4 justify-between " >
          <input
            type="text"
            name="projectId"
            onChange={handleDataChange}
            placeholder="ID"
            className="p-2 rounded-md w-1/3 bg-gray-700/30"
          />
          <input
            type="file"
            name="image"
            onChange={(e) => setImage(e.target.files[0])}
            className="p-2 rounded-md w-1/2 bg-gray-700/30"
            required
            />
          </div>

          <input
            type="text"
            name="title"
            onChange={handleDataChange}
            placeholder="Title"
            className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            name="tech"
            onChange={handleDataChange}
            placeholder="Tech"
            className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            name="github"
            onChange={handleDataChange}
            placeholder="GitHub Url"
            className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
          />
          <input
            type="text"
            name="live"
            onChange={handleDataChange}
            placeholder="Live Url"
            className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
          />
          <textarea
            cols="30"
            rows="5"
            name="desc"
            onChange={handleDataChange}
            placeholder="Description"
            className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
          ></textarea>
          <button className="btnn primary_bg w-fit mb-5">Submit</button>
        </form>
      </div>
    </section>
  );
};

export default ProjectForm;



// Loop through the object properties and append to FormData
// for (const key in data) {
//   if (data.hasOwnProperty(key)) {
//     formData.append(key, data[key]);
//   }
// }



// import { useState } from "react";

// const ProjectForm = ({ setToggle }) => {
//   const [image, setImage] = useState("");
//   const [title, setTitle] = useState("");
//   const [tech, setTech] = useState("");
//   const [github, setGithub] = useState("");
//   const [live, setLive] = useState("");
//   const [desc, setDesc] = useState("");

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const formData = new FormData();
//       formData.append("image", image);
//       formData.append("title", title);
//       formData.append("tech", tech);
//       formData.append("github", github);
//       formData.append("live", live);
//       formData.append("desc", desc);

//       const res = await fetch("http://localhost:5010/api/project", {
//         method: "POST",
//         body: formData,
//         // credentials: "include",
//       });

//       console.log(formData);
//       console.log(res);
//       // if (res.ok) {
//       //   // navigate("/project", { replace: true });
//       // }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   console.log(image);

//   return (
//     <section
//       onClick={() => setToggle(false)}
//       className="fixed z-50 w-full h-screen top-0 left-0 bg-gray-900/20 overflow-y-auto"
//     >
//       <div
//         onClick={(e) => {
//           e.stopPropagation();
//         }}
//         className="flex flex-col lg:w-[650px] items-center shadow-md bg-gray-900 mt-16 ml-[200px] xl:ml-[320px]"
//       >
//         {/* Close button */}
//         <button
//           onClick={() => setToggle(false)}
//           className="btnn font-semibold self-end bg-red-500/50 rounded-sm m-2"
//         >
//           X
//         </button>

//         <h1 className="text-2xl font-bold mb-3">Add New Project</h1>

//         <form
//           onSubmit={handleSubmit}
//           className=" flex flex-col gap-6 text-sm text-white"
//         >
//           <input
//             type="file"
//             onChange={(e) => setImage(e.target.files[0])}
//             className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
//           />
//           <input
//             type="text"
//             // value={data.title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Title"
//             className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
//           />
//           <input
//             type="text"
//             // value={data.tech}
//             onChange={(e) => setTech(e.target.value)}
//             placeholder="Tech"
//             className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
//           />
//           <input
//             type="text"
//             // value={data.github}
//             onChange={(e) => setGithub(e.target.value)}
//             placeholder="GitHub Url"
//             className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
//           />
//           <input
//             type="text"
//             // value={data.live}
//             onChange={(e) => setLive(e.target.value)}
//             placeholder="Live Url"
//             className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
//           />
//           <textarea
//             cols="30"
//             rows="5"
//             // value={data.desc}
//             onChange={(e) => setDesc(e.target.value)}
//             placeholder="Description"
//             className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
//           ></textarea>
//           <button className="btnn primary_bg w-fit mb-5">Submit</button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ProjectForm;



// import { useState } from "react";
// // import { useNavigate } from "react-router-dom";

// const ProjectForm = ({ setToggle }) => {
//   const [title, setTitle] = useState("");
//   const [tech, setTech] = useState("");
//   const [file, setFile] = useState("");
//   const [desc, setDesc] = useState("");

//   // console.log({title, tech, file, desc});

//   // const navigate = useNavigate();

//   async function handleSubmit(e) {
//     e.preventDefault();
//     if (!title || !tech || !file || !desc) {
//       alert("Please fill the field properly!");
//     } else {
//       const data = new FormData();

//       data.set("title", title);
//       data.set("tech", tech);
//       data.set("desc", desc);
//       data.set("file", file[0]);

//       const res = await fetch("http://localhost:5010/api/project", {
//         method: "POST",
//         body: formData,
//         credentials: "include",
//       });
//       if (res.ok) {
//         //   navigate("/project", { replace: true });
//         //   e.target.reset()
//       }
//     }
//   }

//   return (
//     <section
//       onClick={() => setToggle(false)}
//       className="fixed z-50 w-full h-screen top-0 left-0 bg-gray-900/20 overflow-y-auto"
//     >
//       <div
//         onClick={(e) => {
//           e.stopPropagation();
//         }}
//         className="flex flex-col lg:w-[650px] gap-3 items-center shadow-md bg-gray-900 mt-[200px] ml-[200px] xl:ml-[350px]"
//       >
//         <button
//           onClick={() => setToggle(false)}
//           className="btnn font-semibold self-end bg-red-500/50 rounded-sm m-2"
//         >
//           X
//         </button>
//         <h1 className="text-2xl font-bold">Add New Project</h1>

//         <form
//           onSubmit={handleSubmit}
//           className=" flex flex-col gap-4 text-sm text-white"
//         >
//           <input
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             placeholder="Title"
//             className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
//           />
//           <input
//             type="text"
//             value={tech}
//             onChange={(e) => setTech(e.target.value)}
//             placeholder="Tech"
//             className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
//           />
//           <input
//             type="file"
//             onChange={(e) => setFile(e.target.files)}
//             className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
//           />
//           <textarea
//             cols="30"
//             rows="5"
//             onChange={(e) => setDesc(e.target.value)}
//             placeholder="Description"
//             className="p-2 rounded-md w-[350px] lg:w-[550px] bg-gray-700/30"
//           ></textarea>
//           <button className="btnn primary_bg w-fit mb-5">Submit</button>
//         </form>
//       </div>
//     </section>
//   );
// };

// export default ProjectForm;
